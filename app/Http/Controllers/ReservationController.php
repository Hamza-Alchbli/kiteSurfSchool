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

        if ($reason =='sick') {
            $message = "The reservation on $reservation->start_time has been cancelled because the employee is sick.";
        } else if ($reason =='weather') {
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

        ];
        Mail::to($userMail)->send(new ReservationDeleted($userName, $data));
        Mail::to($instructeurMail)->send(new ReservationDeleted($instructeurName, $data));


        $reservation->payment()->delete();
        $reservation->delete();

        return Redirect::route('dashboard');
    }
}
