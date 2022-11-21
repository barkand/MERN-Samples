export const manifest = {
  name: "Company Name",
  short_name: "CName",
  description: "Company Name description",
  start_url: ".",
  display: "standalone",
  background_color: "#2f353f",
  theme_color: "#2f353f",
  icons: [
    {
      src: "favicon.ico",
      sizes: "64x64 32x32 24x24 16x16",
      type: "image/x-icon",
    },
    {
      src: "/pwa/pwa-192.png",
      type: "image/png",
      sizes: "192x192",
    },
    {
      src: "/pwa/pwa-512.png",
      type: "image/png",
      sizes: "512x512",
      purpose: "any maskable",
    },
  ],
  shortcuts: [
    {
      name: "Company Name",
      short_name: "CName",
      description: "Company Name description",
      url: ".",
      icons: [{ src: "/pwa/pwa-192.png", sizes: "192x192" }],
    },
  ],
};
