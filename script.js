let cart = [];

function addToCart(productName, price, qtyInputId) {
  const qty = parseInt(document.getElementById(qtyInputId).value);
  if (!isNaN(qty) && qty > 0) {
    cart.push({ productName, price, quantity: qty });
    document.getElementById('cart-count').textContent = cart.length;
    alert(`${productName} (x${qty}) added to cart.`);
  }
}

function toggleCart() {
  const cartSection = document.getElementById("cart");
  cartSection.classList.toggle("hidden");
  displayCart();
}

function displayCart() {
  const cartList = document.getElementById("cart-items");
  const totalTag = document.getElementById("total");
  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((item, i) => {
    total += item.quantity * item.price;
    cartList.innerHTML += `<li>${i + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price} each</li>`;
  });

  totalTag.innerText = `Total Estimate: ₹${total.toFixed(2)}`;
}

function checkoutCart() {
  document.getElementById("buyer-details").classList.remove("hidden");
}

function sendToWhatsApp() {
  const name = document.getElementById("buyer-name").value;
  const notes = document.getElementById("buyer-notes").value;
  const whatsapp = document.getElementById("buyer-whatsapp").value;

  if (!name || !whatsapp) {
    alert("Please fill in all required fields.");
    return;
  }

  let message = `Hello, I am ${name}.%0AHere is my inquiry:%0A`;
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price}%0A`;
  });
  message += `%0AOrder Notes: ${notes}%0AContact: ${whatsapp}`;
  
  window.open(`https://wa.me/917066335993?text=${message}`, '_blank');
}
