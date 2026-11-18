import {useState} from 'react';
import {useNavigate,Navigate} from 'react-router-dom';
import {BookOpen,LockKeyhole,Mail} from 'lucide-react';
import {useAuth} from '../context/AuthContext';
export default function Login(){const {login,admin}=useAuth();const nav=useNavigate();const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [error,setError]=useState('');const [busy,setBusy]=useState(false);
 if(admin)return <Navigate to="/" replace/>;
 const submit=async e=>{e.preventDefault();setBusy(true);setError('');try{await login(email,password);nav('/');}catch(err){setError(err.response?.data?.message||'Unable to sign in. Check the API connection.');}finally{setBusy(false);}};
 return <div className="login-page"><div className="login-card"><div className="login-brand"><div className="brand-mark"><BookOpen/></div><div><h1>BookNest</h1><p>LIBRARY ADMINISTRATION</p></div></div><h2>Welcome back</h2><p className="muted">Sign in to manage your library.</p>{error&&<div className="notice error">{error}</div>}<form onSubmit={submit}><label className="field"><span>Email address</span><div className="input-icon"><Mail/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="username" placeholder="admin@booknest.com"/></div></label><label className="field"><span>Password</span><div className="input-icon"><LockKeyhole/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password" placeholder="Enter your password"/></div></label><button className="btn primary full" disabled={busy}>{busy?'Signing in…':'Sign in to dashboard'}</button></form><small className="login-note">Admin access only · Credentials are created during backend setup.</small></div></div>;
}
