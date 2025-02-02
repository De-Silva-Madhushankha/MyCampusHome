import React, { useState, useEffect } from "react";
import { Timer, ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";

const TourModal = ({ isOpen, onClose, accommodation, date }) => {
    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedTime, setSelectedTime] = useState("Morning 9AM - 12PM");
    const [message, setMessage] = useState('');

    useEffect(() => {
        setSelectedDate(date);
        setMessage(`Hi,\n\nI found ${accommodation?.address || "the given location"}, ${accommodation?.propertyType} on MyCampusHome.lk, and I would like to find out more. Could you please let me know when I might be able to view it?\n\nThanks`);
    }, [accommodation, date]);

    useEffect(() => {
        setMessage(`Hi,\n\nI found ${accommodation?.address || "the given location"}, ${accommodation?.propertyType} on MyCampusHome.lk, and I would like to find out more. Could you please let me know when I might be able to view it on ${selectedDate?.format("dddd, MMM D")} at ${selectedTime}?\n\nThanks`);
    }, [accommodation, selectedDate, selectedTime]);    

    if (!isOpen) return null;

    const handleNextDate = () => {
        setSelectedDate(selectedDate.add(1, "day"));
    };

    const handlePrevDate = () => {
        const today = dayjs();
        if (!selectedDate?.isSame(today, "day")) {
            setSelectedDate(selectedDate.subtract(1, "day"));
        }
    };

    const handleSendRequest = () => {
        console.log("Tour Scheduled for:", selectedDate?.format("YYYY-MM-DD"), selectedTime);
        console.log("Message:", message);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <button
                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-gray-200 z-50"
                onClick={onClose}
            >
                ✖
            </button>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-2xl w-1/2 h-3/4 flex flex-col">
                    <h2 className="text-xl font-semibold text-center mb-3">Request a Tour</h2>

                    {/*Date Selector*/}
                    <div className="flex items-center justify-center space-x-2 mb-6">
                        <ChevronLeft
                            className={`text-gray-500 cursor-pointer hover:text-gray-700 ${selectedDate?.isSame(dayjs(), "day") ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={handlePrevDate}
                        />
                        <div className="flex space-x-10">
                            {[...Array(5)].map((_, index) => {
                                const date = selectedDate?.add(index, "day");
                                return (
                                    <div key={index} className={`px-4 py-2 border rounded-lg text-center ${date?.isSame(selectedDate, "day") ? "border-purple-500" : ""
                                        }`}>
                                        <p className="text-sm font-medium">{date?.format("ddd")}</p>
                                        <p className="text-lg font-bold">{date?.format("D")}</p>
                                        <p className="text-sm text-gray-500">{date?.format("MMM")}</p>
                                    </div>
                                );
                            })}
                        </div>
                        <ChevronRight
                            className="text-gray-500 cursor-pointer hover:text-gray-700"
                            onClick={handleNextDate}
                        />
                    </div>

                    {/* Time Selection */}
                    <div className="flex justify-center space-x-2 mb-4 gap-2">
                        <Timer className="text-gray-500 self-center" />
                        {["Morning 9AM - 12PM", "Afternoon 12PM - 4PM", "Evening 4PM - 8PM"].map((time) => (
                            <button
                                key={time}
                                className={`px-4 py-2 border rounded-lg ${selectedTime === time ? "bg-purple-500 text-white" : "bg-white"}`}
                                onClick={() => setSelectedTime(time)}
                            >
                                <p>{time}</p>
                            </button>
                        ))}
                    </div>

                    {/* Editable Message Box */}
                    <textarea
                        className="w-full p-2 border rounded flex-grow"
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    
                    {/* Send Request Button */}
                    <button className="w-full bg-purple-600 text-white py-2 mt-4 rounded hover:bg-purple-700" onClick={handleSendRequest}>
                        Send Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TourModal;
