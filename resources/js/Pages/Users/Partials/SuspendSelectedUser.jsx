import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function SuspendSelectedUserForm({
    className = "",
    userId,
    isSuspended,
}) {
    const [confirmingUserSuspension, setConfirmingUserSuspension] =
        useState(false);
    const { data, setData, patch, processing, reset, errors } = useForm();

    const confirmUserSuspension = () => {
        setConfirmingUserSuspension(true);
    };

    const suspendUser = (e) => {
        e.preventDefault();

        patch(route("users.suspend", userId));
        closeModal();
    };

    const closeModal = () => {
        setConfirmingUserSuspension(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            {/* <DangerButton onClick={confirmUserSuspension}>Suspend</DangerButton> */}
            {isSuspended ? (
                <PrimaryButton className="ms-3" onClick={confirmUserSuspension}>
                    Unsuspend
                </PrimaryButton>
            ) : (
                <DangerButton className="ms-3" onClick={confirmUserSuspension}>
                    Suspend
                </DangerButton>
            )}
            <Modal show={confirmingUserSuspension} onClose={closeModal}>
                <form onSubmit={suspendUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete this account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once this account is deleted, all of its resources and
                        data will be permanently deleted.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        {isSuspended ? (
                            <PrimaryButton
                                className="ms-3"
                                disabled={processing}
                            >
                                Unsuspend
                            </PrimaryButton>
                        ) : (
                            <DangerButton
                                className="ms-3"
                                disabled={processing}
                            >
                                Suspend
                            </DangerButton>
                        )}

                    </div>
                </form>
            </Modal>
        </section>
    );
}
