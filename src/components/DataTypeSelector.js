import React from 'react';
import '../styles/DataTypeSelector.css';

const DataTypeSelector = ({ selectedType, onTypeChange }) => {
  const dataTypes = [
    { id: 'text', label: 'Text', icon: '📝' },
    { id: 'url', label: 'Single URL', icon: '🔗' },
    { id: 'multi-url', label: 'Multiple URLs', icon: '🔗🔗' },
    { id: 'email', label: 'Email', icon: '📧' },
    { id: 'phone', label: 'Phone', icon: '📞' },
    { id: 'sms', label: 'SMS', icon: '💬' },
    { id: 'contact', label: 'Contact (vCard)', icon: '👤' },
    { id: 'app-link', label: 'App Link', icon: '📱' }
  ];

  return (
    <div className="data-type-selector">
      <h2>Select Data Type</h2>
      <div className="data-type-grid">
        {dataTypes.map(type => (
          <button
            key={type.id}
            className={`data-type-button ${selectedType === type.id ? 'active' : ''}`}
            onClick={() => onTypeChange(type.id)}
          >
            <span className="type-icon">{type.icon}</span>
            <span className="type-label">{type.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DataTypeSelector;
