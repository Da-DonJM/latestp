/* ==========================================
   🌐 DaDon Navigation Script (nav.js)
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navbar = document.querySelector(".navbar");
  const navAnchors = document.querySelectorAll(".nav-links a");

  /* ===== 📱 Toggle Mobile Menu ===== */
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      navbar.classList.toggle("active");

      // Toggle hamburger / close icon
      const isOpen = navLinks.classList.contains("active");
      menuToggle.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  /* ===== 🔗 Active Link Highlight ===== */
  const currentPage = window.location.pathname.split("/").pop();
  navAnchors.forEach(link => {
    const href = link.getAttribute("href");
    if (
      href === currentPage ||
      (currentPage === "" && href.includes("index"))
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  /* ===== ⬆️ Scroll-to-Top Button ===== */
  const scrollBtn = document.createElement("div");
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollBtn.className = "scroll-top";
  document.body.appendChild(scrollBtn);

  Object.assign(scrollBtn.style, {
    position: "fixed",
    bottom: "35px",
    right: "35px",
    background: "var(--accent)",
    color: "var(--primary)",
    fontSize: "1.3rem",
    borderRadius: "50%",
    padding: "12px 15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
    cursor: "pointer",
    transition: "all 0.3s ease",
    opacity: "0",
    visibility: "hidden",
    zIndex: "1500",
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      scrollBtn.style.opacity = "1";
      scrollBtn.style.visibility = "visible";
    } else {
      scrollBtn.style.opacity = "0";
      scrollBtn.style.visibility = "hidden";
    }
  });

  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ===== 🧹 Close mobile nav on link click ===== */
  navAnchors.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768 && navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
        navbar.classList.remove("active");
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });
});
