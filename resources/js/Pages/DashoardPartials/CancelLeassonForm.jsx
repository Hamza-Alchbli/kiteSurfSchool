import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import Select from "@/Components/Select";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";

export default function CancelLeassonForm({ className = "", eventId }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        reason: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();
        destroy(
            route("reservations.destroy", { id: eventId }),
            {
                preserveScroll: true,
                // onSuccess: () => closeModal(),
                // onFinish: () => reset(),
            }
        );
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <DangerButton onClick={confirmUserDeletion}>Cancel</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to cancel this event?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once this event is canceled, all of its resources and
                        data will be permanently deleted.
                    </p>

                    <div>
                        <InputLabel htmlFor="reason" value="Reason" />
                        <Select
                            id="reason"
                            className="mt-1 block w-full "
                            defaultValue={"sick"}
                            onChange={(e) =>{ setData("reason", e.target.value); }}
                        >
                            <option value="sick">Sickness</option>
                            <option value="weather">Bad wather</option>
                        </Select>
                        <InputError className="mt-2" message={errors.reason} />
                    </div>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing}>
                            Cancel Event
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
