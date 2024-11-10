const backendDomin =  process.env.REACT_APP_BACKEND_URL

const SummaryApi = {
    signUP: {
        url: `${backendDomin}/api/signup`,
        method: "post"
    },
    signIn: {
        url: `${backendDomin}/api/signin`,
        method: "post"
    },
    current_user: {
        url: `${backendDomin}/api/user-details`,
        method: "get"
    },
    logout_user: {
        url: `${backendDomin}/api/userLogout`,
        method: 'get'
    },
    update_user: {
        url: `${backendDomin}/api/update-user`, // Changed to match the correct endpoint
        method: 'put' 
    },
};

export default SummaryApi;
