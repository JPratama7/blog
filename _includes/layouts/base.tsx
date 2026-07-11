import Nav from "../../_components/nav.tsx";
import Footer from "../../_components/footer.tsx";
import { siteTitle } from "../../constants.ts";
import { sharedWebiconWebp } from "@assets";

export default function BaseLayout(
  data: Lume.Data & { children: string },
) {
  const {
    title,
    children,
    theme = "default",
    page,
  } = data;

  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <link rel="icon" type="image/x-icon" href={sharedWebiconWebp} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles/main.css" inline />
        <link rel="stylesheet" href="/styles/themes.css" inline />
        <link
          rel="alternate"
          type="application/rss+xml"
          title={siteTitle}
          href="/feed.rss"
        />
      </head>
      <body class={`theme-${theme}`} data-page-url={page?.data?.url}>
        <a href="#main" class="skip-link">Skip to content</a>
        <Nav />

        <div class="site-wrapper">
          {children}
        </div>

        <Footer />
        <script src="/scripts/main.js" inline></script>
      </body>
    </html>
  );
}
