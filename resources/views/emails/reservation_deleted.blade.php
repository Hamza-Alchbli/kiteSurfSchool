<!DOCTYPE html>
<html>
<head>
    <title>Reservation Deleted</title>
</head>
<body>
    <p>Dear {{ $to_name }},</p>

    <p>{{ $data['message'] }}</p>

    <p>Thank you for using our service.</p>

    @if ($data['paymentStatus'] == 'completed' && )
        <p>The reservation is paid. Payment will be refunded to the payment account.</p>
    @else
        <p>The reservation is not paid. No action required</p>
    @endif

    <p>Reservation details:</p>


    <p>Best regards,</p>
    <p>Your Company</p>
</body>
</html>
