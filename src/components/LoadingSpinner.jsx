import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-screen">
      <div className="loading-spinner"></div>
      <p>{message}</p>
    </div>
  );
};

export const ErrorDisplay = ({ message = "Unable to load", onRetry }) => {
  return (
    <div className="error-screen">
      <div className="error-content">
        <h2>{message}</h2>
        {onRetry && (
          <button onClick={onRetry}>Retry</button>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;