import React, { useState } from 'react';
import { X, Leaf, Loader2 } from 'lucide-react';

const AddGardenModal = ({ isOpen, onClose, onGardenCreated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Garden name is required');
            return;
        }

        try {
            setLoading(true);
            const userId = localStorage.getItem('userId');

            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/gardens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    userId,
                    name: name.trim(),
                    description: description.trim() || null
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to create garden');
            }

            console.log('Garden created:', data.data);

            // Reset form
            setName('');
            setDescription('');

            // Notify parent and close
            onGardenCreated(data.data);
            onClose();
        } catch (err) {
            console.error('Error creating garden:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-[#1A2F1C]/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-[#F4F5F0] rounded-2xl shadow-2xl max-w-md w-full p-8 border-2 border-[#1A2F1C]/10">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-[#1A2F1C]/40 hover:text-[#C77D63] transition-colors"
                >
                    <X size={24} />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-[#4A6741] text-white p-2 rounded-lg">
                            <Leaf size={24} />
                        </div>
                        <h2 className="font-serif text-3xl text-[#1A2F1C]">Create Garden</h2>
                    </div>
                    <p className="text-[#1A2F1C]/60 font-sans text-sm">
                        Add a new garden to organize your plants
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Error message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-[#C77D63] px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Garden Name */}
                    <div>
                        <label className="block font-mono text-xs text-[#4A6741] uppercase tracking-widest mb-2">
                            Garden Name *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., Indoor Sanctuary, Balcony Garden"
                            maxLength={100}
                            className="w-full bg-white border border-[#1A2F1C]/20 rounded-lg px-4 py-3 text-[#1A2F1C] placeholder-gray-300 focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-colors font-sans"
                            disabled={loading}
                        />
                        <div className="text-right mt-1">
                            <span className="text-xs text-[#1A2F1C]/40 font-mono">
                                {name.length}/100
                            </span>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block font-mono text-xs text-[#4A6741] uppercase tracking-widest mb-2">
                            Description (Optional)
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your garden's location, purpose, or theme..."
                            maxLength={500}
                            rows={4}
                            className="w-full bg-white border border-[#1A2F1C]/20 rounded-lg px-4 py-3 text-[#1A2F1C] placeholder-gray-300 focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-colors font-sans resize-none"
                            disabled={loading}
                        />
                        <div className="text-right mt-1">
                            <span className="text-xs text-[#1A2F1C]/40 font-mono">
                                {description.length}/500
                            </span>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 bg-white border-2 border-[#1A2F1C]/20 text-[#1A2F1C] py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1A2F1C]/5 transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-[#1A2F1C] text-white py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={16} />
                                    Creating...
                                </>
                            ) : (
                                'Create Garden'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGardenModal;
