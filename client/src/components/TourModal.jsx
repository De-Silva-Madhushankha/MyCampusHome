import React, { useState, useEffect } from "react";
import { Timer, ChevronLeft, ChevronRight } from "lucide-react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom"; // Import useNavigate


const TourModal = ({ isOpen, onClose, accommodation, date,accomodationUserId}) => {
    const [selectedDate, setSelectedDate] = useState(date);
    const [selectedTime, setSelectedTime] = useState("Morning 9AM - 12PM");
    const [message, setMessage] = useState('');

    const navigate = useNavigate(); // Initialize navigate


    useEffect(() => {
        console.log("Received User ID in TourModal:", accomodationUserId); // ✅ Print userId
        
        setSelectedDate(date);
        setMessage(`Hi,\n\nI found ${accommodation?.address || "the given location"}, ${accommodation?.propertyType} on MyCampusHome.lk, and I would like to find out more. Could you please let me know when I might be able to view it?\n\nThanks`);
    }, [accommodation, date,accomodationUserId]);

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

        navigate('/newchat/{}', {
            state: {
                accomodationUserId,
                message,
            },
        });

        onClose();

    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <button
                className="absolute z-50 flex items-center justify-center w-10 h-10 rounded-full shadow-lg top-8 right-8 hover:bg-gray-200"
                onClick={onClose}
            >
                ✖
            </button>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="flex flex-col w-1/2 p-6 bg-white rounded-lg shadow-2xl h-3/4">
                    <h2 className="mb-3 text-xl font-semibold text-center">Request a Tour</h2>

                    {/*Date Selector*/}
                    <div className="flex items-center justify-center mb-6 space-x-2">
                        <ChevronLeft
                            className={`text-gray-500 cursor-pointer hover:text-gray-700 ${selectedDate?.isSame(dayjs(), "day") ? "opacity-50 cursor-not-allowed" : ""}`}
                            onClick={handlePrevDate}
                        />
                        <div className="flex space-x-10">
                            {[...Array(5)].map((_, index) => {
                                const date = selectedDate?.add(index, "day");
                                return (
                                    <div key={index} className={`px-4 py-2 border rounded-lg text-center ${date?.isSame(selectedDate, "day") ? "border-indigo-500" : ""
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
                    <div className="flex justify-center gap-2 mb-4 space-x-2">
                        <Timer className="self-center text-gray-500" />
                        {["Morning 9AM - 12PM", "Afternoon 12PM - 4PM", "Evening 4PM - 8PM"].map((time) => (
                            <button
                                key={time}
                                className={`px-4 py-2 border rounded-lg ${selectedTime === time ? "bg-indigo-500 text-white" : "bg-white"}`}
                                onClick={() => setSelectedTime(time)}
                            >
                                <p>{time}</p>
                            </button>
                        ))}
                    </div>

                    {/* Editable Message Box */}
                    <textarea
                        className="flex-grow w-full p-2 border rounded"
                        rows="4"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    
                    {/* Send Request Button */}
                    <button className="w-full py-2 mt-4 text-white bg-indigo-600 rounded hover:bg-indigo-700" onClick={handleSendRequest}>
                        Send Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TourModal;
