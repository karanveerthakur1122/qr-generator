import React, { useState, useEffect } from 'react';
import '../styles/QRCustomization.css';

const QRCustomization = ({ onCustomizationChange, qrData }) => {
  const [customization, setCustomization] = useState({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    size: 256,
    style: 'squares', // squares, dots, rounded
    logoImage: null,
    logoSize: 40, // Reduced default size for better scanning
    errorCorrection: 'H',
    gradient: false,
    gradientColors: ['#667eea', '#764ba2'],
    shadow: false,
    border: false,
    borderColor: '#000000',
    borderWidth: 4
  });

  // Auto-optimize error correction when data changes (but not when logo is present)
  useEffect(() => {
    if (qrData && !customization.logoImage) {
      const dataLength = qrData.length;
      let optimalErrorCorrection = 'H';
      
      if (dataLength > 1000) {
        optimalErrorCorrection = 'L'; // Low for very long text
      } else if (dataLength > 500) {
        optimalErrorCorrection = 'M'; // Medium for moderately long text
      } else if (dataLength > 100) {
        optimalErrorCorrection = 'Q'; // Quartile for short-medium text
      }
      
      if (customization.errorCorrection !== optimalErrorCorrection) {
        const newCustomization = {
          ...customization,
          errorCorrection: optimalErrorCorrection
        };
        setCustomization(newCustomization);
        onCustomizationChange(newCustomization);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [qrData, customization.logoImage]);

  const handleCustomizationChange = (field, value) => {
    const newCustomization = {
      ...customization,
      [field]: value
    };
    
    // Auto-adjust logo size based on QR code size to maintain scannability
    if (field === 'size' && customization.logoImage) {
      const maxLogoSize = Math.floor(value * 0.15); // Logo should be max 15% of QR size
      if (customization.logoSize > maxLogoSize) {
        newCustomization.logoSize = maxLogoSize;
      }
    }
    
    // When logo is added, ensure high error correction
    if (field === 'logoImage' && value) {
      newCustomization.errorCorrection = 'H';
      // Ensure logo size doesn't exceed safe limits
      const maxLogoSize = Math.floor(customization.size * 0.15);
      if (customization.logoSize > maxLogoSize) {
        newCustomization.logoSize = maxLogoSize;
      }
    }
    
    setCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        handleCustomizationChange('logoImage', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const presetStyles = [
    { name: 'Classic', fgColor: '#000000', bgColor: '#FFFFFF', style: 'squares' },
    { name: 'Blue Ocean', fgColor: '#2980b9', bgColor: '#ecf0f1', style: 'rounded' },
    { name: 'Purple Dream', fgColor: '#8e44ad', bgColor: '#f8f9fa', style: 'dots' },
    { name: 'Forest Green', fgColor: '#27ae60', bgColor: '#ffffff', style: 'squares' },
    { name: 'Sunset Orange', fgColor: '#e74c3c', bgColor: '#fff5f5', style: 'rounded' },
    { name: 'Dark Mode', fgColor: '#ecf0f1', bgColor: '#2c3e50', style: 'squares' }
  ];

  const applyPreset = (preset) => {
    const newCustomization = {
      ...customization,
      fgColor: preset.fgColor,
      bgColor: preset.bgColor,
      style: preset.style,
      gradient: false
    };
    setCustomization(newCustomization);
    onCustomizationChange(newCustomization);
  };

  return (
    <div className="qr-customization">
      <h3>🎨 Customize QR Code</h3>
      
      {/* Quick Presets */}
      <div className="customization-section">
        <h4>Quick Presets</h4>
        <div className="preset-buttons">
          {presetStyles.map((preset, index) => (
            <button
              key={index}
              className="preset-button"
              onClick={() => applyPreset(preset)}
              style={{
                background: preset.bgColor,
                color: preset.fgColor,
                border: `2px solid ${preset.fgColor}`
              }}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="customization-section">
        <h4>Colors</h4>
        <div className="color-controls">
          <div className="color-group">
            <label htmlFor="fgColor">QR Code Color:</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                id="fgColor"
                value={customization.fgColor}
                onChange={(e) => handleCustomizationChange('fgColor', e.target.value)}
              />
              <input
                type="text"
                value={customization.fgColor}
                onChange={(e) => handleCustomizationChange('fgColor', e.target.value)}
                placeholder="#000000"
              />
            </div>
          </div>
          
          <div className="color-group">
            <label htmlFor="bgColor">Background Color:</label>
            <div className="color-input-wrapper">
              <input
                type="color"
                id="bgColor"
                value={customization.bgColor}
                onChange={(e) => handleCustomizationChange('bgColor', e.target.value)}
              />
              <input
                type="text"
                value={customization.bgColor}
                onChange={(e) => handleCustomizationChange('bgColor', e.target.value)}
                placeholder="#FFFFFF"
              />
            </div>
          </div>
        </div>

        {/* Gradient Option */}
        <div className="gradient-section">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={customization.gradient}
              onChange={(e) => handleCustomizationChange('gradient', e.target.checked)}
            />
            Enable Gradient Effect
          </label>
          
          {customization.gradient && (
            <div className="gradient-colors">
              <div className="color-group">
                <label>Gradient Start:</label>
                <input
                  type="color"
                  value={customization.gradientColors[0]}
                  onChange={(e) => handleCustomizationChange('gradientColors', [e.target.value, customization.gradientColors[1]])}
                />
              </div>
              <div className="color-group">
                <label>Gradient End:</label>
                <input
                  type="color"
                  value={customization.gradientColors[1]}
                  onChange={(e) => handleCustomizationChange('gradientColors', [customization.gradientColors[0], e.target.value])}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Style Options */}
      <div className="customization-section">
        <h4>Style</h4>
        <div className="style-options">
          <label className="radio-label">
            <input
              type="radio"
              name="style"
              value="squares"
              checked={customization.style === 'squares'}
              onChange={(e) => handleCustomizationChange('style', e.target.value)}
            />
            <span className="style-preview squares"></span>
            Squares
          </label>
          
          <label className="radio-label">
            <input
              type="radio"
              name="style"
              value="dots"
              checked={customization.style === 'dots'}
              onChange={(e) => handleCustomizationChange('style', e.target.value)}
            />
            <span className="style-preview dots"></span>
            Dots
          </label>
          
          <label className="radio-label">
            <input
              type="radio"
              name="style"
              value="rounded"
              checked={customization.style === 'rounded'}
              onChange={(e) => handleCustomizationChange('style', e.target.value)}
            />
            <span className="style-preview rounded"></span>
            Rounded
          </label>
        </div>
      </div>

      {/* Size */}
      <div className="customization-section">
        <h4>Size</h4>
        <div className="size-control">
          <label htmlFor="size">Size: {customization.size}px</label>
          <input
            type="range"
            id="size"
            min="128"
            max="512"
            step="32"
            value={customization.size}
            onChange={(e) => handleCustomizationChange('size', parseInt(e.target.value))}
          />
        </div>
      </div>

      {/* Logo */}
      <div className="customization-section">
        <h4>Center Logo</h4>
        <div className="logo-controls">
          <div className="logo-upload">
            <label htmlFor="logoUpload">Upload Logo:</label>
            <input
              type="file"
              id="logoUpload"
              accept="image/*"
              onChange={handleLogoUpload}
            />
            <small>💡 Tip: Use simple, high-contrast logos for best scanning results</small>
          </div>
          
          {customization.logoImage && (
            <>
              <div className="logo-preview">
                <img src={customization.logoImage} alt="Logo preview" />
              </div>
              
              <div className="logo-size-control">
                <label htmlFor="logoSize">Logo Size: {customization.logoSize}px</label>
                <input
                  type="range"
                  id="logoSize"
                  min="20"
                  max={Math.floor(customization.size * 0.15)} // Dynamic max based on QR size
                  step="5"
                  value={customization.logoSize}
                  onChange={(e) => handleCustomizationChange('logoSize', parseInt(e.target.value))}
                />
                <small>Max: {Math.floor(customization.size * 0.15)}px (15% of QR size for optimal scanning)</small>
              </div>
              
              <button
                className="remove-logo-btn"
                onClick={() => handleCustomizationChange('logoImage', null)}
              >
                Remove Logo
              </button>
            </>
          )}
        </div>
      </div>

      {/* Effects */}
      <div className="customization-section">
        <h4>Effects</h4>
        <div className="effect-controls">
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={customization.shadow}
              onChange={(e) => handleCustomizationChange('shadow', e.target.checked)}
            />
            Drop Shadow
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={customization.border}
              onChange={(e) => handleCustomizationChange('border', e.target.checked)}
            />
            Border
          </label>
          
          {customization.border && (
            <div className="border-controls">
              <div className="color-group">
                <label>Border Color:</label>
                <input
                  type="color"
                  value={customization.borderColor}
                  onChange={(e) => handleCustomizationChange('borderColor', e.target.value)}
                />
              </div>
              <div className="border-width-control">
                <label>Border Width: {customization.borderWidth}px</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={customization.borderWidth}
                  onChange={(e) => handleCustomizationChange('borderWidth', parseInt(e.target.value))}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Correction */}
      <div className="customization-section">
        <h4>Error Correction</h4>
        <select
          value={customization.errorCorrection}
          onChange={(e) => handleCustomizationChange('errorCorrection', e.target.value)}
          className="error-correction-select"
          disabled={customization.logoImage} // Lock to 'H' when logo is present
        >
          <option value="L">Low (7%) - Best for long text</option>
          <option value="M">Medium (15%) - Balanced</option>
          <option value="Q">Quartile (25%) - Good reliability</option>
          <option value="H">High (30%) - Best for logos/short text</option>
        </select>
        {customization.logoImage ? (
          <small style={{ color: '#e74c3c', fontWeight: 'bold' }}>
            ⚠️ High error correction automatically enabled for logo compatibility
          </small>
        ) : qrData && (
          <small style={{ color: '#17a2b8', fontWeight: 'normal' }}>
            💡 Error correction auto-optimized for data length ({qrData.length} chars)
          </small>
        )}
      </div>
    </div>
  );
};

export default QRCustomization;
