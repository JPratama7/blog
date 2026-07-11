import { siteCopyright } from "../constants.ts";

export default function Footer() {
  const linkedin = Deno.env.get("LINKEDIN_USERNAME")?.trim();
  const instagram = Deno.env.get("INSTAGRAM_USERNAME")?.trim();
  const github = Deno.env.get("GITHUB_USERNAME")?.trim();

  return (
    <footer class="site-footer">
      <div class="footer-content">
        <p class="footer-copyright">
          © {new Date().getFullYear()} {siteCopyright}
        </p>
        <p class="footer-license">
          <a href="/license/">License</a>
        </p>
        <ul class="footer-social" aria-label="Social links">
          <li>
            <a
              href={`https://www.linkedin.com/in/${linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              LinkedIn
            </a>
          </li>
          <li>
            <a
              href={`https://www.instagram.com/${instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href={`https://github.com/${github}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
