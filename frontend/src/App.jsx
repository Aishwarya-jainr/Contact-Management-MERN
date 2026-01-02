import { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { Mail, Phone, MapPin } from 'lucide-react';

function App() {
    const [newContact, setNewContact] = useState(null);

    const handleContactAdded = (contact) => {
        setNewContact(contact);
    };

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Animated green glow effects in background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-emerald-500/20 rounded-full blur-[128px] animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-green-500/20 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]"></div>
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"></div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Header */}
                <header className="mb-12 lg:mb-16">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                        <span className="text-emerald-400 text-sm font-medium tracking-wider uppercase">Contact Management</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white/90 tracking-tight">
                        Modern Contact Portal
                    </h1>
                </header>

                {/* Main Grid */}
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                    {/* Left Side - Contact Info */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/90 mb-4">
                                Get in touch
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                Have questions or ready to connect? Reach out to us through the form or use any of the contact methods below.
                            </p>
                        </div>

                        {/* Contact Cards */}
                        <div className="space-y-4">
                            {/* Email Card */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                            <Mail className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white/90 font-semibold mb-1">Email Us</h3>
                                            <p className="text-gray-400 text-sm">contact@example.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Phone Card */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                            <Phone className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white/90 font-semibold mb-1">Call Us</h3>
                                            <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Location Card */}
                            <div className="group relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                                            <MapPin className="w-6 h-6 text-emerald-400" />
                                        </div>
                                        <div>
                                            <h3 className="text-white/90 font-semibold mb-1">Visit Us</h3>
                                            <p className="text-gray-400 text-sm">123 Business Street, San Francisco, CA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Contact Form */}
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-green-500/10 rounded-3xl blur-2xl"></div>
                        <div className="relative backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 lg:p-10">
                            <ContactForm onContactAdded={handleContactAdded} />
                        </div>
                    </div>
                </div>

                {/* Contact List Below */}
                <ContactList newContact={newContact} />
            </div>
        </div>
    );
}

export default App;
