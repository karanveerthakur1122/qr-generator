import React, { useState, useEffect } from 'react';
import CustomQRCode from './CustomQRCode';
import '../styles/LivePreview.css';
import { generateQRData } from '../services/qrService';

const LivePreview = ({ dataType, formData, isVisible }) => {
  const [qrData, setQrData] = useState('');
  const [qrLabel, setQrLabel] = useState('');

  useEffect(() => {
    if (isVisible && formData && Object.keys(formData).length > 0) {
      try {
        const { qrContent, label } = generateQRData(dataType, formData);
        // Only show preview if there's meaningful data
        if (qrContent && qrContent.trim() && qrContent !== 'Invalid data type') {
          setQrData(qrContent);
          setQrLabel(label);
        } else {
          setQrData('');
          setQrLabel('');
        }
      } catch (error) {
        setQrData('');
        setQrLabel('');
      }
    } else {
      setQrData('');
      setQrLabel('');
    }
  }, [dataType, formData, isVisible]);

  if (!isVisible || !qrData) {
    return null;
  }

  return (
    <div className="live-preview">
      <div className="live-preview-header">
        <h3>🔍 Live Preview</h3>
        <p>{qrLabel}</p>
      </div>
      <div className="live-preview-qr">
        <CustomQRCode
          value={qrData}
          size={128}
          style="squares"
          bgColor="#FFFFFF"
          fgColor="#000000"
          level="H"
        />
      </div>
    </div>
  );
};

export default LivePreview;
