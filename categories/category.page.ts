interface Post {
  url: string;
  title: string;
  date?: Date;
  description?: string;
  excerpt?: string;
  categories?: string[];
}

interface SearchHelper {
  pages(query: string, sort?: string): unknown[];
}

export default function* (
  { search }: { search?: SearchHelper },
) {
  const posts = (search?.pages("type=post") ?? []) as Post[];
  const categories = new Map<string, Post[]>();

  for (const post of posts) {
    for (const category of post.categories ?? []) {
      if (!categories.has(category)) {
        categories.set(category, []);
      }
      categories.get(category)!.push(post);
    }
  }

  yield {
    url: "/categories/",
    title: "Categories",
    layout: "layouts/categories.tsx",
    categories: Object.fromEntries(categories),
  };

  for (const [category, categoryPosts] of categories) {
    yield {
      url: `/category/${category}/`,
      title: `Category: ${category}`,
      layout: "layouts/category.tsx",
      category,
      posts: categoryPosts,
    };
  }
}
