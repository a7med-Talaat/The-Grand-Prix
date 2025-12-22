'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button';

export default function UsersPage() {
    const { user, token } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null); // For details modal
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        if (user.role !== 'admin') {
            router.push('/dashboard');
            return;
        }

        fetchUsers();
    }, [user, router]);

    const fetchUsers = async () => {
        try {
            const data = await api.get('/users', token);
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

        try {
            await api.delete(`/users/${id}`, token);
            setUsers(users.filter(u => u.id !== id));
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    const handleStatusChange = async (id, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'banned' : 'active';
        const action = newStatus === 'banned' ? 'ban' : 'unban';

        if (!confirm(`Are you sure you want to ${action} this user?`)) return;

        try {
            await api.patch(`/users/${id}/status`, { status: newStatus }, token);
            // Updating local state
            setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
        } catch (err) {
            alert(`Failed to ${action} user`);
        }
    };

    if (loading) return <div className="text-center py-20 text-white">Loading Grid...</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12 min-h-screen">
            <div className="flex justify-between items-center mb-10">
                <h1 className="text-4xl font-black italic text-white uppercase">
                    User Management
                </h1>
                <Button onClick={() => router.push('/dashboard')}>
                    Back to Dashboard
                </Button>
            </div>

            <div className="bg-carbon rounded-lg border border-gray-800 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-f1-black text-gray-400 uppercase text-xs">
                        <tr>
                            <th className="px-6 py-4">ID</th>
                            <th className="px-6 py-4">Username</th>
                            <th className="px-6 py-4">Country</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800 text-gray-300">
                        {users.map((u) => (
                            <tr key={u.id} className="hover:bg-gray-800/50 transition-colors">
                                <td className="px-6 py-4 font-mono text-sm">{u.id}</td>
                                <td className="px-6 py-4 font-bold text-white">{u.username}</td>
                                <td className="px-6 py-4">{u.country}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.role === 'admin' ? 'bg-f1-red text-white' : 'bg-blue-600 text-white'}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${u.status === 'banned' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                                        {u.status || 'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <button
                                        onClick={() => setSelectedUser(u)}
                                        className="text-blue-400 hover:text-blue-300 font-bold text-xs uppercase"
                                    >
                                        Details
                                    </button>

                                    {u.role !== 'admin' && (
                                        <>
                                            <button
                                                onClick={() => handleStatusChange(u.id, u.status || 'active')}
                                                className={`${u.status === 'banned' ? 'text-green-500 hover:text-green-400' : 'text-yellow-500 hover:text-yellow-400'} font-bold text-xs uppercase`}
                                            >
                                                {u.status === 'banned' ? 'Unban' : 'Ban'}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(u.id)}
                                                className="text-red-500 hover:text-red-400 font-bold text-xs uppercase"
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedUser && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
                    <div className="bg-carbon border border-gray-700 rounded-lg p-8 max-w-lg w-full relative">
                        <button
                            onClick={() => setSelectedUser(null)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-white"
                        >
                            ✕
                        </button>
                        <h2 className="text-2xl font-bold text-white mb-6 uppercase italic">User Details</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">ID</label>
                                <div className="text-white font-mono">{selectedUser.id}</div>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Username</label>
                                <div className="text-white font-bold text-xl">{selectedUser.username}</div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs uppercase text-gray-500 mb-1">Country</label>
                                    <div className="text-gray-300">{selectedUser.country}</div>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase text-gray-500 mb-1">Role</label>
                                    <div className="text-gray-300 uppercase">{selectedUser.role}</div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Status</label>
                                <div className="text-gray-300 uppercase">{selectedUser.status || 'Active'}</div>
                            </div>
                            <div>
                                <label className="block text-xs uppercase text-gray-500 mb-1">Created At</label>
                                <div className="text-gray-300 font-mono text-sm">{selectedUser.created_at || 'N/A'}</div>
                            </div>
                            <div className="pt-4 border-t border-gray-800">
                                <label className="block text-xs uppercase text-f1-red mb-1">Encrypted Password</label>
                                <div className="bg-black/50 p-2 rounded border border-gray-800 text-gray-500 font-mono text-xs break-all">
                                    {selectedUser.password}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
