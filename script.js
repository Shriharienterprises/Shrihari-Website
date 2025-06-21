let cart = [];

function addToCart(productName, price, quantityInputId) {
  const quantity = parseInt(document.getElementById(quantityInputId).value);
  if (!isNaN(quantity) && quantity > 0) {
    cart.push({ productName, quantity, price });
    updateCartCount();
    alert(`${productName} added to cart.`);
  }
}

function updateCartCount() {
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  document.getElementById("view-cart-btn").innerText = `View Cart (${cartCount})`;
}

function toggleCartModal() {
  const cartModal = document.getElementById("cart-modal");
  cartModal.style.display = cartModal.style.display === "none" ? "block" : "none";
  displayCart();
}

function displayCart() {
  let cartHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    cartHTML += `${index + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price} each<br>`;
    total += item.quantity * item.price;
  });

  document.getElementById("cart-items").innerHTML = cartHTML;
  document.getElementById("total-estimate").innerText = `Total Estimate: ₹${total}`;
}

function showCustomerForm() {
  document.getElementById("customer-form").style.display = "block";
}

function sendInquiry() {
  const name = document.getElementById("name").value;
  const notes = document.getElementById("notes").value;
  const whatsapp = document.getElementById("whatsapp").value;

  if (!name || !whatsapp) {
    alert("Please fill in your name and WhatsApp number.");
    return;
  }

  let message = `Hello, I'm interested in the following products:%0A`;
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.productName} - Qty: ${item.quantity} - Price: ₹${item.price} each%0A`;
    total += item.quantity * item.price;
  });

  message += `%0ATotal Estimate: ₹${total}`;
  message += `%0A--------------------%0ACustomer Name: ${name}%0ANotes: ${notes}%0AContact: ${whatsapp}`;

  const phoneNumber = "917066335993";
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, '_blank');
}

// List of 34 products
const products = [
  { name: "Reverse Horn", price: 165 },
  { name: "TT Horn", price: 410 },
  { name: "Fuse Socket with Wire", price: 45 },
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
  { name: "Disel Tank Cap", price: 200 },
  { name: "Roof Lamp", price: 55 },
  { name: "3 Pin Holder", price: 2.5 },
  { name: "Fuse", price: 160 },
  { name: "Headlamp Relay", price: 95 },
  { name: "Music Flasher", price: 170 },
  { name: "Wiper Blade Bolt", price: 140 },
];
