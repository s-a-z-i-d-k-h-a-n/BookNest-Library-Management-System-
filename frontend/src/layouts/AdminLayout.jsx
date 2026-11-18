import {NavLink,Outlet,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {BookOpen,LayoutDashboard,LibraryBig,Tags,Users,ArrowLeftRight,RotateCcw,Clock3,ChartNoAxesCombined,Bell,UserRound,Settings,LogOut,Menu,Search} from 'lucide-react';
import {useAuth} from '../context/AuthContext';
const links=[
 ['Dashboard','/',LayoutDashboard],['Books Management','/books',LibraryBig],['Categories','/categories',Tags],
 ['Members Management','/members',Users],['Borrowed Books','/borrowings',ArrowLeftRight],['Returned Books','/returns',RotateCcw],
 ['Overdue Books','/overdue',Clock3],['Reports & Analytics','/reports',ChartNoAxesCombined],['Notifications','/notifications',Bell],
 ['Admin Profile','/profile',UserRound],['Settings','/settings',Settings]
];
export default function AdminLayout(){
 const [open,setOpen]=useState(false);const {admin,logout}=useAuth();const nav=useNavigate();
 const signout=async()=>{await logout();nav('/login');};
 return <div className="app-shell">
  <aside className={`sidebar ${open?'show':''}`}><div className="brand"><div className="brand-mark"><BookOpen/></div><span>BookNest<small>ADMINISTRATION</small></span></div>
   <div className="nav-label">WORKSPACE</div><nav>{links.map(([label,path,Icon])=><NavLink key={path} to={path} end={path==='/'} onClick={()=>setOpen(false)}><Icon size={18}/>{label}</NavLink>)}</nav>
   <button className="logout-link" onClick={signout}><LogOut size={18}/>Logout</button>
   <div className="sidebar-foot">BookNest Library System<br/><span>Admin workspace</span></div>
  </aside>
  <main className="main-area"><header className="topbar"><button className="menu-btn" onClick={()=>setOpen(!open)}><Menu/></button><div className="top-search"><Search size={17}/><input placeholder="Search across your workspace" onKeyDown={e=>{if(e.key==='Enter')nav('/books?search='+encodeURIComponent(e.target.value));}}/></div><div className="top-user"><div className="avatar">{admin?.name?.[0]?.toUpperCase()||'A'}</div><div><b>{admin?.name||'Administrator'}</b><small>{admin?.role||'Admin'}</small></div></div></header>
   <div className="content"><Outlet/></div>
  </main>
 </div>;
}
