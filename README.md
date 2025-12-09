# Agri-mob

Modern farm command center with a web dashboard (Vite + React + TypeScript + shadcn-ui + Tailwind) and a lightweight Expo Go mobile shell.

## Prerequisites

- Node.js ≥ 18 (works with Node 22/25)
- npm (bundled with Node)
- For mobile: recent Expo Go app on your device and Android/iOS tooling if you want to run on an emulator/simulator.

## Install dependencies

```sh
git clone <YOUR_GIT_URL>
cd Agri-mob

# Web workspace
npm ci

# Mobile workspace
cd mobile && npm install
```

## Run the web app (Vite)

```sh
cd Agri-mob
npm run dev
# opens on http://localhost:5173 by default (port may differ)
```

### Weather API key (web)

Add a `.env` file in the repo root:

```
VITE_WEATHER_API_KEY=your_openweather_key
```

## Build the web app

```sh
cd Agri-mob
npm run build
npm run preview   # serve the production build locally
```

## Run the mobile app (Expo Go)

```sh
cd Agri-mob/mobile
npm install       # run once if not done already
npm start         # or: npm run android / npm run ios / npm run web
```

Then scan the QR code in your terminal/browser with the Expo Go app. If using an emulator/simulator, ensure it is running before you start.

### Weather API key (Expo)

Create an `.env` at `mobile/.env` or supply an env var when starting:

```
EXPO_PUBLIC_WEATHER_API_KEY=your_openweather_key
```

## Notes

- The web and mobile workspaces are independent; install and run commands in the appropriate directory.
- If you hit dependency or native build issues with Expo, clear caches first: `npm start -- --clear`.
- Web highlights: live weather bar + 7-day strip, feature tiles grid, SmartMapping (Leaflet) map with India markers, helpline directory.
- Mobile highlights: bottom tabs, home hero with live weather/forecast and gradient tiles, map screen with markers, helpline search list, floating mic button stub.
