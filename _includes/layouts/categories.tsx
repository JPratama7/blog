export const layout = "layouts/base.tsx";

export default function CategoriesLayout(
  data: Lume.Data & { children: unknown },
) {
  const { title, categories, children } = data;
  const categoryMap = categories as Record<string, unknown[]> ?? {};

  return (
    <main id="main" class="page-main">
      <div class="page-container">
        {title && <h1 class="page-title">{title}</h1>}
        <div class="page-content">
          <p class="prose">
            Browse posts by topic.
          </p>
          <ul class="categories-list">
            {Object.entries(categoryMap).map(([category, posts]) => (
              <li>
                <a href={`/category/${category}/`} class="category-card">
                  <div class="category-card-name">{category}</div>
                  <div class="category-card-count">
                    {posts.length} {posts.length === 1 ? "post" : "posts"}
                  </div>
                </a>
              </li>
            ))}
          </ul>
          <div class="prose">
            {children as string}
          </div>
        </div>
      </div>
    </main>
  );
}
