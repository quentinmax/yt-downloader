# YT Downlaoder Chrome Extension

## Install and Usage

1. Host the api route somewhere.
2. Add a `.env` file in the the root directory containing a `VITE_API_URL` variable, which points towards your hosted api route. Alternatively you could add a `.env.production` and `.env.development` file for being used in these respective environments with different urls, such as one for testing.
4. Run `npm run build` .
5. Turn on developer mode under `manage extensions` in your chromium browser and add the compiled `dist` folder as unpacked to your extensions.
6. Everything setup. Your good to go. 
