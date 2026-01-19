import React from 'react';

const ErrorDisplay = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="error-screen">
      <div className="error-content">
        <h2>{message}</h2>
        {onRetry && (
          <button className="btn btn-primary" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorDisplay;