import type {} from "lume/jsx-runtime";

export const layout = "layouts/base.tsx";
export const description =
  "Personal blog from Jose Pratama: notes on backend engineering, DevOps, AI integrations, and the tools that keep projects running.";

interface Post {
  url: string;
  title: string;
  date?: Date;
  excerpt?: string;
  description?: string;
  categories?: string[];
}

export default function HomePage(data: Lume.Data) {
  const { search } = data;
  const posts = (search?.pages("type=post", "date=desc") ?? []) as Post[];

  return (
    <main id="main" class="page-main home-page">
      <section class="home-intro">
        <h1>Blog</h1>
        <p>
          My Record of Adventure in Code & Life
        </p>
      </section>

      <section aria-labelledby="recent-posts">
        <h2 id="recent-posts" class="sr-only">Recent posts</h2>
        <ul class="post-list">
          {posts.map((post) => {
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
                  <div class="post-list-meta">
                    {formattedDate && <time>{formattedDate}</time>}
                    {post.categories && post.categories.length > 0 && (
                      <span>{post.categories.join(", ")}</span>
                    )}
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
