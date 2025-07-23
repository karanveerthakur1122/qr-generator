# QR Code Generator

> **Developer:** Karan Veer Thakur  
> **GitHub:** [karanveerthakur1122](https://github.com/karanveerthakur1122)  
> **Portfolio:** [karanveerthakur.com.np](https://karanveerthakur.com.np)

A comprehensive React web application for generating highly customizable QR codes from various types of data including text, URLs, contact information, and more.

## 🚀 Live Demo

Deploy this project to Netlify for instant hosting and sharing.

## ✨ Features

### Core Features
- **🔢 Multiple Data Types**: Support for 10 different data types
  - Plain Text
  - Single URL
  - Multiple URLs
  - Email (with subject and body)
  - Phone Numbers
  - SMS (with message)
  - Contact Information (vCard format)
  - App Links (iOS/Android/Web)
  - PDF File Upload
  - Image Upload (PNG/JPG)

- **🎨 Advanced QR Customization**
  - Custom colors (foreground and background)
  - Gradient effects with dual colors
  - Multiple visual styles (squares, dots, rounded)
  - Adjustable size (128px - 512px)
  - Center logo/image embedding
  - Drop shadow effects
  - Custom borders with color and width options
  - High error correction for logo compatibility

- **💾 Export Options**: Download QR codes as PNG or SVG files
- **👁️ Live Preview**: Real-time QR code preview as you type
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices

### Bonus Features
- **🌙 Dark Mode Toggle**: Switch between light and dark themes
- **📋 Copy to Clipboard**: Copy generated data to clipboard
- **🖼️ File Preview**: Preview uploaded images before QR generation
- **✅ Form Validation**: Comprehensive input validation
- **♿ Accessibility**: Full keyboard navigation and screen reader support
- **🎯 Quick Presets**: Pre-configured style combinations

## 🛠️ Tech Stack

- **Frontend**: React.js (Create React App)
- **QR Generation**: react-qr-code library
- **Styling**: Pure CSS (no frameworks)
- **File Handling**: FileReader API

## 🚀 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd qr-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── DataTypeSelector.js    # Data type selection interface
│   ├── DataInputForm.js       # Dynamic form for data input
│   ├── QRCodeDisplay.js       # QR code display and download
│   ├── QRCustomization.js     # Advanced QR styling options
│   ├── LivePreview.js         # Live preview component
│   └── DarkModeToggle.js      # Dark mode toggle
├── services/            # Business logic
│   └── qrService.js           # QR data generation and validation
├── styles/              # CSS files
│   ├── App.css               # Main app styles
│   ├── DataTypeSelector.css  # Selector component styles
│   ├── DataInputForm.css     # Form component styles
│   ├── QRCodeDisplay.css     # Display component styles
│   ├── QRCustomization.css   # Customization panel styles
│   ├── LivePreview.css       # Preview component styles
│   └── DarkModeToggle.css    # Dark mode styles
└── App.js               # Main application component
```

## 🎨 QR Customization Features

### Color Options
- **Foreground Color**: Choose any color for the QR code pattern
- **Background Color**: Set custom background colors
- **Gradient Effects**: Apply beautiful gradient overlays

### Visual Styles
- **Squares**: Classic QR code appearance
- **Dots**: Modern circular dot pattern
- **Rounded**: Soft rounded corners for a friendly look

### Logo Integration
- **Center Logo**: Add your brand logo to the center
- **Adjustable Size**: Control logo size from 20px to 100px
- **Auto Background**: White background with shadow for logo visibility

### Effects & Enhancements
- **Drop Shadow**: Add depth with customizable shadows
- **Borders**: Custom border colors and widths
- **Size Control**: Generate QR codes from 128px to 512px
- **Error Correction**: High-level error correction for logo compatibility

### Quick Presets
- Classic (Black & White)
- Blue Ocean
- Purple Dream
- Forest Green
- Sunset Orange
- Dark Mode

## 📖 Usage

1. **Select Data Type**: Choose from the available data types using the visual selector
2. **Enter Information**: Fill in the required fields in the dynamic form
3. **Live Preview**: Watch the QR code update in real-time as you type (optional)
4. **Generate**: Click "Generate QR Code" to create the final QR code
5. **Customize**: Click the "🎨 Customize" button to access advanced styling options
6. **Download**: Export your QR code as PNG or SVG
7. **Share**: Copy the generated data to clipboard for sharing

## 🎯 Data Type Details

### Text
Simple plain text encoding. Supports any UTF-8 text content.

### URL
Single website URL with automatic validation. Supports HTTP and HTTPS protocols.

### Multiple URLs
Multiple website URLs, one per line. Creates a formatted list for scanning.

### Email
Email composition with optional subject and body. Creates mailto: links.

### Phone
Phone numbers with international format support. Creates tel: links.

### SMS
SMS composition with phone number and message. Creates sms: links.

### Contact (vCard)
Full contact information including:
- Name (first and last)
- Phone number
- Email address
- Organization
- Address

Generates industry-standard vCard format.

### App Link
Application download links with platform selection:
- iOS App Store
- Google Play Store
- Web Application

### File Upload
Supports PDF and image file uploads. Files are converted to data URLs for QR encoding.

## 🌐 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 11+
- Edge 16+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React.js team for the excellent framework
- react-qr-code library for QR code generation
- Modern CSS techniques for responsive design

## 🗺️ Roadmap

Future enhancements planned:
- [ ] WiFi QR code generation
- [ ] Calendar event QR codes
- [ ] Cryptocurrency wallet addresses
- [ ] Social media profile links
- [ ] Animated QR codes
- [ ] Batch QR code generation
- [ ] QR code scanning capability
- [ ] Export to different formats (PDF, JPEG)
- [ ] API integration for URL shortening
- [ ] QR code analytics and tracking

---

Built with ❤️ using React.js

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
