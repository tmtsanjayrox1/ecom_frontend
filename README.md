# Phone Store Frontend (React + Vite)

## Local setup

1. Install Node.js (LTS) if you haven't already.
2. `npm install`
3. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL` to your backend's URL (`http://localhost:8080/api` for local dev).
4. `npm run dev` — opens at `http://localhost:5173`.

Note: the full payment redirect loop (Zoho → your backend → this frontend) needs your backend reachable over HTTPS, which `localhost` isn't. For real end-to-end testing, either use ngrok locally or deploy both sides (see below).

## Deploying (Vercel — free tier, HTTPS included)

1. Push this frontend folder to its own GitHub repo.
2. Go to vercel.com → New Project → import that repo. Vercel auto-detects Vite.
3. In the project's Settings → Environment Variables, add:
   - `VITE_API_BASE_URL` = `https://your-backend-url.onrender.com/api` (your deployed backend's URL + `/api`)
4. Deploy. Vercel gives you a URL like `https://ecom-frontend-xxxx.vercel.app` — this is your `APP_FRONTEND_BASE_URL` for the backend's environment variables.
5. Go back to your backend's environment variables (Render) and set `APP_FRONTEND_BASE_URL` to this Vercel URL, then redeploy the backend so CORS and the Zoho redirect-back destination are correct.

## Testing the full flow after deployment

1. Visit your Vercel URL, sign up, add a product to cart, checkout.
2. You should land on a real Zoho hosted checkout page (sandbox, if you're using sandbox credentials).
3. Complete a test payment.
4. You should be redirected back to `https://your-frontend-url/payment/success` or `/payment/failure`.
