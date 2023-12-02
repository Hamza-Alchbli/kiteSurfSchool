// import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
// import SecondaryButton from "@/Components/SecondaryButton";
// import Dropdown from "@/Components/Dropdown";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import Dropdown from "@/Components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import DeleteSelectedPaymentForm from "./Partials/DeleteSelectedPaymentForm";

export default function index({ auth, payments }) {
    // get the user role from the route
    const paymentStatus = ["Pending", "Paid"];
    const reservationStatus = ["Waiting", "Confirmed"];

    const [searchText, setSearchText] = useState("");
    const [paid, setPaid] = useState(false);
    const filteredPayments = payments.filter((payment) => {
        // Filter by role

        // Filter by search text (you can customize this based on your criteria)
        const searchRegex = new RegExp(searchText, "");
        return (
            (searchRegex.test(payment.user.name) ||
                searchRegex.test(payment.user.email) ||
                // Add other fields to search if needed

                searchRegex.test(payment.payment_status)) &&
            (paid ? payment.payment_status : true)

            // check if the user is paid
            // if paid is true then return only paid users
            // (payment.payment_status ? payment.payment_status : true)
        );
    });
    return (
        <AdminAuthenticatedLayout
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
                            <div className="flex space-x-4 mb-4 p-4">
                                {/* Role Filter Buttons */}
                                <div>
                                    <input
                                        className="border border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm min-w-max"
                                        type="text"
                                        placeholder="Search..."
                                        value={searchText}
                                        onChange={(e) =>
                                            setSearchText(e.target.value)
                                        }
                                    />
                                </div>
                                <SecondaryButton
                                    onClick={() => setPaid(!paid)}
                                    active={paid}
                                >
                                    Only Paid
                                </SecondaryButton>
                            </div>
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
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            Payment status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            Reservation status
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                                        >
                                            Created at
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
                                    {filteredPayments.map((payment) => (
                                        <tr
                                            key={payment.id}
                                            className="p-6 text-gray-900 dark:text-gray-100"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {payment.user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {payment.user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {
                                                    paymentStatus[
                                                        payment.payment_status
                                                    ]

                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {
                                                     reservationStatus[
                                                        payment.reservation.is_paid
                                                    ]

                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(
                                                    payment.created_at
                                                ).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap flex gap-2 ">
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
                                                        {/* <EditSelectedUserForm
                                                            user={user}
                                                            className="ml-0:important"
                                                        /> */}
                                                        {/* <SuspendSelectedUserForm
                                                            userId={user.id}
                                                            ispaid={
                                                                user.paid
                                                            }
                                                        /> */}
                                                        {/* <DeleteSelectedUserForm
                                                            userId={user.id}
                                                        /> */}
                                                        <DeleteSelectedPaymentForm
                                                            paymentId={
                                                                payment.id
                                                            }
                                                        />
                                                    </div>
                                                </Dropdown.Content>
                                            </Dropdown>

                                                {/* more info icon */}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
