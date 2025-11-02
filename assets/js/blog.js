/* ==========================================
   🧠 DaDon Blog Page — blog.js (2025)
   ========================================== */

/**
 * Load Blogger Feed dynamically via JSON-in-script
 * @param {Object} json - Blogger feed JSON object
 */
function loadBloggerFeed(json) {
  const blogContainer = document.getElementById("blog-container");
  if (!blogContainer) return;

  blogContainer.innerHTML = "";
  const posts = json.feed?.entry || [];

  if (!posts.length) {
    blogContainer.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
    return;
  }

  posts.slice(0, 9).forEach((post, index) => {
    const title = post.title?.$t || "Untitled Post";
    const link = post.link.find((l) => l.rel === "alternate")?.href || "#";
    const content = post.content ? post.content.$t : "";
    const snippet = content.replace(/<[^>]+>/g, "").substring(0, 150) + "...";

    // Extract first image
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
    const thumbnail = imgMatch ? imgMatch[1] : "../assets/images/default-blog.jpg";

    // Create article card
    const article = document.createElement("article");
    article.classList.add("blog-card");
    article.style.setProperty("--i", index + 1);

    article.innerHTML = `
      <img src="${thumbnail}" alt="${title}" loading="lazy" />
      <h3>${title}</h3>
      <p>${snippet}</p>
      <a href="${link}" target="_blank" class="btn">Read More</a>
    `;

    blogContainer.appendChild(article);
  });
}

/**
 * Dynamically load Blogger Feed JSON script
 */
(function loadBloggerScript() {
  const existingScript = document.querySelector("script[src*='blogger']");
  if (existingScript) existingScript.remove();

  const script = document.createElement("script");
  script.src =
    "https://onlineworkhustler.blogspot.com/feeds/posts/default?alt=json-in-script&callback=loadBloggerFeed";
  script.async = true;
  document.body.appendChild(script);
})();
