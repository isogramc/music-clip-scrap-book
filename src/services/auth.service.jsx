import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL
});

const signUp = ({ email, fullName, image, password }) => {
    console.log("signup=>", email, fullName, image, password);
    return api.post("/users", {email, fullName, image, password}).then(response=> response.data).catch(err=> console.error(err))
}

const login = ({email, password}) => {
    return api.get("users").then(response=> response.data).catch(err=> console.error(err))
}

const authMethods = {
    signUp, 
    login
}

export default authMethods