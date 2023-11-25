import AdminAuthenticatedLayout from "@/Layouts/AdminAuthenticatedLayout";
import { Head } from "@inertiajs/react";
import DangerButton from "@/Components/DangerButton";
import SecondaryButton from "@/Components/SecondaryButton";
import DeleteSelectedUserForm from "./Partials/DeleteSelectedUserForm";
import SuspendSelectedUserForm from "./Partials/SuspendSelectedUser";
import EditSelectedUserForm from "./Partials/EditSelectedUserForm";
import Dropdown from "@/Components/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
export default function AllUsers({ auth, users }) {
    // get the user role from the route
    const [roleFilter, setRoleFilter] = useState("all");
    const [searchText, setSearchText] = useState("");
    const [suspended, setSuspended] = useState(false);

    const filteredUsers = users.filter((user) => {
        // Filter by role
        if (roleFilter !== "all" && user.role !== roleFilter) {
            return false;
        }

        // Filter by search text (you can customize this based on your criteria)
        const searchRegex = new RegExp(searchText, "");
        return (
            searchRegex.test(user.name) ||
            searchRegex.test(user.email) ||
            // Add other fields to search if needed
            searchRegex.test(user.role)

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
                        <div className="overflow-x-auto min-h-screen">
                            {/* search input */}
                            {/* Filter and Search Controls */}
                            <div className="flex space-x-4 mb-4 p-4" >
                                {/* Role Filter Buttons */}
                                <div>
                                <input
                                    className="border border-gray-300 dark:border-gray-700 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md sm:text-sm"
                                    type="text"
                                    placeholder="Search..."
                                    value={searchText}
                                    onChange={(e) =>
                                        setSearchText(e.target.value)
                                    }
                                />
                                </div>
                                <SecondaryButton
                                    onClick={() => setRoleFilter("all")}
                                    active={roleFilter === "all"}
                                >
                                    All
                                </SecondaryButton>
                                <SecondaryButton
                                    onClick={() => setSuspended(!suspended)}
                                    active={suspended}
                                    >
                                    Suspended
                                </SecondaryButton>
                                <SecondaryButton
                                    // check if the role filter is admin
                                    // if it is then add the active class
                                    // className={
                                    //     roleFilter === "admin" ? "bg-black" : ""
                                    // }
                                    onClick={() => setRoleFilter("admin")}
                                    active={roleFilter === "admin"}
                                >
                                    Admin
                                </SecondaryButton>
                                <SecondaryButton
                                    onClick={() => setRoleFilter("employee")}
                                    active={roleFilter === "employee"}
                                    >
                                    Employee
                                </SecondaryButton>
                                <SecondaryButton
                                    onClick={() => setRoleFilter("customer")}
                                    active={roleFilter === "customer"}
                                    >
                                    Customer
                                </SecondaryButton>
                                {/* button to show only suspended + role */}



                                {/* Search Input */}

                            </div>
                            <table className="min-w-full divide-y divide-gray-200 min-h-300">
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
                                            Role
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
                                    {filteredUsers.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="p-6 text-gray-900 dark:text-gray-100"
                                        >
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.email}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {user.role}
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
                                                            <EditSelectedUserForm
                                                                user={user}
                                                                className="ml-0:important"
                                                            />
                                                            <SuspendSelectedUserForm
                                                                userId={user.id}
                                                                isSuspended={
                                                                    user.suspended
                                                                }
                                                            />
                                                            <DeleteSelectedUserForm
                                                                userId={user.id}
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
