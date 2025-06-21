let cart = [];

function addToCart(productName, price) {
  const quantity = parseInt(prompt(`Enter quantity for ${productName}:`, 1));
  if (!isNaN(quantity) && quantity > 0) {
    cart.push({ productName, quantity, price });
    alert(`${productName} added to cart.`);
    updateCartCount();
  }
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = `(${cart.length})`;
}

function showCart() {
  let cartItems = document.getElementById("cart-items");
  let cartTotal = document.getElementById("cart-total");
  let total = 0;
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const subtotal = item.quantity * item.price;
    cartItems.innerHTML += `<p>${index + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price} each (₹${subtotal})</p>`;
    total += subtotal;
  });
  cartTotal.innerText = `Total Estimate: ₹${total}`;
  document.getElementById("cart-section").style.display = "block";
}

function showCheckout() {
  document.getElementById("checkout-section").style.display = "block";
}

function checkout() {
  const name = document.getElementById("buyer-name").value.trim();
  const phone = document.getElementById("buyer-phone").value.trim();
  const note = document.getElementById("buyer-note").value.trim();
  if (!name || !phone) {
    alert("Please enter your name and WhatsApp number.");
    return;
  }

  let message = `Hello, I'm ${name}.%0A${note ? "Note: " + note + "%0A" : ""}I'm interested in the following products:%0A`;
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price} each%0A`;
    total += item.quantity * item.price;
  });

  message += `%0ATotal Estimate: ₹${total}`;

  const url = `https://wa.me/91${phone}?text=${message}`;
  window.open(url, '_blank');
}
