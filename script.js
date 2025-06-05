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
let cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

// Button functionality
document.addEventListener("DOMContentLoaded", function () {
  // Sign In buttons
  const signInBtn = document.getElementById("sign-in-btn");
  const mobileSignInBtn = document.getElementById("mobile-sign-in-btn");

  function handleSignIn() {
    window.location.href = "signin.html";
  }

  if (signInBtn) signInBtn.addEventListener("click", handleSignIn);
  if (mobileSignInBtn) mobileSignInBtn.addEventListener("click", handleSignIn);

  // Cart buttons (desktop and mobile)
  const cartBtn = document.getElementById("cart-btn");
  const mobileCartBtn = document.getElementById("mobile-cart-btn");

  if (cartBtn) {
    cartBtn.addEventListener("click", function () {
      showCartModal();
    });
  }

  if (mobileCartBtn) {
    mobileCartBtn.addEventListener("click", function () {
      showCartModal();
    });
  }

  // Get Started buttons
  const getStartedBtn = document.getElementById("get-started-btn");
  const mobileGetStartedBtn = document.getElementById("mobile-get-started-btn");

  function handleGetStarted() {
    alert("Get Started functionality would redirect to registration page");
    // In a real app, this would redirect to a registration page
    // window.location.href = '/register';
  }

  if (getStartedBtn) getStartedBtn.addEventListener("click", handleGetStarted);
  if (mobileGetStartedBtn)
    mobileGetStartedBtn.addEventListener("click", handleGetStarted);

  // Explore Collection button
  const exploreBtn = document.getElementById("explore-btn");
  if (exploreBtn) {
    exploreBtn.addEventListener("click", function () {
      document.getElementById("collection").scrollIntoView({
        behavior: "smooth",
      });
    });
  }

  // Load products from admin panel or use default products
  let adminProducts = JSON.parse(localStorage.getItem('adminProducts')) || [];
  
  // Default products if no admin products exist
  const defaultProducts = [
    {
      id: "add-to-cart-1",
      product: "Midnight Essence",
      price: 89,
      priceStr: "$89",
    },
    {
      id: "add-to-cart-2",
      product: "Royal Amber",
      price: 125,
      priceStr: "$125",
    },
    {
      id: "add-to-cart-3",
      product: "Ocean Breeze",
      price: 75,
      priceStr: "$75",
    },
  ];
  
  // Use admin products if available, otherwise use default
  const addToCartBtns = adminProducts.length > 0 ? adminProducts : defaultProducts;

  addToCartBtns.forEach((item) => {
    const btn = document.getElementById(item.id);
    if (btn) {
      btn.addEventListener("click", function () {
        // Add visual feedback
        btn.style.transform = "scale(0.95)";
        setTimeout(() => {
          btn.style.transform = "scale(1)";
        }, 150);

        // Add to cart
        addToCart(item);

        // Show notification
        showNotification(`${item.product} (${item.priceStr}) added to cart!`);
      });
    }
  });
});

// Cart management functions
function addToCart(item) {
  // Load cart from localStorage
  cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      id: item.id,
      product: item.product,
      price: item.price,
      priceStr: item.priceStr,
      quantity: 1,
    });
  }

  // Save to localStorage
  localStorage.setItem("cartItems", JSON.stringify(cartItems));

  cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  updateCartCount();
}

function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const mobileCartCountElement = document.getElementById("mobile-cart-count");

  if (cartCountElement) {
    cartCountElement.textContent = cartCount;
  }

  if (mobileCartCountElement) {
    mobileCartCountElement.textContent = cartCount;
  }

  // Update cart preview
  updateCartPreview();
}

function updateCartPreview() {
  const cartPreviewItems = document.getElementById("cart-preview-items");
  const cartPreviewTotal = document.getElementById("cart-preview-total");

  if (!cartPreviewItems || !cartPreviewTotal) return;

  if (cartItems.length === 0) {
    cartPreviewItems.innerHTML =
      '<p class="text-gray-400 text-center py-4">Your cart is empty</p>';
    cartPreviewTotal.textContent = "$0";
    return;
  }

  let total = 0;
  cartPreviewItems.innerHTML = "";

  cartItems.forEach((item) => {
    total += item.price * item.quantity;

    const itemElement = document.createElement("div");
    itemElement.className =
      "cart-preview-item flex items-center justify-between p-2";
    itemElement.innerHTML = `
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded flex items-center justify-center text-xs">🍃</div>
        <div>
          <p class="text-white text-sm font-medium">${item.product}</p>
          <p class="text-gray-400 text-xs">${item.quantity}x ${
      item.priceStr
    }</p>
        </div>
      </div>
      <p class="text-white text-sm font-semibold">$${
        item.price * item.quantity
      }</p>
    `;

    cartPreviewItems.appendChild(itemElement);
  });

  cartPreviewTotal.textContent = `$${total}`;
}

function showCartModal() {
  // Redirect to cart page
  window.location.href = "cart.html";
}

// Notification system
function showNotification(message) {
  // Create notification element
  const notification = document.createElement("div");
  notification.className =
    "fixed top-20 right-4 bg-black border border-white text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300";
  notification.textContent = message;

  // Add to page
  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(full)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

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

function initThreeJS() {
  // Scene setup
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

  const container = document.getElementById("three-container");
  container.appendChild(renderer.domElement);

  // Create floating particles
  const particleCount = 100;
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    // Position
    positions[i * 3] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

    // Colors (blue to purple gradient)
    const colorChoice = Math.random();
    if (colorChoice < 0.33) {
      colors[i * 3] = 0.4; // R
      colors[i * 3 + 1] = 0.6; // G
      colors[i * 3 + 2] = 1.0; // B
    } else if (colorChoice < 0.66) {
      colors[i * 3] = 0.6; // R
      colors[i * 3 + 1] = 0.4; // G
      colors[i * 3 + 2] = 1.0; // B
    } else {
      colors[i * 3] = 1.0; // R
      colors[i * 3 + 1] = 0.4; // G
      colors[i * 3 + 2] = 0.8; // B
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Add floating geometric shapes
  createFloatingShapes();

  camera.position.z = 50;

  animate();
}

function createFloatingShapes() {
  const shapes = [];

  // Create various geometric shapes
  for (let i = 0; i < 15; i++) {
    let geometry, material, mesh;

    const shapeType = Math.floor(Math.random() * 3);

    switch (shapeType) {
      case 0:
        geometry = new THREE.BoxGeometry(2, 2, 2);
        break;
      case 1:
        geometry = new THREE.SphereGeometry(1, 8, 6);
        break;
      case 2:
        geometry = new THREE.OctahedronGeometry(1.5);
        break;
    }

    material = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(Math.random() * 0.3 + 0.6, 0.7, 0.5),
      transparent: true,
      opacity: 0.3,
      wireframe: true,
    });

    mesh = new THREE.Mesh(geometry, material);

    // Random position
    mesh.position.x = (Math.random() - 0.5) * 80;
    mesh.position.y = (Math.random() - 0.5) * 80;
    mesh.position.z = (Math.random() - 0.5) * 80;

    // Random rotation speed
    mesh.userData = {
      rotationSpeed: {
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02,
      },
      floatSpeed: Math.random() * 0.02 + 0.01,
    };

    scene.add(mesh);
    shapes.push(mesh);
  }

  return shapes;
}

function animate() {
  requestAnimationFrame(animate);

  // Rotate particles
  if (particles) {
    particles.rotation.x += 0.001;
    particles.rotation.y += 0.002;
  }

  // Animate floating shapes
  scene.children.forEach((child) => {
    if (child.userData && child.userData.rotationSpeed) {
      child.rotation.x += child.userData.rotationSpeed.x;
      child.rotation.y += child.userData.rotationSpeed.y;
      child.rotation.z += child.userData.rotationSpeed.z;

      // Floating motion
      child.position.y +=
        Math.sin(Date.now() * child.userData.floatSpeed) * 0.01;
    }
  });

  // Camera movement based on mouse position
  const mouseX = (window.mouseX || 0) * 0.0001;
  const mouseY = (window.mouseY || 0) * 0.0001;

  camera.position.x += (mouseX - camera.position.x) * 0.05;
  camera.position.y += (-mouseY - camera.position.y) * 0.05;
  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

// Mouse tracking for camera movement
window.addEventListener("mousemove", (event) => {
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
  const parallax = document.querySelector("#three-container");
  const speed = scrolled * 0.5;

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Form submission handling
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form data
  const formData = new FormData(e.target);
  const name = e.target.querySelector('input[type="text"]').value;
  const email = e.target.querySelector('input[type="email"]').value;
  const message = e.target.querySelector("textarea").value;

  // Simple validation
  if (!name || !email || !message) {
    alert("Please fill in all fields");
    return;
  }

  if (!isValidEmail(email)) {
    alert("Please enter a valid email address");
    return;
  }

  // Simulate form submission
  const submitButton = e.target.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;

  submitButton.textContent = "Sending...";
  submitButton.disabled = true;

  setTimeout(() => {
    alert("Thank you for your message! We'll get back to you soon.");
    e.target.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
});

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add to cart functionality
document.querySelectorAll("button").forEach((button) => {
  if (button.textContent.includes("Add to Cart")) {
    button.addEventListener("click", (e) => {
      const card = e.target.closest(".glass-effect");
      const productName = card.querySelector("h3").textContent;
      const price = card.querySelector(".text-2xl.font-bold").textContent;

      // Animate button
      e.target.style.transform = "scale(0.95)";
      setTimeout(() => {
        e.target.style.transform = "scale(1)";
      }, 150);

      // Show confirmation
      showNotification(`${productName} added to cart!`);
    });
  }
});

// Notification system
function showNotification(message) {
  const notification = document.createElement("div");
  notification.className =
    "fixed top-20 right-6 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300";
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
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Animated background scroll effect
function handleBackgroundScroll() {
  const animatedBg = document.getElementById("animated-bg");
  const scrollY = window.scrollY;
  const fadeThreshold = 200; // Start fading after 200px scroll

  if (scrollY > fadeThreshold) {
    animatedBg.classList.add("fade-out");
  } else {
    animatedBg.classList.remove("fade-out");
  }
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Add scroll listener for background effect
  window.addEventListener("scroll", handleBackgroundScroll);

  // Initialize cart count display
  updateCartCount();

  initThreeJS();

  // Add loading animation
  const loader = document.createElement("div");
  loader.className =
    "fixed inset-0 bg-gray-900 flex items-center justify-center z-50";
  loader.innerHTML = `
        <div class="text-center">
            <div class="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p class="text-white text-xl">Loading...</p>
        </div>
    `;

  document.body.appendChild(loader);

  // Remove loader after everything is loaded
  setTimeout(() => {
    loader.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(loader);
    }, 500);
  }, 2000);
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(".glass-effect, h2, p");
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});
