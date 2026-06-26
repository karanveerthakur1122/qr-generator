# Graph Report - .  (2026-06-26)

## Corpus Check
- Corpus is ~22,036 words - fits in a single context window. You may not need a graph.

## Summary
- 273 nodes · 271 edges · 66 communities detected
- Extraction: 79% EXTRACTED · 20% INFERRED · 1% AMBIGUOUS · INFERRED: 54 edges (avg confidence: 0.56)
- Token cost: 4,200 input · 2,800 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Custom QR Engine|Custom QR Engine]]
- [[_COMMUNITY_QR Engine & Export|QR Engine & Export]]
- [[_COMMUNITY_README Features|README Features]]
- [[_COMMUNITY_Legacy Docs Hub|Legacy Docs Hub]]
- [[_COMMUNITY_Deployment & Branding|Deployment & Branding]]
- [[_COMMUNITY_QR Data Service|QR Data Service]]
- [[_COMMUNITY_Custom QR Styles|Custom QR Styles]]
- [[_COMMUNITY_QR Preview & Payloads|QR Preview & Payloads]]
- [[_COMMUNITY_Preview & Display|Preview & Display]]
- [[_COMMUNITY_Favicon Branding|Favicon Branding]]
- [[_COMMUNITY_Theme Toggle|Theme Toggle]]
- [[_COMMUNITY_Error Boundary|Error Boundary]]
- [[_COMMUNITY_QR Form|QR Form]]
- [[_COMMUNITY_React 19|React 19]]
- [[_COMMUNITY_Batch Generator|Batch Generator]]
- [[_COMMUNITY_Wizard Content|Wizard Content]]
- [[_COMMUNITY_QR Data Generation|QR Data Generation]]
- [[_COMMUNITY_Footer Component|Footer Component]]
- [[_COMMUNITY_App Root|App Root]]
- [[_COMMUNITY_History Drawer|History Drawer]]
- [[_COMMUNITY_Customization Panel|Customization Panel]]
- [[_COMMUNITY_QR Studio Entry|QR Studio Entry]]
- [[_COMMUNITY_Legacy App|Legacy App]]
- [[_COMMUNITY_QR Service Functions|QR Service Functions]]
- [[_COMMUNITY_App Root Component|App Root Component]]
- [[_COMMUNITY_Custom QR Component|Custom QR Component]]
- [[_COMMUNITY_Web Vitals|Web Vitals]]
- [[_COMMUNITY_Glass Background|Glass Background]]
- [[_COMMUNITY_Type Icons|Type Icons]]
- [[_COMMUNITY_Wizard Design Step|Wizard Design Step]]
- [[_COMMUNITY_Wizard Type Step|Wizard Type Step]]
- [[_COMMUNITY_Utils|Utils]]
- [[_COMMUNITY_Graph Report|Graph Report]]
- [[_COMMUNITY_Legacy Footer|Legacy Footer]]
- [[_COMMUNITY_Live Preview|Live Preview]]
- [[_COMMUNITY_QR Engine Docs|QR Engine Docs]]
- [[_COMMUNITY_QR Display|QR Display]]
- [[_COMMUNITY_QR Customization|QR Customization]]
- [[_COMMUNITY_Report Web Vitals|Report Web Vitals]]
- [[_COMMUNITY_App Entry Point|App Entry Point]]
- [[_COMMUNITY_App Test Suite|App Test Suite]]
- [[_COMMUNITY_Test Setup|Test Setup]]
- [[_COMMUNITY_Robots.txt|Robots.txt]]
- [[_COMMUNITY_Vite Config|Vite Config]]
- [[_COMMUNITY_Vite Env Types|Vite Env Types]]
- [[_COMMUNITY_Glass Card|Glass Card]]
- [[_COMMUNITY_Header Layout|Header Layout]]
- [[_COMMUNITY_QR Canvas|QR Canvas]]
- [[_COMMUNITY_Button UI|Button UI]]
- [[_COMMUNITY_Dialog UI|Dialog UI]]
- [[_COMMUNITY_Input UI|Input UI]]
- [[_COMMUNITY_Label UI|Label UI]]
- [[_COMMUNITY_Progress UI|Progress UI]]
- [[_COMMUNITY_Radio Group UI|Radio Group UI]]
- [[_COMMUNITY_Select UI|Select UI]]
- [[_COMMUNITY_Slider UI|Slider UI]]
- [[_COMMUNITY_Switch UI|Switch UI]]
- [[_COMMUNITY_Tabs UI|Tabs UI]]
- [[_COMMUNITY_Textarea UI|Textarea UI]]
- [[_COMMUNITY_Tooltip UI|Tooltip UI]]
- [[_COMMUNITY_Stepper|Stepper]]
- [[_COMMUNITY_Wizard Shell|Wizard Shell]]
- [[_COMMUNITY_History Store|History Store]]
- [[_COMMUNITY_Wizard Store|Wizard Store]]
- [[_COMMUNITY_Legacy Index|Legacy Index]]
- [[_COMMUNITY_Setup Tests|Setup Tests]]

## God Nodes (most connected - your core abstractions)
1. `App Features Documentation` - 13 edges
2. `QR Code Generator` - 11 edges
3. `QR Code Generator` - 10 edges
4. `renderFullCanvas()` - 8 edges
5. `Custom QR Engine` - 8 edges
6. `Custom QR Engine` - 8 edges
7. `Netlify Deployment` - 8 edges
8. `React Framework Branding` - 7 edges
9. `buildPayload()` - 6 edges
10. `ErrorBoundary` - 6 edges

## Surprising Connections (you probably didn't know these)
- `Error Boundaries` --conceptually_related_to--> `ErrorBoundary`  [INFERRED]
  DEPLOYMENT_SUMMARY.md → src/components/ErrorBoundary.js
- `CustomQRCode()` --conceptually_related_to--> `Custom QR Engine`  [INFERRED]
  src/components/CustomQRCode.js → DEPLOYMENT_SUMMARY.md
- `React Logo (PWA Icon)` --conceptually_related_to--> `React.js`  [INFERRED]
  public/logo192.png → README.md
- `Dark Mode Toggle` --conceptually_related_to--> `DarkModeToggle()`  [INFERRED]
  README.md → src/components/DarkModeToggle.js
- `DataTypeSelector Component` --conceptually_related_to--> `DataTypeSelector()`  [INFERRED]
  README.md → src/components/DataTypeSelector.js

## Communities

### Community 0 - "Custom QR Engine"
Cohesion: 0.12
Nodes (21): Rounded QR Style, SEO Meta Tags, SVG Rendering, App Features Documentation, Dark Mode Toggle, DataTypeSelector Component, Error Boundaries, Karan Veer Thakur (+13 more)

### Community 1 - "QR Engine & Export"
Cohesion: 0.17
Nodes (15): createMatrix(), drawMatrixToCanvas(), matrixToSVGString(), pickDrawOptions(), roundRect(), copyImageToClipboard(), copyTextToClipboard(), exportJPG() (+7 more)

### Community 2 - "README Features"
Cohesion: 0.11
Nodes (18): Netlify Deployment, PWA Manifest, buildnetlify Script, Dark Mode Toggle, DataTypeSelector Component, Error Boundaries, Karan Veer Thakur, Live Preview (+10 more)

### Community 3 - "Legacy Docs Hub"
Cohesion: 0.12
Nodes (16): DarkModeToggle(), build:netlify Script, Netlify Deployment, PWA Manifest, SEO Meta Tags, Dark Mode Toggle, Dark Mode Toggle, DataTypeSelector Component (+8 more)

### Community 4 - "Deployment & Branding"
Cohesion: 0.18
Nodes (17): App Features Documentation, Netlify Deployment, React Framework Branding, buildnetlify Script, Netlify Deployment, netlify.toml, PWA Manifest, React 19 (+9 more)

### Community 5 - "QR Data Service"
Cohesion: 0.22
Nodes (11): Data Input Form, Data Type Selector, QR Data Service, DataInputForm(), DataTypeSelector(), Dataview plugin, generateQRData(), generateVCard() (+3 more)

### Community 6 - "Custom QR Styles"
Cohesion: 0.2
Nodes (9): CustomQRCode(), react-qr-code Library, Custom QR Engine, Dots QR Style, Dots QR Style, qrcode.js Library, Rounded QR Style, Rounded QR Style (+1 more)

### Community 7 - "QR Preview & Payloads"
Cohesion: 0.33
Nodes (6): buildEvent(), buildPayload(), buildPayment(), buildVCard(), escapeWifi(), useLivePayload()

### Community 8 - "Preview & Display"
Cohesion: 0.31
Nodes (6): Live Preview Component, QR Code Display, QR Customization Panel, LivePreview(), QRCodeDisplay(), QRCustomization()

### Community 9 - "Favicon Branding"
Cohesion: 0.31
Nodes (9): QR Data Modules, Emerald-to-Purple Gradient, Favicon SVG, QR Finder Patterns, PWA App Icon, QR Studio Brand Identity, Rounded Square Frame, Slate Dark Background (+1 more)

### Community 10 - "Theme Toggle"
Cohesion: 0.25
Nodes (3): Toaster(), ThemeToggle(), useTheme()

### Community 11 - "Error Boundary"
Cohesion: 0.57
Nodes (3): Error Boundary Module, ErrorBoundary, ErrorBoundary

### Community 12 - "QR Form"
Cohesion: 0.33
Nodes (3): defaultsFor(), QRForm(), getSchema()

### Community 13 - "React 19"
Cohesion: 0.33
Nodes (6): React 19, React Atom SVG, PWA Manifest Link, React Logo (PWA Icon), React Logo 512px, React.js

### Community 14 - "Batch Generator"
Cohesion: 0.5
Nodes (0): 

### Community 15 - "Wizard Content"
Cohesion: 0.5
Nodes (2): StepContent(), getTypeMeta()

### Community 16 - "QR Data Generation"
Cohesion: 0.5
Nodes (0): 

### Community 17 - "Footer Component"
Cohesion: 0.67
Nodes (2): Footer Component, Footer()

### Community 18 - "App Root"
Cohesion: 0.67
Nodes (0): 

### Community 19 - "History Drawer"
Cohesion: 0.67
Nodes (0): 

### Community 20 - "Customization Panel"
Cohesion: 0.67
Nodes (0): 

### Community 21 - "QR Studio Entry"
Cohesion: 0.67
Nodes (2): Karan Veer Thakur, QR Studio

### Community 22 - "Legacy App"
Cohesion: 0.67
Nodes (1): App()

### Community 23 - "QR Service Functions"
Cohesion: 1.0
Nodes (2): generateQRData(), generateVCard()

### Community 24 - "App Root Component"
Cohesion: 0.67
Nodes (1): App Root Component

### Community 25 - "Custom QR Component"
Cohesion: 0.67
Nodes (1): Custom QR Code Component

### Community 26 - "Web Vitals"
Cohesion: 1.0
Nodes (2): Web Vitals Reporting, reportWebVitals()

### Community 27 - "Glass Background"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Type Icons"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Wizard Design Step"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Wizard Type Step"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Utils"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Graph Report"
Cohesion: 1.0
Nodes (2): Graph Report, Knowledge Graph Visualization

### Community 33 - "Legacy Footer"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Live Preview"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "QR Engine Docs"
Cohesion: 1.0
Nodes (2): Custom QR Engine, qrcode.js Library

### Community 36 - "QR Display"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "QR Customization"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "Report Web Vitals"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "App Entry Point"
Cohesion: 1.0
Nodes (1): App Entry Point

### Community 40 - "App Test Suite"
Cohesion: 1.0
Nodes (1): App Test Suite

### Community 41 - "Test Setup"
Cohesion: 1.0
Nodes (1): Test Setup Config

### Community 42 - "Robots.txt"
Cohesion: 1.0
Nodes (1): robotstxt.org

### Community 43 - "Vite Config"
Cohesion: 1.0
Nodes (0): 

### Community 44 - "Vite Env Types"
Cohesion: 1.0
Nodes (0): 

### Community 45 - "Glass Card"
Cohesion: 1.0
Nodes (0): 

### Community 46 - "Header Layout"
Cohesion: 1.0
Nodes (0): 

### Community 47 - "QR Canvas"
Cohesion: 1.0
Nodes (0): 

### Community 48 - "Button UI"
Cohesion: 1.0
Nodes (0): 

### Community 49 - "Dialog UI"
Cohesion: 1.0
Nodes (0): 

### Community 50 - "Input UI"
Cohesion: 1.0
Nodes (0): 

### Community 51 - "Label UI"
Cohesion: 1.0
Nodes (0): 

### Community 52 - "Progress UI"
Cohesion: 1.0
Nodes (0): 

### Community 53 - "Radio Group UI"
Cohesion: 1.0
Nodes (0): 

### Community 54 - "Select UI"
Cohesion: 1.0
Nodes (0): 

### Community 55 - "Slider UI"
Cohesion: 1.0
Nodes (0): 

### Community 56 - "Switch UI"
Cohesion: 1.0
Nodes (0): 

### Community 57 - "Tabs UI"
Cohesion: 1.0
Nodes (0): 

### Community 58 - "Textarea UI"
Cohesion: 1.0
Nodes (0): 

### Community 59 - "Tooltip UI"
Cohesion: 1.0
Nodes (0): 

### Community 60 - "Stepper"
Cohesion: 1.0
Nodes (0): 

### Community 61 - "Wizard Shell"
Cohesion: 1.0
Nodes (0): 

### Community 62 - "History Store"
Cohesion: 1.0
Nodes (0): 

### Community 63 - "Wizard Store"
Cohesion: 1.0
Nodes (0): 

### Community 64 - "Legacy Index"
Cohesion: 1.0
Nodes (0): 

### Community 65 - "Setup Tests"
Cohesion: 1.0
Nodes (0): 

## Ambiguous Edges - Review These
- `App()` → `App.test.js`  [AMBIGUOUS]
  src/App.test.js · relation: references
- `Dark Mode Toggle` → `Dark Mode Toggle`  [AMBIGUOUS]
  graphify-out/obsidian/_COMMUNITY_App Features Documentation.md · relation: conceptually_related_to
- `Netlify Hosting` → `App Features Documentation`  [AMBIGUOUS]
  graphify-out/obsidian/_COMMUNITY_Netlify Deployment.md · relation: conceptually_related_to
- `PWA Manifest Link` → `App Features Documentation`  [AMBIGUOUS]
  graphify-out/obsidian/_COMMUNITY_Netlify Deployment.md · relation: conceptually_related_to

## Knowledge Gaps
- **53 isolated node(s):** `PWA Manifest`, `build:netlify Script`, `qrcode.js Library`, `SVG Rendering`, `React 19` (+48 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Glass Background`** (2 nodes): `GlassBackground()`, `glass-background.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Type Icons`** (2 nodes): `type-icon.tsx`, `TypeIcon()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Wizard Design Step`** (2 nodes): `step-design.tsx`, `StepDesign()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Wizard Type Step`** (2 nodes): `step-type.tsx`, `handleSelect()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Utils`** (2 nodes): `utils.ts`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Graph Report`** (2 nodes): `Graph Report`, `Knowledge Graph Visualization`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Legacy Footer`** (2 nodes): `Footer()`, `Footer.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Live Preview`** (2 nodes): `LivePreview()`, `LivePreview.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `QR Engine Docs`** (2 nodes): `Custom QR Engine`, `qrcode.js Library`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `QR Display`** (2 nodes): `QRCodeDisplay()`, `QRCodeDisplay.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `QR Customization`** (2 nodes): `QRCustomization()`, `QRCustomization.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Report Web Vitals`** (2 nodes): `reportWebVitals()`, `reportWebVitals.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Entry Point`** (2 nodes): `App Entry Point`, `index.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Test Suite`** (2 nodes): `App Test Suite`, `App.test.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Test Setup`** (2 nodes): `Test Setup Config`, `setupTests.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Robots.txt`** (2 nodes): `robots.txt`, `robotstxt.org`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Config`** (1 nodes): `vite.config.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Env Types`** (1 nodes): `vite-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Glass Card`** (1 nodes): `glass-card.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Header Layout`** (1 nodes): `header.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `QR Canvas`** (1 nodes): `qr-canvas.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Button UI`** (1 nodes): `button.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Dialog UI`** (1 nodes): `dialog.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Input UI`** (1 nodes): `input.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Label UI`** (1 nodes): `label.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Progress UI`** (1 nodes): `progress.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Radio Group UI`** (1 nodes): `radio-group.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Select UI`** (1 nodes): `select.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Slider UI`** (1 nodes): `slider.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Switch UI`** (1 nodes): `switch.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tabs UI`** (1 nodes): `tabs.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Textarea UI`** (1 nodes): `textarea.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Tooltip UI`** (1 nodes): `tooltip.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Stepper`** (1 nodes): `stepper.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Wizard Shell`** (1 nodes): `wizard-shell.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `History Store`** (1 nodes): `historyStore.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Wizard Store`** (1 nodes): `wizardStore.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Legacy Index`** (1 nodes): `index.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Setup Tests`** (1 nodes): `setupTests.js`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `App()` and `App.test.js`?**
  _Edge tagged AMBIGUOUS (relation: references) - confidence is low._
- **What is the exact relationship between `Dark Mode Toggle` and `Dark Mode Toggle`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Netlify Hosting` and `App Features Documentation`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `PWA Manifest Link` and `App Features Documentation`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `QR Code Generator` connect `Legacy Docs Hub` to `Deployment & Branding`, `Custom QR Styles`?**
  _High betweenness centrality (0.027) - this node is a cross-community bridge._
- **Why does `React.js` connect `Deployment & Branding` to `Legacy Docs Hub`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `QR Code Generator` (e.g. with `Error Boundaries` and `SEO Meta Tags`) actually correct?**
  _`QR Code Generator` has 2 INFERRED edges - model-reasoned connections that need verification._