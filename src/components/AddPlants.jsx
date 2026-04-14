import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UploadCloud,
  Leaf,
  MapPin,
  Droplets,
  Sun,
  X,
  Loader2,
  Sprout,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

const AddPlant = ({ isOpen, onClose, onPlantAdded }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);        // the raw File
  const [imagePreview, setImagePreview] = useState(null);  // local blob URL for preview
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null); // Cloudinary URL after upload
  const [uploadedPublicId, setUploadedPublicId] = useState(null); // Cloudinary publicId for cleanup
  const [imageUploading, setImageUploading] = useState(false);
  const [gardens, setGardens] = useState([]);
  const [gardensLoading, setGardensLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    nickname: "",
    species: "",
    gardenId: "",
    waterFrequency: "weekly",
    lightRequirement: "indirect",
    notes: "",
  });

  // Fetch user's gardens when modal opens
  useEffect(() => {
    if (!isOpen) return;
    const fetchGardens = async () => {
      try {
        setGardensLoading(true);
        const userId = localStorage.getItem("userId");
        const token = localStorage.getItem("token");
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/gardens?userId=${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (!response.ok) throw new Error("Failed to fetch gardens");
        const data = await response.json();
        setGardens(data.data || []);
      } catch (err) {
        console.error("Error fetching gardens:", err);
      } finally {
        setGardensLoading(false);
      }
    };
    fetchGardens();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    setSubmitError("");
    if (onClose) onClose();
    else navigate("/dashboard");
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setUploadedImageUrl(null);
    setUploadedPublicId(null);

    // Upload to Cloudinary in the background
    setImageUploading(true);
    try {
      const token = localStorage.getItem("token");
      const formPayload = new FormData();
      formPayload.append("image", file);

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/upload/image`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formPayload,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Image upload failed");

      setUploadedImageUrl(data.data.url);
      setUploadedPublicId(data.data.publicId);
    } catch (err) {
      console.error("Image upload error:", err);
      // Non-fatal — user can still submit without image
    } finally {
      setImageUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    // Delete from Cloudinary if it was uploaded
    if (uploadedPublicId) {
      try {
        const token = localStorage.getItem("token");
        await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/upload/image/${encodeURIComponent(uploadedPublicId)}`,
          { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.warn("Could not delete image from Cloudinary:", err);
      }
    }
    setImageFile(null);
    setImagePreview(null);
    setUploadedImageUrl(null);
    setUploadedPublicId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/plants`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            gardenId: formData.gardenId,
            species: formData.species,
            nickname: formData.nickname,
            notes: formData.notes,
            waterFrequency: formData.waterFrequency,
            lightRequirement: formData.lightRequirement,
            imageUrl: uploadedImageUrl || null,  // Cloudinary URL saved with plant
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Failed to add plant");

      // Reset form
      setFormData({ nickname: "", species: "", gardenId: "", waterFrequency: "weekly", lightRequirement: "indirect", notes: "" });
      setImageFile(null);
      setImagePreview(null);
      setUploadedImageUrl(null);
      setUploadedPublicId(null);

      if (onPlantAdded) onPlantAdded(data.data);
      if (onClose) onClose();
      else navigate("/dashboard");

    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="mb-8 flex items-center justify-between">
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1A2F1C]/40 hover:text-[#1A2F1C] transition-colors"
              >
                <ArrowLeft size={14} /> Cancel &amp; Return
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
              Add a new plant to your digital conservatory to track its growth and care.
            </p>
          </div>

          {submitError && (
            <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 px-5 py-4 rounded-2xl text-sm">
              <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[2.5rem] shadow-sm border border-[#1A2F1C]/5 overflow-hidden flex flex-col md:flex-row"
          >
            {/* LEFT: Image Upload */}
            <div className="w-full md:w-2/5 bg-[#F9FAF8] border-b md:border-b-0 md:border-r border-[#1A2F1C]/5 p-8 md:p-12 flex flex-col items-center justify-center relative min-h-[300px] md:min-h-[500px]">
              {imagePreview ? (
                <div className="absolute inset-0 group">
                  <img
                    src={imagePreview}
                    alt="Specimen preview"
                    className="w-full h-full object-cover"
                  />

                  {/* Upload progress overlay */}
                  {imageUploading && (
                    <div className="absolute inset-0 bg-[#1A2F1C]/60 flex flex-col items-center justify-center backdrop-blur-sm">
                      <Loader2 className="animate-spin text-white mb-2" size={32} />
                      <p className="text-white text-xs font-mono uppercase tracking-widest">Uploading to Cloud...</p>
                    </div>
                  )}

                  {/* Uploaded success badge */}
                  {uploadedImageUrl && !imageUploading && (
                    <div className="absolute top-4 left-4 bg-[#4A6741] text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                      <CheckCircle2 size={12} /> Saved to Cloud
                    </div>
                  )}

                  {/* Remove button */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      disabled={imageUploading}
                      className="bg-white text-[#C77D63] px-6 py-3 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#FFE5D9] transition-colors flex items-center gap-2 shadow-xl disabled:opacity-50"
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
                  <h3 className="font-serif text-xl text-[#1A2F1C] mb-2">Upload Photo</h3>
                  <p className="text-[10px] font-mono text-[#1A2F1C]/40 uppercase tracking-widest leading-relaxed">
                    Drag &amp; Drop or Click <br /> JPEG, PNG, WebP up to 10MB
                  </p>
                  <p className="text-[10px] text-[#4A6741] mt-2 font-mono">Stored on Cloudinary</p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            {/* RIGHT: Data Input */}
            <div className="w-full md:w-3/5 p-8 md:p-12 space-y-8">
              {/* Identification */}
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
                    Habitat / Garden Zone *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                      <MapPin size={16} className="text-[#1A2F1C]/40" />
                    </div>
                    {gardensLoading ? (
                      <div className="w-full bg-[#F4F5F0] rounded-xl pl-12 pr-5 py-3.5 text-[#1A2F1C]/40 font-sans text-sm flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin" /> Loading gardens...
                      </div>
                    ) : (
                      <select
                        name="gardenId"
                        required
                        value={formData.gardenId}
                        onChange={handleInputChange}
                        className="w-full bg-[#F4F5F0] border border-transparent rounded-xl pl-12 pr-5 py-3.5 text-[#1A2F1C] focus:outline-none focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all font-sans text-sm appearance-none"
                      >
                        <option value="" disabled>Select a Garden Zone</option>
                        {gardens.length === 0 && (
                          <option disabled>— No gardens yet, create one first —</option>
                        )}
                        {gardens.map((garden) => (
                          <option key={garden.id} value={garden.id}>
                            {garden.name} ({garden.plantCount} plants)
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              </div>

              {/* Care Baseline */}
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

              {/* Notes */}
              <div>
                <label className="block font-mono text-[10px] text-[#1A2F1C]/60 uppercase tracking-widest mb-2">
                  Botanical Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Soil mix, purchase history, observations..."
                  rows={3}
                  className="w-full bg-[#F4F5F0] border border-transparent rounded-xl px-5 py-4 text-[#1A2F1C] placeholder-[#1A2F1C]/30 focus:outline-none focus:bg-white focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-all font-sans text-sm resize-none"
                />
              </div>

              {/* Actions */}
              <div className="pt-6 border-t border-[#1A2F1C]/5 flex items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest text-[#1A2F1C]/60 hover:text-[#1A2F1C] hover:bg-[#F4F5F0] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || imageUploading || !formData.species || !formData.gardenId}
                  className="bg-[#1A2F1C] text-white px-8 py-4 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#4A6741] transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                >
                  {imageUploading ? (
                    <><Loader2 className="animate-spin" size={14} /> Uploading Image...</>
                  ) : isSubmitting ? (
                    <><Loader2 className="animate-spin" size={14} /> Processing...</>
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
