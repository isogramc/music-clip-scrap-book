import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Profile({ render }) {
  const location = useLocation();
  const [userId, setUserId] = useState({});
  const [userData, setUserData] = useState({ id: "", image: '', fullName: '' });

  const remote = `${import.meta.env.VITE_APP_API_URL}/users`;

  useEffect(() => {
    const locId = location.state?.userId;
    const userd = localStorage.getItem('tokens');
    const theUser = JSON.parse(userd);

    setUserId(theUser.id);
    
    if (!userId && !theUser.id) {
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

    //fetchUserData();
  }, []);

  return <>{userData.image && render(userData)}</>;
}

export default Profile;
