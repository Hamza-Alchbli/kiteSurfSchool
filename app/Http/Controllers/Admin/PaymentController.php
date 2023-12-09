<?php


namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Payment;
use Inertia\Inertia;
use App\Models\Reservation;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use App\Mail\ReservationDeleted;
use App\Enum\PaymentEnum;
use App\Mail\PaymentConfirm;

class PaymentController extends Controller
{
    public function payments() {
        $payments = Payment::all()->load('reservation', 'user');

        return Inertia::render('Payment/index', [
            'payments' => $payments,
        ]);
    }

    public function destroy(Request $request) {
        $id = $request->id;
        $payment = Payment::find($id);
        $reservation = Reservation::find($payment->reservation_id);
        $reason = $request->reason;
        $reason == null ? $reason = 'sick' : $reason = $request->reason;


        $user = User::find($reservation->user_id);
        $instructor = User::find($reservation->instructor_id);

        // dd($user, $instructor);

        // $userName = $user->name;
        // $userMail = $user->email;

        $userName = 'user name';
        $userMail = 'hamzaomenxx@gmail.com';


        // $instructorName = $instructor->name;
        // $instructorMail = $instructor->email;

        $instructorName = 'instructor';
        $instructorMail = 'hamzaomenxx@gmail.com';



        $data = [
            'reason' => $reason,
            'message' => 'The reservation has been cancelled because the employee is sick.',
            'paymentStatus' => $payment->payment_status,
            'reservation_startTime' => $reservation->start_time,
        ];

        Mail::to($userMail)->send(new ReservationDeleted($userName, $data));

        $data = [
            'reason' => $reason,
            'message' => 'The reservation has been cancelled because the employee is sick.',
            'paymentStatus' => $payment->payment_status,
            'reservation_startTime' => $reservation->start_time,
        ];

        Mail::to($instructorMail)->send(new ReservationDeleted($instructorName, $data));





        $reservation->delete();
        $payment->delete();

        return redirect()->back();
    }

    public function confirm(Request $request) {
        $id = $request->id;
        $payment = Payment::find($id);
        $payment->payment_status = PaymentEnum::COMPLETED;
        $payment->user_payment_status = PaymentEnum::COMPLETED;

        $payment->save();
        $reservation = Reservation::find($payment->reservation_id);

        $reservation->is_paid = PaymentEnum::COMPLETED;
        $reservation->save();

        $user = User::find($reservation->user_id);
        $instructor = User::find($reservation->instructor_id);

        // dd($user, $instructor);

        // $userName = $user->name;
        // $userMail = $user->email;

        $userName = 'user name';
        $userMail =  'hamzaomenxx@gmail.com';


        // $instructorName = $instructor->name;
        // $instructorMail = $instructor->email;

        $instructorName = 'instructor';
        $instructorMail = 'hamzaomenxx@gmail.com';



        $data = [
            'reason' => '',
            'message' => 'Payment has been confirmed.',
            'reservation_startTime'=> $reservation->start_time,
            'paymentStatus' => $payment->payment_status,
        ];

        Mail::to($userMail)->send(new PaymentConfirm($userName, $data));

        $data = [
            'reason' => '',
            'message' => 'Payment has been confirmed.',
            'reservation_startTime'=> $reservation->start_time,
            'paymentStatus' => $payment->payment_status,
        ];

        Mail::to($instructorMail)->send(new PaymentConfirm($instructorName, $data));

    }
}
