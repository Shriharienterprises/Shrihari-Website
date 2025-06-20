let cart = [];

function addToCart(productName, price) {
  const quantity = parseInt(prompt(`Enter quantity for ${productName}:`, 1));
  if (!isNaN(quantity) && quantity > 0) {
    cart.push({ productName, quantity, price });
    alert(`${productName} (Qty: ${quantity}) added to cart.`);
    updateCartPreview();
  }
}

function updateCartPreview() {
  const preview = document.getElementById("cart-preview");
  if (!preview) return;

  preview.innerHTML = "<h3>Your Cart:</h3>";
  if (cart.length === 0) {
    preview.innerHTML += "<p>Cart is empty.</p>";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    preview.innerHTML += `<p>${index + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price}</p>`;
    total += item.quantity * item.price;
  });
  preview.innerHTML += `<strong>Total Estimate: ₹${total}</strong>`;
}

function openCheckoutForm() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  document.getElementById("checkout-form").style.display = "block";
  updateCartPreview(); // Refresh preview before form
}

function sendWhatsAppInquiry() {
  const name = document.getElementById("user-name").value.trim();
  const contact = document.getElementById("user-contact").value.trim();
  const messageText = document.getElementById("user-message").value.trim();

  if (!name || !contact) {
    alert("Please fill in all fields.");
    return;
  }

  let message = `New Inquiry from ${name} (${contact}):%0A`;
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price} each%0A`;
    total += item.quantity * item.price;
  });

  message += `%0ATotal Estimate: ₹${total}`;
  if (messageText) message += `%0AMessage: ${messageText}`;

  const phoneNumber = "917066335993";
  const url = `https://wa.me/${phoneNumber}?text=${encodeURI(message)}`;
  window.open(url, '_blank');
}
