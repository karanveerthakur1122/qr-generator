import React, { useState } from 'react';
import './styles/App.css';
import DataTypeSelector from './components/DataTypeSelector';
import DataInputForm from './components/DataInputForm';
import QRCodeDisplay from './components/QRCodeDisplay';
import DarkModeToggle from './components/DarkModeToggle';
import ErrorBoundary from './components/ErrorBoundary';
import Footer from './components/Footer';
import { generateQRData } from './services/qrService';

function App() {
  const [selectedDataType, setSelectedDataType] = useState('text');
  const [formData, setFormData] = useState({});
  const [qrData, setQrData] = useState('');
  const [qrLabel, setQrLabel] = useState('');

  // Handle data type selection
  const handleDataTypeChange = (dataType) => {
    setSelectedDataType(dataType);
    setFormData({});
    setQrData('');
    setQrLabel('');
  };

  // Handle form data submission
  const handleFormSubmit = (data) => {
    try {
      setFormData(data);
      const { qrContent, label } = generateQRData(selectedDataType, data);
      
      // Additional safety check for extremely long data
      if (qrContent.length > 10000) {
        alert(`Data is too large (${qrContent.length} characters). Please reduce the content to under 4,000 characters for optimal QR code generation.`);
        return;
      }
      
      setQrData(qrContent);
      setQrLabel(label);
    } catch (error) {
      console.error('Error generating QR data:', error);
      alert('Failed to generate QR data. Please check your input and try again.');
    }
  };

  // Handle error retry
  const handleErrorRetry = () => {
    // Clear current QR data to reset the error state
    setQrData('');
    setQrLabel('');
  };

  // Handle clear data
  const handleClearData = () => {
    setFormData({});
    setQrData('');
    setQrLabel('');
  };

  return (
    <div className="app">
      <DarkModeToggle />
      
      <header className="app-header">
        <h1>QR Code Generator</h1>
        <p>Create custom QR codes for different types of data</p>
      </header>

      <main className="app-main">
        <div className="app-container">
          {/* Data Type Selection */}
          <section className="data-type-section">
            <DataTypeSelector 
              selectedType={selectedDataType}
              onTypeChange={handleDataTypeChange}
            />
          </section>

          {/* Input Form */}
          <section className="input-form-section">
            <DataInputForm 
              dataType={selectedDataType}
              onSubmit={handleFormSubmit}
              initialData={formData}
            />
          </section>

          {/* QR Code Display */}
          {qrData && (
            <section className="qr-display-section">
              <ErrorBoundary 
                onRetry={handleErrorRetry}
                onClear={handleClearData}
              >
                <QRCodeDisplay 
                  data={qrData}
                  label={qrLabel}
                  dataType={selectedDataType}
                />
              </ErrorBoundary>
            </section>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
