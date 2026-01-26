import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Droplets,
  Sun,
  Wind,
  Thermometer,
  Activity,
  Plus,
  Share2,
  BookOpen,
  Leaf,
  Sprout,
  Loader2
} from "lucide-react";
import PlantChat from "./PlantsChat";

const PlantDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [plant, setPlant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const formatData = (raw) => {
      if (!raw) return null;

      // Helper to parse care fields
      // Prioritizes the nested object structure you are now receiving
      const parseCareField = (field) => {
        if (!field) return { text: "--" };

        // Correctly handles your new data format: { text: "...", frequency: "..." }
        if (typeof field === 'object') return field;

        try {
          // Fallback for legacy JSON strings if any remain in DB
          return JSON.parse(field);
        } catch (e) {
          return { text: field };
        }
      };

      return {
        ...raw,
        // Ensure arrays/objects exist (Defensive coding)
        botanical_fact: raw.botanical_fact,
        benefits: raw.benefits || [],
        stats: raw.stats || {},
        care: {
          // We prioritize the nested 'care' object from your new JSON response
          water: parseCareField(raw.care?.water || raw.care_water),
          light: parseCareField(raw.care?.light || raw.care_light),
          humidity: parseCareField(raw.care?.humidity || raw.care_humidity),
          temperature: parseCareField(raw.care?.temperature || raw.care_temperature)
        }
      };
    };

    const fetchPlantData = async () => {
      try {
        setLoading(true);

        // 1. Check if data was passed via navigation state
        if (location.state && location.state.plant) {
          setPlant(formatData(location.state.plant));
          setLoading(false);
          return;
        }

        // 2. Fetch from Backend
        const response = await fetch(`https://theartoffarming.onrender.com/plants/${id}`);

        if (!response.ok) {
          throw new Error("Specimen not found in archive.");
        }

        const result = await response.json();
        // Handle response wrapper if it exists
        const plantData = result.data || result;

        setPlant(formatData(plantData));
      } catch (err) {
        console.error("Error fetching plant details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlantData();
  }, [id, location.state]);

  if (loading) return (
    <div className="min-h-screen bg-[#F4F5F0] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin text-[#1A2F1C]" size={40} />
        <p className="font-mono text-xs uppercase tracking-widest text-[#1A2F1C]/60">Retrieving Specimen Data...</p>
      </div>
    </div>
  );

  if (error || !plant) return (
    <div className="min-h-screen bg-[#F4F5F0] flex items-center justify-center">
      <div className="text-center">
        <h2 className="font-serif text-3xl text-[#1A2F1C] mb-4">Specimen Not Found</h2>
        <p className="font-sans text-[#1A2F1C]/60 mb-8">{error || "This plant does not exist in our records."}</p>
        <Link to="/plants" className="bg-[#1A2F1C] text-white px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors">
          Return to Catalog
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F4F5F0] text-[#1A2F1C] pb-20 pt-24 font-sans selection:bg-[#C77D63] selection:text-white">

      <div className="max-w-7xl mx-auto px-6 mb-8">
        <Link to="/plants" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#1A2F1C]/40 hover:text-[#1A2F1C] transition-colors">
          <ArrowLeft size={14} /> Back to Catalog
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

        {/* --- LEFT COL: VISUALS --- */}
        <div className="lg:col-span-5 flex flex-col gap-8">
          <div className="relative aspect-[3/4] rounded-sm overflow-hidden shadow-2xl shadow-[#1A2F1C]/20 group">
            <img
              src={plant.image_url}
              alt={plant.common_name}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 border-[12px] border-white/90"></div>
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Badge label="Family" value={plant.family} />
            <Badge label="Origin" value={plant.origin} />
            <Badge label="Type" value={plant.stats?.difficulty} />
          </div>

          <div className="grid grid-cols-3 gap-4 border-t border-[#1A2F1C]/10 pt-6">
            <div className="text-center">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[#1A2F1C]/40 mb-1">Toxicity</span>
              <span className="font-serif text-lg">{plant.stats?.toxicity || "--"}</span>
            </div>
            <div className="text-center border-l border-[#1A2F1C]/10">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[#1A2F1C]/40 mb-1">Growth</span>
              <span className="font-serif text-lg">{plant.stats?.growth_rate || "--"}</span>
            </div>
            <div className="text-center border-l border-[#1A2F1C]/10">
              <span className="block text-[10px] font-mono uppercase tracking-widest text-[#1A2F1C]/40 mb-1">Difficulty</span>
              <span className="font-serif text-lg">{plant.stats?.difficulty || "--"}</span>
            </div>
          </div>
        </div>

        {/* --- RIGHT COL: INFORMATION --- */}
        <div className="lg:col-span-7 flex flex-col">

          <div className="mb-10">
            <h1 className="font-serif text-5xl md:text-6xl text-[#1A2F1C] mb-2 leading-tight">
              {plant.common_name}
            </h1>
            <p className="font-mono text-sm text-[#1A2F1C]/50 italic border-b border-[#1A2F1C]/10 pb-6 mb-6">
              {plant.scientific_name}
            </p>

            <div className="flex gap-4">
              <button className="flex-1 bg-[#1A2F1C] text-white py-4 px-6 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-[#4A6741] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group">
                <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                Add to Garden
              </button>
              <button className="px-6 py-4 border border-[#1A2F1C]/20 rounded-full font-bold text-xs tracking-widest uppercase hover:bg-white hover:border-[#1A2F1C] transition-all flex items-center gap-2">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>

          {/* 2. Botanical Profile */}
          <div className="mb-12 space-y-6">
            <div>
              <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#C77D63] mb-3">
                <BookOpen size={14} /> Botanical Profile
              </h3>
              <p className="font-serif text-xl leading-relaxed text-[#1A2F1C]/80">
                {plant.description || "No description available."}
              </p>
            </div>

            {plant.botanical_fact && (
              <div className="bg-[#E8EAE4]/30 p-6 rounded-lg border-l-2 border-[#4A6741]">
                <h4 className="flex items-center gap-2 font-bold text-sm text-[#1A2F1C] mb-2">
                  <Sprout size={16} className="text-[#4A6741]" /> Scientific Insight
                </h4>
                <p className="text-sm text-[#1A2F1C]/70 italic leading-relaxed">
                  "{plant.botanical_fact}"
                </p>
              </div>
            )}

            {plant.benefits && plant.benefits.length > 0 && (
              <div>
                <h4 className="font-bold text-sm text-[#1A2F1C] mb-3">Ecological Benefits</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {plant.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[#1A2F1C]/70">
                      <Leaf size={12} className="text-[#C77D63]" /> {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* 3. Environmental Conditions */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-8">
              <Activity size={18} className="text-[#1A2F1C]/40" />
              <h2 className="font-serif text-2xl text-[#1A2F1C]">Environmental Profile</h2>
            </div>

            <div className="space-y-8">
              <MetricRow
                icon={Droplets}
                label="Water Requirements"
                // The API doesn't return numeric 'level', so this will correctly fall back to the dotted line
                value={plant.care.water?.level}
                // Text from API JSON (e.g. "Let dry completely")
                text={plant.care.water?.text}
                // Frequency from API JSON (e.g. "2-3 Weeks")
                frequency={plant.care.water?.frequency}
              />
              <MetricRow
                icon={Sun}
                label="Light Exposure"
                value={plant.care.light?.level}
                text={plant.care.light?.text}
                frequency={plant.care.light?.frequency}
              />
              <MetricRow
                icon={Wind}
                label="Humidity Tolerance"
                value={plant.care.humidity?.level}
                text={plant.care.humidity?.text}
                frequency={plant.care.humidity?.frequency}
              />
              <MetricRow
                icon={Thermometer}
                label="Temperature Range"
                value={plant.care.temperature?.level}
                text={plant.care.temperature?.text}
                frequency={plant.care.temperature?.frequency}
              />
            </div>
          </div>

          {/* 4. AI Chat */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-widest text-[#1A2F1C]/40 mb-4">Research Assistant</h3>
            <div className="h-[400px]">
              <PlantChat plantName={plant.common_name} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const Badge = ({ label, value }) => (
  <div className="px-3 py-1 bg-[#F4F5F0] border border-[#1A2F1C]/5 rounded-full text-xs text-[#1A2F1C]/60">
    <span className="font-bold">{label}:</span> {value || "--"}
  </div>
);

const MetricRow = ({ icon: Icon, label, value, text, frequency }) => (
  <div className="grid grid-cols-12 items-center gap-4 group">
    <div className="col-span-1">
      <Icon size={20} className="text-[#1A2F1C]/30 group-hover:text-[#C77D63] transition-colors" />
    </div>
    <div className="col-span-4 md:col-span-3">
      <span className="text-xs font-bold uppercase tracking-widest text-[#1A2F1C]/60">{label}</span>
    </div>
    <div className="col-span-4 md:col-span-5">
      {/* If backend sends a specific 'level' percent, show bar. Otherwise dotted line. */}
      {value !== undefined && value !== null ? (
        <div className="h-1.5 w-full bg-[#1A2F1C]/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#1A2F1C] rounded-full opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ width: `${value}%` }}
          ></div>
        </div>
      ) : (
        <div className="h-1.5 w-full border-b border-dotted border-[#1A2F1C]/20"></div>
      )}
    </div>
    <div className="col-span-3 text-right">
      <div className="flex flex-col items-end">
        <span className="text-xs font-medium text-[#1A2F1C]">{text || "--"}</span>
        {frequency && <span className="text-[10px] text-[#1A2F1C]/50 font-mono">{frequency}</span>}
      </div>
    </div>
  </div>
);

export default PlantDetail;