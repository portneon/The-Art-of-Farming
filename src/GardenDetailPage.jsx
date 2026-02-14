import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf, Loader2, AlertCircle, Settings } from 'lucide-react';
import PlantStatusCard from './components/PlantStatusCard';
import GardenEditSidebar from './components/GardenEditSidebar';

const GardenDetailPage = () => {
    const { gardenId } = useParams();
    const navigate = useNavigate();

    const [garden, setGarden] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        fetchGardenDetails();
    }, [gardenId]);

    const fetchGardenDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/gardens/${gardenId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch garden details');
            }

            const data = await response.json();
            console.log('Garden data:', data.data);
            setGarden(data.data);
        } catch (err) {
            console.error('Error fetching garden:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGardenUpdate = (updatedGarden) => {
        setGarden({ ...garden, ...updatedGarden });
    };

    const handleGardenDelete = () => {
        navigate('/dashboard');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F5F0] flex items-center justify-center pt-24">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-[#1A2F1C]" size={40} />
                    <p className="font-mono text-xs uppercase tracking-widest text-[#1A2F1C]/60">
                        Loading Garden...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !garden) {
        return (
            <div className="min-h-screen bg-[#F4F5F0] flex items-center justify-center pt-24">
                <div className="text-center max-w-md px-4">
                    <AlertCircle className="mx-auto mb-4 text-[#C77D63]" size={48} />
                    <h2 className="font-serif text-3xl text-[#1A2F1C] mb-2">Garden Not Found</h2>
                    <p className="text-[#1A2F1C]/60 mb-6">{error || 'This garden doesn\'t exist'}</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-[#1A2F1C] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F4F5F0] pt-24 pb-20">
            <div className="flex">
                {/* Main Content */}
                <div className="flex-1 px-6 md:px-12 lg:px-20">
                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="flex items-center gap-2 text-[#1A2F1C]/60 hover:text-[#1A2F1C] mb-4 font-sans text-sm transition-colors group"
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Dashboard
                            </button>

                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h1 className="font-serif text-5xl md:text-6xl text-[#1A2F1C] mb-3">
                                        {garden.name}
                                    </h1>
                                    {garden.description && (
                                        <p className="font-sans text-lg text-[#1A2F1C]/60 max-w-2xl">
                                            {garden.description}
                                        </p>
                                    )}
                                    <div className="flex items-center gap-4 mt-4">
                                        <div className="bg-white px-4 py-2 rounded-full border border-[#1A2F1C]/10">
                                            <span className="font-mono text-xs uppercase tracking-widest text-[#1A2F1C]/60">
                                                {garden.plantCount} {garden.plantCount === 1 ? 'Plant' : 'Plants'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Edit Button */}
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="bg-[#1A2F1C] text-white px-4 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors flex items-center gap-2"
                                >
                                    <Settings size={16} />
                                    <span className="hidden sm:inline">Edit Garden</span>
                                </button>
                            </div>
                        </div>

                        {/* Plants Grid */}
                        {garden.plants && garden.plants.length > 0 ? (
                            <div>
                                <h2 className="font-serif text-3xl text-[#1A2F1C] mb-6">Plants in this Garden</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {garden.plants.map((plant) => (
                                        <PlantStatusCard key={plant.id} plant={plant} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white/50 rounded-xl border-2 border-dashed border-[#1A2F1C]/10">
                                <Leaf className="mx-auto mb-4 text-[#1A2F1C]/20" size={64} />
                                <h3 className="font-serif text-2xl text-[#1A2F1C]/60 mb-2">
                                    No plants yet
                                </h3>
                                <p className="text-[#1A2F1C]/40 font-sans mb-6">
                                    This garden is waiting for its first plant
                                </p>
                                <button
                                    onClick={() => navigate('/plants')}
                                    className="bg-[#1A2F1C] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors"
                                >
                                    Browse Plant Catalog
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Edit Sidebar */}
                {garden && (
                    <GardenEditSidebar
                        garden={garden}
                        isOpen={sidebarOpen}
                        onClose={() => setSidebarOpen(false)}
                        onUpdate={handleGardenUpdate}
                        onDelete={handleGardenDelete}
                    />
                )}
            </div>
        </div>
    );
};

export default GardenDetailPage;
