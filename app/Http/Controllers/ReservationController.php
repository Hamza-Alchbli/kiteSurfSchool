<?php

namespace App\Http\Controllers;

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

class ReservationController extends Controller
{
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
        }

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
        ];

        Mail::to($userMail)->send(new ReservationDeleted($userName, $data));
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

        $reservation->void_request = true;
        $reservation->save();
    }
}
