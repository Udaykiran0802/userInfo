// src/components/UserInfo.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfo = () => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://randomuser.me/api');
      const { results } = response.data;

      if (results && results.length > 0) {
        const { name, email } = results[0];
        setUserData({ name, email });
        localStorage.setItem('userData', JSON.stringify({ name, email }));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const refreshUserData = () => {
    fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <>
          <h2>User Information</h2>
          <p>
            Full Name: {userData.name.first} {userData.name.last}
          </p>
          <p>Email Address: {userData.email}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={refreshUserData}>Refresh</button>
    </div>
  );
};

export default UserInfo;
