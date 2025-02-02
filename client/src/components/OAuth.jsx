import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../config/firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {

            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const payload = {
                firstname: result.user.displayName.split(' ')[0],
                lastname: result.user.displayName.split(' ')[1],
                email: result.user.email,
                photo: result.user.photoURL,
            };

            const { data } = await axios.post('/auth/google', payload,{
                withCredentials: true
            });
            dispatch(signInSuccess(data));
            navigate("/");
            toast.success("Sign in successful!");

        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="flex-auto items-center h-full justify-center">
            <button
                type="button"
                onClick={handleGoogleClick}
                className="px-8 py-3 border relative w-full flex gap-2 border-slate-200 rounded-lg text-slate-600 hover:border-slate-400 hover:text-indigo-600 hover:shadow transition duration-150">
                <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                <span >Continue with Google</span>
            </button>
        </div>
    )
}

export default OAuth


