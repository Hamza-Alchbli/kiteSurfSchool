import { useEffect, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import toast, { Toaster } from "react-hot-toast";

export default function ReservationForm({
    className = "",
    reservations,
    selectedDatetimes,
    plan,
}) {
    const [confirmingReservation, setConfirmingReservation] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        reservations: reservations,
        selectedDatetimes: selectedDatetimes,
    });

    const confirmReservation = () => {
        setConfirmingReservation(true);
    };

    useEffect(() => {
        setData({
            reservations: reservations,
            selectedDatetimes: selectedDatetimes,
        });
        // console.log(plan.total_days);
    }, [selectedDatetimes, reservations]);

    const Reserve = (e) => {
        e.preventDefault();

        //check if the same date is already double selected
        let dates = [...selectedDatetimes];
        let doubleDate = false;
        selectedDatetimes.forEach((datetime) => {
            if (dates.includes(datetime.split(" ")[0])) {
                doubleDate = true;
                toast.error("You can't select the same date twice!");
            } else {
                dates.push(datetime.split(" ")[0]);
            }
        });

        if (doubleDate) {
            return;
        } else if (selectedDatetimes.length != plan.total_days) {
            toast.error(
                `You have to select at least ${plan.total_days} days for this plan!`
            );
        } else {
            post(route("reservations.store"), {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            })
        }
    };

    const closeModal = () => {
        setConfirmingReservation(false);
        // reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <PrimaryButton
                onClick={confirmReservation}
                className="!bg-black !text-white !p-4 !text-xl"
            >
                Reserve
            </PrimaryButton>

            <Modal show={confirmingReservation} onClose={closeModal}>
                <form onSubmit={Reserve} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to Reserve this reservation?
                    </h2>

                    {selectedDatetimes.map((datetime, index) => (
                        <div key={Math.random()} className="mt-4">
                            <InputLabel
                                htmlFor={`hourPicker${index}`}
                                value={`Day ${index + 1}`}
                            />
                            <input
                                type="text"
                                name="date"
                                id="date"
                                required
                                value={
                                    // dont show minutes or seconds
                                    datetime.split(" ")[0] +
                                    " " +
                                    datetime.split(" ")[1].split(":")[0] +
                                    ":00"
                                }
                                disabled
                                className="w-full border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                            {/* <InputError className="mt-2" message={errors} /> */}
                        </div>
                    ))}
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once this account is deleted, all of its resources and
                        data will be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Reserve
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
