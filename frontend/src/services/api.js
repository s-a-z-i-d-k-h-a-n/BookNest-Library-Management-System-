import axios from 'axios';
const api=axios.create({baseURL:import.meta.env.VITE_API_URL||'http://localhost:5000/api'});
api.interceptors.request.use(config=>{const token=sessionStorage.getItem('booknest_token');if(token)config.headers.Authorization=`Bearer ${token}`;return config;});
api.interceptors.response.use(r=>r,e=>{if(e.response?.status===401){sessionStorage.removeItem('booknest_token');sessionStorage.removeItem('booknest_admin');if(location.pathname!=='/login')location.href='/login';}return Promise.reject(e);});
export default api;
