import { useState } from 'react';
import { UserPlus, User, Mail, Phone, MessageSquare, Loader2 } from 'lucide-react';

const ContactForm = ({ onContactAdded }) => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        else if (formData.name.length < 2) newErrors.name = 'Name too short';

        if (!formData.email.trim()) newErrors.email = 'Email address required';
        else if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';

        if (!formData.phone.trim()) newErrors.phone = 'Phone number required';
        else if (!/^[0-9]{10}$/.test(formData.phone)) newErrors.phone = 'Must be 10 digits';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            const res = await fetch(`${API_URL}/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setShowSuccess(true);
                setFormData({ name: '', email: '', phone: '', message: '' });
                if (onContactAdded) onContactAdded(data.data);
                setTimeout(() => setShowSuccess(false), 3000);
            } else {
                setErrors({ general: data.message || 'Submission failed' });
            }
        } catch (err) {
            setErrors({ general: 'Network error occurred' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-[#0f172a]/60 backdrop-blur-md border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-800/60 bg-slate-900/30">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-500/10 rounded-lg">
                        <UserPlus className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">New Entry</h2>
                        <p className="text-xs text-slate-400">Add details to directory</p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {showSuccess && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        Successfully added to database
                    </div>
                )}

                {errors.general && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg text-sm">
                        {errors.general}
                    </div>
                )}

                {/* Name Field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className={`w-4 h-4 transition-colors ${errors.name ? 'text-red-400' : 'text-slate-500 group-focus-within:text-indigo-400'}`} />
                        </div>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Sarah Connor"
                            className={`w-full bg-slate-900/50 border ${errors.name ? 'border-red-500/50 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'} 
                            rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:ring-4 transition-all duration-200`}
                        />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs ml-1 font-medium">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className={`w-4 h-4 transition-colors ${errors.email ? 'text-red-400' : 'text-slate-500 group-focus-within:text-indigo-400'}`} />
                        </div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="sarah@skynet.com"
                            className={`w-full bg-slate-900/50 border ${errors.email ? 'border-red-500/50 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'} 
                            rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:ring-4 transition-all duration-200`}
                        />
                    </div>
                    {errors.email && <p className="text-red-400 text-xs ml-1 font-medium">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Phone Number</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className={`w-4 h-4 transition-colors ${errors.phone ? 'text-red-400' : 'text-slate-500 group-focus-within:text-indigo-400'}`} />
                        </div>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                            maxLength="10"
                            className={`w-full bg-slate-900/50 border ${errors.phone ? 'border-red-500/50 focus:ring-red-500/20' : 'border-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20'} 
                            rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:ring-4 transition-all duration-200`}
                        />
                    </div>
                    {errors.phone && <p className="text-red-400 text-xs ml-1 font-medium">{errors.phone}</p>}
                </div>

                {/* Message Field */}
                <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider ml-1">Notes (Optional)</label>
                    <div className="relative group">
                        <div className="absolute top-3 left-3 pointer-events-none">
                            <MessageSquare className="w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
                        </div>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Additional context..."
                            className="w-full bg-slate-900/50 border border-slate-800 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-medium py-3 rounded-lg shadow-lg shadow-indigo-500/20 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Create Record'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;