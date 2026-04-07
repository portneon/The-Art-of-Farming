import React, { useState } from "react";
import { X, Leaf, Loader2 } from "lucide-react";

const AddGardenModal = ({ isOpen, onClose, onGardenCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Garden name is required");
      return;
    }

    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/gardens`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            userId,
            name: name.trim(),
            description: description.trim() || null,
          }),
        },
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to create garden");

      setName("");
      setDescription("");
      onGardenCreated(data.data);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[#1A2F1C]/40 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative bg-[#F4F5F0] rounded-3xl shadow-2xl max-w-md w-full p-8 md:p-10 border border-[#1A2F1C]/10 animate-fade-in-up">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#1A2F1C]/40 hover:text-[#C77D63] transition-colors p-2 bg-white rounded-full border border-[#1A2F1C]/5 shadow-sm"
        >
          <X size={18} />
        </button>

        <div className="mb-8">
          <div className="inline-flex bg-white p-3 rounded-2xl shadow-sm border border-[#1A2F1C]/5 mb-4">
            <Leaf size={24} className="text-[#4A6741]" />
          </div>
          <h2 className="font-serif text-3xl text-[#1A2F1C] mb-2">
            Cultivate a Space
          </h2>
          <p className="text-[#1A2F1C]/60 font-sans text-sm leading-relaxed">
            Define a new environment to categorize and manage your botanical
            collection.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-[#FFE5D9]/50 border border-[#C77D63]/30 text-[#C77D63] px-4 py-3 rounded-xl text-sm font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block font-mono text-[10px] text-[#1A2F1C]/60 uppercase tracking-widest mb-2">
              Garden Nomenclature *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., The Conservatory"
              maxLength={100}
              className="w-full bg-white border border-[#1A2F1C]/10 rounded-xl px-5 py-4 text-[#1A2F1C] placeholder-[#1A2F1C]/20 focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all font-sans"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block font-mono text-[10px] text-[#1A2F1C]/60 uppercase tracking-widest mb-2">
              Environmental Notes (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe light levels, purpose, or location..."
              maxLength={500}
              rows={3}
              className="w-full bg-white border border-[#1A2F1C]/10 rounded-xl px-5 py-4 text-[#1A2F1C] placeholder-[#1A2F1C]/20 focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all font-sans resize-none"
              disabled={loading}
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white border border-[#1A2F1C]/10 text-[#1A2F1C]/60 py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1A2F1C]/5 hover:text-[#1A2F1C] transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#1A2F1C] text-white py-4 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={16} /> Curating...
                </>
              ) : (
                "Establish"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGardenModal;
