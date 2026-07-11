import lume from "lume/mod.ts";
import jsx from "lume/plugins/jsx.ts";
import mdx from "lume/plugins/mdx.ts";
import date from "lume/plugins/date.ts";
import slugifyUrls from "lume/plugins/slugify_urls.ts";
import nav from "lume/plugins/nav.ts";
import search from "lume/plugins/search.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import sitemap from "lume/plugins/sitemap.ts";
import feed from "lume/plugins/feed.ts";
import robots from "lume/plugins/robots.ts";
import basePath from "lume/plugins/base_path.ts";
import picture from "lume/plugins/picture.ts";
import transformImages from "lume/plugins/transform_images.ts";
import { feedTitle, siteDescription } from "./constants.ts";
import checkUrls from "lume/plugins/check_urls.ts";

const baseUrl = Deno.env.get("BASE_URL") ?? "https://example.com/";

const site = lume(
  {
    location: new URL(baseUrl),
    caseSensitiveUrls: false,
  },
  {
    markdown: {
      options: {
        linkify: true,
      },
    },
  },
);

site.use(basePath());
site.use(
  checkUrls({
    strict: true,
  }),
);
site.use(jsx());
site.use(mdx());
site.use(date());
site.use(slugifyUrls());
site.use(nav());
site.use(search());
site.use(codeHighlight());
site.use(sitemap());
site.use(robots());
site.use(picture());
site.use(transformImages());
site.use(
  feed({
    output: ["/feed.rss", "/feed.json"],
    query: "type=post",
    info: {
      title: feedTitle,
      description: siteDescription,
      published: new Date(),
      lang: "en",
      generator: true,
    },
    items: {
      title: "=title",
      description: "=description",
      published: "=date",
      updated: "=date",
      content: "=content",
      lang: "en",
    },
  }),
);

site.data("layout", "layouts/page.tsx");
site.data("type", "page");

site.data("layout", "layouts/post.tsx", "/content/posts");
site.data("type", "post", "/content/posts");

site.data("title", "License", "/LICENSE.md");

site.copy("styles");
site.copy("scripts");
site.add("assets");

site.ignore("README.md");

interface TocItem {
  text: string;
  id: string;
  level: number;
}

function slugifyId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function buildSidebarHtml(toc: TocItem[]): string {
  if (toc.length === 0) return "";

  const items = toc
    .map(
      (item) =>
        `<li class="toc-item toc-level-${item.level}"><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`,
    )
    .join("");

  return `
    <button
      type="button"
      class="sidebar-toggle"
      aria-controls="toc-list"
      aria-expanded="true"
      aria-label="Toggle table of contents"
    >
      <span class="toggle-icon" aria-hidden="true">←</span>
      <span class="toggle-text">Hide</span>
    </button>
    <h2 id="toc-heading" class="sidebar-title">Sections</h2>
    <nav id="toc-list" class="toc-nav" aria-label="Table of contents">
      <ul class="toc-list">${items}</ul>
    </nav>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

site.process([".html"], (pages) => {
  for (const page of pages) {
    if (page.data.type !== "post") continue;

    const document = page.document;
    if (!document) continue;

    const toc: TocItem[] = [];
    const headings = document.querySelectorAll("h2, h3");
    for (const heading of headings) {
      const text = heading.textContent?.trim() ?? "";
      if (!text) continue;

      let id = heading.getAttribute("id");
      if (!id) {
        id = slugifyId(text);
        heading.setAttribute("id", id);
      }

      toc.push({
        text,
        id,
        level: heading.tagName === "H2" ? 2 : 3,
      });
    }

    page.data.toc = toc;

    const article = document.querySelector(".post-article");
    if (!article || toc.length === 0) continue;

    const sidebarHtml = buildSidebarHtml(toc);
    const sidebar = document.createElement("aside");
    sidebar.className = "post-sidebar";
    sidebar.setAttribute("aria-labelledby", "toc-heading");
    sidebar.innerHTML = sidebarHtml;

    article.parentNode?.insertBefore(sidebar, article);
  }
});

export default site;
