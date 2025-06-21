let cart = [];

function addToCart(productName, price) {
  const quantity = parseInt(prompt(`Enter quantity for ${productName}:`, 1));
  if (!isNaN(quantity) && quantity > 0) {
    const existing = cart.find(item => item.productName === productName);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productName, price, quantity });
    }
    alert(`${productName} added to cart.`);
  }
}

// Open and populate the cart modal
function openCart() {
  const modal = document.getElementById("cartModal");
  const cartItems = document.getElementById("cartItems");

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let html = "<ul>";
    cart.forEach((item, i) => {
      html += `<li>${i + 1}. ${item.productName} — Qty: ${item.quantity} — ₹${item.price}</li>`;
    });
    html += "</ul>";
    cartItems.innerHTML = html;
  }

  modal.style.display = "block";
}

function closeCart() {
  document.getElementById("cartModal").style.display = "none";
}

function checkoutCart() {
  const name = document.getElementById("buyerName").value.trim();
  const desc = document.getElementById("buyerDesc").value.trim();
  const phone = document.getElementById("buyerPhone").value.trim();

  if (!name || !phone) {
    alert("Please enter your name and WhatsApp number.");
    return;
  }

  let message = `Hello, I'm ${name}%0A`;

  if (desc) {
    message += `Note: ${desc}%0A`;
  }

  message += `%0AI want to inquire about:%0A`;
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price}/unit%0A`;
    total += item.quantity * item.price;
  });

  message += `%0ATotal Estimate: ₹${total}%0AContact: ${phone}`;

  const ownerNumber = "917066335993";
  const url = `https://wa.me/${ownerNumber}?text=${message}`;
  window.open(url, "_blank");

  closeCart();
}

// ----------------------
// Load Products to Grid
// ----------------------

const products = [
  { name: "Reverse Horn", price: 165 },
  { name: "TT Horn", price: 410 },
  { name: "Fuse Socket with wire", price: 45 },
  { name: "Tickly Wire", price: 4.2 },
  { name: "Indicator Assly. Commet", price: 180 },
  { name: "Indicator Assly. 2214", price: 145 },
  { name: "Wiper Blade Push", price: 290 },
  { name: "Wiper Arm Push", price: 305 },
  { name: "Wiper Lock", price: 8 },
  { name: "Wiper Motor", price: 1850 },
  { name: "Wire Bundle", price: 490 },
  { name: "Head Light Seal Beem", price: 200 },
  { name: "Head Light Inner Ring", price: 80 },
  { name: "Head Light Dom.", price: 435 },
  { name: "Sleev 10MM - 100 Mtr", price: 465 },
  { name: "Sleev 12MM - 100 Mtr", price: 70 },
  { name: "Battery Terminal", price: 12 },
  { name: "Glow 2441 Bulb", price: 23 },
  { name: "Kiran Light", price: 128 },
  { name: "Headlight Bulb", price: 85 },
  { name: "TV Type Side Mirror", price: 182 },
  { name: "Beading Mirror", price: 240 },
  { name: "Wiper Wheel Box", price: 65 },
  { name: "Micro Relay", price: 40 },
  { name: "Push Pull Switch", price: 120 },
  { name: "Arm Side Rod", price: 1850 },
  { name: "Combination Switch", price: 700 },
  { name: "Diesel Tank Cap", price: 200 },
  { name: "Roof Lamp", price: 55 },
  { name: "3 Pin Holder", price: 2.5 },
  { name: "Fuse", price: 160 },
  { name: "Headlamp Relay", price: 95 },
  { name: "Music Flasher", price: 170 },
  { name: "Wiper Blade Bolt", price: 90 }
];

// Dynamically insert product cards
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("product-grid");
  if (grid) {
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
      `;
      grid.appendChild(card);
    });
  }
});
