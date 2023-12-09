<?php

namespace App\Http\Controllers;

use App\Enum\PaymentEnum;
use App\Enum\UserRoleEnum;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;
use App\Helpers\GetRoleNameByNumber;
use App\Mail\RequestCancel;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationDeleted;
use App\Models\Package;
use App\Models\Location;
use App\Models\Payment;
use DateTime;

class ReservationController extends Controller
{

    public function index()
    {
        $user = Auth::user();
        $userRole = strtolower(GetRoleNameByNumber::getRoleName($user->role));
        if ($userRole == 'admin') {
            $requestToCancel = Reservation::where('void_request', true)->get();
        } else {
            $requestToCancel = Reservation::where('void_request', true)->where('instructor_id', $user->id)->get();
        }


        $requestToCancel->map(function ($reservation) {
            $reservation->user = User::find($reservation->user_id);
            $reservation->instructor = User::find($reservation->instructor_id);
            return $reservation;
        });


        $data = [
            'requestToCancel' => $requestToCancel,
        ];
        return Inertia::render('Reservations/index', $data);
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $reservation = $request->reservations;
        $userId = $reservation['user_id'];
        $packageId = $reservation['plan_id'];
        $locationId = $reservation['location_id'];
        $selectedDatetimes = $request->selectedDatetimes;
        // dd($selectedDatetimes);

        // algorithm to chose an instructor if he is not busy in the selected datetimes plus 4 hours after the last selected datetime
        $instructors = User::where('role', UserRoleEnum::EMPLOYEE->value)->with('reservations')->get();
        $packages = Package::all();
        $selectedPackage = $packages->where('id', $packageId)->first();


        // availableDays will be like this [ selectedDatetime1 => true, selectedDatetime2 => true, ...]
        $availableDays = [];



        foreach ($selectedDatetimes as $selectedDatetime) {
            // looping through every selected datetimes from the request
            $availableDays[$selectedDatetime] = true;
            $selectedDatetime = DateTime::createFromFormat('Y-m-d H:i:s', $selectedDatetime);
            $selectedDateEndtime = clone $selectedDatetime;
            $selectedDateEndtime->modify('+' . $selectedPackage->duration . ' hours');

            $firstAvailableInstructor = null;

            foreach ($instructors as $instructor) {
                // looping through every instructor
                $reservations = Reservation::where('instructor_id', $instructor->id)->with('package')->get();
                $allInstructorReservations = $reservations->map(function ($reservation) {
                    $endTime = DateTime::createFromFormat('Y-m-d H:i:s', $reservation->start_time);
                    $endTime->modify('+' . $reservation->package->duration . ' hours');
                    return [
                        'start_time' => DateTime::createFromFormat('Y-m-d H:i:s', $reservation->start_time),
                        'end_time' => $endTime,
                    ];
                });

                $isAvailable = true;

                foreach ($allInstructorReservations as $instructorReservation) {
                    // looping through every reservation of the instructor
                    $instructorReservationStartTime = $instructorReservation['start_time'];
                    $instructorReservationEndTime = $instructorReservation['end_time'];

                    $isAvailable = $this->checkIfInstructorIsAvailable($instructorReservationStartTime, $instructorReservationEndTime, $selectedDatetime, $selectedDateEndtime);

                    if (!$isAvailable) {
                        // if the instructor is not available in the selected datetime
                        break;
                    }
                }

                if ($isAvailable) {
                    // If the instructor is available, add the reservation to the first available instructor and break out of the loop
                    $firstAvailableInstructor = $instructor;
                    break;
                }
            }

            // Check if a first available instructor was found
            if ($firstAvailableInstructor) {
                // Add the reservation to the database here
                $this->userMakeReservation($userId, $firstAvailableInstructor->id, $packageId, $locationId, $selectedDatetime->format('Y-m-d H:i:s'));
            } else {
                // If no available instructor was found, mark the day as unavailable
                $availableDays[$selectedDatetime->format('Y-m-d H:i:s')] = false;
            }
        }

        if (in_array(false, $availableDays)) {
            $days = array_values($availableDays);
            // filter where is false
            $days = array_filter($days, function ($day) {
                return $day == false;
            });

            $indices = array_map(function ($day) {
                return $day + 1;
            }, array_keys($days));;
            $days =  implode(', ', $indices);
            return inertia('Welcome')->with([
                // 'error' => 'The instructors is not available in : ',
                'error' => 'The instructors is not available in the following selected days: ' .  $days,
                'days' => $days,
                'packages' => Package::all(),
                'locations' => Location::all(),
            ]);
        } else {
            // If the instructor is available in the selected datetimes
            return inertia('Welcome')->with([
                'success' => 'Thank you for your reservation. please check your email for more details.',
                'packages' => Package::all(),
                'locations' => Location::all(),
            ]);
        }
    }

    private function checkIfInstructorIsAvailable($instructorReservationStartTime, $instructorReservationEndTime, $selectedDatetime, $selectedDateEndtime)
    {
        if ($selectedDatetime >= $instructorReservationStartTime && $selectedDatetime <= $instructorReservationEndTime) {
            // Selected datetime is between reservations start time and end time
            return false;
        } else if ($selectedDateEndtime >= $instructorReservationStartTime && $selectedDateEndtime <= $instructorReservationEndTime) {
            // Selected datetime end time is between reservations start time and end time
            return false;
        } else if ($selectedDatetime <= $instructorReservationStartTime && $selectedDateEndtime >= $instructorReservationEndTime) {
            // Selected datetime start time is before reservations start time and end time is after reservations end time
            return false;
        } else {
            return true;
        }
    }

    private function userMakeReservation($userId, $instructorId, $packageId, $locationId, $selectedDatetime)
    {
        $reservation = new Reservation();
        $reservation->user_id = $userId;
        $reservation->instructor_id = $instructorId;
        $reservation->package_id = $packageId;
        $reservation->location_id = $locationId;
        $reservation->start_time = $selectedDatetime;
        $reservation->save();

        $payment = new Payment();
        $payment->user_id = $userId;
        $payment->reservation_id = $reservation->id;
        $payment->amount = Package::find($packageId)->price;
        $payment->payment_status = PaymentEnum::PENDING->value;
        $payment->save();
    }
    public function destroy(Request $request): RedirectResponse
    {
        $id = $request->id;
        $reason = $request->reason;
        $reason == null ? $reason = 'sick' : $reason = $request->reason;


        $reservation = Reservation::find($id);
        $userId = $reservation->user_id;

        $instructeurId = $reservation->instructor_id;
        $instructeur = User::find($instructeurId);
        $instructeurName = $instructeur->name;
        // $instructeurMail = $instructeur->email;
        $instructeurMail = 'hamzaomenxx@gmail.com';


        $user = User::find($userId);

        $message = '';

        if ($reason == 'sick') {
            $message = "The reservation on $reservation->start_time has been cancelled because the employee is sick.";
        } else if ($reason == 'weather') {
            $message = 'The reservation has been cancelled because of bad weather(wind power > 10).';
        } else {
            $message = 'The reservation has been cancelled because of the following reason: ' . $reason;
        }

        $paymentStatus = $reservation->is_paid;
        // Send email to user
        $userName = $user->name;
        $userMail = 'hamzaomenxx@gmail.com';

        $data = [
            'reason' => $reason,
            'message' => $message,
            'paymentStatus' => $paymentStatus,
            'reservation_startTime' => $reservation->start_time,
            'role' => GetRoleNameByNumber::getRoleName($user->role),
        ];

        Mail::to($userMail)->send(new ReservationDeleted($userName, $data));
        $data = [
            'reason' => $reason,
            'message' => $message,
            'paymentStatus' => $paymentStatus,
            'reservation_startTime' => $reservation->start_time,
            'role' => GetRoleNameByNumber::getRoleName($instructeur->role),
        ];


        Mail::to($instructeurMail)->send(new ReservationDeleted($instructeurName, $data));


        $reservation->payment()->delete();
        $reservation->delete();

        return Redirect::route('dashboard');
    }

    public function destroyUser(Request $request)
    {
        $request->validate([
            'reason' => 'required|string|min:5',
        ]);

        $id = $request->id;
        $reason = $request->reason;

        $reservation = Reservation::find($id);
        $userId = $reservation->user_id;

        $instructeurId = $reservation->instructor_id;
        $instructeur = User::find($instructeurId);
        $instructeurName = $instructeur->name;
        // $instructeurMail = $instructeur->email;
        $instructeurMail = 'hamzaomenxx@gmail.com';


        $user = User::find($userId);

        $message = 'The user' . $user->name . ' has cancelled the reservation on ' . $reservation->start_time . 'because of the following reason: ' . $reason;


        $paymentDetails = $reservation->payment()->get();
        $paymentStatus = $paymentDetails[0]->payment_status;
        // Send email to user

        $paymentDetails = $reservation->payment()->get();
        $paymentStatus = $paymentDetails[0]->payment_status;
        // Send email to user
        $userName = $user->name;
        $userMail = 'hamzaomenxx@gmail.com';

        $data = [
            'reason' => $reason,
            'message' => $message,
            'paymentStatus' => $paymentStatus,
            'reservation_startTime' => $reservation->start_time,
            'role' => GetRoleNameByNumber::getRoleName($user->role),
            'instructeurName' => $instructeurName,
            'userName' => $userName,
        ];

        Mail::to($userMail)->send(new RequestCancel($userName, $data));
        $data = [
            'reason' => $reason,
            'message' => $message,
            'paymentStatus' => $paymentStatus,
            'reservation_startTime' => $reservation->start_time,
            'role' => GetRoleNameByNumber::getRoleName($instructeur->role),
            'instructeurName' => $instructeurName,
            'userName' => $userName,
        ];

        Mail::to($instructeurMail)->send(new RequestCancel($instructeurName, $data));



        $reservation->void_request_reason = $reason;
        $reservation->void_request = true;
        $reservation->save();
    }

    public function userReservations() {
        $user = Auth::user();
        $allReservations = Reservation::where('user_id', $user->id)->get();
        $allReservations->load('package')->load('payment');

        return Inertia::render('UserReservations/index', [
            'reservations' => $allReservations,
        ]);
    }

    public function userPaid(Request $request) {
        $reservation = Reservation::find($request->reservationId);
        $reservation->load('package')->load('payment');
        $reservation->payment->user_payment_status = PaymentEnum::COMPLETED->value;
        $reservation->payment->save();
    }
}
