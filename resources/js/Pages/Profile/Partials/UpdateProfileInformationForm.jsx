import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            adress: user.adress,
            phone: user.phone,
            city: user.city,
            zip: user.zip,
            country: user.country,
            citizen_service_number: user.citizen_service_number,
        });

    const submit = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Name" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name || ""}
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
                        value={data.email || ""}
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
                        value={data.adress || ""}
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
                            setData("citizen_service_number", e.target.value)
                        }
                        autoComplete="citizen_service_number"
                    />
                    <InputError
                        className="mt-2"
                        message={errors.citizen_service_number}
                    />
                </div>


                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Saved.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
