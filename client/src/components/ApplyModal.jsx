import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const ApplyModal = ({ isOpen, onClose, accommodation }) => {
    const { currentUser } = useSelector((state) => state.user);

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

        console.log("UserId", currentUser?._id);
        console.log("OwnerId", accommodation?.userId);
        console.log("Phone Number:", form.phoneNumber);
        console.log("Move-In Date:", form.moveInDate);
        console.log("Term:", form.term);
        console.log("Notes:", form.notes ? form.noteText : "None");

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
        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
            <button
                className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full shadow-lg hover:bg-gray-200 z-50"
                onClick={onClose}
            >
                ✖
            </button>
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-2xl w-1/3 flex flex-col">
                    <h2 className="text-xl font-semibold text-center mb-3">Apply for Accommodation</h2>

                    <p className="text-lg font-medium">{currentUser?.firstname} {currentUser?.lastname}</p>
                    <p className="text-gray-500 text-sm">{currentUser?.email}</p>

                    <div className="mt-4">
                        <label className="block font-semibold text-gray-700">Phone Number</label>
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Enter Phone Number"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                    </div>

                    <div className="mt-4">
                        <label className="block font-semibold text-gray-700">Move-In Date</label>
                        <input
                            type="date"
                            name="moveInDate"
                            value={form.moveInDate}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-lg mt-1 focus:ring-2 focus:ring-purple-500 outline-none"
                        />
                        {errors.moveInDate && <p className="text-red-500 text-sm">{errors.moveInDate}</p>}

                        <select
                            name="term"
                            value={form.term}
                            onChange={handleChange}
                            className="border p-2 w-full rounded-lg mt-2 focus:ring-2 focus:ring-purple-500 outline-none"
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
                                className="mr-2 w-4 h-4"
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
                                className="border p-2 w-full rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                            ></textarea>
                        </div>
                    )}

                    <button
                        className="w-full bg-purple-500 text-white py-2 rounded mt-4 hover:bg-purple-600"
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
