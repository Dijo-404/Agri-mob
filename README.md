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

## Notes

- The web and mobile workspaces are independent; install and run commands in the appropriate directory.
- If you hit dependency or native build issues with Expo, clear caches first: `npm start -- --clear`.
