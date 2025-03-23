import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface AlertProps {
  children: React.ReactNode;
  title?: string;
  variant?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({
  children,
  title,
  variant = 'info',
  onClose,
  className = '',
}) => {
  const baseClasses = 'rounded-md p-4';
  
  const variantClasses = {
    info: 'bg-blue-50 text-blue-800',
    success: 'bg-green-50 text-green-800',
    warning: 'bg-amber-50 text-amber-800',
    error: 'bg-red-50 text-red-800',
  };
  
  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {/* Icon could be added here based on variant */}
        </div>
        <div className="ml-3 flex-1">
          {title && <h3 className="text-sm font-medium">{title}</h3>}
          <div className="text-sm mt-1">{children}</div>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                onClick={onClose}
                className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  variant === 'info' ? 'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600' : 
                  variant === 'success' ? 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600' :
                  variant === 'warning' ? 'bg-amber-50 text-amber-500 hover:bg-amber-100 focus:ring-amber-600' :
                  'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600'
                }`}
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Alert;