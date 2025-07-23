/**
 * QR Service - Handles generating QR code data for different types
 */

// Generate vCard format for contact information
const generateVCard = (contactData) => {
  const { firstName, lastName, contactPhone, contactEmail, organization, address } = contactData;
  
  let vcard = 'BEGIN:VCARD\n';
  vcard += 'VERSION:3.0\n';
  
  if (firstName || lastName) {
    vcard += `FN:${firstName || ''} ${lastName || ''}`.trim() + '\n';
    vcard += `N:${lastName || ''};${firstName || ''};;;\n`;
  }
  
  if (contactPhone) {
    vcard += `TEL:${contactPhone}\n`;
  }
  
  if (contactEmail) {
    vcard += `EMAIL:${contactEmail}\n`;
  }
  
  if (organization) {
    vcard += `ORG:${organization}\n`;
  }
  
  if (address) {
    vcard += `ADR:;;${address};;;;\n`;
  }
  
  vcard += 'END:VCARD';
  
  return vcard;
};

// Main function to generate QR data based on type
export const generateQRData = (dataType, formData) => {
  let qrContent = '';
  let label = '';

  switch (dataType) {
    case 'text':
      qrContent = formData.text || '';
      label = 'Scan to view text';
      break;

    case 'url':
      qrContent = formData.url || '';
      label = 'Scan to visit website';
      break;

    case 'multi-url':
      const urls = formData.urls ? formData.urls.split('\n').filter(url => url.trim()) : [];
      if (urls.length === 1) {
        qrContent = urls[0];
        label = 'Scan to visit website';
      } else {
        // Create a simple list format for multiple URLs
        qrContent = 'Multiple URLs:\n' + urls.join('\n');
        label = `Scan to view ${urls.length} URLs`;
      }
      break;

    case 'email':
      const { email, subject, body } = formData;
      qrContent = `mailto:${email || ''}`;
      const params = [];
      if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
      if (body) params.push(`body=${encodeURIComponent(body)}`);
      if (params.length > 0) {
        qrContent += '?' + params.join('&');
      }
      label = 'Scan to send email';
      break;

    case 'phone':
      qrContent = `tel:${formData.phone || ''}`;
      label = 'Scan to call phone number';
      break;

    case 'sms':
      const { smsNumber, smsMessage } = formData;
      qrContent = `sms:${smsNumber || ''}`;
      if (smsMessage) {
        qrContent += `?body=${encodeURIComponent(smsMessage)}`;
      }
      label = 'Scan to send SMS';
      break;

    case 'contact':
      qrContent = generateVCard(formData);
      label = 'Scan to save contact';
      break;

    case 'app-link':
      const { appName, platform, appLink } = formData;
      qrContent = appLink || '';
      const platformLabel = platform === 'ios' ? 'App Store' : platform === 'android' ? 'Play Store' : 'Web';
      label = `Scan to download ${appName || 'app'} from ${platformLabel}`;
      break;

    default:
      qrContent = 'Invalid data type';
      label = 'Error generating QR code';
      break;
  }

  return {
    qrContent,
    label
  };
};

// Utility function to validate data before QR generation
export const validateQRData = (dataType, formData) => {
  const errors = [];

  switch (dataType) {
    case 'text':
      if (!formData.text || formData.text.trim().length === 0) {
        errors.push('Text is required');
      } else if (formData.text.length > 2500) {
        errors.push('Text is too long. Please keep it under 2500 characters for optimal QR code generation.');
      }
      break;

    case 'url':
      if (!formData.url) {
        errors.push('URL is required');
      } else {
        try {
          new URL(formData.url);
        } catch {
          errors.push('Please enter a valid URL');
        }
      }
      break;

    case 'multi-url':
      if (!formData.urls) {
        errors.push('At least one URL is required');
      } else if (formData.urls.length > 1800) {
        errors.push('URL list is too long. Please keep it under 1800 characters for reliable QR generation.');
      } else {
        const urls = formData.urls.split('\n').filter(url => url.trim());
        if (urls.length === 0) {
          errors.push('At least one URL is required');
        } else {
          urls.forEach((url, index) => {
            try {
              new URL(url.trim());
            } catch {
              errors.push(`URL ${index + 1} is not valid: ${url}`);
            }
          });
        }
      }
      break;

    case 'email':
      if (!formData.email) {
        errors.push('Email address is required');
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          errors.push('Please enter a valid email address');
        }
      }
      break;

    case 'phone':
      if (!formData.phone) {
        errors.push('Phone number is required');
      }
      break;

    case 'sms':
      if (!formData.smsNumber) {
        errors.push('Phone number is required');
      }
      if (!formData.smsMessage) {
        errors.push('SMS message is required');
      } else if (formData.smsMessage.length > 600) {
        errors.push('SMS message is too long. Please keep it under 600 characters for SMS QR codes.');
      }
      break;

    case 'contact':
      if (!formData.firstName && !formData.lastName) {
        errors.push('At least first name or last name is required');
      }
      break;

    case 'app-link':
      if (!formData.appName) {
        errors.push('App name is required');
      }
      if (!formData.appLink) {
        errors.push('App link is required');
      } else {
        try {
          new URL(formData.appLink);
        } catch {
          errors.push('Please enter a valid app link URL');
        }
      }
      break;
      
    default:
      errors.push('Unknown data type');
      break;
  }

  return errors;
};
