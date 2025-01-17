import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { signInFailure, signInStart, signInSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";
//import { useAuth } from '../contexts/AuthContext'; 


const SignIn = () => {
  //const { signin } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });
  const {loading, error} = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      dispatch(signInFailure("Invalid email address"));
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    dispatch(signInStart());

    try {
      // await signin({
      //   email: formData.email,
      //   password: formData.password
      // });
      const res = await fetch('api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success == false) {
        //toast.error(data.message);
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
      toast.success("Sign in successful!");
    } catch (err) {
      dispatch(signInFailure(err));
    }

  };

  return (
    <section className="bg-white">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Students"
            src="https://images.unsplash.com/photo-1519070994522-88c6b756330e?q=80&w=1897&auto=format&fit=crop"
            className="absolute inset-0 h-full w-full object-cover opacity-80"
          />
          <div className="hidden lg:relative lg:block lg:p-12">
            <Link className="block text-white" to="/">
              <span className="sr-only">Home</span>
              <svg className="h-8 sm:h-10" viewBox="0 0 24 24" fill="none">
                <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" fill="currentColor" />
              </svg>
            </Link>
            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
              Welcome back to MyCampusHome.LK
            </h2>
            <p className="mt-4 leading-relaxed text-white/90">
              Sign in to continue your journey in finding the perfect student accommodation.
            </p>
          </div>
        </section>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
            <div className="relative -mt-16 block lg:hidden">
              <Link className="inline-flex size-16 items-center justify-center rounded-full bg-white text-indigo-600 sm:size-20" to="/">
                <span className="sr-only">Home</span>
                <svg className="h-8 sm:h-10" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" fill="currentColor" />
                </svg>
              </Link>
              <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                Welcome Back
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-10 gap-6">
              <div className="col-span-10">
                <div className="relative">
                  <input
                    type="email"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="peer w-full rounded-lg border-2 border-gray-200 bg-white px-5 py-4 text-base text-gray-900 placeholder-transparent focus:border-indigo-600 focus:outline-none"
                    placeholder="Email"
                  />
                  <label
                    htmlFor="Email"
                    className="absolute -top-3 left-3 bg-white px-2 text-base text-gray-600 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-base peer-focus:text-indigo-600"
                  >
                    Email
                  </label>
                </div>
              </div>

              <div className="col-span-10">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="peer w-full rounded-lg border-2 border-gray-200 bg-white px-4 py-3 text-base placeholder-transparent focus:border-indigo-600 focus:outline-none"
                    placeholder="Password"
                  />
                  <label
                    htmlFor="Password"
                    className="absolute -top-2.5 left-3 bg-white px-1 text-base text-gray-600 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-base peer-focus:text-indigo-600"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </button>
                </div>
              </div>

              <div className="col-span-10 flex items-center justify-between">
                <label className="flex items-center gap-4 hover:cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <div className="size-5 rounded border-2 border-gray-200 transition-colors peer-checked:border-indigo-600 peer-checked:bg-indigo-600 group-hover:border-gray-300"></div>
                    <div className="absolute inset-0 hidden text-white peer-checked:block">
                      <svg className="size-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm text-gray-700">Remember me</span>
                </label>

                <Link to="/forgot-password" className="text-sm text-indigo-600 hover:text-indigo-700 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <div className="col-span-10 space-y-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-block w-full overflow-hidden rounded-lg bg-indigo-600 px-8 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                >
                  <span className="absolute inset-0 h-full w-full scale-0 rounded-lg bg-indigo-700 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100"></span>
                  <span className="relative inline-block text-md font-semibold">
                    {loading ? "Signing in..." : "Sign in"}
                  </span>
                </button>

                <OAuth />
              </div>

              <div className="col-span-6 items-center justify-center">
                <p className="text-center text-sm text-gray-600">
                  Don't have an account? {'  '}
                  <Link to="/sign-up" className="text-indigo-600 hover:text-indigo-700 hover:underline">
                    Sign up
                  </Link>
                </p>
              </div>

              {error && (
                <div className="col-span-10 text-red-500 text-sm bg-red-50 p-3 rounded-lg">
                  {error}
                </div>
              )}


            </form>
          </div>
        </main>
      </div>
    </section>
  );
};

export default SignIn;