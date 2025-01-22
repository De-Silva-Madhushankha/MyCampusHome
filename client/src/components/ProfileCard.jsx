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
        <div className='p-3 max-w-lg mx-auto'>
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
                <input
                    defaultValue={currentUser.firstname}
                    type='text'
                    id='firstname'
                    placeholder='Firstname'
                    className='bg-slate-100 rounded-lg p-3'
                    onChange={handleChange}
                />
                <input
                    defaultValue={currentUser.lastname}
                    type='text'
                    id='lastname'
                    placeholder='Lasstname'
                    className='bg-slate-100 rounded-lg p-3'
                    onChange={handleChange}
                />
                <input
                    defaultValue={currentUser.email}
                    type='email'
                    id='email'
                    placeholder='Email'
                    className='bg-slate-100 rounded-lg p-3'
                    onChange={handleChange}
                />
                <input
                    type='password'
                    id='password'
                    placeholder='Password'
                    className='bg-slate-100 rounded-lg p-3'
                    onChange={handleChange}
                />
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                    {loading ? 'Loading...' : 'Update'}
                </button>
            </form>
            <div className='flex justify-between mt-5'>
                <span
                    onClick={handleDeleteAccount}
                    className='text-red-700 cursor-pointer'
                >
                    Delete Account
                </span>
                <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>
                    Sign out
                </span>
            </div>
            <p className='text-red-700 mt-5'>{error && 'Something went wrong!'}</p>
            <p className='text-green-700 mt-5'>
                {updateSuccess && 'User is updated successfully!'}
            </p>
        </div>
    );
}