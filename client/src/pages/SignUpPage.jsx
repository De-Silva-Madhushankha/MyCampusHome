import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
    const { register } = useAuth();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        acceptTerms: false
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const validateForm = () => {
        if (!formData.firstName || !formData.lastName) {
            setError("All fields are required");
            return false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError("Please enter a valid email address");
            return false;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters long");
            return false;
        }

        if (formData.password !== formData.passwordConfirmation) {
            setError("Passwords do not match");
            return false;
        }

        if (!formData.acceptTerms) {
            setError("You must accept the terms and conditions");
            return false;
        }

        return true;
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!validateForm()) return;

        setLoading(true);

        try {
            await register({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
                passwordConfirmation: formData.passwordConfirmation
            });
        } catch (err) {
            setError(err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex items-end h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="https://images.unsplash.com/photo-1570570665905-346e1b6be193?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        className="absolute inset-0 object-cover w-full h-full opacity-80"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <Link className="block text-white" to="/">
                            <span className="sr-only">Home</span>
                            <svg
                                className="h-8 sm:h-10"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"
                                    fill="currentColor"
                                />
                            </svg>
                        </Link>

                        <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                            Welcome to MyCampusHome.LK
                        </h2>

                        <h5 className="mt-4 leading-relaxed text-white/90">
                            Sign up to MyCampusHome.LK and unlock a world of convenience in finding your ideal rental or boarding place. Create your account to explore tailored listings, connect with property owners, and simplify your housing journey.
                        </h5>
                    </div>
                </section>

                <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative block -mt-16 lg:hidden">
                            <a
                                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-indigo-600 sm:size-20"
                                href="/"
                            >
                                <span className="sr-only">Home</span>
                                <svg
                                    className="h-8 sm:h-10"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"
                                        fill="currentColor"
                                    />
                                </svg>
                            </a>

                            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                                Welcome to MyCampusHome.LK
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500">
                                Sign up to MyCampusHome.LK and unlock a world of convenience in finding your ideal rental or boarding place. Create your account to explore tailored listings, connect with property owners, and simplify your housing journey.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-6 mt-8">
                            <div className="col-span-6 sm:col-span-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="FirstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm placeholder-transparent bg-white border-2 border-gray-200 rounded-lg peer focus:border-indigo-600 focus:outline-none"
                                        placeholder="First Name"
                                    />
                                    <label
                                        htmlFor="FirstName"
                                        className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                                    >
                                        First Name
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <div className="relative">
                                    <input
                                        type="text"
                                        id="LastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm placeholder-transparent bg-white border-2 border-gray-200 rounded-lg peer focus:border-indigo-600 focus:outline-none"
                                        placeholder="Last Name"
                                    />
                                    <label
                                        htmlFor="LastName"
                                        className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                                    >
                                        Last Name
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-6">
                                <div className="relative">
                                    <input
                                        type="email"
                                        id="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm placeholder-transparent bg-white border-2 border-gray-200 rounded-lg peer focus:border-indigo-600 focus:outline-none"
                                        placeholder="Email"
                                    />
                                    <label
                                        htmlFor="Email"
                                        className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                                    >
                                        Email
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm placeholder-transparent bg-white border-2 border-gray-200 rounded-lg peer focus:border-indigo-600 focus:outline-none"
                                        placeholder="Password"
                                    />
                                    <label
                                        htmlFor="Password"
                                        className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                                    >
                                        Password
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-6 sm:col-span-3">
                                <div className="relative">
                                    <input
                                        type="password"
                                        id="PasswordConfirmation"
                                        name="passwordConfirmation"
                                        value={formData.passwordConfirmation}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-sm placeholder-transparent bg-white border-2 border-gray-200 rounded-lg peer focus:border-indigo-600 focus:outline-none"
                                        placeholder="Confirm Password"
                                    />
                                    <label
                                        htmlFor="PasswordConfirmation"
                                        className="absolute -top-2.5 left-3 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-indigo-600"
                                    >
                                        Confirm Password
                                    </label>
                                </div>
                            </div>

                            <div className="col-span-6">
                                <label className="flex items-center gap-4 hover:cursor-pointer group">
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            id="acceptTerms"
                                            name="acceptTerms"
                                            checked={formData.acceptTerms}
                                            onChange={handleChange}
                                            className="peer sr-only"
                                        />
                                        <div className="transition-colors border-2 border-gray-200 rounded size-5 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 group-hover:border-gray-300"></div>
                                        <div className="absolute inset-0 hidden text-white peer-checked:block">
                                            <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <span className="text-sm text-gray-700">
                                        I accept the terms and conditions
                                    </span>
                                </label>
                            </div>

                            <div className="col-span-6">
                                <p className="text-sm text-gray-600">
                                    By creating an account, you agree to our
                                    <a href="#" className="ml-1 text-indigo-600 hover:text-indigo-700 hover:underline">terms and conditions</a>
                                    {' '}and{' '}
                                    <a href="#" className="text-indigo-600 hover:text-indigo-700 hover:underline">privacy policy</a>.
                                </p>
                            </div>

                            <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="relative inline-block w-full px-8 py-3 overflow-hidden text-white bg-indigo-600 rounded-lg group sm:w-auto focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                                >
                                    <span className="absolute inset-0 h-full w-full scale-0 rounded-lg bg-indigo-700 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"></span>
                                    <span className="relative inline-block text-sm font-semibold">
                                        {loading ? "Creating an Account..." : "Create an Account"}
                                    </span>
                                </button>

                                <p className="mt-4 text-sm text-gray-600 sm:mt-0">
                                    Already have an account?{' '}
                                    <Link to="/login" className="text-indigo-600 hover:text-indigo-700 hover:underline">Log in</Link>
                                </p>
                            </div>
                            {error && (
                                <div className="col-span-6 text-red-500 text-sm">
                                    {error}
                                </div>)}
                        </form>
                    </div>
                </main>
            </div>
        </section>
    )
}

export default SignUp;