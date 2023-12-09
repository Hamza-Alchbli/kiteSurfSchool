import { Link, Head } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useState, useEffect } from "react";

import pic1 from "../../images/pic1.jpg";
import PackageForm from "./homePartials/PackageForm";
import LocationForm from "./homePartials/locationForm";
import DateTimePicker from "./homePartials/DateTimePicker";
import ReservationForm from "./homePartials/ReservationForm";
import toast, { Toaster } from "react-hot-toast";

export default function Welcome({ auth, packages, locations, error, success, days}) {
    useEffect(() => {
        if (error != null) {
            toast.error(`${error}`, {
                duration: 4000,
            });
            window.history.replaceState(
                null,
                null,
                window.location.origin + "/"
            );
            error = null;

        }
        if (success != null) {
            toast.success(success, {
                duration: 4000,
            });
            window.history.replaceState(
                null,
                null,
                window.location.origin + "/"
            );
            success = null;
        }
    }, [error, success]);
    const [plan, setPlan] = useState(packages[0]);
    const [location, setLocation] = useState(locations[0]);
    const [selectedDatetimes, setSelectedDatetimes] = useState([]);
    const [reservations, setReservations] = useState([]);


    // Function to check if a date is in the past
    const handleDatetimeChange = (dateTime, index) => {
        const updatedDatetimes = [...selectedDatetimes];
        updatedDatetimes[index] = dateTime;
        setSelectedDatetimes(updatedDatetimes);
    };

    useEffect(() => {
        if (auth.user) {
            setReservations((prevReservations) => ({
                ...prevReservations,
                user_id: auth.user.id,
                plan_id: plan.id,
                location_id: location.id,
            }));
        }
    }, [selectedDatetimes, plan, location]);

    useEffect(() => {
        if (plan && plan.total_days < selectedDatetimes.length) {
            setSelectedDatetimes((prevSelectedDatetimes) =>
                prevSelectedDatetimes.slice(0, plan.total_days)
            );
        }
    }, [plan])

    return (
        <>
            <Head title="Home" />
            <div className="p-4 relative sm:flex sm:justify-center min-h-screen bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <div className="z-10 flex justify-between w-screen p-8 fixed top-0 left-0 bg-transparent backdrop-blur-md bg-blend-darken backdrop-brightness-50 items-center">
                    <Link href="/">
                        <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200" />
                    </Link>
                    <div>
                        {auth.user ? (
                            <Link
                                href={route("dashboard")}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route("login")}
                                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Log in
                                </Link>

                                <Link
                                    href={route("register")}
                                    className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                <div className="w-full p-4 rounded-md mt-20 flex flex-col gap-12">
                    <div className=" mb-8 flex flex-col gap-6 justify-between sm:flex-row ">
                        <div className="flex flex-col gap-4 flex-1">
                            <h1 className="text-4xl font-bold text-white mt-20">
                                Kitesurfen bij Windkracht-12
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 text-xl">
                                Kitesurfen is een vorm van watersport waarbij
                                een sporter op een kleine surfplank staat en
                                zich laat voorttrekken door een kite oftewel
                                vlieger.
                            </p>

                            <p className="text-gray-600 dark:text-gray-400 text-xl">
                                Op onze website streven we ernaar om een
                                naadloze en verrijkende ervaring te bieden aan
                                zowel leraren als studenten. Of je nu een
                                enthousiaste leerling bent die zijn vaardigheden
                                wil verbeteren of een deskundige instructeur die
                                kennis wil delen, wij faciliteren een platform
                                waarop leren en onderwijzen samenkomen. Met
                                gebruiksvriendelijke functies en duidelijke
                                communicatie streven we ernaar om het proces van
                                lesreserveringen en -annuleringen moeiteloos te
                                maken. Ons doel is niet alleen om educatieve
                                interacties te vergemakkelijken, maar ook om een
                                gemeenschap van leergierige individuen te
                                bevorderen die gedreven zijn om kennis te delen
                                en te vergaren. Ontdek de eindeloze
                                mogelijkheden op onze site en laten we samen
                                bouwen aan een leeromgeving die inspirerend en
                                inclusief is voor iedereen.
                            </p>
                            <a
                                href="#packages"
                                className="w-max py-4 inline-flex items-center px-4  bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                            >
                                Pakketen
                            </a>
                        </div>
                        <div className="flex-1 flex items-center justify-center">
                            <img
                                src={pic1}
                                alt="image"
                                className="rounded-lg"
                            />
                        </div>
                    </div>

                    <div className="gap-4">
                        <div id="packages">
                            <PackageForm
                                packages={packages}
                                plan={plan}
                                setPlan={setPlan}
                            ></PackageForm>
                        </div>
                        {plan ? (
                            <div className="mt-6">
                                <LocationForm
                                    locations={locations}
                                    location={location}
                                    setLocation={setLocation}
                                ></LocationForm>
                            </div>
                        ) : (
                            <a href="#packages">
                                <div className="min-h-screen-50 bg-white w-full mt-6 rounded-lg backdrop-brightness-50 flex flex-col justify-center items-center">
                                    <h1 className="text-4xl font-bold text-gray-800">
                                        No plan selected
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 text-xl">
                                        Please select a plan
                                    </p>
                                </div>
                            </a>
                        )}
                    </div>

                    {!auth.user ? (
                        <div className="mt-6">
                            <div className="min-h-screen-50 bg-white w-full rounded-lg backdrop-brightness-50 flex flex-col justify-center items-center">
                                <Link
                                    href={route("login")}
                                    className="flex flex-col items-center justify-center font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    <h1 className="text-4xl font-bold text-gray-800">
                                        Not logged in
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 text-xl">
                                        Please log in
                                    </p>
                                </Link>
                            </div>
                        </div>
                    ) : plan && location ? (
                        <div className="min-h-screen-50 bg-white w-full rounded-lg backdrop-brightness-50 flex flex-col p-4">
                            <h1 className="text-4xl font-bold text-gray-800">
                                You can book {plan.total_days} days of{" "}
                                {plan.name} lessons at {location.name}
                            </h1>
                            {[...Array(plan.total_days)].map((_, index) => (
                                <DateTimePicker
                                    key={index}
                                    index={index}
                                    selectedDatetime={selectedDatetimes[index]}
                                    onDatetimeChange={handleDatetimeChange}
                                />
                            ))}
                            <div className="fixed right-10 bottom-10">
                                {selectedDatetimes.length > 0 ? (
                                    <ReservationForm
                                        reservations={reservations}
                                        selectedDatetimes={selectedDatetimes}
                                        plan={plan}
                                    />
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="mt-6">
                            <div className="min-h-screen-50 bg-white w-full rounded-lg backdrop-brightness-50 flex flex-col justify-center items-center">
                                <h1 className="text-4xl font-bold text-gray-800">
                                    No location selected
                                </h1>
                                <p className="text-gray-600 dark:text-gray-400 text-xl">
                                    Please select a location
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Toaster />

        </>
    );
}
