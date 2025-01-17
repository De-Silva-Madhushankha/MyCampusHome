import React from 'react'

const OAuth = () => {
    return (
        <div className="flex-auto items-center h-full justify-center dark:bg-gray-800">
            <button className="px-8 py-3 border relative w-full flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-indigo-600 dark:hover:text-slate-300 hover:shadow transition duration-150">
                <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                <span >Continue with Google</span>
            </button>
        </div>
    )
}

export default OAuth


