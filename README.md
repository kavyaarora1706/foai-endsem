# ISS & News AI Dashboard

A modern, responsive, and fully functional web application built with React and Vite. This dashboard features live International Space Station (ISS) tracking, top space and science news, an interactive AI chatbot, and rich data visualizations.

## Features

1. **Live ISS Tracker**
   - Real-time coordinates and movement on an interactive Leaflet map.
   - Calculates speed using the Haversine formula.
   - Shows the current crew on board the ISS.
   - Auto-updates every 15 seconds with a manual refresh option.

2. **News Dashboard**
   - Fetches the latest top headlines using NewsAPI.
   - Features search, filtering, and sorting capabilities.
   - Caches data in LocalStorage for 15 minutes to prevent rate limiting.

3. **AI Chatbot**
   - Context-aware chatbot powered by HuggingFace (Mistral-7B-Instruct).
   - Restricted strictly to answering questions based on the live dashboard data.
   - Preserves chat history in LocalStorage.

4. **Interactive Charts**
   - **Line Chart**: Tracks ISS speed velocity over time.
   - **Doughnut Chart**: Displays news distribution by source with click-to-filter interaction.

5. **Premium UI / UX**
   - Modern glassmorphism design.
   - Dark and Light mode toggle (persisted).
   - Fully mobile responsive.
   - Elegant skeleton loaders and toast notifications.

## Tech Stack

- React + Vite
- Tailwind CSS (v4)
- React Router DOM
- Axios
- Leaflet.js + React Leaflet
- Chart.js + react-chartjs-2
- Lucide React (Icons)
- React Hot Toast

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   - Copy `.env.example` to `.env.local`
   ```bash
   cp .env.example .env.local
   ```
   - Add your API keys to `.env.local`:
     - `VITE_NEWS_API_KEY`: Get a free token from [GNews](https://gnews.io/)
     - `VITE_AI_TOKEN`: Get a free access token from [HuggingFace](https://huggingface.co/settings/tokens)

4. **Run the development server:**
   ```bash
   npm run dev
   ```

## Deployment (Vercel)

This application is ready to be deployed on Vercel.

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/) and import your repository.
3. Configure Environment Variables in the Vercel dashboard:
   - Add `VITE_NEWS_API_KEY`
   - Add `VITE_AI_TOKEN`
4. Click **Deploy**. Vercel will automatically detect Vite and build your app.
