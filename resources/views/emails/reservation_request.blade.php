<!DOCTYPE html>
<html>

<head>
    <title>Reservation request</title>
</head>

<body>
    <p>Dear {{ $to_name }},</p>

    <p>you requested to make reservations on the following dates</p>

    <p>Make sure to pay {{$data['price']}} as fast as possible</p>
    <p>after paying the price please go to the dashboard and confirm payment there.</p>

    <div>
        {{-- fake payment details --}}
        <p>Payment details:</p>
        <p>Name: Kitesurfschool</p>
        <p>IBAN: BE00 0000 0000 0000</p>
        <p>Amount: &euro;{{$data['price']}}</p>
    </div>




    <p>Reservations details:</p>
    <p>Package: {{$data['package']}}</p>
    <p>Location: {{$data['location']}}</p>
     {{-- foreach loop $data['selectedDatetimes'] --}}
    @foreach ($data['selectedDatetimes'] as $selectedDatetime)
    <p>Start time : {{ $selectedDatetime }}</p>
    @endforeach

    <p>Best regards,</p>
    <p>Your Company</p>
</body>

</html>
