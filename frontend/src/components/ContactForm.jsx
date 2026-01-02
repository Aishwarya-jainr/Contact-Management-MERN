import { useState } from 'react';
import { Send } from 'lucide-react';

const ContactForm = ({ onContactAdded }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^[0-9]{10}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid 10-digit phone number';
        }

        if (formData.message.length > 500) {
            newErrors.message = 'Message cannot exceed 500 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setSuccessMessage('');

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
            const response = await fetch(`${API_URL}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSuccessMessage('Contact saved successfully!');

                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    message: ''
                });

                if (onContactAdded) {
                    onContactAdded(data.data);
                }

                setTimeout(() => setSuccessMessage(''), 3000);
            } else {
                if (data.errors) {
                    const backendErrors = {};
                    data.errors.forEach(err => {
                        backendErrors[err.field] = err.message;
                    });
                    setErrors(backendErrors);
                } else {
                    setErrors({ general: data.message || 'Failed to save contact' });
                }
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors({ general: 'Network error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = formData.name.trim() &&
        formData.email.trim() &&
        formData.phone.trim() &&
        Object.keys(errors).length === 0;

    return (
        <div className="w-full">
            <div className="mb-8">
                <h3 className="text-2xl font-bold text-white/90 mb-2">Send us a message</h3>
                <p className="text-gray-400 text-sm">Fill out the form below and we'll get back to you shortly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Success Message */}
                {successMessage && (
                    <div className="relative backdrop-blur-sm bg-emerald-500/10 border border-emerald-500/50 rounded-2xl p-4">
                        <p className="text-emerald-400 text-sm font-medium">{successMessage}</p>
                    </div>
                )}

                {/* General Error */}
                {errors.general && (
                    <div className="relative backdrop-blur-sm bg-red-500/10 border border-red-500/50 rounded-2xl p-4">
                        <p className="text-red-400 text-sm font-medium">{errors.general}</p>
                    </div>
                )}

                {/* Name Field */}
                <div className="space-y-2">
                    <label className="text-white/70 text-sm font-medium">Name *</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className={`w-full px-5 py-4 bg-gray-900 border-0 rounded-xl text-white placeholder-gray-500 
              shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)]
              transition-all duration-300 ${errors.name ? 'ring-2 ring-red-500/50' : ''}`}
                    />
                    {errors.name && (
                        <p className="text-red-400 text-xs ml-1">{errors.name}</p>
                    )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                    <label className="text-white/70 text-sm font-medium">Email *</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className={`w-full px-5 py-4 bg-gray-900 border-0 rounded-xl text-white placeholder-gray-500 
              shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)]
              transition-all duration-300 ${errors.email ? 'ring-2 ring-red-500/50' : ''}`}
                    />
                    {errors.email && (
                        <p className="text-red-400 text-xs ml-1">{errors.email}</p>
                    )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                    <label className="text-white/70 text-sm font-medium">Phone *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="1234567890"
                        maxLength="10"
                        className={`w-full px-5 py-4 bg-gray-900 border-0 rounded-xl text-white placeholder-gray-500 
              shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)]
              transition-all duration-300 ${errors.phone ? 'ring-2 ring-red-500/50' : ''}`}
                    />
                    {errors.phone && (
                        <p className="text-red-400 text-xs ml-1">{errors.phone}</p>
                    )}
                </div>

                {/* Message Field */}
                <div className="space-y-2">
                    <label className="text-white/70 text-sm font-medium">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message here..."
                        rows="4"
                        maxLength="500"
                        className={`w-full px-5 py-4 bg-gray-900 border-0 rounded-xl text-white placeholder-gray-500 
              shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]
              focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:shadow-[0_0_20px_rgba(16,185,129,0.2)]
              transition-all duration-300 resize-none ${errors.message ? 'ring-2 ring-red-500/50' : ''}`}
                    />
                    <div className="flex justify-between items-center px-1">
                        {errors.message ? (
                            <p className="text-red-400 text-xs">{errors.message}</p>
                        ) : (
                            <span></span>
                        )}
                        <span className="text-gray-500 text-xs">{formData.message.length}/500</span>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={!isFormValid || isSubmitting}
                    className={`group relative w-full py-4 rounded-full font-semibold text-base transition-all duration-300 
            ${isFormValid && !isSubmitting
                            ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] hover:scale-[1.02] active:scale-[0.98]'
                            : 'bg-gray-800 text-gray-500 cursor-not-allowed'
                        }`}
                >
                    <span className="flex items-center justify-center gap-2">
                        {isSubmitting ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                Submit
                                <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </span>
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
