import { RadioGroup } from "@headlessui/react";
import CheckIcon from "@/Components/CheckIcon";
export default function LocationForm(props) {
    return (
        <RadioGroup value={props.location} onChange={props.setLocation}>
            <RadioGroup.Label className="text-white text-4xl">
                Chose a location
            </RadioGroup.Label>
            <div className="flex flex-col gap-4 mt-4 justify-center w-full">
                {props.locations.map((location) => (
                    <RadioGroup.Option
                        key={location.id}
                        value={location}
                        className={({ active, checked }) => `${
                            active
                                ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300"
                                : ""
                        }
                                        ${
                                            checked
                                                ? "bg-sky-900/75 text-white"
                                                : "bg-white"
                                        }
                                        relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none
                                        `}
                    >
                        {({ active, checked }) => (
                            <>
                                <div className="flex items-center justify-between w-full py-4">
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                            <RadioGroup.Label
                                                as="p"
                                                className={`font-medium  ${
                                                    checked
                                                        ? "text-white"
                                                        : "text-gray-900"
                                                }`}
                                            >
                                                {location.name}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description
                                                as="span"
                                                className={`inline ${
                                                    checked
                                                        ? "text-sky-100"
                                                        : "text-gray-500"
                                                }`}
                                            ></RadioGroup.Description>
                                        </div>
                                    </div>
                                    {checked && (
                                        <div className="flex-shrink-0 text-white">
                                            <CheckIcon className="w-6 h-6" />
                                        </div>
                                    )}
                                </div>
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
}
