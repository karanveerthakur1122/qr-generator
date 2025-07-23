import React, { useEffect, useRef } from 'react';
import QRCode from 'qrcode';

const CustomQRCode = ({ 
  value, 
  size = 256, 
  fgColor = '#000000', 
  bgColor = '#ffffff', 
  style = 'squares', 
  level = 'H',
  gradient = false,
  gradientColors = ['#667eea', '#764ba2'],
  shadow = false
}) => {
  const canvasRef = useRef();
  const svgRef = useRef();

  useEffect(() => {
    const generateCustomQR = async () => {
      try {
        // Generate QR matrix data
        const qrMatrix = await QRCode.create(value, {
          errorCorrectionLevel: level,
          margin: 1,
          width: size
        });

        // Get the modules (black/white squares)
        const modules = qrMatrix.modules;
        const moduleCount = modules.size;
        const moduleSize = size / (moduleCount + 2); // +2 for margin

        if (style === 'squares' && !gradient) {
          // Use canvas for simple squares without gradient
          generateCanvasQR(modules, moduleCount, moduleSize);
        } else {
          // Use SVG for custom styles and gradients
          generateSVGQR(modules, moduleCount, moduleSize);
        }
      } catch (error) {
        console.error('Error generating QR code:', error);
      }
    };

    generateCustomQR();
  }, [value, size, fgColor, bgColor, style, level, gradient, gradientColors, shadow]);

  const generateCanvasQR = (modules, moduleCount, moduleSize) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = size;
    canvas.height = size;

    // Clear canvas with background color
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    // Draw QR modules
    ctx.fillStyle = fgColor;
    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (modules.get(row, col)) {
          const x = (col + 1) * moduleSize;
          const y = (row + 1) * moduleSize;
          ctx.fillRect(x, y, moduleSize, moduleSize);
        }
      }
    }
  };

  const generateSVGQR = (modules, moduleCount, moduleSize) => {
    const svg = svgRef.current;
    if (!svg) return;

    // Clear existing content
    svg.innerHTML = '';

    // Create gradient definition if needed
    if (gradient) {
      const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
      const gradientDef = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
      gradientDef.setAttribute('id', 'qr-gradient');
      gradientDef.setAttribute('x1', '0%');
      gradientDef.setAttribute('y1', '0%');
      gradientDef.setAttribute('x2', '100%');
      gradientDef.setAttribute('y2', '100%');

      const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop1.setAttribute('offset', '0%');
      stop1.setAttribute('stop-color', gradientColors[0]);

      const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
      stop2.setAttribute('offset', '100%');
      stop2.setAttribute('stop-color', gradientColors[1]);

      gradientDef.appendChild(stop1);
      gradientDef.appendChild(stop2);
      defs.appendChild(gradientDef);
      svg.appendChild(defs);
    }

    // Create background
    const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    background.setAttribute('width', size);
    background.setAttribute('height', size);
    background.setAttribute('fill', bgColor);
    svg.appendChild(background);

    // Draw QR modules based on style
    const fillColor = gradient ? 'url(#qr-gradient)' : fgColor;

    for (let row = 0; row < moduleCount; row++) {
      for (let col = 0; col < moduleCount; col++) {
        if (modules.get(row, col)) {
          const x = (col + 1) * moduleSize;
          const y = (row + 1) * moduleSize;

          let element;
          
          switch (style) {
            case 'dots':
              element = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
              element.setAttribute('cx', x + moduleSize / 2);
              element.setAttribute('cy', y + moduleSize / 2);
              element.setAttribute('r', moduleSize * 0.4); // Slightly smaller for better appearance
              element.setAttribute('fill', fillColor);
              break;

            case 'rounded':
              element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
              element.setAttribute('x', x);
              element.setAttribute('y', y);
              element.setAttribute('width', moduleSize);
              element.setAttribute('height', moduleSize);
              element.setAttribute('rx', moduleSize * 0.2); // 20% rounding
              element.setAttribute('ry', moduleSize * 0.2);
              element.setAttribute('fill', fillColor);
              break;

            default: // squares
              element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
              element.setAttribute('x', x);
              element.setAttribute('y', y);
              element.setAttribute('width', moduleSize);
              element.setAttribute('height', moduleSize);
              element.setAttribute('fill', fillColor);
              break;
          }

          svg.appendChild(element);
        }
      }
    }
  };

  return (
    <div style={{ 
      display: 'inline-block', 
      position: 'relative',
      filter: shadow ? 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))' : 'none'
    }}>
      {style === 'squares' && !gradient ? (
        <canvas
          ref={canvasRef}
          style={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto'
          }}
        />
      ) : (
        <svg
          ref={svgRef}
          width={size}
          height={size}
          style={{
            display: 'block',
            maxWidth: '100%',
            height: 'auto'
          }}
          viewBox={`0 0 ${size} ${size}`}
        />
      )}
    </div>
  );
};

export default CustomQRCode;
