/* ==========================================
   💡 Lightbox Script — by DaDon (2025)
   ========================================== */

document.addEventListener("DOMContentLoaded", function () {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close");

  const portfolioImages = document.querySelectorAll(".portfolio-item img");
  let currentIndex = 0;

  if (!lightbox || !lightboxImg || !closeBtn) return; // Prevent errors if missing

  /* ========== 🖼️ Show Lightbox Image ========== */
  portfolioImages.forEach((img, index) => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
      captionText.innerHTML = img.alt || "Portfolio Image";
      currentIndex = index;
      document.body.style.overflow = "hidden"; // Disable background scroll
    });
  });

  /* ========== ❌ Close Lightbox ========== */
  closeBtn.addEventListener("click", () => {
    closeLightbox();
  });

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = ""; // Re-enable scroll
  }

  /* ========== ⌨️ Keyboard Navigation ========== */
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeLightbox();
    }
  });

  /* ========== ▶️ Next / ◀️ Previous Image ========== */
  function showNext() {
    currentIndex = (currentIndex + 1) % portfolioImages.length;
    updateLightboxImage();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + portfolioImages.length) % portfolioImages.length;
    updateLightboxImage();
  }

  function updateLightboxImage() {
    const img = portfolioImages[currentIndex];
    lightboxImg.src = img.src;
    captionText.innerHTML = img.alt || "Portfolio Image";
  }
});
