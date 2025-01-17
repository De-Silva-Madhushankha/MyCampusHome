import React from 'react';
import Navbar from '../components/Navbar';
import ProfileCard from '../components/ProfileCard';
import PropertyListing from '../components/PropertyListing';
import Analytics from '../components/Analytics';


const Profile = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <ProfileCard />

          {/* Analytics */}
          <Analytics />

        </div>

        {/* Property Listings */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Property Listings</h2>
          <PropertyListing />
        </div>
      </div>
    </div>
  );
};

export default Profile;