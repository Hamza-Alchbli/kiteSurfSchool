<!DOCTYPE html>
<html>

<head>
    <title>Request Cancel</title>
</head>

<body>

    @if ($data['role'] == 'CUSTOMER')
        <p>Dear {{ $data['userName'] }},</p>

        <p>You requested to cancel the lesson on {{ $data['reservation_startTime'] }} because of the following reason:
        </p>
        <p>{{ $data['reason'] }}</p>

        <p>Please wait for the confirmation from the instructor/admin.</p>

        <p>Best regards,</p>
        <p>Your Company</p>
    @else
        <p>Dear {{ $data['instructeurName'] }},</p>
        <p>The customer {{ $data['userName'] }} has requested to cancel a leasson.</p>
        <p>plaese go to dashboard to accept or deny the request.</p>

        <p>Best regards,</p>
        <p>Your Company</p>
    @endif

</body>

</html>
