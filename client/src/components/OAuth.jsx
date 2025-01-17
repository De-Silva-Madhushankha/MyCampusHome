import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const OAuth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {

            const auth = getAuth(app);
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const res = await fetch('api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstname: result.user.displayName.split(' ')[0],
                    lastname: result.user.displayName.split(' ')[1],
                    email: result.user.email,
                    photo: result.user.photoURL,
                })
            });

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate("/");
            toast.success("Sign in successful!");


        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex-auto items-center h-full justify-center dark:bg-gray-800">
            <button
                type="button"
                onClick={handleGoogleClick}
                className="px-8 py-3 border relative w-full flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-indigo-600 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                <span >Continue with Google</span>
            </button>
        </div>
    )
}

export default OAuth


