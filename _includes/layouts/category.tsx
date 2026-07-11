export const layout = "layouts/base.tsx";

interface Post {
  url: string;
  title: string;
  date?: Date;
  description?: string;
  excerpt?: string;
}

export default function CategoryLayout(
  data: Lume.Data & { children: unknown },
) {
  const { title, _, posts, children } = data;
  const categoryPosts = (posts as Post[] ?? []).sort((a, b) => {
    if (!a.date || !b.date) return 0;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <main id="main" class="page-main">
      <div class="page-container">
        {title && <h1 class="page-title">{title}</h1>}
        <div class="page-content">
          <a href="/categories/" class="category-link">← All categories</a>

          <ul class="category-post-list">
            {categoryPosts.map((post) => {
              const formattedDate = post.date
                ? new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })
                : null;

              return (
                <li class="post-list-item">
                  <a href={post.url} class="post-list-link">
                    <h3 class="post-list-title">{post.title}</h3>
                    <p class="post-list-excerpt">
                      {post.excerpt || post.description || "Read more..."}
                    </p>
                    {formattedDate && (
                      <div class="post-list-meta">
                        <time>{formattedDate}</time>
                      </div>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
          <div class="prose">
            {children as string}
          </div>
        </div>
      </div>
    </main>
  );
}
