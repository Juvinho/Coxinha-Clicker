import React, { useState, useEffect } from 'react';

interface EventNotification {
  id: number;
  message: string;
  icon: string;
  color: string;
  duration: number;
}

interface SystemsUIProps {
  comboCount: number;
  activeEvent: {name: string; icon: string; color: string} | null;
  questProgress: number;
  questsCompleted: number;
  events: EventNotification[];
}

const SystemsUI: React.FC<SystemsUIProps> = ({
  comboCount,
  activeEvent,
  questProgress,
  questsCompleted,
  events
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* COMBO COUNTER - Top Center */}
      {comboCount > 0 && (
        <div className="absolute top-12 left-1/2 transform -translate-x-1/2 pointer-events-none">
          <div
            className="text-4xl font-black drop-shadow-lg animate-bounce"
            style={{
              color: '#ffaa00',
              textShadow: '0 0 20px #ffaa00, 0 0 40px rgba(255,170,0,0.5)',
              animation: `comboFloat 0.5s ease-out, pulse 1s infinite`
            }}
          >
            {comboCount} COMBO! 🔥
          </div>
          {comboCount >= 10 && (
            <div
              className="text-center text-sm font-bold mt-2"
              style={{color: '#ffaa00'}}
            >
              x{comboCount >= 250 ? 10 : comboCount >= 100 ? 5 : comboCount >= 50 ? 3 : comboCount >= 25 ? 2 : 1.5}
            </div>
          )}
        </div>
      )}

      {/* ACTIVE EVENT - Center Screen */}
      {activeEvent && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div
            className="text-6xl mb-4 animate-bounce"
            style={{fontSize: '80px'}}
          >
            {activeEvent.icon}
          </div>
          <div
            className="text-center text-2xl font-black drop-shadow-lg"
            style={{
              color: activeEvent.color,
              textShadow: `0 0 20px ${activeEvent.color}`
            }}
          >
            {activeEvent.name}
          </div>
        </div>
      )}

      {/* DAILY QUESTS BADGE - Top Right */}
      <div className="absolute top-4 right-4 bg-[#1a1a1a] border-2 border-[#ffaa00] rounded-lg p-3 pointer-events-auto">
        <div className="text-xs font-bold text-[#ffaa00] mb-2">📋 MISSÕES</div>
        <div className="bg-[#0f0705] rounded h-1 w-32 mb-2 overflow-hidden border border-[#444]">
          <div
            className="h-full bg-gradient-to-r from-[#39ff14] to-[#ffaa00]"
            style={{width: `${questProgress}%`, transition: 'width 0.3s'}}
          />
        </div>
        <div className="text-xs text-gray-400">
          {questsCompleted}/3 ✅
        </div>
      </div>

      {/* EVENT NOTIFICATIONS - Top Left */}
      <div className="absolute top-4 left-4 space-y-2">
        {events.map(event => (
          <div
            key={event.id}
            className="bg-[#1a1a1a] border-l-4 rounded px-3 py-2 slide-in pointer-events-auto animate-pulse"
            style={{
              borderColor: event.color,
              boxShadow: `inset 0 0 10px ${event.color}30`
            }}
          >
            <div className="text-xs font-bold text-white">
              {event.icon} {event.message}
            </div>
          </div>
        ))}
      </div>

      {/* STYLES */}
      <style>{`
        @keyframes comboFloat {
          0% {
            opacity: 0;
            transform: translate(-50%, -30px);
          }
          100% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default SystemsUI;
