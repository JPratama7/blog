# Blog

A static personal blog built with [Lume](https://lume.land/) and [Deno](https://deno.land/).

## Features

- **Deno-native**: no Node.js, no `node_modules`.
- **MDX posts**: write rich, component-based content.
- **Categories**: every post can have multiple categories; auto-generated category pages.
- **Per-post themes**: choose from `default`, `warm`, `minimal`, or `forest` in the post frontmatter.
- **Dark/light mode**: user-toggleable, follows system preference by default, persisted in localStorage. Works with every palette.
- **Collapsible sidebar**: post pages show a table-of-contents sidebar that can be hidden.
- **Social footer**: links to LinkedIn, Instagram, and GitHub.
- **RSS/JSON feeds**: auto-generated at `/feed.rss` and `/feed.json`.

## Project structure

```
├── _components/            # Reusable components (nav, footer)
├── _includes/layouts/        # Page layouts
├── assets/                   # Static files (images, videos, SVGs)
│   ├── home/                 # Home page assets
│   ├── about/                # About page assets
│   ├── posts/                # Post-specific assets
│   └── shared/               # Site-wide assets
├── assetPaths.ts             # Auto-generated centralized asset paths
├── categories/               # Dynamic category pages
├── content/                  # Site content (markdown)
│   ├── about.md              # About page
│   └── posts/                # Blog posts (.mdx)
├── scripts/                  # Client-side JS
├── styles/                   # CSS
├── tools/                    # Build-time scripts
│   └── generate-assets.ts    # Generates assetPaths.ts
├── _config.ts                # Lume configuration
├── deno.json                 # Deno configuration and tasks
└── .github/workflows/        # GitHub Pages deployment
```

## Static assets

Put images, videos, SVGs, and other static files in `assets/`, organized by the page or post that uses them. `tools/generate-assets.ts` scans the `assets/` directory and writes `assetPaths.ts`, which exports a typed constant for every asset. Import from `@assets` in any page, component, or post.

Example:

1. Add `assets/posts/my-first-post/cover.jpg`.
2. Run `deno run -A tools/generate-assets.ts` (this also runs automatically at the start of `deno task build`).
3. `assetPaths.ts` now contains:
   ```ts
   export const postsMyFirstPostCoverJpg = "/assets/posts/my-first-post/cover.jpg";
   ```
4. Import and use it in `content/posts/my-first-post.mdx`:
   ```mdx
   import { postsMyFirstPostCoverJpg } from "@assets";

   <img src={postsMyFirstPostCoverJpg} alt="Cover image" />
   ```

Because `assetPaths.ts` is generated from the actual files, deleting an asset removes its export and any import of it becomes a compile-time error.

You can also reference assets directly by their root-relative path, e.g. `![Alt text](/assets/posts/my-first-post/cover.jpg)`.

### Responsive images

The site uses the Lume [`picture`](https://lume.land/plugins/picture/) and [`transform_images`](https://lume.land/plugins/transform_images/) plugins. Add a `transform-images` attribute to any `<img>` to generate `avif`, `webp`, and fallback `jpg` variants:

```mdx
import { aboutPicture1Jpg } from "@assets";

<img
  src={aboutPicture1Jpg}
  alt="Jose"
  sizes="(max-width: 600px) 100vw, 180px"
  transform-images="avif webp jpg 180@2 800@2"
/>
```

The plugins produce a `<picture>` element with `srcset` sources automatically. The first time images are processed the build is slower because `sharp` is downloading/compiling; subsequent builds are cached.

## Getting started

Make sure you have Deno installed: https://docs.deno.com/runtime/getting_started/installation/

### Build the site

```bash
deno task build
```

The output is written to `_site/`.

### Start the dev server

```bash
deno task serve
```

Then open http://localhost:3000/.

### Troubleshooting: Deno cache errors

If you see read-only file system errors while building, set `DENO_DIR` to a writable directory before running tasks:

```bash
DENO_DIR="$(pwd)/.deno" deno task build
DENO_DIR="$(pwd)/.deno" deno task serve
```

## Writing posts

Create a new `.mdx` file in `content/posts/`. Use frontmatter to set metadata:

```md
---
title: My New Post
date: 2026-07-11
categories:
  - deno
  - web
description: A short summary of the post.
theme: forest
---

Your content here...

## A section

More text.
```

### Available themes

- `default`: clean and neutral (blue accent)
- `warm`: earthy tones for personal writing
- `minimal`: stark black and white, monospace
- `forest`: green-tinted, calm

Each palette supports both dark and light mode. Visitors can toggle via the
sun/moon button in the nav or footer. The default follows the OS
`prefers-color-scheme` setting; the choice is saved to `localStorage`.

## Customization

### Site title and description

Edit `_config.ts`:

```ts
site.use(feed({
  info: {
    title: "Your Blog Name",
    description: "Your tagline.",
    // ...
  },
  // ...
}));
```

Also update `_includes/layouts/base.tsx`:

```tsx
const siteTitle = "Your Blog Name";
```

### Social links

The footer reads social usernames from environment variables at build time:

```bash
LINKEDIN_USERNAME=yourprofile
INSTAGRAM_USERNAME=yourhandle
GITHUB_USERNAME=yourusername
```

You can set them in your shell or in a `.env` file (loaded automatically by `deno task lume`). If a variable is missing, the existing defaults are used.

### Base URL / location

For GitHub Pages, the `.github/workflows/deploy.yml` sets `BASE_URL` automatically. For local development or other hosts, update `_config.ts`:

```ts
const baseUrl = Deno.env.get("BASE_URL") ?? "https://yourdomain.com/";
```

## Deploy to GitHub Pages

1. Push this repository to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` will build and deploy on every push to `main`.

If your repository is named `username.github.io`, the site will be at `https://username.github.io/`. For other repository names, it will be at `https://username.github.io/repo-name/`.

## License

This project is provided as a starting point for your own blog. Customize it as you like.
