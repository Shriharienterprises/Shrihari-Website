
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
  const cartContent = document.getElementById("cart-content");
  let total = 0;
  let contentHTML = "<h2>Your Cart</h2><ul>";

  if (cart.length === 0) {
    contentHTML += "<li>Your cart is empty.</li></ul>";
  } else {
    cart.forEach((item, index) => {
      contentHTML += `<li>${index + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price}</li>`;
      total += item.price * item.quantity;
    });
    contentHTML += `</ul><p><strong>Total Estimate: ₹${total}</strong></p>`;
    contentHTML += `
      <div>
        <input type="text" id="user-name" placeholder="Your Name"><br>
        <input type="text" id="user-contact" placeholder="Your WhatsApp Number"><br>
        <textarea id="user-message" placeholder="Message/Requirement"></textarea><br>
        <button onclick="sendWhatsAppInquiry()">Send via WhatsApp</button>
      </div>`;
  }

  cartContent.innerHTML = contentHTML;
  document.getElementById("cart-modal").style.display = "block";
}

function openCartPopup() {
  renderCart();
}

function closeCartPopup() {
  document.getElementById("cart-modal").style.display = "none";
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
