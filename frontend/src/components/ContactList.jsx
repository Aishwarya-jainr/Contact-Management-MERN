import { useState, useEffect } from 'react';
import { Search, Trash2, Mail, Phone, Calendar, ArrowUpDown, Filter, MoreVertical } from 'lucide-react';

const ContactList = ({ newContact }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('-createdAt');
    const [searchQuery, setSearchQuery] = useState('');

    // Fetch contacts (Logic kept same)
    const fetchContacts = async () => {
        setLoading(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            const res = await fetch(`${API_URL}/contacts?sort=${sortBy}`);
            const data = await res.json();
            if (res.ok && data.success) setContacts(data.data);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const handleDelete = async (id) => {
        if (!confirm('Permanently delete this record?')) return;
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            await fetch(`${API_URL}/contacts/${id}`, { method: 'DELETE' });
            setContacts(prev => prev.filter(c => c._id !== id));
        } catch (err) { alert('Delete failed'); }
    };

    useEffect(() => { fetchContacts(); }, [sortBy]);
    useEffect(() => { if (newContact) setContacts(prev => [newContact, ...prev]); }, [newContact]);

    // Simple client-side search filter
    const filteredContacts = contacts.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">

            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#0f172a]/60 backdrop-blur-md p-2 rounded-xl border border-slate-800">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search records..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-slate-900 border-none rounded-lg pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:ring-2 focus:ring-indigo-500/50 outline-none"
                    />
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full sm:w-auto appearance-none bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium pl-4 pr-10 py-2.5 rounded-lg cursor-pointer transition-colors border border-transparent focus:border-indigo-500 outline-none"
                        >
                            <option value="-createdAt">Newest First</option>
                            <option value="createdAt">Oldest First</option>
                            <option value="name">Name (A-Z)</option>
                        </select>
                        <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-500 pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Loading State */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-40 bg-slate-800/40 rounded-xl animate-pulse border border-slate-800" />
                    ))}
                </div>
            ) : filteredContacts.length === 0 ? (
                <div className="text-center py-16 bg-slate-900/30 border border-dashed border-slate-800 rounded-2xl">
                    <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Filter className="w-6 h-6 text-slate-500" />
                    </div>
                    <h3 className="text-white font-medium">No records found</h3>
                    <p className="text-slate-500 text-sm mt-1">Try adjusting your search or add a new contact.</p>
                </div>
            ) : (
                /* Contact Grid */
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredContacts.map((contact) => (
                        <div key={contact._id} className="group relative bg-[#0f172a]/80 hover:bg-[#1e293b]/80 border border-slate-800 hover:border-indigo-500/30 rounded-xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/5">

                            {/* Card Header */}
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white font-bold shadow-inner">
                                        {contact.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold truncate max-w-[150px]">{contact.name}</h3>
                                        <p className="text-xs text-slate-400 flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {new Date(contact.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDelete(contact._id)}
                                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Info Rows */}
                            <div className="space-y-3 border-t border-slate-800/80 pt-4">
                                <a href={`mailto:${contact.email}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                                    <div className="w-6 h-6 rounded bg-slate-800/50 flex items-center justify-center">
                                        <Mail className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="truncate">{contact.email}</span>
                                </a>
                                <a href={`tel:${contact.phone}`} className="flex items-center gap-3 text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                                    <div className="w-6 h-6 rounded bg-slate-800/50 flex items-center justify-center">
                                        <Phone className="w-3.5 h-3.5" />
                                    </div>
                                    <span className="truncate">{contact.phone}</span>
                                </a>
                            </div>

                            {/* Optional Message Preview */}
                            {contact.message && (
                                <div className="mt-4 px-3 py-2 bg-slate-900/50 rounded border border-slate-800/50">
                                    <p className="text-xs text-slate-500 italic line-clamp-2">"{contact.message}"</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContactList;