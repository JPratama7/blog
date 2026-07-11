import { siteTitle } from "../constants.ts";

export default function Nav() {
  return (
    <header class="site-header">
      <nav class="site-nav" aria-label="Main navigation">
        <a href="/" class="site-logo">
          {siteTitle}
        </a>
        <ul class="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/categories/">Category</a>
          </li>
          <li>
            <a href="/about/">About Me</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
