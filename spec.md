# Weddnear.io

## Current State
The AI Event Planner is live and working -- it generates a personalised wedding plan (venue, catering, decor, photography, entertainment budgets) based on city, budget, and guest count. The plan is displayed on screen but cannot be saved.

## Requested Changes (Diff)

### Add
- "Download Plan" button that lets users save their generated wedding plan as a PDF.

### Modify
- AI Planner section: show the Download button after a plan is generated.

### Remove
- Nothing.

## Implementation Plan
1. Use the browser's `window.print()` with a print-specific CSS class, or use the `jsPDF` / `html2canvas` approach to export the plan card as a PDF.
2. Show the Download button only when a plan has been generated.
3. Style the button consistently with the existing rose/dark CTA style.
