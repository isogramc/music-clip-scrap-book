import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Profile({ render }) {
  const location = useLocation();
  const userId = location?.state?.userId;
  const [userData, setUserData] = useState({ id: "", image: '', fullName: '' });
  const remote = `${import.meta.env.VITE_APP_API_URL}/users`;
  const local = "http://localhost:5005/users";

  useEffect(() => {
    if (!userId) {
      console.error('No userId provided in navigation state');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${remote}/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return <>{userData.image && render(userData)}</>;
}

export default Profile;
