import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import toast from "react-hot-toast";
export default function ConfirmPaid({
    className = "",
    reservationId,
    userPaymentStatus,
}) {
    const [confirmingPaid, setConfirmingPaid] = useState(false);
    const { data, setData, patch, processing, reset, errors, onSuccess } = useForm({
        reservationId: reservationId,
        onSuccess: () => {
            toast.success("Payment confirmed");
            closeModal();
        }
    });

    const confirmPaid = () => {
        setConfirmingPaid(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        patch(route("reservations.paid", reservationId), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingPaid(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <p
                onClick={confirmPaid}
                className="cursor-pointer block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
            >
                Confirm
            </p>

            <Modal show={confirmingPaid} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you paid?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once you confirm, an email will be send to the
                        instructor.
                    </p>

                    {userPaymentStatus !== 1 ? (
                        <InputError
                            message={
                                "If you did not pay and yet click on confirm. The owner may suspend your account"
                            }
                        />
                    ) : (
                        ""
                    )}

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        {userPaymentStatus === 1 ? (
                            <DangerButton className="ms-3" disabled={true}>
                                Already Paid
                            </DangerButton>
                        ) : (
                            <DangerButton
                                className="ms-3"
                                disabled={processing}
                            >
                                Confirm Payment
                            </DangerButton>
                        )}
                    </div>
                </form>
            </Modal>
        </section>
    );
}
