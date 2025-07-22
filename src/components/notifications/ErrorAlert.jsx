import React, { useState, useEffect } from 'react';
import { AlertCircle, X } from 'lucide-react';
import { COLORS } from '../../constants/colors';

const ErrorAlert = ({ 
  message, 
  title = "Error!", 
  isVisible = false, 
  onClose, 
  autoClose = true, 
  duration = 7000 // Longer duration for errors
}) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
  }, [isVisible]);

  useEffect(() => {
    if (show && autoClose) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, autoClose, duration]);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      setTimeout(onClose, 300); // Wait for animation to complete
    }
  };

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-slide-in-right">
      <div 
        className="bg-white rounded-lg shadow-lg border-l-4 p-4 max-w-md w-full"
        style={{ borderLeftColor: COLORS.primary.red }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle 
              className="h-6 w-6"
              style={{ color: COLORS.primary.red }}
              aria-hidden="true" 
            />
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-gray-900">
              {title}
            </h3>
            <div className="mt-1 text-sm text-gray-700">
              {message}
            </div>
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200"
              style={{ 
                '--tw-ring-color': COLORS.primary.red 
              }}
              onClick={handleClose}
            >
              <span className="sr-only">Close</span>
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
        
        {/* Progress bar for auto-close */}
        {autoClose && (
          <div className="mt-3 w-full bg-gray-200 rounded-full h-1">
            <div 
              className="h-1 rounded-full animate-progress"
              style={{ 
                backgroundColor: COLORS.primary.red,
                animation: `progress ${duration}ms linear forwards` 
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorAlert;
