# Unfold AI Website

## Quick Start

1. Make sure you have **Node.js 18+** installed
   - Check: `node --version`
   - Download: https://nodejs.org

2. Open your terminal and `cd` into this folder:
   ```bash
   cd unfold-site
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

5. Open **http://localhost:5173** in your browser 🎉

## Deploy to Production

### Build for production:
```bash
npm run build
```
This creates a `dist/` folder with optimized static files.

### Deploy options:
- **Vercel** (recommended): Run `npx vercel` from the project root
- **Netlify**: Drag the `dist/` folder to netlify.com/drop
- **Any static host**: Upload the contents of `dist/`

## Project Structure
```
unfold-site/
├── public/
│   └── logo.png          # Unfold logo
├── src/
│   ├── App.jsx            # Main site component
│   └── main.jsx           # React entry point
├── index.html             # HTML entry point
├── package.json
├── vite.config.js
└── README.md
```
