import {useEffect,useState} from 'react';
import {Book,Users,BookCheck,BookCopy,RotateCcw,Clock3,ArrowUpRight} from 'lucide-react';
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid} from 'recharts';
import api from '../services/api';
import {PageHeader,StatCard,DataTable,Spinner} from '../components/UI';
export default function Dashboard(){const [data,setData]=useState(null);const [error,setError]=useState('');
 useEffect(()=>{api.get('/dashboard').then(r=>setData(r.data)).catch(e=>setError(e.response?.data?.message||'Could not load dashboard.'));},[]);
 if(!data&&!error)return <Spinner/>;
 if(error)return <div className="notice error">{error}</div>;
 const s=data.stats;
 return <><PageHeader title="Dashboard" subtitle="A clear overview of your library operations."/>
 <div className="stats-grid"><StatCard label="Book Titles" value={s.totalBooks} icon={Book}/><StatCard label="Registered Members" value={s.totalMembers} icon={Users} tone="blue"/><StatCard label="Available Copies" value={s.availableCopies} icon={BookCheck} tone="teal"/><StatCard label="Issued Books" value={s.issuedBooks} icon={BookCopy} tone="amber"/><StatCard label="Returned Books" value={s.returnedBooks} icon={RotateCcw} tone="violet"/><StatCard label="Overdue Books" value={s.overdueBooks} icon={Clock3} tone="red"/></div>
 <div className="dashboard-grid"><section className="panel chart-panel"><div className="panel-head"><div><h2>Borrowing activity</h2><p>Monthly issued books</p></div><span className="soft-tag">Last 12 months</span></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={data.monthly}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="month" tick={{fontSize:11}}/><YAxis allowDecimals={false} tick={{fontSize:11}}/><Tooltip/><Bar dataKey="total" fill="#3c8272" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></section>
 <section className="panel"><div className="panel-head"><div><h2>Book categories</h2><p>Titles by category</p></div></div>{data.categories.map(c=><div className="category-row" key={c.name}><span>{c.name}</span><b>{c.bookTitles}</b></div>)}</section></div>
 <section className="panel"><div className="panel-head"><div><h2>Recent borrowing activity</h2><p>Latest circulation records</p></div></div><DataTable rows={data.recent} columns={[{key:'book_title',label:'Book',render:r=><b>{r.title}</b>},{key:'memberName',label:'Member'},{key:'issueDate',label:'Issue date'},{key:'dueDate',label:'Due date'},{key:'status',label:'Status',render:r=><span className={`status ${r.status}`}>{r.status}</span>} ]}/></section>
 <section className="panel"><div className="panel-head"><div><h2>Recently added books</h2><p>Latest additions to the catalogue</p></div></div><div className="recent-books">{data.recentBooks.map(b=><div key={b.id}><div className="book-mini"><Book/></div><span><b>{b.title}</b><small>{b.author}</small></span><ArrowUpRight size={16}/></div>)}</div></section></>;
}
