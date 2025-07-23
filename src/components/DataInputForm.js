import React, { useState, useEffect } from 'react';
import '../styles/DataInputForm.css';
import LivePreview from './LivePreview';

const DataInputForm = ({ dataType, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({});
  const [showLivePreview, setShowLivePreview] = useState(false);

  // Reset form when data type changes
  useEffect(() => {
    setFormData(initialData || {});
  }, [dataType, initialData]);

  // Handle input changes
  const handleInputChange = (field, value) => {
    // Truncate extremely long text to prevent crashes
    let processedValue = value;
    if (typeof value === 'string') {
      const maxLength = getMaxLengthForField(field);
      if (value.length > maxLength) {
        processedValue = value.substring(0, maxLength);
        // Show warning if text was truncated
        setTimeout(() => {
          alert(`Text was automatically trimmed to ${maxLength} characters to prevent QR generation errors. Please keep content within recommended limits.`);
        }, 100);
      }
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: processedValue
    }));
    
    // Enable live preview once user starts typing
    if (processedValue && processedValue.toString().trim()) {
      setShowLivePreview(true);
    }
  };

  // Get maximum length for different field types
  const getMaxLengthForField = (field) => {
    switch (field) {
      case 'text':
        return 2500; // Further reduced from 3000 for extra safety
      case 'urls':
        return 2000; // Further reduced from 2500 for extra safety
      case 'smsMessage':
        return 600; // Further reduced from 800 for extra safety
      case 'body':
        return 800; // Reduced hard limit for email body
      default:
        return 400; // Default limit for other fields
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Render form fields based on data type
  const renderFormFields = () => {
    switch (dataType) {
      case 'text':
        return (
          <div className="form-group">
            <label htmlFor="text">Enter your text:</label>
            <textarea
              id="text"
              value={formData.text || ''}
              onChange={(e) => handleInputChange('text', e.target.value)}
              placeholder="Enter any text to encode in QR code..."
              rows="6"
              required
            />
            <div className="text-info">
              <div className="character-count">
                <span>Characters: {(formData.text || '').length}</span>
                {(formData.text || '').length > 2500 ? (
                  <small style={{ color: '#dc3545', marginLeft: '10px', fontWeight: 'bold' }}>
                    ❌ Word limit exceeded! Try below 2500 characters for optimal QR code generation
                  </small>
                ) : (formData.text || '').length > 1200 ? (
                  <small style={{ color: '#e74c3c', marginLeft: '10px' }}>
                    ⚠️ Large text may create complex QR codes that are harder to scan
                  </small>
                ) : (formData.text || '').length > 600 ? (
                  <small style={{ color: '#f39c12', marginLeft: '10px' }}>
                    📏 Long text - QR code will be optimized for maximum capacity
                  </small>
                ) : null}
              </div>
              <small className="capacity-info">
                💡 <strong>QR Capacity Guide:</strong><br/>
                • Short text (0-100 chars): Best scanning reliability<br/>
                • Medium text (100-500 chars): Good scanning with most devices<br/>
                • Long text (500-1000 chars): May require close scanning or high-resolution displays<br/>
                • Very long text (1000-2500 chars): Optimized for maximum capacity<br/>
                • <strong>Over 2500 chars: May fail to generate - keep text concise for best results</strong>
              </small>
            </div>
          </div>
        );

      case 'url':
        return (
          <div className="form-group">
            <label htmlFor="url">Website URL:</label>
            <input
              type="url"
              id="url"
              value={formData.url || ''}
              onChange={(e) => handleInputChange('url', e.target.value)}
              placeholder="https://example.com"
              required
            />
          </div>
        );

      case 'multi-url':
        return (
          <div className="form-group">
            <label htmlFor="urls">URLs (one per line):</label>
            <textarea
              id="urls"
              value={formData.urls || ''}
              onChange={(e) => handleInputChange('urls', e.target.value)}
              placeholder="https://example.com&#10;https://google.com&#10;https://github.com"
              rows="5"
              required
            />
            <div className="url-info">
              <div className="character-count">
                <span>Characters: {(formData.urls || '').length}</span>
                {(formData.urls || '').length > 1800 && (
                  <small style={{ color: '#dc3545', marginLeft: '10px', fontWeight: 'bold' }}>
                    ❌ Too many URLs! Try below 1800 characters for reliable QR generation
                  </small>
                )}
              </div>
              <small>Enter each URL on a new line. Keep total content under 1800 characters for best results.</small>
            </div>
          </div>
        );

      case 'email':
        return (
          <>
            <div className="form-group">
              <label htmlFor="email">Email Address:</label>
              <input
                type="email"
                id="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject (optional):</label>
              <input
                type="text"
                id="subject"
                value={formData.subject || ''}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Email subject"
              />
            </div>
            <div className="form-group">
              <label htmlFor="body">Message (optional):</label>
              <textarea
                id="body"
                value={formData.body || ''}
                onChange={(e) => handleInputChange('body', e.target.value)}
                placeholder="Email message"
                rows="3"
              />
            </div>
          </>
        );

      case 'phone':
        return (
          <div className="form-group">
            <label htmlFor="phone">Phone Number:</label>
            <input
              type="tel"
              id="phone"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder="+1234567890"
              required
            />
            <small>Include country code for international numbers</small>
          </div>
        );

      case 'sms':
        return (
          <>
            <div className="form-group">
              <label htmlFor="smsNumber">Phone Number:</label>
              <input
                type="tel"
                id="smsNumber"
                value={formData.smsNumber || ''}
                onChange={(e) => handleInputChange('smsNumber', e.target.value)}
                placeholder="+1234567890"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="smsMessage">Message:</label>
              <textarea
                id="smsMessage"
                value={formData.smsMessage || ''}
                onChange={(e) => handleInputChange('smsMessage', e.target.value)}
                placeholder="Your SMS message here..."
                rows="3"
                required
              />
              <div className="sms-info">
                <div className="character-count">
                  <span>Characters: {(formData.smsMessage || '').length}</span>
                  {(formData.smsMessage || '').length > 600 && (
                    <small style={{ color: '#dc3545', marginLeft: '10px', fontWeight: 'bold' }}>
                      ❌ Message too long! Try below 600 characters for SMS QR codes
                    </small>
                  )}
                </div>
                <small>Keep SMS messages concise for better QR code scanning</small>
              </div>
            </div>
          </>
        );

      case 'contact':
        return (
          <>
            <div className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName || ''}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
                placeholder="John"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName || ''}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactPhone">Phone:</label>
              <input
                type="tel"
                id="contactPhone"
                value={formData.contactPhone || ''}
                onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                placeholder="+1234567890"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Email:</label>
              <input
                type="email"
                id="contactEmail"
                value={formData.contactEmail || ''}
                onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="organization">Organization:</label>
              <input
                type="text"
                id="organization"
                value={formData.organization || ''}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                placeholder="Company Name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <textarea
                id="address"
                value={formData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder="123 Main St, City, State 12345"
                rows="2"
              />
            </div>
          </>
        );

      case 'app-link':
        return (
          <>
            <div className="form-group">
              <label htmlFor="appName">App Name:</label>
              <input
                type="text"
                id="appName"
                value={formData.appName || ''}
                onChange={(e) => handleInputChange('appName', e.target.value)}
                placeholder="My Awesome App"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="platform">Platform:</label>
              <select
                id="platform"
                value={formData.platform || 'ios'}
                onChange={(e) => handleInputChange('platform', e.target.value)}
                required
              >
                <option value="ios">iOS App Store</option>
                <option value="android">Google Play Store</option>
                <option value="web">Web App</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="appLink">App Link/URL:</label>
              <input
                type="url"
                id="appLink"
                value={formData.appLink || ''}
                onChange={(e) => handleInputChange('appLink', e.target.value)}
                placeholder="https://apps.apple.com/app/..."
                required
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="data-input-form">
      <h2>Enter {dataType.charAt(0).toUpperCase() + dataType.slice(1)} Information</h2>
      <form onSubmit={handleSubmit}>
        {renderFormFields()}
        <button type="submit" className="submit-button">
          Generate QR Code
        </button>
      </form>
      
      <LivePreview 
        dataType={dataType}
        formData={formData}
        isVisible={showLivePreview}
      />
    </div>
  );
};

export default DataInputForm;
