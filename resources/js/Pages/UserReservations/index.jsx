// import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
// import SecondaryButton from "@/Components/SecondaryButton";
// import Dropdown from "@/Components/Dropdown";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import Dropdown from "@/Components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import ConfirmPaid from "./Partials/ConfirmPaid";
export default function index({ auth, reservations }) {
    const paymenrStatus = ["unpaid", "paid"];
    const confirmedPayment = ["unconfirmed", "confirmed"]
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Users
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4">
                    {/* map throigh the users and show thme */}
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col gap-4">
                        <div className="overflow-x-auto pb-32">
                            {/* search input */}
                            {/* Filter and Search Controls */}
                            <table className="min-w-full divide-y divide-gray-200 min-h-300 mb-10">
                                <thead className="bg-gray-50 dark:bg-gray-700">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            Price
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            Status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            confirmed by admin
                                        </th>

                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            Settings
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                                    {reservations.map((reservation) => (
                                        <tr
                                            key={reservation.id}
                                            className="p-6 text-gray-900 dark:text-gray-100"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {reservation.package.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {`€${reservation.package.price}`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {`${
                                                    paymenrStatus[
                                                        reservation.payment
                                                            .user_payment_status
                                                    ]
                                                }`}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {`${
                                                    confirmedPayment[
                                                        reservation.payment
                                                            .payment_status
                                                    ]
                                                }`}
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Dropdown>
                                                    <Dropdown.Trigger>
                                                        <FontAwesomeIcon
                                                            icon={faCircleInfo}
                                                            style={{
                                                                color: "#ffffff",
                                                                cursor: "pointer",
                                                            }}
                                                        />
                                                    </Dropdown.Trigger>
                                                    <Dropdown.Content>
                                                        <div className="flex flex-col gap-4">
                                                            <ConfirmPaid
                                                                reservationId={
                                                                    reservation.id
                                                                }
                                                                userPaymentStatus= {reservation.payment
                                                                    .user_payment_status}
                                                            />
                                                        </div>
                                                    </Dropdown.Content>
                                                </Dropdown>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
