import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Profile({ render }) {
  const location = useLocation();
  const userId = location?.state?.userId;
  const [userData, setUserData] = useState({ id: "", image: '', fullName: '' });

  useEffect(() => {
    if (!userId) {
      console.error('No userId provided in navigation state');
      return;
    }

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${userId}`);
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
