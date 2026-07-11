export const layout = "layouts/base.tsx";

export default function PostLayout(
  data: Lume.Data & { children: unknown },
) {
  const {
    title,
    date,
    categories: rawCategories,
    theme,
    children,
  } = data;

  const categories = (rawCategories ?? []) as string[];

  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : null;

  return (
    <main id="main" class="post-main">
      <article class="post-article">
        <header class="post-header">
          <h1 class="post-title">{title}</h1>
          <div class="post-meta">
            {formattedDate && date && (
              <time class="post-date" dateTime={date.toISOString()}>
                {formattedDate}
              </time>
            )}
            {categories && categories.length > 0 && (
              <ul class="post-categories" aria-label="Categories">
                {categories.map((category) => (
                  <li>
                    <a href={`/category/${category}/`} class="category-link">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {theme && (
              <span class="post-theme" data-theme={theme.toString()}>
                Theme: {theme.toString()}
              </span>
            )}
          </div>
        </header>
        <div class="post-content prose">
          {children as string}
        </div>
      </article>
    </main>
  );
}
