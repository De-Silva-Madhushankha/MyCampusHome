import React from 'react';
import { FaHome, FaChartLine, FaUserFriends } from 'react-icons/fa';

const Analytics = () => {
  // Mock analytics data
  const analyticsData = [
    {
      id: 1,
      icon: <FaHome className="text-indigo-600 w-6 h-6" />,
      title: 'Total Listings',
      value: 24,
    },
    {
      id: 2,
      icon: <FaChartLine className="text-indigo-600 w-6 h-6" />,
      title: 'Views This Month',
      value: 348,
    },
    {
      id: 3,
      icon: <FaUserFriends className="text-indigo-600 w-6 h-6" />,
      title: 'Active Tenants',
      value: 15,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Analytics</h3>
      <div className="grid grid-cols-1 gap-4">
        {analyticsData.map((data) => (
          <div key={data.id} className="flex items-center justify-start space-x-4">
            {data.icon}
            <div>
              <p className="text-gray-600">{data.title}</p>
              <p className="text-2xl font-bold text-gray-800">{data.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;