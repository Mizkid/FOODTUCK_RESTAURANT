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
document.addEventListener("DOMContentLoaded", () => {
  // 1. Target all elements accurately
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const pageButtons = document.querySelectorAll(".page-btn");
  const allPages = document.querySelectorAll(".menu-page");

  let currentPage = 1;
  const totalPages = 3;

  function updateMenuVisibility() {
    // Step A: Toggle the actual content grids safely
    allPages.forEach((page) => {
      page.classList.add("hidden");
      page.classList.remove("grid");
    });

    const activePageContainer = document.getElementById(
      `menu-page-${currentPage}`,
    );
    if (activePageContainer) {
      activePageContainer.classList.remove("hidden");
      activePageContainer.classList.add("grid");
    }

    // Step B: Lock and unlock the previous/next arrows at boundaries
    if (prevBtn) prevBtn.disabled = currentPage === 1;
    if (nextBtn) nextBtn.disabled = currentPage === totalPages;

    // Step C: FIXED ACTIVE INDICATOR
    // This applies the bright orange color to the current active page number button
    pageButtons.forEach((btn) => {
      const targetNum = parseInt(btn.getAttribute("data-page"));

      if (targetNum === currentPage) {
        // ACTIVE STYLE: Bright orange background, white text
        btn.classList.add(
          "bg-orange-500",
          "text-white",
          "shadow-sm",
          "font-black",
        );
        btn.classList.remove(
          "border-2",
          "border-gray-100",
          "text-orange-500",
          "bg-white",
        );
      } else {
        // INACTIVE STYLE: Plain white background, orange border/text
        btn.classList.remove(
          "bg-orange-500",
          "text-white",
          "shadow-sm",
          "font-black",
        );
        btn.classList.add(
          "border-2",
          "border-gray-100",
          "text-orange-500",
          "bg-white",
        );
      }
    });
  }

  // 2. Page Number Buttons Click Event
  pageButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPage = parseInt(btn.getAttribute("data-page"));
      updateMenuVisibility();
    });
  });

  // 3. FIXED ARROW TRIGGERS: Direct assignments with explicit tracking updates
  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        updateMenuVisibility();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        updateMenuVisibility();
      }
    });
  }

  // Run the initial setup pass to light up Page 1 on load
  updateMenuVisibility();
});

// Shop Sort By

// SHOP FILTER RANGE
document.addEventListener("DOMContentLoaded", () => {
  const minPriceInput = document.getElementById("minPriceInput");
  const maxPriceInput = document.getElementById("maxPriceInput");
  const minPriceDisplay = document.getElementById("minPriceDisplay");
  const maxPriceDisplay = document.getElementById("maxPricedisplay");
  const sliderProgress = document.getElementById("sliderProgress");
  const filterSubmitBtn = document.getElementById("filterSubmitBtn");
  const priceGapvalue = 200;

  function updateRangeSlider() {
    let minVal = parseInt(minPriceInput.value);
    let maxVal = parseInt(maxPriceInput.value);

    if (maxVal - minVal < priceGapvalue) {
      if (document.activeElement === minPriceInput) {
        minPriceInput.value = maxVal - priceGapvalue;
        minVal = maxVal - priceGapvalue;
      } else {
        maxPriceInput.value = minVal + priceGapvalue;
        maxVal = minVal + priceGapvalue;
      }
    }
    // Styling Percentage
    const minPercentage = (minVal / minPriceInput.max) * 100;
    const maxPercentage = 100 - (maxVal / maxPriceInput.max) * 100;

    sliderProgress.style.left = minPercentage + "%";
    sliderProgress.style.right = maxPercentage + "%";

    minPriceDisplay.textContent = `$${minVal}`;
    maxPriceDisplay.textContent = `$${maxVal}`;
  }

  // Slider Adjustment
  minPriceInput.addEventListener("input", updateRangeSlider);
  maxPriceInput.addEventListener("input", updateRangeSlider);

  if (filterSubmitBtn) {
    filterSubmitBtn.addEventListener("click", () => {
      alert(
        `filterering products between $${minPriceInput.value} and $${maxPriceInput.value}`,
      );
    });
  }

  updateRangeSlider();
});

// SHOP DEATAILS ADD TO CART
// let currentQuantityValue = 1;

// document.addEventListener("DOMContentLoaded", () => {
//   const decreaseBtn = document.getElementById("decreaseBtn");
//   const increaseBtn = document.getElementById("increaseBtn");
//   const quantityDisplay = document.getElementById("quantityDisplay");
//   const addToCartBtn = document.getElementById("addToCartBtn");
//   const globalCartBadge = document.getElementById("global-cart-badge");

//   let globalCartTotal = 0;

//   if (increaseBtn) {
//     increaseBtn.addEventListener("click", () => {
//       currentQuantityValue++;
//       quantityDisplay.textContent = currentQuantityValue;
//     });
//   }

//   if (decreaseBtn) {
//     decreaseBtn.addEventListener("click", () => {
//       if (currentQuantityValue > 1) {
//         currentQuantityValue--;
//         quantityDisplay.textContent = currentQuantityValue;
//       }
//     });
//   }

//   if (addToCartBtn) {
//     addToCartBtn.addEventListener("click", () => {
//       globalCartTotal += currentQuantityValue;

//       if (globalCartBadge) {
//         globalCartBadge.textContent = globalCartTotal;
//       }

//       const customAlert = document.getElementById("customAlert");
//       if (customAlert) {
//         customAlert.innerHTML = ` <i class="fas fa-check-circle mr-1.5"></i> Added ${currentQuantityValue} item(s) to cart
//                   successfully!`;

//         customAlert.classList.remove("hidden");
//         setTimeout(() => {
//           customAlert.classList.remove("translate-y-2", "opacity-0");
//         }, 20);

//         setTimeout(() => {
//           customAlert.classList.add("translate-y-2", "opacity-0");
//           setTimeout(() => {
//             customAlert.classList.add("hidden");
//           }, 300);
//         }, 2500);
//       }

//       currentQuantityValue = 1;
//       quantityDisplay.textContent = 1;
//     });
//   }
// });

// SHOPPING/CART/DETAILS
// 1. Centralized Product Database (Ensure IDs match your HTML links)
const productDatabase = [
  {
    id: 101,
    name: "Fresh Lime",
    price: 38.0,
    image: "../Assets/photos/shop-fresh lime.png",
  },
  {
    id: 102,
    name: "Chocolate Muffin",
    price: 28.0,
    image: "../Assets/photos/shop-chocolate-muffin.png",
  },
  {
    id: 103,
    name: "Burger",
    price: 21.0,
    image: "../Assets/photos/shop-burger.png",
  },
  {
    id: 104,
    name: "Country Burger",
    price: 45.0,
    image: "../Assets/photos/shop-country burger.png",
  },
  {
    id: 105,
    name: "Drink",
    price: 23.0,
    image: "../Assets/photos/shop-drink.png",
  },
  {
    id: 106,
    name: "Pizza",
    price: 43.0,
    image: "../Assets/photos/shop-pizza.png",
  },
  {
    id: 107,
    name: "Cheese Butter",
    price: 30.0,
    image: "../Assets/photos/shop-cheese butter.png",
  },
  {
    id: 108,
    name: "Sandwiches",
    price: 25.0,
    image: "../Assets/photos/shop-sandwiches.png",
  },
  {
    id: 109,
    name: "Chicken Chup",
    price: 47.0,
    image: "../Assets/photos/shop-chicken chap.png",
  },
  {
    id: 110,
    name: "Country Burger",
    price: 45.0,
    image: "../Assets/photos/shop-country burger.png",
  },
  {
    id: 111,
    name: "Drink",
    price: 23.0,
    image: "../Assets/photos/shop-drink.png",
  },
  {
    id: 112,
    name: "Pizza",
    price: 43.0,
    image: "../Assets/photos/shop-pizza.png",
  },
  {
    id: 113,
    name: "Cheese Butter",
    price: 30.0,
    image: "../Assets/photos/shop-cheese butter.png",
  },
  {
    id: 114,
    name: "Sandwiches",
    price: 25.0,
    image: "../Assets/photos/shop-sandwiches.png",
  },
  {
    id: 115,
    name: "Fresh Lime",
    price: 38.0,
    image: "../Assets/photos/shop-fresh lime.png",
  },
];

// 2. Page Detection and Router
document.addEventListener("DOMContentLoaded", () => {
  // If elements from the details page exist, initialize them
  if (document.getElementById("detail-name")) {
    initDetailsPage();
  }
  // If elements from the cart page exist, initialize them
  if (document.getElementById("cart-container")) {
    initCartPage();
  }
  // If elements from the checkout exist, initialize them
  if (document.getElementById("checkout-form")) {
    initCheckoutPage();
  }
});

// ==========================================
// 3. SHOP DETAILS LOGIC
// ==========================================
function initDetailsPage() {
  // Read the ID from the URL (e.g., shop-details.html?id=101)
  const params = new URLSearchParams(window.location.search);
  const productId = parseInt(params.get("id"));

  // Find the clicked item in the database
  const product = productDatabase.find((p) => p.id === productId);

  if (!product) {
    console.error("Product code matches no index records.");
    return;
  }

  // Safely inject the chosen product data into your existing template spots
  const imgEl = document.getElementById("detail-image");
  const nameEl = document.getElementById("detail-name");
  const priceEl = document.getElementById("detail-price");

  if (imgEl) {
    imgEl.src = product.image;
    imgEl.alt = product.name;
  }
  if (nameEl) nameEl.innerText = product.name;
  if (priceEl) priceEl.innerText = `$${product.price.toLocaleString()}`;

  // Add to Cart Action Event
  const addToCartBtn = document.getElementById("add-to-cart-btn");
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("add to cart button clicked succesfully");
      console.log("Target product data to be saved");

      if (!product) {
        alert("Error: No valid data found");
        return;
      }

      const qtyInput = document.getElementById("detail-quantity");
      const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;

      // Get current cart array from localStorage memory
      let cart = [];
      try {
        cart = JSON.parse(localStorage.getItem("shopCart")) || [];
      } catch (err) {
        console.error("Error reading localStorage", err);
        cart = [];
      }
      // Check if product is already inside the cart array
      const existingIndex = cart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        cart[existingIndex].quantity += qty;
      } else {
        cart.push({ ...product, quantity: qty });
      }

      // Save cart back to browser local memory
      localStorage.setItem("shopCart", JSON.stringify(cart));
      console.log(
        "LocalStorage updated clenly, current state:",
        localStorage.getItem("shopCart"),
      );
      // alert(`${qty} x ${product.name} added to cart!`);

      // Redirect to your cart page
      window.location.href = "../Components/ShoppingCart.html";
    });
  } else {
    console.error("HTML Element with id='add-to-cart-btn` was not found");
  }
}

// ==========================================
// 4. CART VIEW & REMOVAL LOGIC
// ==========================================
function initCartPage() {
  const container = document.getElementById("cart-container");
  const totalEl = document.getElementById("cart-total");
  let cart = JSON.parse(localStorage.getItem("shopCart")) || [];

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `<div class="flex flex-col items-center justify-center">
    <p class="text-gray-500 mb-3 text-center">
        Your shopping cart is currently empty.
      </p>
      
    </div>`;
    if (totalEl) totalEl.innerText = "$0";
    return;
  }

  let grandTotal = 0;
  container.innerHTML = ""; // Clear placeholders

  // Loop through memory and build HTML items matching your design styling tags
  cart.forEach((item) => {
    const lineTotal = item.price * item.quantity;
    grandTotal += lineTotal;

    container.innerHTML += `
            <div class="flex items-center justify-between border-b border-gray-200 pb-4 mb-4 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 lg:grid-cols-12 lg:flex">
                <div class="flex items-center space-x-4 lg:col-span-6 md:col-span-6">
                    <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded">
                    <div>
                    <h4 class="font-bold text-gray-800 text-lg">${item.name}</h4>
                        <p class="text-sm text-gray-500">Unit Price: $${item.price.toLocaleString()}</p>
                        
                    </div>
                </div>
                <div class="flex items-start justify-center text-right lg:col-span-2 md:col-span-2">
                <p class="text-sm font-medium text-gray-700">Quantity: ${item.quantity}</p>
                </div>
                <div class="flex items-center justify-center lg:col-span-2 md:col-span-2">
                    <p class="font-bold text-gray-900 text-md">Subtotal: $${lineTotal.toLocaleString()}</p>
                  </div>
                    <!-- Click triggers the globally scoped window.removeItem function below -->
                  <div class="flex items-center justify-center lg:col-span-2 md:col-span-2">
                    <button onclick="removeItem(${item.id})" class="text-lg text-gray-700 hover:text-amber-500 block">
                        &times;
                    </button>
                </div>
            </div>
        `;
  });

  if (totalEl) totalEl.innerText = `$${grandTotal.toLocaleString()}`;

  const totalAmountEl = document.getElementById("cart-total-amount");
  if (totalAmountEl)
    totalAmountEl.innerText = `$${grandTotal.toLocaleString()}`;

  const shippingChargeEl = document.getElementById("cart-shipping-charge");
  if (shippingChargeEl)
    shippingChargeEl.innerText = `$${(grandTotal * 0.1).toLocaleString()}`;

  const finalTotalAmount = grandTotal + grandTotal * 0.1;
  const finalTotalAmountEl = document.getElementById("cart-final-total-amount");
  if (finalTotalAmountEl)
    finalTotalAmountEl.innerText = `$${finalTotalAmount.toLocaleString()}`;
}

// 5. Global scope function wrapper so dynamic template buttons can easily strip IDs from localstorage arrays
window.removeItem = function (id) {
  let cart = JSON.parse(localStorage.getItem("shopCart")) || [];
  // Keep everything except the chosen product ID target
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("shopCart", JSON.stringify(cart));

  // Instantly refresh calculations on the page view layout setup
  initCartPage();
};

// CHECKOUT PAGE FUNCTION

const localCountryData = {
  Nigeria: [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT - Abuja",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ],
  "United States": [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
  "United Kingdom": ["England", "Scotland", "Wales", "Northern Ireland"],

  " Canada": [
    "Alberta",
    "British Columbia",
    "Manitoba",
    "New Brunswick",
    "Newfoundland and Labrador",
    "Nova Scotia",
    "Ontario",
    "Prince Edward Island",
    "Quebec",
    "Saskatchewan",
  ],
  " Ghana": [
    "Greater Accra",
    "Ashanti",
    "Western",
    "Northern",
    "Eastern",
    "Central",
    "Volta",
    "Upper East",
    "Upper West",
    "Bono",
  ],
};

function openOrderSummarySidebar() {
  const sidebar = document.getElementById("order-summary-sidebar");
  const overlay = document.getElementById("sidebar-overlay");
  const itemsContainer = document.getElementById("sidebar-items-list");

  if (!sidebar || !overlay || !itemsContainer) {
    console.error(
      "Missing critical sidebar wrapper element nodes in HTML markup.",
    );
    return;
  }

  const cartData = JSON.parse(localStorage.getItem("shopCart")) || [];

  itemsContainer.innerHTML = "";
  let subtotal = 0;

  cartData.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;

    itemsContainer.innerHTML += `
    <div class="flex items-center space-x-4 border-b border-gray-200 pb-3 mb-3">
    <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded bg-gray-50 border-gray-100 border">
    <div class="flex-1">
    <h4  class="font-bold text-gray-900 text-sm">${item.name}</h4>
    <p  class="text-xs text-gray-400">${item.quantity}x @ $${item.price.toFixed(2)}</p>
    </div>
    <span  class="font-semibold text-sm text-gray-900">$${itemTotal.toFixed(2)}</span>
    </div>`;
  });
  const shippingFee = subtotal > 0 ? 1.0 : 0.0;
  const discount = subtotal * 0.1;
  const tax = subtotal * 0.05;
  const cumulativeTotal = subtotal + shippingFee + tax - discount;

  document.getElementById("sidebar-subtotal").innerText =
    `$${subtotal.toFixed(2)}`;
  document.getElementById("sidebar-shipping").innerText =
    shippingFee > 0 ? `$${shippingFee.toFixed(2)}` : "Free";
  document.getElementById("sidebar-discount").innerText =
    `-$${discount.toFixed(2)}`;
  document.getElementById("sidebar-tax").innerText = `$${tax.toFixed(2)}`;
  document.getElementById("sidebar-grand-total").innerText =
    `$${cumulativeTotal.toFixed(2)}`;

  overlay.classList.remove("hidden");
  setTimeout(() => {
    overlay.classList.add("opacity-100");
    sidebar.classList.remove("translate-x-full");
  }, 10);
}

function closeOrderSummarySidebar() {
  const sidebar = document.getElementById("order-summary-sidebar");
  const overlay = document.getElementById("sidebar-overlay");

  if (!sidebar || !overlay) return;

  sidebar.classList.add("translate-x-full");
  overlay.classList.remove("opacity-100");
  setTimeout(() => {
    overlay.classList.add("hidden");
  }, 300);
}

function initCheckoutPage() {
  const countrySelect = document.getElementById("country-select");
  const stateSelect = document.getElementById("state-select");
  const checkoutForm = document.getElementById("checkout-form");

  if (!checkoutForm) {
    console.warn("Target form contact not detected");
    return;
  }

  if (countrySelect) {
    countrySelect.innerHTML = `<option value="">Choose your country</option>`;
    Object.keys(localCountryData).forEach((country) => {
      countrySelect.innerHTML += `<option value="${country}"> ${country}</option>`;
    });
  }

  if (countrySelect && stateSelect) {
    countrySelect.addEventListener("change", function () {
      const selectedCountry = this.value;

      if (!selectedCountry) {
        stateSelect.disabled = true;

        stateSelect.innerHTML = `<option value="">Choose your state</option>`;
        return;
      }
      stateSelect.disabled = false;
      stateSelect.innerHTML = `<option value="">Choose your state</option>`;

      const states = localCountryData[selectedCountry] || [];
      states.forEach((state) => {
        stateSelect.innerHTML += `<option value="${state}">${state}</option>`;
      });
    });
  }

  //   // 3. Handle Order Interception and Summary Computations
  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop native HTML file refreshing behaviors

    const cartData = JSON.parse(localStorage.getItem("shopCart")) || [];
    if (cartData.length === 0) {
      alert("Your checkout batch appears empty. Return to store gallery.");
      return;
    }

    openOrderSummarySidebar();
  });

  document
    .getElementById("close-sidebar-btn")
    ?.addEventListener("click", closeOrderSummarySidebar);
  document
    .getElementById("sidebar-overlay")
    ?.addEventListener("click", closeOrderSummarySidebar);

  document
    .getElementById("sidebar-place-order-btn")
    ?.addEventListener("click", function () {
      // Read field value allocations from your form setup
      const firstName =
        document.getElementById("customer-first-name")?.value || "";
      const lastName =
        document.getElementById("customer-last-name")?.value || "";
      const email = document.getElementById("customer-email")?.value || "";
      const phone = document.getElementById("customer-phone")?.value || "";
      const company =
        document.getElementById("customer-company")?.value || "N/A";
      const country = countrySelect ? countrySelect.value : "";
      const cityState = stateSelect ? stateSelect.value : "";
      const zip = document.getElementById("customer-zip")?.value || "";
      const address1 =
        document.getElementById("customer-address-1")?.value || "";
      const address2 =
        document.getElementById("customer-address-2")?.value || "N/A";

      // Pull active items array out of memory
      const cartData = JSON.parse(localStorage.getItem("shopCart")) || [];

      // Build product list block descriptions for invoices
      let orderSummaryText = "";
      cartData.forEach((item) => {
        orderSummaryText += `${item.name} (Qty: ${item.quantity})\n`;
      });

      // --- DATA BINDING PACKET ---
      const finalEmailPacket = {
        customer_name: `${firstName} ${lastName}`,
        customer_email: email,
        customer_phone: phone,
        customer_company: company,
        delivery_location: `${address1}, ${address2 || ""}, ${cityState}, ${country} (${zip})`,
        order_summary: orderSummaryText,
      };

      // Output to inspect tools panel terminal to verify fields link correctly
      console.log(
        "Email packet compiled successfully. Ready for submission server data pipelines:",
        finalEmailPacket,
      );

      /*
        =====================================================
        EMAILJS ENGINE CONNECTION PREPARATION BLOCK
        =====================================================
        To make this submit straight into your email inbox:
        1. Add the EmailJS script script snippet to your HTML head.
        2. Uncomment the execution block below:

        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", finalEmailPacket)
            .then(() => console.log("Success! Notification email sent."))
            .catch(err => console.error("EmailJS Error:", err));
        */
      closeOrderSummarySidebar();

      // 4. Trigger Live Confirmation Overlay On-Screen Toast Notification
      showDeliveryStatusToast(`${firstName} ${lastName}`);

      // Wipe cart memory clean upon completion
      localStorage.removeItem("shopCart");
    });
}

// }

// Custom UI Delivery Animation Overlay Injector
function showDeliveryStatusToast(fullName) {
  const toast = document.createElement("div");
  toast.className =
    "fixed bottom-5 right-5 bg-emerald-600 text-white p-6 rounded-lg shadow-2xl z-50 transition-all transform translate-y-10 opacity-0 max-w-sm border border-emerald-500";
  toast.innerHTML = `
        <div class="flex items-start space-x-3">
            <span class="text-2xl">📦</span>
            <div>
                <h4 class="font-bold text-lg mb-1">Order Placed, ${fullName}!</h4>
                <p class="text-sm text-emerald-100">Your confirmation receipt details have been sent to your email. Your package is officially on the way!</p>
            </div>
        </div>
    `;

  document.body.appendChild(toast);

  // Fade animation triggers
  setTimeout(() => {
    toast.classList.remove("translate-y-10", "opacity-0");
  }, 100);

  // Automatically clear toast and route back to main shop index page after 5 seconds
  setTimeout(() => {
    toast.classList.add("translate-y-10", "opacity-0");
    setTimeout(() => {
      toast.remove();
      window.location.href = "index.html"; // Make sure this path points back to your shop front
    }, 500);
  }, 5000);
}
