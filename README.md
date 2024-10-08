# YT Downlaoder Chrome Extension

## Install and Usage

1. Host the api route somewhere.
2. Add a `.env.production` and `.env.development` file in the root directory and add a `VITE_API_URL` variable, which points towards your hosted api route. These two files are as the name implies for production and development urls. If you only have one, what most likely will be your case, it is enough to add a single `.env` file containing your `VITE_API_URL`. Vite will handle it accordingly.
3. Run `npm run build` .
4. Turn on developer mode under `manage extensions` in your chromium browser and add the compiled `dist` folder as unpacked to your extensions.
5. Everything setup. Your good to go. 
