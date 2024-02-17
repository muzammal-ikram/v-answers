import axios from 'axios';

export const API_BASE_URL = 'http://localhost:4000/api/v1';
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('AuthToken') || sessionStorage.getItem('AuthToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    // if (error.response && error.response.status === 401) {
    //     localStorage.removeItem('token');
    //     localStorage.removeItem('user');
    //     sessionStorage.removeItem('token');
    //     sessionStorage.removeItem('user');
    //     window.location.href = '/signin';
    // }
    console.log(error , '@ERROR')
    return Promise.reject(error);
  }
);

export const sendLoggedInRequest = async (loggedInResponse : any) => {
    const response = await axiosInstance.post(`${API_BASE_URL}/users/loggedIn` , loggedInResponse);
    return response.data;
};

export const sendLoggedOutRequest = async (authToken : string) => {
    const response = await axiosInstance.post(`${API_BASE_URL}/users/loggedOut` , {authToken});
    return response.data;
};

export const getAllUsers = async () => {
    const response = await axiosInstance.get(`${API_BASE_URL}/users/getAllUsers`);
    return response.data;
};

export const getAllUsersHistory = async () => {
    const response = await axiosInstance.get(`${API_BASE_URL}/users/getAllUsersLoggedInHistory`);
    return response.data;
};

export const updateUserStatus = async (data : any) => {
    console.log(data , '@data')
    const response = await axiosInstance.put(`${API_BASE_URL}/users/updateUserStatus/${data.userId}` , {status: data.status});
    return response.data;
};

// export const signIn = async (userData: { email: string, password: string, remember: boolean }) => {
//     try {
//       const response = await axios.post(`${API_BASE_URL}/users/sign-in`, userData);
//       return response.data;
//     } catch (error) {
//       throw error.message;
//     }
// };
  
// export const signUp = async (userData: { username: string, email: string, password: string, agree: boolean }) => {
//   // console.log('signUp');
//   try {
//     const response = await axios.post(`${API_BASE_URL}/users/sign-up`, userData);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };

// export const createDataSource = async (corpusData: { name: string, description: string }) => {
//   try {
//     const response = await axiosInstance.post(`/data_source/createDataSource`, corpusData);
//     return response.data;
//   } catch (error) {
//     throw error.response.data;
//   }
// };