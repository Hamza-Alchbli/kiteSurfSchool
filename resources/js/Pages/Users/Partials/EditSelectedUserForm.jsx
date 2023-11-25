import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { useForm, usePage } from "@inertiajs/react";
import Select from "@/Components/Select";

export default function EditSelectedUserForm({ className = "", user }) {
    const [confirmingUserEdit, setconfirmingUserEdit] = useState(false);
    const {
        data,
        setData,
        patch,
        errors,
        processing,
        recentlySuccessful,
        reset,
    } = useForm({
        name: user.name,
        email: user.email,
        streat: user.streat,
        phone: user.phone,
        city: user.city,
        zip: user.zip,
        country: user.country,
        citizen_service_number: user.citizen_service_number,
        role: user.role,
    });

    const confirmUserSuspension = () => {
        setconfirmingUserEdit(true);
    };

    const updateUser = (e) => {
        e.preventDefault();

        patch(route("users.update", user.id));
        closeModal();
    };

    const closeModal = () => {
        setconfirmingUserEdit(false);
    };

    const resetForm = () => {
        setconfirmingUserEdit(false);
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <p
                onClick={confirmUserSuspension}
                className="cursor-pointer block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out"
            >
                All info || Edit
            </p>

            <Modal show={confirmingUserEdit} onClose={resetForm}>
                <form onSubmit={updateUser} className="p-6">
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isFocused
                            autoComplete="name"
                        />

                        <InputError className="mt-2" message={errors.name} />
                    </div>

                    <div>
                        <InputLabel htmlFor="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div>
                        <InputLabel htmlFor="streat" value="streat" />

                        <TextInput
                            id="streat"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.streat || ""}
                            onChange={(e) => setData("streat", e.target.value)}
                            autoComplete="username"
                        />

                        <InputError className="mt-2" message={errors.email} />
                    </div>
                    <div>
                        <InputLabel htmlFor="phone" value="Phone" />
                        <TextInput
                            id="phone"
                            type="tel"
                            className="mt-1 block w-full"
                            value={data.phone || ""}
                            onChange={(e) => setData("phone", e.target.value)}
                            autoComplete="phone"
                        />
                        <InputError className="mt-2" message={errors.phone} />
                    </div>
                    <div>
                        <InputLabel htmlFor="city" value="City" />
                        <TextInput
                            id="city"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.city || ""}
                            onChange={(e) => setData("city", e.target.value)}
                            autoComplete="city"
                        />
                        <InputError className="mt-2" message={errors.city} />
                    </div>
                    <div>
                        <InputLabel htmlFor="zip" value="Zip" />
                        <TextInput
                            id="zip"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.zip || ""}
                            onChange={(e) => setData("zip", e.target.value)}
                            autoComplete="zip"
                        />
                        <InputError className="mt-2" message={errors.zip} />
                    </div>
                    <div>
                        <InputLabel htmlFor="country" value="Country" />
                        <TextInput
                            id="country"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.country || ""}
                            onChange={(e) => setData("country", e.target.value)}
                            autoComplete="country"
                        />
                        <InputError className="mt-2" message={errors.country} />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="citizen_service_number"
                            value="Citizen service number"
                        />
                        <TextInput
                            id="citizen_service_number"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.citizen_service_number || ""}
                            onChange={(e) =>
                                setData(
                                    "citizen_service_number",
                                    e.target.value
                                )
                            }
                            autoComplete="citizen_service_number"
                        />
                        <InputError
                            className="mt-2"
                            message={errors.citizen_service_number}
                        />
                    </div>
                    {/* select and options to change role */}
                    <div>
                        <InputLabel htmlFor="role" value="Role" />
                        <Select
                            id="role"
                            className="mt-1 block w-full "
                            defaultValue={
                                data.role == "customer"
                                    ? 1
                                    : data.role == "employee"
                                    ? 3
                                    : 5
                            }
                            onChange={(e) => setData("role", e.target.value)}
                        >
                            <option value="1">Customer</option>
                            <option value="3">Employee</option>
                            <option value="5">Admin</option>
                        </Select>
                        <InputError className="mt-2" message={errors.role} />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={resetForm}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
