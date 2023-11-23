import AdminAuthenticatedLayout from '@/Layouts/AdminAuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function DashboardAdmin({ auth, message }) {
    // get the user role from the route
    console.log(message);
    return (
        <AdminAuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12 ">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col gap-4">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg flex flex-col gap-4">
                        <div className="p-6 text-gray-900 dark:text-gray-100">Welcome you are an {message}</div>
                    </div>

                </div>
            </div>
        </AdminAuthenticatedLayout>
    );
}
