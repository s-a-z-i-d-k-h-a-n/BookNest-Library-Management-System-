import {Routes,Route,Navigate} from 'react-router-dom';
import {AuthProvider,useAuth} from './context/AuthContext';
import AdminLayout from './layouts/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Books from './pages/Books';
import {Categories,Members,Borrowings} from './pages/Management';
import Reports from './pages/Reports';
import {Notifications,Profile,Settings} from './pages/Other';
function Protected(){const {admin,loading}=useAuth();if(loading)return <div className="loading-screen">Loading BookNest…</div>;return admin?<AdminLayout/>:<Navigate to="/login" replace/>;}
function RoutesView(){return <Routes><Route path="/login" element={<Login/>}/><Route element={<Protected/>}><Route path="/" element={<Dashboard/>}/><Route path="/books" element={<Books/>}/><Route path="/categories" element={<Categories/>}/><Route path="/members" element={<Members/>}/><Route path="/borrowings" element={<Borrowings/>}/><Route path="/returns" element={<Borrowings mode="returned"/>}/><Route path="/overdue" element={<Borrowings mode="overdue"/>}/><Route path="/reports" element={<Reports/>}/><Route path="/notifications" element={<Notifications/>}/><Route path="/profile" element={<Profile/>}/><Route path="/settings" element={<Settings/>}/></Route><Route path="*" element={<Navigate to="/" replace/>}/></Routes>;}
export default function App(){return <AuthProvider><RoutesView/></AuthProvider>;}
