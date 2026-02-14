import React from "react";
import { Sprout, Droplets, Bug, Sun, AlertCircle, AlertTriangle, Info } from "lucide-react";

const NotificationCard = ({ notification, onDismiss }) => {
    const getIconAndColor = () => {
        switch (notification.type) {
            case 'water':
                return { Icon: Droplets, color: '#4A9EFF' };
            case 'fertilize':
                return { Icon: Sprout, color: '#4A6741' };
            case 'pest':
                return { Icon: Bug, color: '#C77D63' };
            case 'health':
                return { Icon: AlertCircle, color: '#E74C3C' };
            case 'environment':
                return { Icon: Sun, color: '#F39C12' };
            default:
                return { Icon: Info, color: '#95A5A6' };
        }
    };

    const getPriorityStyles = () => {
        switch (notification.priority) {
            case 'urgent':
                return 'border-l-4 border-red-500 bg-red-50/50';
            case 'warning':
                return 'border-l-4 border-orange-500 bg-orange-50/50';
            case 'info':
                return 'border-l-4 border-blue-500 bg-blue-50/50';
            default:
                return 'border-l-4 border-gray-300 bg-white';
        }
    };

    const { Icon, color } = getIconAndColor();

    return (
        <div className={`${getPriorityStyles()} p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 group`}>
            <div className="flex items-start gap-3">
                <div
                    className="p-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${color}20` }}
                >
                    <Icon size={20} style={{ color }} />
                </div>

                <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1A2F1C] font-medium leading-relaxed">
                        {notification.message}
                    </p>
                    {notification.gardenName && (
                        <p className="text-xs text-[#1A2F1C]/50 mt-1 font-mono">
                            Garden: {notification.gardenName}
                        </p>
                    )}
                </div>

                {onDismiss && (
                    <button
                        onClick={() => onDismiss(notification.id)}
                        className="text-[#1A2F1C]/30 hover:text-[#C77D63] transition-colors opacity-0 group-hover:opacity-100"
                    >
                        ×
                    </button>
                )}
            </div>
        </div>
    );
};

export default NotificationCard;
