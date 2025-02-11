import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile({ render }) {
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState({ id: '', image: '', fullName: '' });
  const remote = `${import.meta.env.VITE_APP_API_URL}/users`;
  const local = "http://localhost:5005/users";

  useEffect(() => {
    const storedUser = localStorage.getItem('tokens');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (parsedUser && parsedUser.id) {
      setUserId(parsedUser.id);
    } else {
      console.error('User ID not found in localStorage');
    }
  }, []);

  useEffect(() => {
    if (!userId) return; 

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${remote}/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  return <>{userData.image && render(userData)}</>;
}

export default Profile;