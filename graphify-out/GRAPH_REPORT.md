# Graph Report - src  (2026-06-26)

## Corpus Check
- 49 files · ~81,666 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 108 nodes · 86 edges · 44 communities detected
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 12 edges (avg confidence: 0.78)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Export Pipeline|Export Pipeline]]
- [[_COMMUNITY_Payload Builders|Payload Builders]]
- [[_COMMUNITY_Theme System|Theme System]]
- [[_COMMUNITY_Brand Assets|Brand Assets]]
- [[_COMMUNITY_Form Validation|Form Validation]]
- [[_COMMUNITY_QR Render Engine|QR Render Engine]]
- [[_COMMUNITY_Export Step UI|Export Step UI]]
- [[_COMMUNITY_Batch Generator|Batch Generator]]
- [[_COMMUNITY_Wizard Content|Wizard Content]]
- [[_COMMUNITY_App Shell|App Shell]]
- [[_COMMUNITY_History Drawer|History Drawer]]
- [[_COMMUNITY_Footer|Footer]]
- [[_COMMUNITY_Customization Panel|Customization Panel]]
- [[_COMMUNITY_Glass Background|Glass Background]]
- [[_COMMUNITY_Type Icons|Type Icons]]
- [[_COMMUNITY_Design Step|Design Step]]
- [[_COMMUNITY_Type Selection|Type Selection]]
- [[_COMMUNITY_Utils|Utils]]
- [[_COMMUNITY_Vite Types|Vite Types]]
- [[_COMMUNITY_Glass Card|Glass Card]]
- [[_COMMUNITY_Header|Header]]
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
- [[_COMMUNITY_App Entry|App Entry]]
- [[_COMMUNITY_Brand Identity|Brand Identity]]
- [[_COMMUNITY_React PWA Icon|React PWA Icon]]
- [[_COMMUNITY_React Logo 192|React Logo 192]]
- [[_COMMUNITY_React Logo 512|React Logo 512]]
- [[_COMMUNITY_Legacy PWA Icon|Legacy PWA Icon]]

## God Nodes (most connected - your core abstractions)
1. `renderFullCanvas()` - 8 edges
2. `buildPayload()` - 6 edges
3. `Favicon SVG` - 5 edges
4. `drawMatrixToCanvas()` - 4 edges
5. `triggerDownload()` - 4 edges
6. `exportSVG()` - 4 edges
7. `QRForm()` - 3 edges
8. `useTheme()` - 3 edges
9. `createMatrix()` - 3 edges
10. `pickDrawOptions()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `useLivePayload()` --calls--> `buildPayload()`  [INFERRED]
  src\components\qr\qr-preview.tsx → src\lib\qr\payloads.ts
- `renderFullCanvas()` --calls--> `drawMatrixToCanvas()`  [INFERRED]
  src\lib\qr\export.ts → src\lib\qr\engine.ts
- `exportSVG()` --calls--> `matrixToSVGString()`  [INFERRED]
  src\lib\qr\export.ts → src\lib\qr\engine.ts
- `QRForm()` --calls--> `defaultsFor()`  [INFERRED]
  src\components\forms\qr-form.tsx → src\components\forms\field-config.ts
- `QRForm()` --calls--> `getSchema()`  [INFERRED]
  src\components\forms\qr-form.tsx → src\lib\qr\validation.ts

## Communities

### Community 0 - "Export Pipeline"
Cohesion: 0.4
Nodes (9): createMatrix(), copyImageToClipboard(), exportJPG(), exportPDF(), exportPNG(), exportSVG(), loadImage(), renderFullCanvas() (+1 more)

### Community 1 - "Payload Builders"
Cohesion: 0.33
Nodes (6): buildEvent(), buildPayload(), buildPayment(), buildVCard(), escapeWifi(), useLivePayload()

### Community 2 - "Theme System"
Cohesion: 0.25
Nodes (3): Toaster(), ThemeToggle(), useTheme()

### Community 3 - "Brand Assets"
Cohesion: 0.32
Nodes (8): QR Data Modules, Emerald-to-Purple Gradient, Favicon SVG, QR Finder Patterns, PWA App Icon, Rounded Square Frame, Slate Dark Background, Stylized QR Code Icon

### Community 4 - "Form Validation"
Cohesion: 0.33
Nodes (3): defaultsFor(), QRForm(), getSchema()

### Community 5 - "QR Render Engine"
Cohesion: 0.53
Nodes (4): drawMatrixToCanvas(), matrixToSVGString(), pickDrawOptions(), roundRect()

### Community 6 - "Export Step UI"
Cohesion: 0.4
Nodes (2): copyTextToClipboard(), async()

### Community 7 - "Batch Generator"
Cohesion: 0.5
Nodes (0): 

### Community 8 - "Wizard Content"
Cohesion: 0.5
Nodes (2): StepContent(), getTypeMeta()

### Community 9 - "App Shell"
Cohesion: 0.67
Nodes (0): 

### Community 10 - "History Drawer"
Cohesion: 0.67
Nodes (0): 

### Community 11 - "Footer"
Cohesion: 0.67
Nodes (0): 

### Community 12 - "Customization Panel"
Cohesion: 0.67
Nodes (0): 

### Community 13 - "Glass Background"
Cohesion: 1.0
Nodes (0): 

### Community 14 - "Type Icons"
Cohesion: 1.0
Nodes (0): 

### Community 15 - "Design Step"
Cohesion: 1.0
Nodes (0): 

### Community 16 - "Type Selection"
Cohesion: 1.0
Nodes (0): 

### Community 17 - "Utils"
Cohesion: 1.0
Nodes (0): 

### Community 18 - "Vite Types"
Cohesion: 1.0
Nodes (0): 

### Community 19 - "Glass Card"
Cohesion: 1.0
Nodes (0): 

### Community 20 - "Header"
Cohesion: 1.0
Nodes (0): 

### Community 21 - "QR Canvas"
Cohesion: 1.0
Nodes (0): 

### Community 22 - "Button UI"
Cohesion: 1.0
Nodes (0): 

### Community 23 - "Dialog UI"
Cohesion: 1.0
Nodes (0): 

### Community 24 - "Input UI"
Cohesion: 1.0
Nodes (0): 

### Community 25 - "Label UI"
Cohesion: 1.0
Nodes (0): 

### Community 26 - "Progress UI"
Cohesion: 1.0
Nodes (0): 

### Community 27 - "Radio Group UI"
Cohesion: 1.0
Nodes (0): 

### Community 28 - "Select UI"
Cohesion: 1.0
Nodes (0): 

### Community 29 - "Slider UI"
Cohesion: 1.0
Nodes (0): 

### Community 30 - "Switch UI"
Cohesion: 1.0
Nodes (0): 

### Community 31 - "Tabs UI"
Cohesion: 1.0
Nodes (0): 

### Community 32 - "Textarea UI"
Cohesion: 1.0
Nodes (0): 

### Community 33 - "Tooltip UI"
Cohesion: 1.0
Nodes (0): 

### Community 34 - "Stepper"
Cohesion: 1.0
Nodes (0): 

### Community 35 - "Wizard Shell"
Cohesion: 1.0
Nodes (0): 

### Community 36 - "History Store"
Cohesion: 1.0
Nodes (0): 

### Community 37 - "Wizard Store"
Cohesion: 1.0
Nodes (0): 

### Community 38 - "App Entry"
Cohesion: 1.0
Nodes (0): 

### Community 39 - "Brand Identity"
Cohesion: 1.0
Nodes (1): QR Studio Brand Identity

### Community 40 - "React PWA Icon"
Cohesion: 1.0
Nodes (1): React Logo (PWA Icon)

### Community 41 - "React Logo 192"
Cohesion: 1.0
Nodes (1): React Logo (PWA Icon)

### Community 42 - "React Logo 512"
Cohesion: 1.0
Nodes (1): React Logo 512px

### Community 43 - "Legacy PWA Icon"
Cohesion: 1.0
Nodes (1): React Logo 512px

## Knowledge Gaps
- **8 isolated node(s):** `Slate Dark Background`, `Rounded Square Frame`, `PWA App Icon`, `QR Studio Brand Identity`, `React Logo (PWA Icon)` (+3 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Glass Background`** (2 nodes): `GlassBackground()`, `glass-background.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Type Icons`** (2 nodes): `type-icon.tsx`, `TypeIcon()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Design Step`** (2 nodes): `step-design.tsx`, `StepDesign()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Type Selection`** (2 nodes): `step-type.tsx`, `handleSelect()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Utils`** (2 nodes): `utils.ts`, `cn()`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Vite Types`** (1 nodes): `vite-env.d.ts`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Glass Card`** (1 nodes): `glass-card.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Header`** (1 nodes): `header.tsx`
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
- **Thin community `App Entry`** (1 nodes): `main.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Brand Identity`** (1 nodes): `QR Studio Brand Identity`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `React PWA Icon`** (1 nodes): `React Logo (PWA Icon)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `React Logo 192`** (1 nodes): `React Logo (PWA Icon)`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `React Logo 512`** (1 nodes): `React Logo 512px`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Legacy PWA Icon`** (1 nodes): `React Logo 512px`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `copyTextToClipboard()` connect `Export Step UI` to `Export Pipeline`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Why does `renderFullCanvas()` connect `Export Pipeline` to `QR Render Engine`?**
  _High betweenness centrality (0.011) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `renderFullCanvas()` (e.g. with `createMatrix()` and `drawMatrixToCanvas()`) actually correct?**
  _`renderFullCanvas()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Slate Dark Background`, `Rounded Square Frame`, `PWA App Icon` to the rest of the system?**
  _8 weakly-connected nodes found - possible documentation gaps or missing edges._