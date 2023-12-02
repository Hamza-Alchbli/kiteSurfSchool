import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteSelectedPaymentForm({ className = '', paymentId }) {
    const [confirmingPaymentDeletion, setConfirmingPaymentDeletion] = useState(false);
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm();

    const confirmPaymentDeletion = () => {
        setConfirmingPaymentDeletion(true);
    };

    const deletePayment = (e) => {
        e.preventDefault();
        destroy(route('payments.destroy', paymentId), {
            preserveScroll: true,
            // onSuccess: () => closeModal(),
            // onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingPaymentDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>

            <p onClick={confirmPaymentDeletion} className="cursor-pointer block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out">Delete</p>

            <Modal show={confirmingPaymentDeletion} onClose={closeModal}>
                <form onSubmit={deletePayment} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete this payment?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once this payment is deleted, an email will be sent to the user.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Payment
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
