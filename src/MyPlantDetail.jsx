import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft, Leaf, Calendar, Droplet, Sprout, Stethoscope,
    MapPin, Heart, FileText, Share2, Edit2, Save, X, Loader2,
    AlertCircle, Clock
} from 'lucide-react';

const MyPlantDetail = () => {
    const { plantId } = useParams();
    const navigate = useNavigate();

    const [plant, setPlant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({});

    useEffect(() => {
        fetchPlantDetails();
    }, [plantId]);

    const fetchPlantDetails = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/plants/my/${plantId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            if (!response.ok) {
                throw new Error('Failed to fetch plant details');
            }

            const data = await response.json();
            setPlant(data.data);
            setEditData({
                nickname: data.data.nickname || '',
                location: data.data.location || '',
                notes: data.data.notes || ''
            });
        } catch (err) {
            console.error('Error:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/plants/my/${plantId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify(editData)
                }
            );

            if (!response.ok) throw new Error('Failed to update plant');

            await fetchPlantDetails();
            setIsEditing(false);
        } catch (err) {
            console.error('Error updating plant:', err);
        }
    };

    const exportForBotanist = () => {
        if (!plant) return;

        const report = `
PLANT REPORT
============

Plant: ${plant.nickname || plant.species?.commonName || 'Unnamed Plant'}
Species: ${plant.species?.scientificName || 'Unknown'} (${plant.species?.commonName || 'Unknown'})
Family: ${plant.species?.family || 'Unknown'}

GARDEN INFORMATION
------------------
Garden: ${plant.garden?.name || 'No garden assigned'}
Location: ${plant.location || 'Not specified'}
Days in Garden: ${plant.daysInGarden} days
Planted: ${new Date(plant.plantedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}

CURRENT STATUS
--------------
Health: ${plant.healthStatus || 'Unknown'}
${plant.careHistory.lastWatered ? `Last Watered: ${new Date(plant.careHistory.lastWatered).toLocaleDateString()} (${plant.careHistory.daysSinceWatered} days ago)` : 'Last Watered: Never'}
${plant.careHistory.lastFertilized ? `Last Fertilized: ${new Date(plant.careHistory.lastFertilized).toLocaleDateString()} (${plant.careHistory.daysSinceFertilized} days ago)` : 'Last Fertilized: Never'}

BOTANIST CONSULTATION
---------------------
${plant.careHistory.botanistVisitDate ? `Last Visit: ${new Date(plant.careHistory.botanistVisitDate).toLocaleDateString()} (${plant.careHistory.daysSinceBotanistVisit} days ago)` : 'Last Visit: No consultation recorded'}
${plant.careHistory.botanistAdvice ? `Advice/Medicine: ${plant.careHistory.botanistAdvice}` : 'Advice: None recorded'}

CARE TIMELINE
------------
${plant.timeline.map(event =>
            `${new Date(event.date).toLocaleDateString()} - ${event.note} (${event.daysAgo} days ago)`
        ).join('\n')}

NOTES
-----
${plant.notes || 'No notes'}

SPECIES CARE REQUIREMENTS
-------------------------
Water: ${getCareText(plant.species?.care?.water)}
Light: ${getCareText(plant.species?.care?.light)}
Humidity: ${getCareText(plant.species?.care?.humidity)}
Temperature: ${getCareText(plant.species?.care?.temperature)}

Generated on: ${new Date().toLocaleDateString()}
        `.trim();

        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${plant.nickname || plant.species?.commonName || 'plant'}_report.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const getHealthColor = (status) => {
        switch (status) {
            case 'Good': return '#4A6741';
            case 'NeedsAttention': return '#C77D63';
            case 'Critical': return '#E74C3C';
            default: return '#1A2F1C';
        }
    };

    const getCareStatus = (daysAgo, schedule) => {
        if (!daysAgo && daysAgo !== 0) return { color: '#1A2F1C', label: 'Never' };
        if (daysAgo > schedule) return { color: '#E74C3C', label: 'Overdue' };
        if (daysAgo >= schedule - 1) return { color: '#C77D63', label: 'Due Soon' };
        return { color: '#4A6741', label: 'On Schedule' };
    };

    // Helper to safely display care requirements (handles both string and object formats)
    const getCareText = (careData) => {
        if (!careData) return 'Not specified';
        if (typeof careData === 'string') return careData;
        if (typeof careData === 'object') {
            // Check if it has text and frequency fields
            if (careData.text && careData.frequency) {
                return `${careData.text} - ${careData.frequency}`;
            }
            // If it's just text
            if (careData.text) return careData.text;
            // Otherwise stringify it
            return JSON.stringify(careData);
        }
        return String(careData);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F4F5F0] flex items-center justify-center pt-24">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="animate-spin text-[#1A2F1C]" size={40} />
                    <p className="font-mono text-xs uppercase tracking-widest text-[#1A2F1C]/60">
                        Loading Plant Details...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !plant) {
        return (
            <div className="min-h-screen bg-[#F4F5F0] flex items-center justify-center pt-24">
                <div className="text-center max-w-md px-4">
                    <AlertCircle className="mx-auto mb-4 text-[#C77D63]" size={48} />
                    <h2 className="font-serif text-3xl text-[#1A2F1C] mb-2">Plant Not Found</h2>
                    <p className="text-[#1A2F1C]/60 mb-6">{error || 'This plant doesn\'t exist'}</p>
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

    const waterCareStatus = getCareStatus(plant.careHistory.daysSinceWatered, 3);
    const fertilizeCareStatus = getCareStatus(plant.careHistory.daysSinceFertilized, 14);

    return (
        <div className="min-h-screen bg-[#F4F5F0] pt-24 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                {/* Header */}
                <div className="mb-8">
                    <button
                        onClick={() => plant.garden ? navigate(`/garden/${plant.garden.id}`) : navigate('/dashboard')}
                        className="flex items-center gap-2 text-[#1A2F1C]/60 hover:text-[#1A2F1C] mb-4 font-sans text-sm transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to {plant.garden ? plant.garden.name : 'Dashboard'}
                    </button>

                    <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex-1">
                            {!isEditing ? (
                                <>
                                    <h1 className="font-serif text-5xl md:text-6xl text-[#1A2F1C] mb-2">
                                        {plant.nickname || plant.species?.commonName || 'Unnamed Plant'}
                                    </h1>
                                    <p className="font-sans text-lg text-[#1A2F1C]/60 italic">
                                        {plant.species?.scientificName}
                                    </p>
                                </>
                            ) : (
                                <input
                                    type="text"
                                    value={editData.nickname}
                                    onChange={(e) => setEditData({ ...editData, nickname: e.target.value })}
                                    className="font-serif text-5xl md:text-6xl text-[#1A2F1C] mb-2 bg-white border border-[#1A2F1C]/20 rounded-lg px-4 py-2 w-full"
                                    placeholder={plant.species?.commonName}
                                />
                            )}
                        </div>

                        <div className="flex gap-2">
                            {!isEditing ? (
                                <>
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-[#1A2F1C] text-white px-4 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors flex items-center gap-2"
                                    >
                                        <Edit2 size={16} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={exportForBotanist}
                                        className="bg-[#4A6741] text-white px-4 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1A2F1C] transition-colors flex items-center gap-2"
                                    >
                                        <Share2 size={16} />
                                        Export for Botanist
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setIsEditing(false)}
                                        className="bg-white border-2 border-[#1A2F1C]/20 text-[#1A2F1C] px-4 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1A2F1C]/5 transition-colors"
                                    >
                                        <X size={16} />
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="bg-[#4A6741] text-white px-4 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1A2F1C] transition-colors flex items-center gap-2"
                                    >
                                        <Save size={16} />
                                        Save
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Status Badges */}
                    <div className="flex items-center gap-3 mt-4 flex-wrap">
                        <div
                            className="px-4 py-2 rounded-full text-white font-bold text-xs uppercase tracking-widest"
                            style={{ backgroundColor: getHealthColor(plant.healthStatus) }}
                        >
                            <Heart size={14} className="inline mr-2" />
                            {plant.healthStatus || 'Unknown'}
                        </div>
                        <div className="bg-white px-4 py-2 rounded-full border border-[#1A2F1C]/10">
                            <span className="font-mono text-xs uppercase tracking-widest text-[#1A2F1C]/60">
                                <Calendar size={14} className="inline mr-2" />
                                {plant.daysInGarden} days in garden
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Plant Overview & Species Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Plant Overview */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1A2F1C]/5">
                            <h2 className="font-serif text-2xl text-[#1A2F1C] mb-4">Plant Overview</h2>

                            <div className="grid grid-cols-2 gap-4 mb-6">
                                {plant.species?.imageUrl && (
                                    <div className="col-span-2">
                                        <img
                                            src={plant.species.imageUrl}
                                            alt={plant.species.commonName}
                                            className="w-full h-64 object-cover rounded-lg"
                                        />
                                    </div>
                                )}

                                <div>
                                    <div className="text-xs font-mono uppercase tracking-widest text-[#4A6741] mb-1">Family</div>
                                    <div className="text-[#1A2F1C] font-sans">{plant.species?.family || 'Unknown'}</div>
                                </div>

                                <div>
                                    <div className="text-xs font-mono uppercase tracking-widest text-[#4A6741] mb-1">Origin</div>
                                    <div className="text-[#1A2F1C] font-sans">{plant.species?.origin || 'Unknown'}</div>
                                </div>

                                <div>
                                    <div className="text-xs font-mono uppercase tracking-widest text-[#4A6741] mb-1">Location</div>
                                    {!isEditing ? (
                                        <div className="text-[#1A2F1C] font-sans flex items-center gap-2">
                                            <MapPin size={14} />
                                            {plant.location || 'Not specified'}
                                        </div>
                                    ) : (
                                        <input
                                            type="text"
                                            value={editData.location}
                                            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                            className="bg-[#F4F5F0] border border-[#1A2F1C]/20 rounded px-3 py-1 w-full"
                                        />
                                    )}
                                </div>

                                <div>
                                    <div className="text-xs font-mono uppercase tracking-widest text-[#4A6741] mb-1">Planted</div>
                                    <div className="text-[#1A2F1C] font-sans">
                                        {new Date(plant.plantedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>

                            {plant.species?.description && (
                                <div>
                                    <div className="text-xs font-mono uppercase tracking-widest text-[#4A6741] mb-2">About This Species</div>
                                    <p className="text-[#1A2F1C]/70 font-sans text-sm leading-relaxed">
                                        {plant.species.description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Care Requirements */}
                        {plant.species?.care && (
                            <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1A2F1C]/5">
                                <h2 className="font-serif text-2xl text-[#1A2F1C] mb-4">Care Requirements</h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-xs font-mono uppercase tracking-widest text-[#4A6741] mb-2 flex items-center gap-2">
                                            <Droplet size={14} />
                                            Water
                                        </div>
                                        <p className="text-[#1A2F1C]/70 font-sans text-sm">{getCareText(plant.species.care.water)}</p>
                                    </div>

                                    <div>
                                        <div className="text-xs font-mono uppercase tracking-widest text-[#4A6741] mb-2 flex items-center gap-2">
                                            <Leaf size={14} />
                                            Light
                                        </div>
                                        <p className="text-[#1A2F1C]/70 font-sans text-sm">{getCareText(plant.species.care.light)}</p>
                                    </div>

                                    <div>
                                        <div className="text-xs font-mono uppercase tracking-widest text-[#4A6741] mb-2">
                                            Humidity
                                        </div>
                                        <p className="text-[#1A2F1C]/70 font-sans text-sm">{getCareText(plant.species.care.humidity)}</p>
                                    </div>

                                    <div>
                                        <div className="text-xs font-mono uppercase tracking-widest text-[#4A6741] mb-2">
                                            Temperature
                                        </div>
                                        <p className="text-[#1A2F1C]/70 font-sans text-sm">{getCareText(plant.species.care.temperature)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notes */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1A2F1C]/5">
                            <h2 className="font-serif text-2xl text-[#1A2F1C] mb-4 flex items-center gap-2">
                                <FileText size={24} />
                                My Notes
                            </h2>

                            {!isEditing ? (
                                <p className="text-[#1A2F1C]/70 font-sans text-sm leading-relaxed whitespace-pre-wrap">
                                    {plant.notes || 'No notes yet. Click Edit to add your observations.'}
                                </p>
                            ) : (
                                <textarea
                                    value={editData.notes}
                                    onChange={(e) => setEditData({ ...editData, notes: e.target.value })}
                                    className="w-full bg-[#F4F5F0] border border-[#1A2F1C]/20 rounded-lg px-4 py-3 text-[#1A2F1C] font-sans resize-none"
                                    rows={6}
                                    placeholder="Add your observations about this plant..."
                                />
                            )}
                        </div>
                    </div>

                    {/* Right Column - Care Status & Timeline */}
                    <div className="space-y-6">
                        {/* Care Status */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1A2F1C]/5">
                            <h2 className="font-serif text-2xl text-[#1A2F1C] mb-4">Care Status</h2>

                            <div className="space-y-4">
                                {/* Watering */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Droplet size={16} style={{ color: waterCareStatus.color }} />
                                            <span className="text-sm font-mono uppercase tracking-widest text-[#1A2F1C]/60">Watering</span>
                                        </div>
                                        <span
                                            className="text-xs font-bold px-2 py-1 rounded"
                                            style={{ backgroundColor: `${waterCareStatus.color}20`, color: waterCareStatus.color }}
                                        >
                                            {waterCareStatus.label}
                                        </span>
                                    </div>
                                    {plant.careHistory.lastWatered ? (
                                        <div className="text-sm text-[#1A2F1C]/70">
                                            Last watered <strong>{plant.careHistory.daysSinceWatered} days ago</strong>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-[#1A2F1C]/40">Never watered</div>
                                    )}
                                </div>

                                {/* Fertilizing */}
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <Sprout size={16} style={{ color: fertilizeCareStatus.color }} />
                                            <span className="text-sm font-mono uppercase tracking-widest text-[#1A2F1C]/60">Fertilizing</span>
                                        </div>
                                        <span
                                            className="text-xs font-bold px-2 py-1 rounded"
                                            style={{ backgroundColor: `${fertilizeCareStatus.color}20`, color: fertilizeCareStatus.color }}
                                        >
                                            {fertilizeCareStatus.label}
                                        </span>
                                    </div>
                                    {plant.careHistory.lastFertilized ? (
                                        <div className="text-sm text-[#1A2F1C]/70">
                                            Last fertilized <strong>{plant.careHistory.daysSinceFertilized} days ago</strong>
                                        </div>
                                    ) : (
                                        <div className="text-sm text-[#1A2F1C]/40">Never fertilized</div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Botanist Consultation */}
                        {(plant.careHistory.botanistAdvice || plant.careHistory.botanistVisitDate) && (
                            <div className="bg-[#4A6741]/5 rounded-xl p-6 border-2 border-[#4A6741]/20">
                                <h3 className="font-serif text-xl text-[#1A2F1C] mb-3 flex items-center gap-2">
                                    <Stethoscope size={20} className="text-[#4A6741]" />
                                    Botanist Consultation
                                </h3>

                                {plant.careHistory.botanistVisitDate && (
                                    <div className="text-xs font-mono uppercase tracking-widest text-[#4A6741] mb-2">
                                        {plant.careHistory.daysSinceBotanistVisit} days ago
                                    </div>
                                )}

                                {plant.careHistory.botanistAdvice && (
                                    <p className="text-[#1A2F1C]/80 font-sans text-sm leading-relaxed">
                                        {plant.careHistory.botanistAdvice}
                                    </p>
                                )}
                            </div>
                        )}

                        {/* Care Timeline */}
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-[#1A2F1C]/5">
                            <h2 className="font-serif text-2xl text-[#1A2F1C] mb-4">Activity Timeline</h2>

                            <div className="space-y-3">
                                {plant.timeline.map((event, index) => (
                                    <div key={index} className="flex gap-3">
                                        <div className={`mt-1 p-2 rounded-lg ${event.type === 'watered' ? 'bg-blue-100 text-blue-600' :
                                            event.type === 'fertilized' ? 'bg-green-100 text-green-600' :
                                                event.type === 'botanist' ? 'bg-purple-100 text-purple-600' :
                                                    'bg-gray-100 text-gray-600'
                                            }`}>
                                            {event.type === 'watered' && <Droplet size={14} />}
                                            {event.type === 'fertilized' && <Sprout size={14} />}
                                            {event.type === 'botanist' && <Stethoscope size={14} />}
                                            {event.type === 'planted' && <Leaf size={14} />}
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-[#1A2F1C] font-sans font-medium">
                                                {event.note}
                                            </div>
                                            <div className="text-xs text-[#1A2F1C]/50 font-mono flex items-center gap-2 mt-1">
                                                <Clock size={10} />
                                                {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                <span>• {event.daysAgo} days ago</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPlantDetail;
