import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';


export default function About() {
    return (
        <>
            <Navbar />
            <div className='px-4 py-12 flex-col max-w-2xl mx-auto'>
                <h1 className='text-4xl font-bold  mb-4 text-slate-800'>About</h1>
                <p className='mb-4 text-slate-700'>
                    At MyCampusHome, we make finding a place to live as easy as studying for finals (maybe even easier). Our goal is to provide a one-stop platform for students seeking accommodations near their university.

                </p>
                <p className='mb-4 text-slate-700'>

                    From affordable rooms to stylish apartments, we bring together a variety of listings tailored for student life. With a user-friendly interface and helpful resources, MyCampusHome is your trusted companion in finding the perfect spot to call home.
                </p>
                <p className='mb-4 text-slate-700'>
                    Whether you’re a first-year student or finishing your degree, MyCampusHome is here to connect you with your ideal living space. Start your search today and discover why students trust us for their housing needs!
                </p>
            </div>
            <div className='px-4 py-12 max-w-2xl mx-auto'>
                <h1 className='text-4xl font-bold  mb-4 text-slate-800'>Our Team</h1>
                <img src="profile_pic.png" alt='team' className='rounded-lg'/>
                <p className='mb-4 text-slate-700'>
                    At MyCampusHome, we make finding a place to live as easy as studying for finals (maybe even easier). Our goal is to provide a one-stop platform for students seeking accommodations near their university.

                </p>
                <p className='mb-4 text-slate-700'>

                    From affordable rooms to stylish apartments, we bring together a variety of listings tailored for student life. With a user-friendly interface and helpful resources, MyCampusHome is your trusted companion in finding the perfect spot to call home.
                </p>
                <p className='mb-4 text-slate-700'>
                    Whether you’re a first-year student or finishing your degree, MyCampusHome is here to connect you with your ideal living space. Start your search today and discover why students trust us for their housing needs!
                </p>
            </div>
            <div className='px-4 py-12 max-w-2xl mx-auto'>
                <h1 className='text-4xl font-bold  mb-4 text-slate-800'>Contact Us</h1>
                <p className='mb-4 text-slate-700'>
                    At MyCampusHome, we make finding a place to live as easy as studying for finals (maybe even easier). Our goal is to provide a one-stop platform for students seeking accommodations near their university.

                </p>
                <p className='mb-4 text-slate-700'>

                    From affordable rooms to stylish apartments, we bring together a variety of listings tailored for student life. With a user-friendly interface and helpful resources, MyCampusHome is your trusted companion in finding the perfect spot to call home.
                </p>
                <p className='mb-4 text-slate-700'>
                    Whether you’re a first-year student or finishing your degree, MyCampusHome is here to connect you with your ideal living space. Start your search today and discover why students trust us for their housing needs!
                </p>
            </div>
            <footer className="bg-gray-50 border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col items-center gap-8">
          <Link
                to="/" 
                className="flex items-center space-x-4 ">
              <img 
                src="/campus-home-logo.svg" 
                alt="Logo" 
                className="h-10 w-auto filter invert"
              />
                <span className="text-2xl font-bold text-gray-700 ">MyCampusHome</span>
            </Link>
            <nav className="flex flex-wrap justify-center gap-8 text-sm">
              <Link to="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">About Us</Link>
              <Link href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Blog</Link>
              <Link href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">News</Link>
              <Link href="#" className="text-gray-600 hover:text-indigo-600 transition-colors duration-200">Contact</Link>
            </nav>
            <div className="h-px w-full max-w-sm bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <p className="text-sm text-gray-500 text-center">
              © {new Date().getFullYear()} MyCampusHome, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      </>

    );
}