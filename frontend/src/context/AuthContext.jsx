import {createContext,useContext,useEffect,useState} from 'react';
import api from '../services/api';
const Ctx=createContext(null);
export function AuthProvider({children}) {
 const [admin,setAdmin]=useState(()=>{try{return JSON.parse(sessionStorage.getItem('booknest_admin'));}catch{return null;}});
 const [loading,setLoading]=useState(Boolean(sessionStorage.getItem('booknest_token')));
 useEffect(()=>{if(sessionStorage.getItem('booknest_token'))api.get('/auth/me').then(r=>{setAdmin(r.data);sessionStorage.setItem('booknest_admin',JSON.stringify(r.data));}).catch(()=>{}).finally(()=>setLoading(false));},[]);
 const login=async(email,password)=>{const {data}=await api.post('/auth/login',{email,password});sessionStorage.setItem('booknest_token',data.token);sessionStorage.setItem('booknest_admin',JSON.stringify(data.admin));setAdmin(data.admin);};
 const logout=async()=>{try{await api.post('/auth/logout');}catch{}sessionStorage.clear();setAdmin(null);};
 return <Ctx.Provider value={{admin,loading,login,logout}}>{children}</Ctx.Provider>;
}
export const useAuth=()=>useContext(Ctx);
