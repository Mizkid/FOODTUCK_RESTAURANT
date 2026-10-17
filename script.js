// Navigation Bar

const menuBtn = document.getElementById("menuBtn");
const closeMenuBtn = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const mobileLinks = document.querySelectorAll(".mobile-link");

function toggleMenu() {
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
  }
}

function closeMenu() {
  if (mobileMenu) {
    mobileMenu.classList.toggle("hidden");
  }
}
if (menuBtn) {
  menuBtn.addEventListener("click", toggleMenu);
}
if (closeMenuBtn) {
  closeMenuBtn.addEventListener("click", toggleMenu);
}

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// SHOP AREA
const totalPages = 3;
let currentPage = 1;

const pageButtons = document.querySelectorAll(".page-btn");
const prevBtn = document.getElementById("preBtn");
const nextBtn = document.getElementById("nextBtn");

function updateUI() {
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  pageButtons.forEach((btn) => {
    const pageNum = parseInt(btn.getAttribute("data-page"));

    if (pageNum === currentPage) {
      btn.className =
        "page-btn w-10 h-10 flex items-center justify-center text-amber-500 font-bold transition-colors";
    } else {
      btn.className =
        "page-btn hover:bg-amber-500 hover:text-white w-10 h-10 flex items-center justify-center border-2 border-gray-100 text-amber-500 font-bold transition-colors";
    }
  });
}

//Click event to change page
pageButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentPage = parseInt(btn.getAttribute("data-page"));
    updateUI();
  });
});

//Navigation arrows
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateUI();
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPage < totalPages) {
    currentPage++;
    updateUI();
  }
});

updateUI();
