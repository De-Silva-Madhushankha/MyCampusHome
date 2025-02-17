import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

const ApplyModal = ({ isOpen, onClose, accommodation }) => {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    const [form, setForm] = useState({
        phoneNumber: currentUser?.phoneNumber || '',
        moveInDate: '',
        term: '1 Month',
        notes: false,
        noteText: ''
    });

    const [errors, setErrors] = useState({});

    if (!isOpen) return null;

    const validateForm = () => {
        let newErrors = {};

        if (!form.phoneNumber.trim()) {
            newErrors.phoneNumber = "Phone number is required.";
        } else if (!/^\d{10}$/.test(form.phoneNumber)) {
            newErrors.phoneNumber = "Enter a valid 10-digit phone number.";
        }

        if (!form.moveInDate.trim()) {
            newErrors.moveInDate = "Move-in date is required.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSubmit = () => {
        if (!validateForm()) return;

        const message = `Hello, I am interested in your accommodation. 
    Here are my details:
    - Phone Number: ${form.phoneNumber}
    - Move-In Date: ${form.moveInDate}
    - Term: ${form.term}
    - Notes: ${form.notes ? form.noteText : "None"}`;

        let accomodationUserId = accommodation?.userId;
        navigate('/newchat/{}', {
            state: {
                accomodationUserId,
                message,
            },
        });
        onClose();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
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
                <div className="flex flex-col w-1/3 p-6 bg-white rounded-lg shadow-2xl">
                    <h2 className="mb-3 text-xl font-semibold text-center">Apply for Accommodation</h2>

                    <p className="text-lg font-medium">{currentUser?.firstname} {currentUser?.lastname}</p>
                    <p className="text-sm text-gray-500">{currentUser?.email}</p>

                    <div className="mt-4">
                        <label className="block font-semibold text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter Phone Number"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            className="w-full p-2 mt-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.phoneNumber && <p className="text-sm text-red-500">{errors.phoneNumber}</p>}
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold text-gray-700">Move-In Date</label>
                        <input
                            type="date"
                            name="moveInDate"
                            value={form.moveInDate}
                            onChange={handleChange}
                            className="w-full p-2 mt-1 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        {errors.moveInDate && <p className="text-sm text-red-500">{errors.moveInDate}</p>}

                        <select
                            name="term"
                            value={form.term}
                            onChange={handleChange}
                            className="w-full p-2 mt-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option>1 Month</option>
                            <option>6 Months</option>
                            <option>1 Year</option>
                            <option>2 Years</option>
                        </select>
                    </div>

                    <div className="mt-4">
                        <label className="inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="notes"
                                checked={form.notes}
                                onChange={handleChange}
                                className="w-4 h-4 mr-2"
                            />
                            <span className="text-gray-700">Add Notes</span>
                        </label>
                    </div>

                    {form.notes && (
                        <div className="mt-3">
                            <textarea
                                rows="3"
                                name="noteText"
                                placeholder="Enter additional notes..."
                                value={form.noteText}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            ></textarea>
                        </div>
                    )}

                    <button
                        className="w-full py-2 mt-4 text-white bg-indigo-500 rounded hover:bg-indigo-600"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplyModal;
