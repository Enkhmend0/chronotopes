# Identity Simulation - Retro Terminal Edition

A retro 80s-style interactive web app exploring identity performances across different chronotopes (social time-space contexts).

## Features

- 🎮 Retro 80s hacker/terminal aesthetic
- ⌨️ Typing animations for all text
- 🔊 Retro sound effects
- 📱 Mobile-friendly responsive design
- 🎯 5 interactive scenarios

## Deployment

### Option 1: GitHub Pages (Free & Easy)

1. **Create a GitHub repository:**
   - Go to [github.com](https://github.com) and sign in
   - Click the "+" icon → "New repository"
   - Name it (e.g., `identity-simulation`)
   - Make it **Public** (required for free GitHub Pages)
   - Don't initialize with README (we already have one)

2. **Push your code:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click **Settings** → **Pages** (left sidebar)
   - Under "Source", select **main** branch
   - Click **Save**
   - Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

### Option 2: Netlify (Free & Easy)

1. **Push to GitHub first** (follow steps 1-2 above)

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com) and sign up/login
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub and select your repository
   - Build settings:
     - Build command: (leave empty)
     - Publish directory: `/` (root)
   - Click "Deploy site"
   - Your site will get a URL like: `https://your-site-name.netlify.app`

### Option 3: Vercel (Free & Easy)

1. **Push to GitHub first**

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com) and sign up/login
   - Click "Add New Project"
   - Import your GitHub repository
   - Framework Preset: **Other**
   - Click "Deploy"
   - Your site will get a URL like: `https://your-site-name.vercel.app`

## Local Development

Just open `index.html` in your browser - no build process needed!

## Files

- `index.html` - Main HTML structure
- `Style.css` - Retro 80s styling
- `script.js` - Game logic and animations
