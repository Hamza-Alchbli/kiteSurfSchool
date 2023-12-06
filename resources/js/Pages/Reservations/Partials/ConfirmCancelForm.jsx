import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";

export default function ConfirmCancelForm({
    className = "",
    requestToCancelId,
    reason,
}) {
    const [confirmingCancelation, setConfirmingCancelation] = useState(false);
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        reason: reason,
    });

    const confirmCancelDeletion = () => {
        setConfirmingCancelation(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(route("reservations.destroy", requestToCancelId), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingCancelation(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <p
                onClick={confirmCancelDeletion}
                className="cursor-pointer block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
            >
                Delete
            </p>

            <Modal show={confirmingCancelation} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to Cancel this reservation?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once this account is deleted, all of its resources and
                        data will be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Confirm cancelation
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
