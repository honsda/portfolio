# honsda Portfolio

A minimalist, high-contrast developer portfolio built with **Astro**, **Svelte**, and **Tailwind CSS**. Designed with a focus on typography, motion, and refined aesthetics.

## 🚀 Tech Stack

- **Framework:** [Astro 5](https://astro.build/)
- **Components:** [Svelte 5](https://svelte.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Typography:** Zen Old Mincho (Display) & DM Mono (Mono)
- **Deployment:** GitHub Pages

## ✨ Key Features

- **Custom Interactive Cursor:** A canvas-based cursor with a smooth, elastic "ink trail" that tapers and shrinks when clicked and moved.
- **Dynamic Hero Art:** Responsive mountain vector art tinted to the project's signature indigo color, with custom masking for mobile and desktop views.
- **Accessible Design:** Refined contrast ratios for readability across all sections (About, Projects, Stack).
- **Interactive Stack:** Hover-aware tech stack categorization with highlighted primary tools.
- **Smart Contact Actions:** "Email me" button that simultaneously copies the address to the clipboard and opens the mail client.
- **Discord Integration:** A custom "blurple" button that reveals a username on hover and links to a community server.

## 🛠️ Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/honsda/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## 📦 Deployment

The project is configured to be hosted at `honsda.github.io/portfolio/`. 

### Configuration Notes
- `astro.config.mjs` includes `site` and `base` settings for GitHub Pages.
- Asset paths are dynamically prefixed using `import.meta.env.BASE_URL` to ensure they load correctly in the subdirectory.

To deploy, simply build the project and push the `dist/` folder to your `gh-pages` branch.

---
Made with love by [honsda](https://github.com/honsda)
