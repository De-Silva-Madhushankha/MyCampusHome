import React from 'react';
import Navbar from '../components/Navbar';


export default function About() {
    return (
        <>
            <Navbar />
            <div className='px-4 py-12 max-w-2xl mx-auto'>
                <h1 className='text-3xl font-bold  mb-4 text-slate-800'>About</h1>
                <p className='mb-4 text-slate-700'>
                    At MyCampusHome, we make finding a place to live as easy as studying for finals (maybe even easier). Our goal is to provide a one-stop platform for students seeking accommodations near their university.

                </p>
                <p className='mb-4 text-slate-700'>

                    From affordable rooms to stylish apartments, we bring together a variety of listings tailored for student life. With a user-friendly interface and helpful resources, MyCampusHome is your trusted companion in finding the perfect spot to call home.
                </p>
                <p className='mb-4 text-slate-700'>
                    Whether you’re a first-year student or finishing your degree, MyCampusHome is here to connect you with your ideal living space. Start your search today and discover why students trust us for their housing needs!
                </p>
            </div></>

    );
}