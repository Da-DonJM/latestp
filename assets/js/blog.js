/* ==========================================
   📰 DaDon Personal Website — Blog Script
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.getElementById("blog-container");
  if (!blogContainer) return;

  const script = document.createElement("script");
  script.src = "https://onlineworkhustler.blogspot.com/feeds/posts/default?alt=json-in-script&callback=loadBloggerFeed";
  document.body.appendChild(script);
});

function loadBloggerFeed(json) {
  const blogContainer = document.getElementById("blog-container");
  blogContainer.innerHTML = "";

  const posts = json.feed?.entry || [];
  if (!posts.length) {
    blogContainer.innerHTML = "<p>⚠️ No posts found. Please check back later.</p>";
    return;
  }

  posts.forEach((post, index) => {
    const title = post.title?.$t || "Untitled Post";
    const link = post.link.find(l => l.rel === "alternate")?.href || "#";
    const content = post.content?.$t || "";
    const snippet = content.replace(/<[^>]+>/g, "").substring(0, 160) + "...";
    const imgMatch = content.match(/<img[^>]+src=\"([^\">]+)\"/);
    const thumbnail = imgMatch ? imgMatch[1] : "../assets/images/default-blog.jpg";

    const postCard = document.createElement("article");
    postCard.classList.add("blog-card");
    postCard.innerHTML = `
      <img src="${thumbnail}" alt="${title}" loading="lazy" />
      <div class="blog-content">
        <h3>${title}</h3>
        <p>${snippet}</p>
        <a href="${link}" target="_blank" class="btn">Read Full Post</a>
      </div>
    `;
    blogContainer.appendChild(postCard);
  });
}
