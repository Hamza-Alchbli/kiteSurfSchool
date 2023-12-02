<!DOCTYPE html>
<html>

<head>
    <title>Payment Confirmed</title>
</head>

<body>
    <p>Dear {{ $to_name }},</p>

    <p>{{ $data['message'] }}</p>

    <p>Thank you for using our service.</p>



    <p>Reservation details:</p>
    <p>Start time : {{ $data['reservation_startTime'] }}</p>

    <p>Best regards,</p>
    <p>Your Company</p>
</body>

</html>
