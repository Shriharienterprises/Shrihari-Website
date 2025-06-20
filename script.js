let cart = [];

function addToCart(productName, price) {
  const qtyInput = document.getElementById(`qty-${productName.replace(/\s+/g, "_")}`);
  const quantity = parseInt(qtyInput.value);
  if (!isNaN(quantity) && quantity > 0) {
    cart.push({ productName, quantity, price });
    alert(`${productName} added to cart.`);
    renderCart();
  }
}

function renderCart() {
  const cartSection = document.getElementById("cart-preview");
  const checkoutForm = document.getElementById("checkout-form");

  if (cart.length === 0) {
    cartSection.innerHTML = "<p>Your cart is empty.</p>";
    checkoutForm.style.display = "none";
    return;
  }

  let cartHTML = "<h3>Your Cart</h3><ul>";
  let total = 0;

  cart.forEach((item, index) => {
    cartHTML += `<li>${index + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price}</li>`;
    total += item.price * item.quantity;
  });

  cartHTML += `</ul><p><strong>Total Estimate: ₹${total}</strong></p>`;
  cartSection.innerHTML = cartHTML;
  checkoutForm.style.display = "block";
}

function scrollToCart() {
  const cartSection = document.getElementById("cart-preview");
  if (cartSection) {
    cartSection.scrollIntoView({ behavior: "smooth" });
  }
}

function sendWhatsAppInquiry() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  const name = document.getElementById("user-name").value.trim();
  const contact = document.getElementById("user-contact").value.trim();
  const messageText = document.getElementById("user-message").value.trim();

  if (!name || !contact) {
    alert("Please enter your name and WhatsApp number.");
    return;
  }

  let message = "Hello, I'm interested in the following products:%0A";
  let total = 0;

  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.productName} - Qty: ${item.quantity} - Price: ₹${item.price}%0A`;
    total += item.quantity * item.price;
  });

  message += `%0A---%0ATotal Estimate: ₹${total}%0A`;
  message += `Name: ${name}%0AContact: ${contact}%0ARequirement: ${messageText}`;

  const phoneNumber = "917066335993";
  const url = `https://wa.me/${phoneNumber}?text=${message}`;
  window.open(url, "_blank");
}

document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.querySelector("button[onclick='scrollToCart()']");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      renderCart();
      document.getElementById("cart-preview").scrollIntoView({ behavior: "smooth" });
    });
  }
});
