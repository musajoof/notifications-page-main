import React, { useState, useEffect } from 'react';
import notificationsData from './api.json';

function App() {
  const [mostRecentActivities, setMostRecentActivities] = useState({});

  useEffect(() => {
    setMostRecentActivities({});
  }, [])

  const handleMarkAllAsRead = () => {
    setMostRecentActivities({});
  };
  
  notificationsData.forEach((notification) => {
    if (!mostRecentActivities[notification.name]) {
      mostRecentActivities[notification.name] = notification;
    } else {
      if (new Date(notification.timestamp) > new Date(mostRecentActivities[notification.name].timestamp)) {
        mostRecentActivities[notification.name] = notification;
      }
    }
  });

  return (
    <div className="max-w-full max-h-max p-5 text-slate-500 bg-slate-200">
      <div className="w-1/2 border-none m-auto rounded-xl p-5 space-y-3 bg-white">
        <div className="flex justify-between items-center">
        <h1 className='text-2xl font-bold'>
          Notifications
          {Object.keys(mostRecentActivities).length > 0 && (
            <strong className='p-2 rounded-lg bg-slate-600 text-white text-lg text-center ml-2'>{Object.keys(mostRecentActivities).length}</strong>
          )}
        </h1>

          <span className='text-lg font-bold cursor-pointer' onClick={handleMarkAllAsRead}>Mark All As Read</span>
        </div>

        {Object.values(mostRecentActivities).map((notification, index) => (
          <div
            key={index}
            className="flex justify-start items-center border-0 bg-slate-100 rounded-xl p-2"
          >
            <img
              src={notification.avata}
              alt={`${notification.name}'s avatar`}
              className="w-10 h-10 rounded-full mr-2"
            />
            <div className="text-lg text-slate-800">
              <p>
                <span className="font-bold cursor-pointer">{notification.name}</span> {notification.action}
              </p>
              <span>{notification.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
