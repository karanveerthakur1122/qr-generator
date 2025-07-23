import React from 'react';
import '../styles/ErrorBoundary.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error for debugging
    console.error('QR Generator Error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (this.props.onRetry) {
      this.props.onRetry();
    }
  };

  render() {
    if (this.state.hasError) {
      const isQRError = this.state.error?.message?.includes('code length overflow');
      
      return (
        <div className="error-boundary">
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>QR Code Generation Failed</h2>
            
            {isQRError ? (
              <div className="error-content">
                <p className="error-message">
                  <strong>Data Too Large!</strong> The text you entered is too long to generate a QR code.
                </p>
                <div className="error-details">
                  <p>QR codes have a maximum capacity of approximately <strong>4,000 characters</strong>.</p>
                  <p>Your text appears to be much longer than this limit.</p>
                </div>
                <div className="error-suggestions">
                  <h4>Suggestions:</h4>
                  <ul>
                    <li>🔹 Shorten your text to under 4,000 characters</li>
                    <li>🔹 Use a URL shortener for long links</li>
                    <li>🔹 Upload your content to a cloud service and create a URL QR code instead</li>
                    <li>🔹 Split your content into multiple QR codes</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="error-content">
                <p className="error-message">
                  Something went wrong while generating your QR code.
                </p>
                <details className="error-details-technical">
                  <summary>Technical Details</summary>
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                </details>
              </div>
            )}
            
            <div className="error-actions">
              <button 
                className="retry-button"
                onClick={this.handleRetry}
              >
                Try Again
              </button>
              <button 
                className="clear-button"
                onClick={() => {
                  this.handleRetry();
                  if (this.props.onClear) {
                    this.props.onClear();
                  }
                }}
              >
                Clear Data & Start Over
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
