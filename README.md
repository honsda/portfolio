# honsda Portfolio

A minimalist developer portfolio built with Astro, Svelte, and Tailwind CSS.

## Deployment

The project is configured to be hosted at `honsda.github.io/portfolio/`.

### Configuration Notes
- `astro.config.mjs` includes `site` and `base` settings for GitHub Pages.
- Asset paths are dynamically prefixed using `import.meta.env.BASE_URL` to ensure they load correctly in the subdirectory.

To deploy, build the project and push the `dist/` folder to the `gh-pages` branch.
