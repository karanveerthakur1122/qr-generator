import React, { useRef, useState } from 'react';
import CustomQRCode from './CustomQRCode';
import QRCustomization from './QRCustomization';
import '../styles/QRCodeDisplay.css';

const QRCodeDisplay = ({ data, label, dataType }) => {
  const qrRef = useRef();
  const [customization, setCustomization] = useState({
    fgColor: '#000000',
    bgColor: '#FFFFFF',
    size: 256,
    style: 'squares',
    logoImage: null,
    logoSize: 40, // Reduced default size
    errorCorrection: 'H',
    gradient: false,
    gradientColors: ['#667eea', '#764ba2'],
    shadow: false,
    border: false,
    borderColor: '#000000',
    borderWidth: 4
  });
  const [showCustomization, setShowCustomization] = useState(false);

  // Handle customization changes
  const handleCustomizationChange = (newCustomization) => {
    // Ensure logo size is within safe limits for scanning
    if (newCustomization.logoImage && newCustomization.logoSize) {
      const maxSafeLogoSize = Math.floor(newCustomization.size * 0.15);
      if (newCustomization.logoSize > maxSafeLogoSize) {
        newCustomization.logoSize = maxSafeLogoSize;
      }
    }
    setCustomization(newCustomization);
  };

  // Check if QR code is likely to be scannable with current logo settings
  const getScanningStatus = () => {
    if (!customization.logoImage) {
      return { status: 'optimal', message: 'QR code should scan perfectly' };
    }
    
    const logoPercentage = (customization.logoSize * customization.logoSize) / (customization.size * customization.size) * 100;
    
    if (logoPercentage <= 2.25) { // 15% of width/height = 2.25% of area
      return { status: 'good', message: 'QR code should scan well with this logo size' };
    } else if (logoPercentage <= 6.25) { // 25% of width/height = 6.25% of area
      return { status: 'warning', message: 'Logo may affect scanning - consider reducing size' };
    } else {
      return { status: 'error', message: 'Logo too large - scanning may fail' };
    }
  };

  const scanningStatus = getScanningStatus();

  // Get container style
  const getContainerStyle = () => {
    const style = {};
    
    if (customization.border) {
      style.border = `${customization.borderWidth}px solid ${customization.borderColor}`;
    }
    
    return style;
  };
  const downloadAsPNG = () => {
    // Look for either canvas or svg in the QR container
    const qrContainer = qrRef.current;
    const canvas = qrContainer.querySelector('canvas');
    const svg = qrContainer.querySelector('svg');
    
    if (canvas) {
      // Direct canvas download
      const link = document.createElement('a');
      link.download = `qr-code-${dataType}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else if (svg) {
      // Convert SVG to canvas then download
      const newCanvas = document.createElement('canvas');
      const ctx = newCanvas.getContext('2d');
      const data = new XMLSerializer().serializeToString(svg);
      const DOMURL = window.URL || window.webkitURL || window;

      const img = new Image();
      const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      const url = DOMURL.createObjectURL(svgBlob);

      img.onload = function () {
        newCanvas.width = customization.size;
        newCanvas.height = customization.size;
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, newCanvas.width, newCanvas.height);
        ctx.drawImage(img, 0, 0, newCanvas.width, newCanvas.height);
        DOMURL.revokeObjectURL(url);

        const imgURI = newCanvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
        const link = document.createElement('a');
        link.setAttribute('download', `qr-code-${dataType}.png`);
        link.setAttribute('href', imgURI);
        link.click();
      };

      img.src = url;
    }
  };

  // Download QR code as SVG
  const downloadAsSVG = () => {
    const qrContainer = qrRef.current;
    const svg = qrContainer.querySelector('svg');
    
    if (svg) {
      const data = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = svgUrl;
      downloadLink.download = `qr-code-${dataType}.svg`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    } else {
      // If it's a canvas, we can't directly download as SVG
      alert('SVG download is only available for styled QR codes (dots/rounded). PNG download is available for all styles.');
    }
  };

  // Copy data to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(data).then(() => {
      alert('QR code data copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  };

  // Get appropriate icon for data type
  const getDataTypeIcon = () => {
    const icons = {
      'text': '📝',
      'url': '🔗',
      'multi-url': '🔗🔗',
      'email': '📧',
      'phone': '📞',
      'sms': '💬',
      'contact': '👤',
      'app-link': '📱',
      'pdf': '📄',
      'image': '🖼️'
    };
    return icons[dataType] || '🔢';
  };

  return (
    <div className="qr-code-display">
      <div className="qr-header">
        <h2>
          <span className="qr-icon">{getDataTypeIcon()}</span>
          Your QR Code
        </h2>
        <p className="qr-label">{label}</p>
        
        {/* Scanning Status Indicator */}
        <div className={`scanning-status ${scanningStatus.status}`}>
          <span className="status-icon">
            {scanningStatus.status === 'optimal' && '✅'}
            {scanningStatus.status === 'good' && '✅'}
            {scanningStatus.status === 'warning' && '⚠️'}
            {scanningStatus.status === 'error' && '❌'}
          </span>
          <span className="status-message">{scanningStatus.message}</span>
        </div>
      </div>

      <div className="qr-container" ref={qrRef} style={getContainerStyle()}>
        <div className="qr-code-wrapper" style={{ position: 'relative' }}>
          <CustomQRCode
            value={data}
            size={customization.size}
            style={customization.style}
            fgColor={customization.fgColor}
            bgColor={customization.bgColor}
            level={customization.errorCorrection}
            gradient={customization.gradient}
            gradientColors={customization.gradientColors}
            shadow={customization.shadow}
          />
          
          {/* Center Logo */}
          {customization.logoImage && (
            <div 
              className="qr-logo"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `${customization.logoSize}px`,
                height: `${customization.logoSize}px`,
                background: 'white',
                borderRadius: '6px',
                padding: '3px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)',
                zIndex: 10
              }}
            >
              <img 
                src={customization.logoImage} 
                alt="QR Logo"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  borderRadius: '3px'
                }}
              />
            </div>
          )}
        </div>
      </div>

      <div className="qr-actions">
        <button onClick={() => setShowCustomization(!showCustomization)} className="action-button customize-btn">
          🎨 {showCustomization ? 'Hide' : 'Customize'}
        </button>
        <button onClick={downloadAsPNG} className="action-button download-png">
          📥 Download PNG
        </button>
        <button onClick={downloadAsSVG} className="action-button download-svg">
          📥 Download SVG
        </button>
        <button onClick={copyToClipboard} className="action-button copy-data">
          📋 Copy Data
        </button>
      </div>

      {/* Customization Panel */}
      {showCustomization && (
        <QRCustomization 
          onCustomizationChange={handleCustomizationChange} 
          qrData={data}
        />
      )}

      <div className="qr-info">
        <details>
          <summary>QR Code Data</summary>
          <div className="qr-data-preview">
            <pre>{data}</pre>
          </div>
        </details>
      </div>
    </div>
  );
};

export default QRCodeDisplay;
