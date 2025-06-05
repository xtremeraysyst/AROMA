let products = [
  {
    id: 1,
    name: "Midnight Essence",
    description: "A sophisticated blend of dark woods and mysterious spices",
    price: 89,
    stock: 25,
    category: "cologne",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300",
    status: "active",
    sales: 45,
  },
  {
    id: 2,
    name: "Royal Amber",
    description: "Luxurious amber notes with hints of vanilla and sandalwood",
    price: 125,
    stock: 18,
    category: "cologne",
    image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=300",
    status: "active",
    sales: 32,
  },
  {
    id: 3,
    name: "Ocean Breeze",
    description: "Fresh aquatic scent with citrus and marine notes",
    price: 75,
    stock: 30,
    category: "cologne",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=300",
    status: "active",
    sales: 67,
  },
  {
    id: 4,
    name: "Golden Sunset",
    description: "Warm and inviting with notes of amber and musk",
    price: 95,
    stock: 22,
    category: "perfume",
    image: "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?w=300",
    status: "active",
    sales: 28,
  },
];

let orders = [
  {
    id: "ORD-001",
    customer: "John Doe",
    email: "john@example.com",
    products: ["Midnight Essence", "Ocean Breeze"],
    total: 164,
    status: "pending",
    date: "2024-01-15",
  },
  {
    id: "ORD-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    products: ["Royal Amber"],
    total: 125,
    status: "shipped",
    date: "2024-01-14",
  },
  {
    id: "ORD-003",
    customer: "Mike Johnson",
    email: "mike@example.com",
    products: ["Ocean Breeze", "Golden Sunset"],
    total: 170,
    status: "delivered",
    date: "2024-01-13",
  },
];

let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    orders: 3,
    totalSpent: 450,
    joinDate: "2023-12-01",
    status: "active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    orders: 2,
    totalSpent: 250,
    joinDate: "2023-11-15",
    status: "active",
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    orders: 1,
    totalSpent: 170,
    joinDate: "2024-01-10",
    status: "active",
  },
];

// Initialize the admin panel
document.addEventListener("DOMContentLoaded", function () {
  loadDashboard();
  loadProducts();
  loadOrders();
  loadUsers();
  loadAnalytics();

  // Set up form handlers
  document
    .getElementById("add-product-form")
    .addEventListener("submit", handleAddProduct);
  document
    .getElementById("edit-product-form")
    .addEventListener("submit", handleEditProduct);
});

// Navigation functions
function showSection(sectionName) {
  // Hide all sections
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => section.classList.add("hidden"));

  // Show selected section
  document.getElementById(sectionName + "-section").classList.remove("hidden");

  // Update sidebar active state
  const sidebarItems = document.querySelectorAll(".sidebar-item");
  sidebarItems.forEach((item) => item.classList.remove("active"));
  event.target.closest(".sidebar-item").classList.add("active");
}

// Dashboard functions
function loadDashboard() {
  // Update stats
  document.getElementById("total-products").textContent = products.length;
  document.getElementById("total-orders").textContent = orders.length;
  document.getElementById("total-users").textContent = users.length;

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  document.getElementById(
    "total-revenue"
  ).textContent = `$${totalRevenue.toLocaleString()}`;
}

// Product management functions
function loadProducts() {
  const tbody = document.getElementById("products-table");
  tbody.innerHTML = "";

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-700 hover:bg-gray-800";
    row.innerHTML = `
      <td class="py-4 px-4">
        <div class="flex items-center space-x-3">
          <img src="${product.image}" alt="${
      product.name
    }" class="w-12 h-12 rounded-lg object-cover">
          <div>
            <p class="font-semibold">${product.name}</p>
            <p class="text-gray-400 text-sm">${product.category}</p>
          </div>
        </div>
      </td>
      <td class="py-4 px-4">$${product.price}</td>
      <td class="py-4 px-4">${product.stock}</td>
      <td class="py-4 px-4">
        <span class="px-2 py-1 rounded-full text-xs ${
          product.status === "active"
            ? "bg-green-500 text-green-100"
            : "bg-red-500 text-red-100"
        }">
          ${product.status}
        </span>
      </td>
      <td class="py-4 px-4">
        <div class="flex space-x-2">
          <button onclick="editProduct(${
            product.id
          })" class="text-blue-400 hover:text-blue-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
          <button onclick="deleteProduct(${
            product.id
          })" class="text-red-400 hover:text-red-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
          <button onclick="toggleProductStatus(${
            product.id
          })" class="text-yellow-400 hover:text-yellow-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"></path>
            </svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function openAddProductModal() {
  document.getElementById("add-product-modal").classList.remove("hidden");
  document.getElementById("add-product-modal").classList.add("flex");
}

function closeAddProductModal() {
  document.getElementById("add-product-modal").classList.add("hidden");
  document.getElementById("add-product-modal").classList.remove("flex");
  document.getElementById("add-product-form").reset();
}

function handleAddProduct(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const newProduct = {
    id: products.length + 1,
    name: document.getElementById("product-name").value,
    description: document.getElementById("product-description").value,
    price: parseFloat(document.getElementById("product-price").value),
    stock: parseInt(document.getElementById("product-stock").value),
    category: document.getElementById("product-category").value,
    image:
      document.getElementById("product-image").value ||
      "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300",
    status: "active",
    sales: 0,
  };

  products.push(newProduct);
  loadProducts();
  loadDashboard();
  closeAddProductModal();

  showNotification("Product added successfully!", "success");
}

function editProduct(id) {
  const product = products.find((p) => p.id === id);
  if (!product) return;

  document.getElementById("edit-product-id").value = product.id;
  document.getElementById("edit-product-name").value = product.name;
  document.getElementById("edit-product-description").value =
    product.description;
  document.getElementById("edit-product-price").value = product.price;
  document.getElementById("edit-product-stock").value = product.stock;
  document.getElementById("edit-product-category").value = product.category;
  document.getElementById("edit-product-image").value = product.image;

  document.getElementById("edit-product-modal").classList.remove("hidden");
  document.getElementById("edit-product-modal").classList.add("flex");
}

function closeEditProductModal() {
  document.getElementById("edit-product-modal").classList.add("hidden");
  document.getElementById("edit-product-modal").classList.remove("flex");
}

function handleEditProduct(e) {
  e.preventDefault();

  const id = parseInt(document.getElementById("edit-product-id").value);
  const productIndex = products.findIndex((p) => p.id === id);

  if (productIndex !== -1) {
    products[productIndex] = {
      ...products[productIndex],
      name: document.getElementById("edit-product-name").value,
      description: document.getElementById("edit-product-description").value,
      price: parseFloat(document.getElementById("edit-product-price").value),
      stock: parseInt(document.getElementById("edit-product-stock").value),
      category: document.getElementById("edit-product-category").value,
      image: document.getElementById("edit-product-image").value,
    };

    loadProducts();
    closeEditProductModal();
    showNotification("Product updated successfully!", "success");
  }
}

function deleteProduct(id) {
  if (confirm("Are you sure you want to delete this product?")) {
    products = products.filter((p) => p.id !== id);
    loadProducts();
    loadDashboard();
    showNotification("Product deleted successfully!", "success");
  }
}

function toggleProductStatus(id) {
  const product = products.find((p) => p.id === id);
  if (product) {
    product.status = product.status === "active" ? "inactive" : "active";
    loadProducts();
    showNotification(
      `Product ${
        product.status === "active" ? "activated" : "deactivated"
      } successfully!`,
      "success"
    );
  }
}

// Order management functions
function loadOrders() {
  const tbody = document.getElementById("orders-table");
  tbody.innerHTML = "";

  orders.forEach((order) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-700 hover:bg-gray-800";
    row.innerHTML = `
      <td class="py-4 px-4 font-mono">${order.id}</td>
      <td class="py-4 px-4">
        <div>
          <p class="font-semibold">${order.customer}</p>
          <p class="text-gray-400 text-sm">${order.email}</p>
        </div>
      </td>
      <td class="py-4 px-4">
        <div class="text-sm">
          ${order.products.map((product) => `<div>${product}</div>`).join("")}
        </div>
      </td>
      <td class="py-4 px-4 font-semibold">$${order.total}</td>
      <td class="py-4 px-4">
        <span class="px-2 py-1 rounded-full text-xs ${
          order.status === "pending"
            ? "bg-yellow-500 text-yellow-100"
            : order.status === "shipped"
            ? "bg-blue-500 text-blue-100"
            : "bg-green-500 text-green-100"
        }">
          ${order.status}
        </span>
      </td>
      <td class="py-4 px-4 text-gray-400">${order.date}</td>
      <td class="py-4 px-4">
        <select onchange="updateOrderStatus('${
          order.id
        }', this.value)" class="bg-gray-700 text-white rounded px-2 py-1 text-sm">
          <option value="pending" ${
            order.status === "pending" ? "selected" : ""
          }>Pending</option>
          <option value="shipped" ${
            order.status === "shipped" ? "selected" : ""
          }>Shipped</option>
          <option value="delivered" ${
            order.status === "delivered" ? "selected" : ""
          }>Delivered</option>
          <option value="cancelled" ${
            order.status === "cancelled" ? "selected" : ""
          }>Cancelled</option>
        </select>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function updateOrderStatus(orderId, newStatus) {
  const order = orders.find((o) => o.id === orderId);
  if (order) {
    order.status = newStatus;
    loadOrders();
    showNotification(
      `Order ${orderId} status updated to ${newStatus}!`,
      "success"
    );
  }
}

// User management functions
function loadUsers() {
  const tbody = document.getElementById("users-table");
  tbody.innerHTML = "";

  users.forEach((user) => {
    const row = document.createElement("tr");
    row.className = "border-b border-gray-700 hover:bg-gray-800";
    row.innerHTML = `
      <td class="py-4 px-4">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
            ${user.name.charAt(0)}
          </div>
          <div>
            <p class="font-semibold">${user.name}</p>
            <p class="text-gray-400 text-sm">ID: ${user.id}</p>
          </div>
        </div>
      </td>
      <td class="py-4 px-4">${user.email}</td>
      <td class="py-4 px-4">${user.orders}</td>
      <td class="py-4 px-4 font-semibold">$${user.totalSpent}</td>
      <td class="py-4 px-4 text-gray-400">${user.joinDate}</td>
      <td class="py-4 px-4">
        <span class="px-2 py-1 rounded-full text-xs ${
          user.status === "active"
            ? "bg-green-500 text-green-100"
            : "bg-red-500 text-red-100"
        }">
          ${user.status}
        </span>
      </td>
      <td class="py-4 px-4">
        <div class="flex space-x-2">
          <button onclick="toggleUserStatus(${
            user.id
          })" class="text-yellow-400 hover:text-yellow-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707"></path>
            </svg>
          </button>
          <button onclick="viewUserDetails(${
            user.id
          })" class="text-blue-400 hover:text-blue-300">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            </svg>
          </button>
        </div>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function toggleUserStatus(userId) {
  const user = users.find((u) => u.id === userId);
  if (user) {
    user.status = user.status === "active" ? "inactive" : "active";
    loadUsers();
    showNotification(
      `User ${
        user.status === "active" ? "activated" : "deactivated"
      } successfully!`,
      "success"
    );
  }
}

function viewUserDetails(userId) {
  const user = users.find((u) => u.id === userId);
  if (user) {
    alert(
      `User Details:\n\nName: ${user.name}\nEmail: ${user.email}\nOrders: ${user.orders}\nTotal Spent: $${user.totalSpent}\nJoin Date: ${user.joinDate}\nStatus: ${user.status}`
    );
  }
}

// Analytics functions
function loadAnalytics() {
  loadTopProducts();
}

function loadTopProducts() {
  const topProductsContainer = document.getElementById("top-products");
  const sortedProducts = [...products]
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  topProductsContainer.innerHTML = "";

  sortedProducts.forEach((product, index) => {
    const item = document.createElement("div");
    item.className =
      "flex items-center justify-between p-3 bg-gray-800 rounded-lg";
    item.innerHTML = `
      <div class="flex items-center space-x-3">
        <span class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
          ${index + 1}
        </span>
        <div>
          <p class="font-semibold">${product.name}</p>
          <p class="text-gray-400 text-sm">${product.sales} sales</p>
        </div>
      </div>
      <span class="text-green-400 font-semibold">$${product.price}</span>
    `;
    topProductsContainer.appendChild(item);
  });
}

// Utility functions
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
    type === "success"
      ? "bg-green-500"
      : type === "error"
      ? "bg-red-500"
      : "bg-blue-500"
  } text-white`;
  notification.textContent = message;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.opacity = "0";
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function logout() {
  if (confirm("Are you sure you want to logout?")) {
    // Clear admin session data
    localStorage.removeItem("adminLoggedIn");
    localStorage.removeItem("adminLoginTime");

    // Redirect to main page
    window.location.href = "index.html";
  }
}

// Export products data to update the main website
function exportProductsToMainSite() {
  // This function would sync the products data with the main website
  // For now, we'll update localStorage to simulate this
  const exportData = products
    .filter((p) => p.status === "active")
    .map((product) => ({
      id: `add-to-cart-${product.id}`,
      product: product.name,
      price: product.price,
      priceStr: `$${product.price}`,
      description: product.description,
      image: product.image,
      category: product.category,
      stock: product.stock,
    }));

  localStorage.setItem("adminProducts", JSON.stringify(exportData));
  showNotification("Products exported to main website!", "success");
}

// Auto-export products when they are modified
function autoExportProducts() {
  exportProductsToMainSite();
}

// Call auto-export whenever products are modified
const originalLoadProducts = loadProducts;
loadProducts = function () {
  originalLoadProducts();
  autoExportProducts();
};
