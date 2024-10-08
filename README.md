# YT Downlaoder Chrome Extension

## Install and Usage

1. Host the api route somewhere.
2. Add a `.env.production` and `.env.development` file in the root directory and add a `VITE_API_URL` variable, which points towards your hosted api route.
3. Run `npm run build` .
4. Turn on developer mode under `manage extensions` in your chromium browser and add the compiled `dist` folder as unpacked to your extensions.
5. Everything setup. Your good to go. 