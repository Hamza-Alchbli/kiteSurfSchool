import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import CustomerCancelLeassonForm from "./DashoardPartials/CustomerCancelLeassonForm";
const localizer = momentLocalizer(moment);
const CustomEvent = ({ event }) => (
    <div className="flex gap-4 items-center ">
        <strong>{event.title}</strong>
        <div>
            <CustomerCancelLeassonForm eventId={event.id} voidRequest={event.voidRequest} />
        </div>
    </div>
);

export default function DashboardAdmin({ auth, message, reservations }) {
    const myEventsList = [];
    // console.log(reservations);
    reservations.map((reservation) => {
        myEventsList.push({
            id: reservation.id,
            title: reservation.package.name,
            start: new Date(reservation.start_time),
            end: new Date(
                new Date(reservation.start_time).getTime() +
                    reservation.package.duration * 60 * 60 * 1000
            ),
            voidRequest: reservation.void_request,
        });
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4">

                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col gap-4">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Welcome to dashboard</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col gap-4">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Total booked leasons found: {myEventsList.length}</div>
                    </div>
                    <div className="bg-white  overflow-hidden shadow-sm sm:rounded-lg flex flex-col gap-4 p-4">
                        <Calendar
                            localizer={localizer}
                            events={myEventsList}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500 }}
                            components={{
                                event: CustomEvent,
                            }}
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
