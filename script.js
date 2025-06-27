// Mobile menu toggle
const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuToggle.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");

  // Animate menu toggle button
  menuToggle.style.transform = mobileMenu.classList.contains("hidden")
    ? "rotate(0deg)"
    : "rotate(90deg)";
});

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

document.addEventListener("DOMContentLoaded", () => {
  console.log('=== DOM CONTENT LOADED ===');
  
  // Cart button
  const cartBtn = document.getElementById("cart-btn");
  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }

  // Mobile cart button
  const mobileCartBtn = document.getElementById("mobile-cart-btn");
  if (mobileCartBtn) {
    mobileCartBtn.addEventListener("click", () => {
      window.location.href = "cart.html";
    });
  }

  // Explore Collection button - smooth scroll to collection section
  const exploreBtn = document.getElementById("explore-btn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", () => {
      const collectionSection = document.getElementById("collection");
      if (collectionSection) {
        collectionSection.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }

  // Load and render products
  const products = [
    {
      id: "add-to-cart-1",
      product: "Midnight Essence",
      description: "A captivating blend of dark berries and vanilla",
      priceStr: "$89.99",
      price: 89.99,
      image: "",
      category: "Premium",
      status: "active",
    },
    {
      id: "add-to-cart-2",
      product: "Ocean Breeze",
      description: "Fresh marine notes with hints of citrus",
      priceStr: "$79.99",
      price: 79.99,
      image: "",
      category: "Fresh",
      status: "active",
    },
    {
      id: "add-to-cart-3",
      product: "Golden Hour",
      description: "Warm amber and sandalwood composition",
      priceStr: "$94.99",
      price: 94.99,
      image: "",
      category: "Luxury",
      status: "active",
    },
  ];

  console.log('=== DOM CONTENT LOADED (MAIN) ===');
  console.log('Products array:', products);
  console.log('Products length:', products.length);
  console.log('About to render products...');
  renderProducts(products);
  console.log('Initializing cart display...');
  updateCartDisplay(); // Initialize cart display on page load

  localStorage.removeItem("adminProducts");
  localStorage.removeItem("adminProductsData");
});

// Function to render products dynamically
function renderProducts(products) {
  const productGrid = document.querySelector(
    ".grid.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8"
  );

  if (!productGrid) {
    console.error('Product grid not found! Looking for:', '.grid.md\\:grid-cols-2.lg\\:grid-cols-3.gap-8');
    return;
  }
  
  console.log('Product grid found:', productGrid);
  productGrid.innerHTML = "";

  // Filter and render only active products
  const activeProducts = products.filter(
    (product) => product.status === "active"
  );
  console.log('Rendering', activeProducts.length, 'products');
  activeProducts.forEach((product, index) => {
    console.log('Creating product card for:', product.product, 'with ID:', product.id);
    const productCard = document.createElement('div');
    productCard.className = 'dark-card rounded-2xl p-6 hover:scale-105 transition-all duration-300 group hover:shadow-2xl hover:shadow-white/20';
    productCard.innerHTML = `
      <div class="h-64 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl mb-6 flex items-center justify-center relative overflow-hidden">
        ${
          product.image
            ? `<img src="${product.image}" alt="${product.product}" class="w-full h-full object-cover rounded-xl" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">`
            : ""
        }
        <div class="${
          product.image ? "hidden" : "flex"
        } absolute inset-0 bg-black bg-opacity-20 items-center justify-center">
          <div class="w-20 h-32 bg-white bg-opacity-30 rounded-lg floating relative z-10 shadow-lg" style="animation-delay: ${
            index * -2
          }s"></div>
        </div>
        <div class="absolute top-4 right-4 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded-full">
          ${product.category || "Premium"}
        </div>
      </div>
      <h3 class="text-2xl font-semibold mb-2 text-white">${
        product.product
      }</h3>
      <p class="text-gray-300 mb-4">${
        product.description || "Premium fragrance collection"
      }</p>
      <div class="flex justify-between items-center">
        <span class="text-2xl font-bold text-white">${product.priceStr}</span>
        <button
          id="${product.id}"
          class="bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-500 hover:to-gray-700 px-6 py-2 rounded-full transition-all duration-300 text-white font-medium glow add-to-cart-btn"
          data-product-id="${product.id}"
        >
          Add to Cart
        </button>
      </div>
    `;

    // Add event listener immediately after creating the element
    const button = productCard.querySelector(`#${product.id}`);
    console.log('Button found for', product.product, ':', !!button);
    if (button) {
      console.log('Adding event listener to button for:', product.product);
      button.addEventListener("click", (e) => {
        console.log('=== BUTTON CLICKED ===');
        console.log('Product:', product.product);
        console.log('Product ID:', product.id);
        console.log('Event target:', e.target);
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        updateCartDisplay();
        showNotification(`${product.product} (${product.priceStr}) added to cart!`);
      });
      
      // Also add a test click handler to verify the button is working
      button.addEventListener("mousedown", () => {
        console.log('Mouse down on button for:', product.product);
      });
    } else {
      console.error('Button NOT found for product:', product.product);
    }

    productGrid.appendChild(productCard);
    console.log('Product card appended for:', product.product);
  });
  
  console.log('Finished rendering products. Total buttons in DOM:', document.querySelectorAll('.add-to-cart-btn').length);


}

// Cart management functions
function addToCart(item) {
  console.log('addToCart called with:', item);
  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
    console.log('Updated existing item:', existingItem);
  } else {
    const newItem = {
      id: item.id,
      product: item.product,
      priceStr: item.priceStr,
      price: item.price,
      quantity: 1,
    };
    cartItems.push(newItem);
    console.log('Added new item:', newItem);
  }

  console.log('Current cartItems:', cartItems);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

function updateCartDisplay() {
  const cartCount = document.getElementById("cart-count");
  const mobileCartCount = document.getElementById("mobile-cart-count");
  const cartPreviewItems = document.getElementById("cart-preview-items");
  const cartPreviewTotal = document.getElementById("cart-preview-total");

  // Update cart count
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCount) {
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? "block" : "none";
  }
  if (mobileCartCount) {
    mobileCartCount.textContent = totalItems;
  }

  // Update cart preview
  if (cartPreviewItems) {
    cartPreviewItems.innerHTML = "";
    let total = 0;

    cartItems.forEach((item) => {
      // Use Math.round to avoid floating point precision issues
      total += Math.round((item.price * item.quantity) * 100) / 100;
      const cartItem = document.createElement("div");
      cartItem.className = "flex justify-between items-center py-2";
      cartItem.innerHTML = `
        <div>
          <p class="font-medium">${item.product}</p>
          <p class="text-sm text-gray-400">Qty: ${item.quantity}</p>
down         </div>
        <p class="font-bold">$${(item.price * item.quantity).toFixed(2)}</p>
      `;
      cartPreviewItems.appendChild(cartItem);
    });

    if (cartPreviewTotal) {
      // Ensure the final total is properly rounded
      cartPreviewTotal.textContent = `$${(Math.round(total * 100) / 100).toFixed(2)}`;
    }
  }
}

function showCartModal() {
  // Create modal if it doesn't exist
  let modal = document.getElementById("cart-modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.id = "cart-modal";
    modal.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50";
    modal.innerHTML = `
      <div class="bg-gray-900 p-6 rounded-lg max-w-md w-full mx-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-white">Shopping Cart</h3>
          <button id="close-cart-modal" class="text-gray-400 hover:text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div id="cart-modal-items" class="mb-4"></div>
        <div class="border-t pt-4">
          <div class="flex justify-between items-center mb-4">
            <span class="text-lg font-bold text-white">Total: <span id="cart-modal-total">$0.00</span></span>
          </div>
          <button class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
            Checkout
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Add close event listener
    document
      .getElementById("close-cart-modal")
      .addEventListener("click", () => {
        modal.style.display = "none";
      });

    // Close on backdrop click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.style.display = "none";
      }
    });
  }

  // Update modal content
  const modalItems = document.getElementById("cart-modal-items");
  const modalTotal = document.getElementById("cart-modal-total");

  modalItems.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    modalItems.innerHTML =
      '<p class="text-gray-400 text-center py-4">Your cart is empty</p>';
  } else {
    cartItems.forEach((item) => {
      // Use Math.round to avoid floating point precision issues
      total += Math.round((item.price * item.quantity) * 100) / 100;
      const cartItem = document.createElement("div");
      cartItem.className =
        "flex justify-between items-center py-2 border-b border-gray-700";
      cartItem.innerHTML = `
        <div>
ction          <p class="font-medium text-white">${item.product}</p>
          <p class="text-sm text-gray-400">Qty: ${item.quantity} × $${item.price.toFixed(2)}</p>
        </div>
        <div class="flex items-center space-x-2">
          <button onclick="removeFromCart('${item.id}')" class="text-red-400 hover:text-red-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      `;
      modalItems.appendChild(cartItem);
    });
  }

  // Ensure the final total is properly rounded
  modalTotal.textContent = `$${(Math.round(total * 100) / 100).toFixed(2)}`;
  modal.style.display = "flex";
}

function removeFromCart(itemId) {
  cartItems = cartItems.filter((item) => item.id !== itemId);
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  updateCartDisplay();
  showCartModal(); // Refresh modal
}

// Initialize cart display on page load
document.addEventListener("DOMContentLoaded", () => {
  updateCartDisplay();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Three.js 3D Background Animation
let scene, camera, renderer, particles;

function init3D() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);
  document.getElementById("three-canvas").appendChild(renderer.domElement);

  // Create particles
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];

  for (let i = 0; i < 1000; i++) {
    vertices.push(
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000,
      (Math.random() - 0.5) * 2000
    );

    colors.push(Math.random(), Math.random(), Math.random());
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(vertices, 3)
  );
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 3,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  camera.position.z = 1000;

  animate3D();
}

function animate3D() {
  requestAnimationFrame(animate3D);

  if (particles) {
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;
  }

  // Camera movement based on mouse position
  const mouseX = (window.mouseX || 0) * 0.0001;
  const mouseY = (window.mouseY || 0) * 0.0001;

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

// Mouse tracking for 3D effect
document.addEventListener("mousemove", (event) => {
  window.mouseX = event.clientX - window.innerWidth / 2;
  window.mouseY = event.clientY - window.innerHeight / 2;
});

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Parallax scrolling effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(".parallax");
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Form submission handling
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  const name = formData.get("name");
  const message = formData.get("message");

  // Basic validation
  if (!email || !name || !message) {
    showNotification("Please fill in all fields.", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showNotification("Please enter a valid email address.", "error");
    return;
  }

  // Simulate form submission
  showNotification("Thank you for your message! We'll get back to you soon.");
  e.target.reset();
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "success") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification");
  existingNotifications.forEach((notification) => notification.remove());

  const notification = document.createElement("div");
  notification.className = `notification fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${
    type === "error" ? "bg-red-600 text-white" : "bg-green-600 text-white"
  }`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = "translateX(full)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Initialize 3D background when page loads
document.addEventListener("DOMContentLoaded", () => {
  if (typeof THREE !== "undefined") {
    init3D();
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-fade-in");
    }
  });
}, observerOptions);

// Observe all sections for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section, .dark-card");
  sections.forEach((el) => {
    observer.observe(el);
  });
});
