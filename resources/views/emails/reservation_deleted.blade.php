<!DOCTYPE html>
<html>
<head>
    <title>Reservation Deleted</title>
</head>
<body>
    <p>Dear {{ $to_name }},</p>

    <p>{{ $data['message'] }}</p>

    <p>Thank you for using our service.</p>

    @if ($data['paymentStatus'] && $data['role'] == 'CUSTOMER')
        <p>Payment will be refunded to your account.</p>
    @elseif ($data['role'] == 'CUSTOMER')
        <p>You did not pay for the Reservation. No action needed</p>
    @endif

    <p>Reservation details:</p>
    <p>Start time : {{ $data['reservation_startTime'] }}</p>


    <p>Best regards,</p>
    <p>Your Company</p>
</body>
</html>
