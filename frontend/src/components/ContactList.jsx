import { useState, useEffect } from 'react';
import { Trash2, Mail, Phone, User, MessageSquare, Calendar, ArrowUpDown } from 'lucide-react';

const ContactList = ({ newContact }) => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [sortBy, setSortBy] = useState('-createdAt');

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${API_URL}/contacts?sort=${sortBy}`);
            const data = await response.json();

            if (response.ok && data.success) {
                setContacts(data.data);
                setError('');
            } else {
                setError(data.message || 'Failed to fetch contacts');
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this contact?')) {
            return;
        }

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${API_URL}/contacts/${id}`, {
                method: 'DELETE',
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setContacts(prev => prev.filter(contact => contact._id !== id));
            } else {
                alert(data.message || 'Failed to delete contact');
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
            alert('Network error. Please try again.');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    useEffect(() => {
        fetchContacts();
    }, [sortBy]);

    useEffect(() => {
        if (newContact) {
            setContacts(prev => [newContact, ...prev]);
        }
    }, [newContact]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-green-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white/90 mb-2">Saved Contacts</h2>
                    <p className="text-gray-400">
                        {contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'} found
                    </p>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none px-6 py-3 pr-12 bg-gray-900 border-0 rounded-full text-white text-sm font-medium
              shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50
              cursor-pointer transition-all duration-300"
                    >
                        <option value="-createdAt">Newest First</option>
                        <option value="createdAt">Oldest First</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="-name">Name (Z-A)</option>
                    </select>
                    <ArrowUpDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="backdrop-blur-sm bg-red-500/10 border border-red-500/50 rounded-2xl p-4 mb-6">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            {/* Contact Cards */}
            {contacts.length === 0 ? (
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-green-500/5 rounded-3xl blur-2xl"></div>
                    <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-12 text-center">
                        <div className="w-20 h-20 bg-gray-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]">
                            <User className="w-10 h-10 text-gray-600" />
                        </div>
                        <h3 className="text-xl font-semibold text-white/90 mb-2">No contacts yet</h3>
                        <p className="text-gray-400">Submit the form above to add your first contact.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contacts.map((contact) => (
                        <div
                            key={contact._id}
                            className="group relative"
                        >
                            {/* Glow effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Glass card */}
                            <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                                {/* Header with Name and Delete Button */}
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500/30 to-green-500/30 rounded-xl flex items-center justify-center">
                                            <User className="w-5 h-5 text-emerald-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold text-white/90 line-clamp-1">{contact.name}</h3>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(contact._id)}
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-red-500/20 rounded-lg"
                                        title="Delete contact"
                                    >
                                        <Trash2 className="w-4 h-4 text-red-400" />
                                    </button>
                                </div>

                                {/* Contact Details */}
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <Mail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                        <span className="text-sm break-all">{contact.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-300">
                                        <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                        <span className="text-sm">{contact.phone}</span>
                                    </div>
                                    {contact.message && (
                                        <div className="flex items-start gap-3 text-gray-300 pt-2 border-t border-white/5">
                                            <MessageSquare className="w-4 h-4 text-gray-500 flex-shrink-0 mt-1" />
                                            <p className="text-sm line-clamp-3">{contact.message}</p>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 text-gray-500 pt-2 border-t border-white/5">
                                        <Calendar className="w-4 h-4 flex-shrink-0" />
                                        <span className="text-xs">{formatDate(contact.createdAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ContactList;
