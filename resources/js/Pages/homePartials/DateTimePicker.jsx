import React from "react";

const DateTimePicker = ({ index, selectedDatetime, onDatetimeChange }) => {
    const hours = Array.from({ length: 8 }, (_, i) => i + 9); // Assuming you want hours from 9 to 16

    const formatDate = (date, hour) => {
        const formattedDate = date.toISOString().split("T")[0];
        const formattedHour = `${hour.toString().padStart(2, "0")}:00:00`;
        return `${formattedDate} ${formattedHour}`;
    };

    return (
        <div key={index} className="mt-6">
            <label
                htmlFor={`hourPicker${index}`}
                className="text-gray-600 dark:text-gray-400 text-lg"
            >
                Select date and hour for day {index + 1}:
            </label>
            <div className="flex items-center gap-4">
                <select
                    required
                    value={
                        selectedDatetime
                            ? selectedDatetime.split(" ")[1].split(":")[0]
                            : ""
                    }
                    onChange={(e) => {
                        const selectedHour = parseInt(e.target.value);
                        const date = selectedDatetime
                            ? new Date(selectedDatetime)
                            :
                              (() => {
                                  let date = new Date();
                                  date.setDate(date.getDate() + 1);
                                  return date;
                              })();
                        date.setHours(selectedHour);
                        onDatetimeChange(formatDate(date, selectedHour), index);
                    }}
                >
                    <option disabled value="">
                        Select hour
                    </option>
                    {hours.map((hour) => (
                        <option key={hour} value={hour}>
                            {hour.toString().padStart(2, "0")}:00
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    value={
                        selectedDatetime ? selectedDatetime.split(" ")[0] : ""
                    }
                    onChange={(e) => {
                        const selectedDate = e.target.value;
                        const selectedHour = selectedDatetime
                            ? selectedDatetime.split(" ")[1].split(":")[0]
                            : 9;
                        const date = new Date(
                            `${selectedDate}T${selectedHour
                                .toString()
                                .padStart(2, "0")}:00:00`
                        );
                        onDatetimeChange(formatDate(date, selectedHour), index);
                    }}
                    min={(() => {
                        let date = new Date();
                        date.setDate(date.getDate() + 1);
                        return date.toISOString().split("T")[0];
                    })()}
                />
            </div>
        </div>
    );
};

export default DateTimePicker;
