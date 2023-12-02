import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";

export default function ConfirmSelectedPaymentForm({
    className = "",
    paymentId,
}) {
    const [confirmingPaymentConfirmation, setConfirmingPaymentConfirmation] =
        useState(false);
    const { data, setData, patch, processing, reset, errors } = useForm();

    const confirmPaymentConfirmation = () => {
        setConfirmingPaymentConfirmation(true);
    };

    const confrmPayment = (e) => {
        e.preventDefault();

        patch(route("payments.confirm", paymentId));
        closeModal();
    };

    const closeModal = () => {
        setConfirmingPaymentConfirmation(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <p
                onClick={confirmPaymentConfirmation}
                className="cursor-pointer block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
            >
                Confirm Payment
            </p>

            <Modal show={confirmingPaymentConfirmation} onClose={closeModal}>
                <form onSubmit={confrmPayment} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to confirm this payment?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once you confirm this pament, both user and instructor
                        will get an email.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>
                            Confirm
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
