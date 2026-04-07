import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UploadCloud,
  Image as ImageIcon,
  Leaf,
  MapPin,
  Droplets,
  Sun,
  X,
  Loader2,
  Sprout,
} from "lucide-react";

const AddPlant = ({ isOpen, onClose, onPlantAdded }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    nickname: "",
    species: "",
    gardenId: "",
    waterFrequency: "weekly",
    lightRequirement: "indirect",
    notes: "",
  });

  if (!isOpen) return null;

  const handleClose = () => {
    if (onClose) onClose();
    else navigate("/dashboard");
  };

  // Mock gardens for the dropdown (in a real app, fetch these from your backend)
  const mockGardens = [
    { id: "1", name: "Living Room Jungle" },
    { id: "2", name: "Balcony Oasis" },
    { id: "3", name: "Kitchen Herbs" },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create a preview URL for the uploaded image
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      // In a real app, you would also store the 'file' object in state to send to your backend
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Mock API call
    setTimeout(() => {
      console.log("Plant Data Submitted:", formData);
      setIsSubmitting(false);
      if (onPlantAdded) onPlantAdded();
      if (onClose) onClose();
      else navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="fixed left-0 right-0 top-24 bottom-0 z-[90] flex items-start justify-center p-4 bg-[#1A2F1C]/20 overflow-auto">
      <div className="relative w-full max-w-5xl">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 rounded-full bg-white p-3 text-[#1A2F1C]/70 shadow-lg hover:text-[#1A2F1C] transition-colors"
        >
          <X size={18} />
        </button>
        <div className="bg-[#F4F5F0] rounded-[2.5rem] shadow-sm border border-[#1A2F1C]/5 overflow-hidden px-6 md:px-12 pt-24 pb-20 selection:bg-[#C77D63] selection:text-white font-sans text-[#1A2F1C]">
          <div className="max-w-5xl mx-auto">
            {/* --- HEADER --- */}
            <div className="mb-8 flex items-center justify-between">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1A2F1C]/40 hover:text-[#1A2F1C] transition-colors"
              >
                <ArrowLeft size={14} /> Cancel & Return
              </button>
            </div>
          </div>

          <div className="mb-10">
            <div className="inline-flex bg-white p-3 rounded-2xl shadow-sm border border-[#1A2F1C]/5 mb-4">
              <Sprout size={24} className="text-[#4A6741]" />
            </div>
            <h1 className="font-serif text-4xl md:text-5xl text-[#1A2F1C] mb-2 leading-tight">
              Document a Specimen
            </h1>
            <p className="text-[#1A2F1C]/60 text-sm">
              Add a new plant to your digital conservatory to track its growth
              and care.
            </p>
          </div>

          {/* --- MAIN FORM CARD --- */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[2.5rem] shadow-sm border border-[#1A2F1C]/5 overflow-hidden flex flex-col md:flex-row"
          >
            {/* LEFT COLUMN: Image Upload */}
            <div className="w-full md:w-2/5 bg-[#F9FAF8] border-b md:border-b-0 md:border-r border-[#1A2F1C]/5 p-8 md:p-12 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[500px]">
              {imagePreview ? (
                <div className="absolute inset-0 group">
                  <img
                    src={imagePreview}
                    alt="Specimen preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#1A2F1C]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="bg-white text-[#C77D63] px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#FFE5D9] transition-colors flex items-center gap-2 shadow-xl"
                    >
                      <X size={14} /> Remove Photo
                    </button>
                  </div>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-[#1A2F1C]/15 rounded-3xl cursor-pointer hover:border-[#4A6741] hover:bg-white transition-all group p-6 text-center">
                  <div className="bg-white p-4 rounded-full shadow-sm border border-[#1A2F1C]/5 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <UploadCloud size={28} className="text-[#4A6741]" />
                  </div>
                  <h3 className="font-serif text-xl text-[#1A2F1C] mb-2">
                    Upload Photo
                  </h3>
                  <p className="text-[10px] font-mono text-[#1A2F1C]/40 uppercase tracking-widest leading-relaxed">
                    Drag & Drop or Click <br /> JPEG, PNG up to 10MB
                  </p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {/* RIGHT COLUMN: Data Input */}
            <div className="w-full md:w-3/5 p-8 md:p-12 space-y-8">
              {/* Section 1: Identification */}
              <div className="space-y-5">
                <h3 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#1A2F1C]/40 border-b border-[#1A2F1C]/5 pb-2">
                  <Leaf size={12} /> Identification
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-[10px] text-[#1A2F1C]/60 uppercase tracking-widest mb-2">
                      Nickname (Optional)
                    </label>
                    <input
                      type="text"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleInputChange}
                      placeholder="e.g., Barnaby"
                      className="w-full bg-[#F4F5F0] border border-transparent rounded-xl px-5 py-3.5 text-[#1A2F1C] placeholder-[#1A2F1C]/30 focus:outline-none focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all font-sans text-sm"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-[#1A2F1C]/60 uppercase tracking-widest mb-2">
                      Species / Common Name *
                    </label>
                    <input
                      type="text"
                      name="species"
                      required
                      value={formData.species}
                      onChange={handleInputChange}
                      placeholder="e.g., Monstera Deliciosa"
                      className="w-full bg-[#F4F5F0] border border-transparent rounded-xl px-5 py-3.5 text-[#1A2F1C] placeholder-[#1A2F1C]/30 focus:outline-none focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all font-sans text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-[#1A2F1C]/60 uppercase tracking-widest mb-2">
                    Habitat / Location *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <MapPin size={16} className="text-[#1A2F1C]/40" />
                    </div>
                    <select
                      name="gardenId"
                      required
                      value={formData.gardenId}
                      onChange={handleInputChange}
                      className="w-full bg-[#F4F5F0] border border-transparent rounded-xl pl-12 pr-5 py-3.5 text-[#1A2F1C] focus:outline-none focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all font-sans text-sm appearance-none"
                    >
                      <option value="" disabled>
                        Select a Garden Zone
                      </option>
                      {mockGardens.map((garden) => (
                        <option key={garden.id} value={garden.id}>
                          {garden.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 2: Care Baseline */}
              <div className="space-y-5">
                <h3 className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#1A2F1C]/40 border-b border-[#1A2F1C]/5 pb-2">
                  <Sun size={12} /> Care Baseline
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-mono text-[10px] text-[#1A2F1C]/60 uppercase tracking-widest mb-2">
                      Watering Routine
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Droplets size={16} className="text-[#4A8B9F]" />
                      </div>
                      <select
                        name="waterFrequency"
                        value={formData.waterFrequency}
                        onChange={handleInputChange}
                        className="w-full bg-[#F4F5F0] border border-transparent rounded-xl pl-12 pr-5 py-3.5 text-[#1A2F1C] focus:outline-none focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all font-sans text-sm appearance-none"
                      >
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="biweekly">Every 2 Weeks</option>
                        <option value="monthly">Monthly</option>
                        <option value="when_dry">When Soil is Dry</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-mono text-[10px] text-[#1A2F1C]/60 uppercase tracking-widest mb-2">
                      Light Requirement
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                        <Sun size={16} className="text-[#D4A373]" />
                      </div>
                      <select
                        name="lightRequirement"
                        value={formData.lightRequirement}
                        onChange={handleInputChange}
                        className="w-full bg-[#F4F5F0] border border-transparent rounded-xl pl-12 pr-5 py-3.5 text-[#1A2F1C] focus:outline-none focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all font-sans text-sm appearance-none"
                      >
                        <option value="direct">Direct Sun</option>
                        <option value="indirect">Bright Indirect</option>
                        <option value="medium">Medium Light</option>
                        <option value="low">Low Light</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Notes */}
              <div className="space-y-5">
                <div>
                  <label className="block font-mono text-[10px] text-[#1A2F1C]/60 uppercase tracking-widest mb-2">
                    Botanical Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Add any specific observations, soil mix details, or purchase history..."
                    rows={3}
                    className="w-full bg-[#F4F5F0] border border-transparent rounded-xl px-5 py-4 text-[#1A2F1C] placeholder-[#1A2F1C]/30 focus:outline-none focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all font-sans text-sm resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-[#1A2F1C]/5 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={() => (onClose ? onClose() : navigate("/dashboard"))}
                  className="px-6 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest text-[#1A2F1C]/60 hover:text-[#1A2F1C] hover:bg-[#F4F5F0] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={
                    isSubmitting || !formData.species || !formData.gardenId
                  }
                  className="bg-[#1A2F1C] text-white px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#4A6741] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={14} />{" "}
                      Processing...
                    </>
                  ) : (
                    "Register Specimen"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddPlant;
