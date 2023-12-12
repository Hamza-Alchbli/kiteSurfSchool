import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import CancelLeassonForm from "./DashoardPartials/CancelLeassonForm";

import React, { useState, useEffect } from "react";

const localizer = momentLocalizer(moment);

// Custom Event component with a cancel button
const CustomEvent = ({ event }) => (
    <div className="flex gap-4 items-center">
        <div>
            <strong>{event.title}</strong>
            {/* <p>Instructeur: {event}</p> */}
            {/* <p>Customer: {event}</p> */}
        </div>
        <div>
            <CancelLeassonForm eventId={event.id} />
        </div>
    </div>
);

// Custom Agenda component with a cancel button and name of the instructor
const CustomAgenda = ({ event }) => (
    <div className="flex gap-4 items-center">
        <strong>{event.title}</strong>
        <div>
            <CancelLeassonForm eventId={event.id} />
        </div>
    </div>
);

export default function DashboardAdmin({
    auth,
    message,
    paidReservations,
    instructors,
}) {
    const [myEventsList, setMyEventsList] = useState([]);

    const [instructeur, setInstructeur] = useState("all");
    paidReservations = Object.values(paidReservations);

    useEffect(() => {
        paidReservations.map((reservation) => {
            setMyEventsList((myEventsList) => [
                ...myEventsList,
                {
                    id: reservation.id,
                    title: reservation.package.name,
                    start: new Date(reservation.start_time),
                    end: new Date(
                        new Date(reservation.start_time).getTime() +
                            reservation.package.duration * 60 * 60 * 1000
                    ),
                },
            ]);
        });
    }, []);

    useEffect(() => {
        if (instructeur == "all") {
            setMyEventsList([]);
            paidReservations.map((reservation) => {
                setMyEventsList((myEventsList) => [
                    ...myEventsList,
                    {
                        id: reservation.id,
                        title: reservation.package.name,
                        start: new Date(reservation.start_time),
                        end: new Date(
                            new Date(reservation.start_time).getTime() +
                                reservation.package.duration * 60 * 60 * 1000
                        ),
                    },
                ]);
            });
        } else {
            setMyEventsList([]);
            paidReservations.map((reservation) => {
                if (reservation.instructor_id == instructeur) {
                    setMyEventsList((myEventsList) => [
                        ...myEventsList,
                        {
                            id: reservation.id,
                            title: reservation.package.name,
                            start: new Date(reservation.start_time),
                            end: new Date(
                                new Date(reservation.start_time).getTime() +
                                    reservation.package.duration *
                                        60 *
                                        60 *
                                        1000
                            ),
                        },
                    ]);
                }
            });
        }
    }, [instructeur]);

    const filterInstructeur = (e) => {
        setInstructeur(e.target.value);
    };

    return (
        <AdminAuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col gap-4">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Welcome, you are an {message}
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col gap-4">
                        <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
                            <h2 className="text-2xl font-bold">Calendar</h2>
                            <select
                                value={instructeur}
                                onChange={(e) => {
                                    filterInstructeur(e);
                                }}
                                className="border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm"
                            >
                                <option value="all">All instructors</option>
                                {instructors.length > 0 ? (
                                    instructors.map((instructeur) => (
                                        <option
                                            key={instructeur.id}
                                            value={instructeur.id}
                                        >
                                            {instructeur.name}
                                        </option>
                                    ))
                                ) : (
                                    <option value="all">All instructors</option>
                                )}
                            </select>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col gap-4">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Total found : {myEventsList.length}
                        </div>
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
                                agenda: {
                                    event: CustomAgenda,
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
