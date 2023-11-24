import { useRef, useState } from "react";
import DangerButton from "@/Components/DangerButton";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import Select from "@/Components/Select";

export default function EditSelectedUserForm({
    className = "",
    user,
}) {
    const [confirmingUserEdit, setconfirmingUserEdit] =
        useState(false);
    const { data, setData, patch, errors, processing, recentlySuccessful,reset } =
        useForm({
            name: user.name,
            email: user.email,
            adress: user.adress,
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
    }

    return (
        <section className={`space-y-6 ${className}`}>
            {/* <DangerButton onClick={confirmUserSuspension}>Suspend</DangerButton> */}
            <PrimaryButton className="ms-3" onClick={confirmUserSuspension}>
                Edit
            </PrimaryButton>

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
                        <InputLabel htmlFor="adress" value="adress" />

                        <TextInput
                            id="adress"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.adress || ''}
                            onChange={(e) => setData("adress", e.target.value)}
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
                            value={data.phone || ''}
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
                            value={data.city || ''}
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
                            value={data.zip || ''}
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
                            value={data.country || ''}
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
                            value={data.citizen_service_number || ''}
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
                                data.role == "customer" ? 1 : data.role == "employee" ? 3 : 5



                            }

                            onChange={(e) => setData("role", e.target.value)}
                        >
                            <option value="1" >Customer</option>
                            <option value="3" >Employee</option>
                            <option value="5" >Admin</option>
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
