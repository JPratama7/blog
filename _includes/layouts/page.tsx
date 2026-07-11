export const layout = "layouts/base.tsx";

export default function PageLayout(
  data: Lume.Data & { children: unknown },
) {
  const { title, children } = data;

  return (
    <main id="main" class="page-main">
      <div class="page-container">
        {title && <h1 class="page-title">{title}</h1>}
        <div class="page-content prose">
          {children as string}
        </div>
      </div>
    </main>
  );
}
