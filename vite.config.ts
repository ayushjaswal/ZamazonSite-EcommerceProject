import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.REACT_APP_OAUTH_CLIENT_ID": JSON.stringify(
        env.REACT_APP_OAUTH_CLIENT_ID
      ),
      "process.env.FIREBASE_API_KEY": JSON.stringify(env.FIREBASE_API_KEY),
      "process.env.STRIPE_PUBLIC_KEY": JSON.stringify(env.STRIPE_PUBLIC_KEY),
    },
    plugins: [react()],
  };
});
