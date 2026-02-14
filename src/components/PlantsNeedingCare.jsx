import React from 'react';
import { AlertTriangle, Droplet, Sprout, AlertCircle, ArrowRight } from 'lucide-react';
import PlantStatusCard from './PlantStatusCard';

const PlantsNeedingCare = ({ plants, notifications }) => {
    // Get plants that have urgent or warning notifications
    const plantsNeedingCare = plants.filter(plant => {
        return notifications.some(n =>
            n.plantId === plant.id && (n.priority === 'urgent' || n.priority === 'warning')
        );
    });

    // Sort by priority (urgent first)
    const sortedPlants = plantsNeedingCare.sort((a, b) => {
        const aNotification = notifications.find(n => n.plantId === a.id);
        const bNotification = notifications.find(n => n.plantId === b.id);

        const priorityOrder = { urgent: 0, warning: 1 };
        return priorityOrder[aNotification?.priority] - priorityOrder[bNotification?.priority];
    });

    // Take top 6 plants
    const topPlants = sortedPlants.slice(0, 6);

    if (topPlants.length === 0) {
        return null;
    }

    return (
        <div className="mb-12">
            < div className="flex items-center justify-between mb-6" >
                <div>
                    <h2 className="font-serif text-3xl text-[#1A2F1C]">Plants Needing Care</h2>
                    <p className="text-[#1A2F1C]/60 font-sans text-sm mt-1">
                        These plants require your attention
                    </p>
                </div>
                {
                    sortedPlants.length > 6 && (
                        <span className="bg-[#C77D63] text-white px-3 py-1 rounded-full text-xs font-bold">
                            +{sortedPlants.length - 6} more
                        </span>
                    )
                }
            </div >

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {topPlants.map((plant) => {
                    const plantNotifications = notifications.filter(n => n.plantId === plant.id);
                    const urgentCount = plantNotifications.filter(n => n.priority === 'urgent').length;
                    const warningCount = plantNotifications.filter(n => n.priority === 'warning').length;

                    return (
                        <div key={plant.id} className="relative">
                            {/* Urgency Badge */}
                            {urgentCount > 0 && (
                                <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                    <AlertCircle size={12} />
                                    URGENT
                                </div>
                            )}

                            <PlantStatusCard plant={plant} />

                            {/* Care Notifications */}
                            <div className="mt-2 space-y-1">
                                {plantNotifications.slice(0, 2).map((notification, idx) => (
                                    <div
                                        key={idx}
                                        className={`text-xs font-sans px-3 py-2 rounded-lg flex items-center gap-2 ${notification.priority === 'urgent'
                                            ? 'bg-red-50 text-red-700 border border-red-200'
                                            : 'bg-orange-50 text-orange-700 border border-orange-200'
                                            }`}
                                    >
                                        {notification.type === 'water' && <Droplet size={12} />}
                                        {notification.type === 'fertilize' && <Sprout size={12} />}
                                        {notification.type === 'health' && <AlertTriangle size={12} />}
                                        <span className="flex-1 line-clamp-1">{notification.message}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* View All Link */}
            {
                sortedPlants.length > 6 && (
                    <div className="text-center mt-6">
                        <button className="text-[#4A6741] hover:text-[#1A2F1C] font-sans text-sm font-bold flex items-center gap-2 mx-auto group">
                            View all {sortedPlants.length} plants needing care
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                )
            }
        </div >
    );
};

export default PlantsNeedingCare;
