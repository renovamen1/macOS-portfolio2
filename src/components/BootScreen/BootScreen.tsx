import React, { useState, useEffect } from 'react';
import './BootScreen.scss';

interface BootScreenProps {
  onBootComplete: () => void;
}

const BootScreen: React.FC<BootScreenProps> = ({ onBootComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate boot progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Add a slight delay before hiding the boot screen
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onBootComplete, 500); // Fade out duration
          }, 500);
          return 100;
        }
        // Simulate realistic boot progress with variable speeds
        const increment = Math.random() * 8 + 2; // Random increment between 2-10
        return Math.min(prev + increment, 100);
      });
    }, 150); // Update every 150ms

    return () => clearInterval(interval);
  }, [onBootComplete]);

  if (!isVisible) return null;

  return (
    <div className={`boot-screen ${!isVisible ? 'boot-screen--hidden' : ''}`}>
      <div className="boot-screen__content">
        {/* Apple Logo */}
        <div className="boot-screen__logo">
          <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
            <path
              d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
              fill="white"
            />
          </svg>
        </div>

        {/* Progress Bar */}
        <div className="boot-screen__progress-container">
          <div className="boot-screen__progress-bar">
            <div 
              className="boot-screen__progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Optional loading text */}
        <div className="boot-screen__loading-text">
          Starting up...
        </div>
      </div>
    </div>
  );
};

export default BootScreen;