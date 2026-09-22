---
name: Clinical Precision Minimalism
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0edec'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#574142'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8b7171'
  outline-variant: '#debfbf'
  surface-tint: '#a93441'
  primary: '#6b0119'
  on-primary: '#ffffff'
  primary-container: '#8b1e2d'
  on-primary-container: '#ff9da0'
  inverse-primary: '#ffb3b4'
  secondary: '#ae2d40'
  on-secondary: '#ffffff'
  secondary-container: '#ff6978'
  on-secondary-container: '#6c001b'
  tertiary: '#093263'
  on-tertiary: '#ffffff'
  tertiary-container: '#28497b'
  on-tertiary-container: '#9ab9f2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdada'
  primary-fixed-dim: '#ffb3b4'
  on-primary-fixed: '#40000b'
  on-primary-fixed-variant: '#881c2b'
  secondary-fixed: '#ffdada'
  secondary-fixed-dim: '#ffb3b6'
  on-secondary-fixed: '#40000c'
  on-secondary-fixed-variant: '#8d112b'
  tertiary-fixed: '#d6e3ff'
  tertiary-fixed-dim: '#a9c7ff'
  on-tertiary-fixed: '#001b3d'
  on-tertiary-fixed-variant: '#254778'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  headline-xl:
    fontFamily: Geist
    fontSize: 36px
    fontWeight: '600'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Geist
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Geist
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
  code-metric:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: -0.01em
  code-metric-sm:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies premium clinical minimalism engineered for high-stakes ophthalmic diagnostics. Built with the restrained confidence of high-end diagnostic hardware and precision software instruments, the aesthetic rejects the cold, sterile, or overly tech-heavy tropes of generic AI dashboards. Instead, it projects clinical authority, surgical clarity, and ethical transparency.

The target audience comprises ophthalmologists, retinal specialists, clinical research coordinators, and diagnostic technicians who read hundreds of high-resolution fundus scans daily. The interface minimizes cognitive friction, prevents visual fatigue, and preserves diagnostic focus. The emotional response is one of unquestioned trust, surgical exactitude, calm vigilance, and refined human-machine synergy. AI confidence heatmaps and Grad-CAM overlays exist in balanced equilibrium with primary medical imagery, serving as an augmented second opinion rather than an assertive distraction.

## Colors

The palette establishes an authoritative hierarchy rooted in classical medical burgundy, optic indigo, and surgical neutrals.

- **Primary Canvas & Surfaces**: The base canvas is absolute pure white (`#FFFFFF`) framed by clinical slate off-white containers (`#F7F7F7`) and elevated sub-panels (`#FAFAFA`). 
- **Hairline Dividers & Contours**: Strict visual boundaries rely on hairline structural borders (`#E8E8E8`) and subtle containment borders (`#ECECEC`).
- **Primary & Secondary Medical Burgundy**:
  - `primary_color_hex` (`#8B1E2D`): Deep medical burgundy, conveying diagnostic rigor, active selection states, high-priority interactive toggles, and critical severity findings.
  - `secondary_color_hex` (`#A5263A`): Vivid clinical carmine, serving as an interactive hover state, active tab marker, and accent highlight.
  - Dark Burgundy (`#641522`): Used for critical alerts, pressed states, and high-risk grade badges.
- **AI Diagnostics & Overlays**:
  - `tertiary_color_hex` (`#2B4C7E`): Subtle clinical optic indigo, dedicated strictly to AI explainability indicators, Grad-CAM attribution toggles, feature maps, and automated vessel segmentation metrics.
- **Typographic Neutrals**:
  - Primary text (`#161616`): High-legibility deep carbon black.
  - Secondary text (`#626262`): Balanced neutral grey for supporting clinical metadata and axial specs.
  - Muted text (`#8A8A8A`): Low-emphasis grey for units, timestamps, and de-emphasized anatomical values.
- **Clinical Semantic Tokens**:
  - **Quality Passed / Low Risk**: Sage Emerald (`#1B7F52` text/border on `#EDF7F2` surface).
  - **Review Needed / Moderate**: Soft Clinical Amber (`#A36B00` text/border on `#FEF8EC` surface).
  - **Critical / Proliferative**: Deep Burgundy (`#8B1E2D` text/border on `#FDF2F3` surface).
  - **Diagnostic AI Confidence**: Cool Optic Cyan-Blue (`#1E6382` text/border on `#EEF6F9` surface).

## Typography

The typographic system relies on a high-density, high-legibility dual pairing: **Geist** for natural-reading diagnostic narratives and structural interfaces, complemented by **JetBrains Mono** for precision metrics, patient identifiers, macular thickness measurements, calibration parameters, and AI probabilistic confidence scores.

- Headings demand strict tracking (`-0.02em` to `-0.01em`) to maintain an engineered, modern architectural feel.
- Body text utilizes balanced proportional sizing to ensure rapid multi-column legibility under long clinical review shifts.
- Monospaced tokens (`code-metric`) guarantee tabular figure alignment across diagnostic tables, risk percentages, and lesion count registers.
- All letter-casing for field labels remains title or sentence case; uppercase is strictly reserved for medical acronyms (e.g., AMD, DR, DME, OCT, OD, OS) and tabular label micro-tokens.

## Layout & Spacing

The spatial architecture is grounded in a strict 8px incremental grid with a 4px half-step for micro-alignments (chips, tooltips, inline badges). 

- **Layout Grid**: 
  - **Workstation Desktop (1440px+)**: Multi-pane clinical workspace with a fixed 72px collapsed global command rail, 320px contextual patient history panel, flexible canvas for ultra-high-resolution retinal viewport, and 360px AI diagnostic analysis sidebar. Column gutters adhere to `gutter-desktop` (24px / 1.5rem) and page borders to `margin-desktop` (32px / 2rem).
  - **Tablet Clinical Review (768px – 1023px)**: 8-column layout. The diagnostic image retains primary viewport real estate, while diagnostic parameters collapse into bottom modular sheets or docked side tab strips. Gutter drops to `gutter` (16px / 1rem).
  - **Mobile Point-of-Care (320px – 767px)**: 4-column fluid layout with single-stream vertical hierarchy. Margin drops to `margin` (16px / 1rem). Fundus imagery anchors the upper quadrant with touch-scrubbable Grad-CAM comparative layers below.
- **Rhythm & Structure**: Component interiors use `space-sm` (8px) for condensed metric blocks, `space-md` (16px) for card interiors and form controls, and `space-xl` (32px) to delineate macroscopic clinical workflow phases.

## Elevation & Depth

To preserve surgical precision and prevent ocular strain, this design system eschews heavy skeuomorphism and muddy dropshadows in favor of **low-contrast outlines, hairline containment, and subtle tonal layering**.

- **Surface Tiers**:
  - `Base`: Pure canvas `#FFFFFF`.
  - `Sub-Surface 1`: Clinical warm slate `#F7F7F7` for workspace gutters, side-panels, and control consoles.
  - `Sub-Surface 2`: Elevated card backgrounds `#FFFFFF` nested inside `#F7F7F7` regions.
  - `Active Layer / Tool Overlay`: `#FFFFFF` with 1px border `#E8E8E8`.
- **Borders & Dividers**:
  - Structural separators and card perimeters use 1px solid `#E8E8E8`.
  - Focused or active containment frames use 1px solid `#8B1E2D`.
- **Depth & Shadows**:
  - Static panels feature zero blur elevation, utilizing only the 1px hairline border.
  - Contextual clinical popovers, Grad-CAM adjustment menus, and diagnostic toolbars utilize an ultra-diffused, ambient shadow: `0px 4px 16px rgba(22, 22, 22, 0.04), 0px 1px 2px rgba(22, 22, 22, 0.02)` coupled with a 1px border of `#E8E8E8`.
- **Image Overlays & AI Heatmaps**:
  - Heatmap layers (Grad-CAM, microaneurysm bounding boxes, foveal avascular zone indicators) blend via calibrated semi-transparent surface modes (alpha `0.65` to `0.85`), with sharp 1px vector boundaries to maintain visual inspection of underlying retinal capillaries.

## Shapes

The design system employs a soft, clinical roundedness geometry (`roundedness: 1`), conveying the physical feel of high-end optical instruments and anodized aluminum medical hardware.

- **Base Radius (0.25rem / 4px)**: Micro-elements including metric tags, quality assurance chips, tabular status indicators, tooltips, and image overlay handles.
- **Intermediate Radius (`rounded-lg` - 0.5rem / 8px)**: Standard buttons, text input fields, segmented viewport controls, dropdown menus, and nested metric containers.
- **Structural Radius (`rounded-xl` - 0.75rem / 12px)**: Primary diagnostic report cards, fundus viewer viewport frame, scan comparison panels, and clinical modal dialogues.
- **Pills / Full Radius**: Exclusively reserved for binary state indicators (e.g., online/offline instrument connection status) and floating zoom/pan viewport navigation bars.

## Components

### Buttons
- **Primary**: Solid deep medical burgundy (`#8B1E2D`) background, `#FFFFFF` text, `rounded-lg` (8px), height 40px, padding horizontal 16px. Hover state shifts to `#A5263A`; active state darkens to `#641522`. Focused elements feature a 2px outline in `#8B1E2D` offset by 2px white space.
- **Secondary / Ghost**: Pure white (`#FFFFFF`) or transparent background with a 1px hairline border (`#E8E8E8`), text `#161616`. Hover transitions background to `#F7F7F7` with border `#D6D6D6`.
- **Clinical AI Action**: Optic indigo hairline variant (`#2B4C7E` border, `#2B4C7E` text, subtle `#EEF6F9` hover) for actions generating explainability passes, lesion segmentations, or re-running inference models.

### Chips & Badges
- **Status & Risk Indicators**: Height 24px, padding 2px 8px, `rounded` (4px). Composed of JetBrains Mono 11px uppercase/medium.
  - *Normal / Quality Passed*: Background `#EDF7F2`, text `#1B7F52`, border 1px solid `#D4EADB`.
  - *Suspect / Moderate*: Background `#FEF8EC`, text `#A36B00`, border 1px solid `#FBE7C3`.
  - *Proliferative / High-Risk*: Background `#FDF2F3`, text `#8B1E2D`, border 1px solid `#F8D2D6`.
  - *AI Explainability Chip*: Background `#EEF6F9`, text `#1E6382`, border 1px solid `#D3E8F0`.

### Form Fields & Inputs
- **Input Fields**: Background `#FFFFFF`, 1px solid border `#E8E8E8`, text `#161616`, placeholder `#8A8A8A`, height 40px, `rounded-lg` (8px), padding horizontal 12px.
- **Focus State**: Hairline shifts to 1.5px solid `#8B1E2D` with no heavy glowing halos.
- **Numerical Metric Inputs**: Embedded JetBrains Mono figures with right-aligned units (e.g., `μm`, `mmHg`) locked in `#626262`.

### Checkboxes & Radio Buttons
- Custom 16x16px squares (`rounded` 4px for checkboxes) and circles (radios).
- Default: 1.5px border `#D6D6D6`, background `#FFFFFF`.
- Checked: Background `#8B1E2D`, border `#8B1E2D`, displaying a crisp white 1.5px geometric tick or concentric inner dot.

### Cards & Analytical Panels
- **Diagnostic Cards**: White (`#FFFFFF`) base encased in a 1px `#E8E8E8` hairline border, radius `rounded-xl` (12px). Card headers use a subtle `#F7F7F7` divider bar with 12px vertical padding, separating patient biographical metadata from physiological telemetry.
- **Nested Metrics Tile**: Background `#F7F7F7`, radius `rounded-lg` (8px), padding 12px, borderless or bordered by `#ECECEC`. Metric value set in Geist 20px semibold; sub-label set in JetBrains Mono 11px `#626262`.

### Specialized Retinal Diagnostic Components
- **Dual-Pane Viewport**: Side-by-side or slider-based split view displaying raw 45°/200° Ultra-Widefield fundus photography against the synchronized Grad-CAM activation heatmap. Hairline vertical draggable divider with a 32px pill-shaped center grip handle.
- **AI Confidence Gauge**: Horizontal stratified bar (height 6px, radius 3px) with calibrated semantic segments: green (0–0.25), amber (0.25–0.60), and burgundy (0.60–1.00), utilizing a 2px vertical indicator pin for the computed patient score.