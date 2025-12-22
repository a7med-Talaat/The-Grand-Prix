'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

import TicketModal from '@/components/TicketModal';

export default function DashboardPage() {
    const { user, token } = useAuth();
    const [meetups, setMeetups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        fetchMeetups();
    }, [user]);

    const fetchMeetups = async () => {
        try {
            const data = await api.get('/meetups', token);
            setMeetups(data);
        } catch (err) {
            console.error('Dashboard error:', err);
            if (err.message && (err.message.includes('Invalid token') || err.message.includes('jwt') || err.message.includes('401') || err.message.includes('403'))) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                router.push('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await api.patch(`/meetups/${id}`, { status }, token);
            // Optimistic update or refetch
            fetchMeetups();
        } catch (err) {
            alert('Failed to update status');
        }
    };

    const totalMeetups = meetups.length;
    const pendingMeetups = meetups.filter(m => m.status === 'Pending').length;
    const approvedMeetups = meetups.filter(m => m.status === 'Approved').length;

    if (loading) return <div className="text-center py-20 text-white font-tech animate-pulse">Loading Telemetry...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
            <TicketModal meetup={selectedTicket} onClose={() => setSelectedTicket(null)} />

            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-black italic text-white uppercase font-tech">
                    {user?.role === 'admin' ? 'Race Control' : 'My Paddock'}
                </h1>
                <div className="flex gap-4 items-center">
                    <div className="px-4 py-2 bg-carbon border border-gray-700 rounded text-gray-300 text-sm flex gap-3 items-center">
                        <div>
                            Logged in as: <span className="font-bold text-white">{user?.username}</span> ({user?.role})
                        </div>
                        <div className="h-4 w-[1px] bg-gray-600"></div>
                        <button
                            onClick={() => router.push('/dashboard/license')}
                            className="text-xs text-f1-red hover:text-white uppercase font-bold tracking-wider transition-colors"
                        >
                            View License
                        </button>
                    </div>
                    {user?.role === 'admin' && (
                        <Button onClick={() => router.push('/dashboard/users')}>
                            Manage Users
                        </Button>
                    )}
                </div>
            </div>

            {/* Admin Analytics Overview */}
            {user?.role === 'admin' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="p-6 bg-carbon rounded-lg border border-gray-800 shadow-lg">
                        <div className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-2">Total Requests</div>
                        <div className="text-4xl font-black text-white font-tech">{totalMeetups}</div>
                    </div>
                    <div className="p-6 bg-carbon rounded-lg border border-gray-800 shadow-lg border-l-4 border-l-yellow-500">
                        <div className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-2">Pending Action</div>
                        <div className="text-4xl font-black text-white font-tech">{pendingMeetups}</div>
                    </div>
                    <div className="p-6 bg-carbon rounded-lg border border-gray-800 shadow-lg border-l-4 border-l-f1-red">
                        <div className="text-gray-400 text-sm uppercase font-bold tracking-widest mb-2">Approved Sessions</div>
                        <div className="text-4xl font-black text-white font-tech">{approvedMeetups}</div>
                    </div>
                </div>
            )}

            {/* Admin Actions Bar */}
            {user?.role === 'admin' && (
                <div className="flex flex-wrap gap-4 mb-8">
                    <Button onClick={() => router.push('/dashboard/users')} className="bg-gray-700 hover:bg-gray-600">
                        Manage Users
                    </Button>
                    <Button onClick={() => router.push('/dashboard/strategies')} className="bg-f1-red hover:bg-red-700">
                        Manage Race Strategies
                    </Button>
                </div>
            )}

            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-4 italic font-tech uppercase border-b border-gray-800 pb-2">
                    {user?.role === 'admin' ? 'Latest Meetup Requests' : 'My Scheduled Meetups'}
                </h2>
            </div>

            {meetups.length === 0 ? (
                <div className="text-center py-12 bg-carbon rounded-lg border border-gray-800">
                    <h3 className="text-xl text-gray-400 mb-4">No meetups scheduled yet.</h3>
                    <Button onClick={() => router.push('/teams')}>Explore Teams</Button>
                </div>
            ) : (
                <div className="bg-carbon rounded-lg border border-gray-800 overflow-hidden shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/50 text-gray-400 uppercase text-xs font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4">Team</th>
                                    <th className="px-6 py-4">Date</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Type</th>
                                    {user?.role === 'admin' && <th className="px-6 py-4">User</th>}
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800 text-gray-300">
                                {meetups.map((meetup) => (
                                    <tr key={meetup.id} className="hover:bg-gray-800/30 transition-colors">
                                        <td className="px-6 py-4 font-bold text-white font-tech">{meetup.teamName}</td>
                                        <td className="px-6 py-4">{meetup.date}</td>
                                        <td className="px-6 py-4">{meetup.location}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${meetup.type === 'Offline' ? 'bg-f1-red text-white' : 'bg-blue-900 text-blue-100'}`}>
                                                {meetup.type}
                                            </span>
                                        </td>
                                        {user?.role === 'admin' && <td className="px-6 py-4">{meetup.author}</td>}
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest
                                ${meetup.status === 'Approved' ? 'bg-green-900 text-green-100 border border-green-700' :
                                                        meetup.status === 'Rejected' ? 'bg-red-900 text-red-100 border border-red-700' : 'bg-yellow-900 text-yellow-100 border border-yellow-700'}`}>
                                                    {meetup.status}
                                                </span>

                                                {meetup.status === 'Approved' && (
                                                    <button
                                                        onClick={() => setSelectedTicket(meetup)}
                                                        className="text-f1-red text-[10px] font-bold uppercase tracking-widest border border-f1-red/50 px-2 py-1 rounded hover:bg-f1-red hover:text-white transition-all shadow-[0_0_10px_rgba(255,24,1,0.2)] animate-pulse"
                                                    >
                                                        View Ticket
                                                    </button>
                                                )}
                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-right space-x-2">
                                            {user?.role === 'admin' ? (
                                                meetup.status === 'Pending' && (
                                                    <>
                                                        <button
                                                            onClick={() => handleStatusUpdate(meetup.id, 'Approved')}
                                                            className="text-green-500 hover:text-green-400 font-bold text-xs uppercase transition-colors"
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(meetup.id, 'Rejected')}
                                                            className="text-red-500 hover:text-red-400 font-bold text-xs uppercase transition-colors"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                )
                                            ) : (
                                                <span className="text-gray-600 text-[10px] italic">No actions pending</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

