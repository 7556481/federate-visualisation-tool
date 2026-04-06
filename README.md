# FEDERATE Visualisation Tool

This project is a prototype visualization tool for exploring the [CSA-FEDERATE/Proposed-BuildingBlocks](https://github.com/CSA-FEDERATE/Proposed-BuildingBlocks) repository as part of the FEDERATE project.
It provides an overview-based entry point, a tree view for repository navigation, and a detail panel for selected items.
The goal is to make the repository easier to understand, especially for new developers without prior background knowledge.

**Live demo (preview version):** https://xnnixa.github.io/federate-visualisation-tool/

---

## 1. Project Overview

FEDERATE Building Blocks are organized in a deep directory hierarchy. This tool presents that hierarchy in a more approachable interface so contributors can quickly understand structure and context.

---

## 2. Purpose

The repository can be difficult to read directly, especially for newcomers. This explorer exists to:

- lower the entry barrier for new contributors
- provide faster navigation across folders and files
- offer a simple way to inspect selected items and jump to GitHub

---

## 3. Current Features

- **Overview view** for high-level exploration.
- **Tree view** for path-based navigation.
- **Detail panel** for selected item information.
- **Search support** for locating matching nodes.
- **GitHub link-out** from selected items.

> For step-by-step usage instructions, see the user manual: [`docs/manual.md`](docs/manual.md).

---

## 4. Tech Stack

- React
- TypeScript
- Vite
- React Router
- GitHub Pages (current live deployment)

---

## 5. Running the Project Locally

```bash
npm install
npm run dev
```

---

## 6. Build and Preview

```bash
npm run build
npm run preview
```

---

## 7. Data Source

The explorer currently uses a JSON representation of the Building Blocks repository structure as its main data source.

- Main input file: `src/assets/building-blocks_structure.json`
- JSON generation is supported through CI helper scripts in `ci/`

Short workflow example:

```bash
bash ci/transform.sh /path/to/Proposed-BuildingBlocks building-blocks_structure.json
```

---

## 8. Project Structure (Simplified)

```text
src/
  components/
  lib/
  pages/
  assets/
ci/
test/
docs/
```

---

## 9. Known Limitations

- This is currently a prototype.
- Some metadata may be incomplete depending on upstream content.
- Human-readable labels and descriptions depend on available upstream text.
- The current implementation focuses on repository exploration rather than full semantic analysis.

---

## 10. Future Improvements

- Better grouping and categorization.
- Improved README rendering in the detail panel.
- Better navigation and interaction UX.
- More robust CI/data generation workflow.
