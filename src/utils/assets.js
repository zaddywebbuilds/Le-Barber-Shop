// Prepends Vite's base URL so public-folder assets resolve correctly
// in both dev (/) and GitHub Pages (/Le-Barber-Shop/)
export const asset = (path) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
