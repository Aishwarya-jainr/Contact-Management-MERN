import { useState } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import { LayoutDashboard, Github, Bell } from 'lucide-react';

function App() {
    const [newContact, setNewContact] = useState(null);

    const handleContactAdded = (contact) => {
        setNewContact(contact);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-indigo-500/30">

            {/* Background Atmosphere */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]" />
                <div className="absolute top-[20%] right-[20%] w-[300px] h-[300px] bg-slate-800/20 rounded-full blur-[80px]" />
            </div>

            {/* Navbar */}
            <nav className="relative z-50 border-b border-slate-800/60 bg-[#020617]/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
                            <LayoutDashboard className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white">ContactFlow</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-slate-400 hover:text-white transition-colors">
                            <Bell className="w-5 h-5" />
                        </button>
                        <a href="#" className="p-2 text-slate-400 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                        <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700"></div>
                    </div>
                </div>
            </nav>

            {/* Main Content Dashboard */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                    {/* Left Column: Form (Sticky on Desktop) */}
                    <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
                        <div className="mb-2">
                            <h1 className="text-3xl font-bold text-white mb-2">Manage Directory</h1>
                            <p className="text-slate-400 text-sm">Add new connections or manage existing network records.</p>
                        </div>
                        <ContactForm onContactAdded={handleContactAdded} />
                    </div>

                    {/* Right Column: List & Stats */}
                    <div className="lg:col-span-8 w-full">
                        <ContactList newContact={newContact} />
                    </div>

                </div>
            </main>
        </div>
    );
}

export default App;