import { useSelector } from 'react-redux';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../config/firebase';
import { useDispatch } from 'react-redux';
import {
    updateUserStart,
    updateUserSuccess,
    updateUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailure,
    signOut,
} from '../redux/user/userSlice';
import { toast } from 'react-toastify';
import axios from 'axios';

import { TextField } from '@mui/material';
import {
    Delete as DeleteIcon,
    Logout as LogoutIcon
} from '@mui/icons-material';

export default function Profile() {
    const dispatch = useDispatch();
    const fileRef = useRef(null);
    const [image, setImage] = useState(undefined);
    const [imagePercent, setImagePercent] = useState(0);
    const [imageError, setImageError] = useState(false);
    const [formData, setFormData] = useState({});
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const navigate = useNavigate();

    const { currentUser, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (image) {
            handleFileUpload(image);
        }
    }, [image]);

    const handleFileUpload = async (image) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + image.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, image);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImagePercent(Math.round(progress));
            },
            (error) => {
                setImageError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
                    setFormData({ ...formData, profilePicture: downloadURL })
                );
            }
        );
    };
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());

            const { data } = await axios.post(`/user/update/${currentUser._id}`, formData, {
                withCredentials: true,
            });

            if (data.success === false) {
                dispatch(updateUserFailure(data));
                console.log(data);
                toast.error('Something went wrong!');
                return;
            }

            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
            toast.success('User is updated successfully!');
        } catch (error) {
            console.log(error);
            dispatch(updateUserFailure(error));
            toast.error('Something went wrong!');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await axios.delete(`/user/delete/${currentUser._id}`);
            const data = res.data;
            if (data.success === false) {
                toast.error('Something went wrong!');
                dispatch(deleteUserFailure(data));
                return;
            }
            dispatch(deleteUserSuccess(data));
            navigate('/sign-in');
            toast.success('Account deleted successfully!');
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong!');
            dispatch(deleteUserFailure(error));
        }
    };

    const handleSignOut = async () => {
        try {
            await axios.get('/auth/signout', { withCredentials: true });
            dispatch(signOut());
            navigate("/sign-in");
            toast.info("Sign Out Successful");
        } catch (error) {
            toast.error("Something went wrong!");
            console.log(error);
        }
    };

    return (
        <div className='p-6 max-w-lg mx-auto bg-white border border-gray-100 shadow-lg rounded-2xl'>
            <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    type='file'
                    ref={fileRef}
                    hidden
                    accept='image/*'
                    onChange={(e) => setImage(e.target.files[0])}
                />
                <img
                    src={formData.profilePicture || currentUser.profilePicture}
                    alt='profile'
                    className='h-24 w-24 self-center cursor-pointer rounded-full object-cover mt-2'
                    onClick={() => fileRef.current.click()}
                />
                <p className='text-sm self-center'>
                    {imageError ? (
                        <span className='text-red-700'>
                            Error uploading image (file size must be less than 2 MB)
                        </span>
                    ) : imagePercent > 0 && imagePercent < 100 ? (
                        <span className='text-slate-700'>{`Uploading: ${imagePercent} %`}</span>
                    ) : imagePercent === 100 ? (
                        <span className='text-green-700'>Image uploaded successfully</span>
                    ) : (
                        ''
                    )}
                </p>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="First Name"
                    defaultValue={currentUser.firstname}
                    onChange={handleChange}
                    id="firstname"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        },
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Last Name"
                    defaultValue={currentUser.lastname}
                    onChange={handleChange}
                    id="lastname"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        },
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Email"
                    type="email"
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    id="email"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        },
                    }}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Mobile Number"
                    defaultValue={currentUser.phoneNumber}
                    onChange={handleChange}
                    id="phoneNumber"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        },
                    }}
                />     
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Password"
                    type="password"
                    onChange={handleChange}
                    id="password"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '20px',
                        },
                    }}
                />  

                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Update'}
                </button>
            </form>

            {/* Account Actions */}
            <div className="flex justify-between mt-6 space-x-4">
                <button
                    onClick={handleDeleteAccount}
                    className="flex items-center px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                    <DeleteIcon className="mr-2" />
                    Delete Account
                </button>
                <button
                    onClick={handleSignOut}
                    className="flex items-center px-4 py-2 text-white bg-indigo-500 rounded-lg hover:bg-indigo-600"
                >
                    <LogoutIcon className="mr-2" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}