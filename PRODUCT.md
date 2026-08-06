# Product Notes

## Positioning

Planchette is a browser-only toolbox for practical micro-utilities.

The product goal is speed and clarity, not feature sprawl. Each tool should be understandable on first use from a phone.

## UX rules

- Mobile use is a first-class path, not a responsive afterthought.
- Processing should stay local when feasible.
- Controls should use plain language and visible defaults.
- Every tool should surface what it does before the user commits.

## V1 tool: A6 to A4 PDF

### User story

As a user, I want to upload one image and get back a printable A4 PDF with four repeated copies so I can prepare sheets for printing without opening a desktop toolchain.

### Inputs

- One image file.
- One margin slider in millimeters.
- One compression preset selector.

### Outputs

- One downloaded A4 PDF.
- Four repeated placements of the uploaded image.
- White page background.

### Constraints

- Browser only.
- No user account.
- No backend dependency.
- Simple enough to operate on narrow mobile screens.

## Out of scope for V1

- Multiple different source images on one page.
- Drag-and-drop page editing.
- Multi-page exports.
- Persistent saved jobs.
- Server-side processing.