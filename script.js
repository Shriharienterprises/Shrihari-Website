const cart = [];

window.onload = function () {
  const grid = document.getElementById("productGrid");
  products.forEach((product, index) => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <h4>${product.name}</h4>
      <p>₹${product.price}</p>
      <input type="number" min="1" value="1" id="qty-${index}" />
      <button onclick="addToCart(${index})" class="orange-btn">Add to Cart</button>
    `;
    grid.appendChild(card);
  });

  document.getElementById("view-cart-btn").onclick = openCart;
};

function addToCart(index) {
  const qtyInput = document.getElementById(`qty-${index}`);
  const quantity = parseInt(qtyInput.value);
  if (quantity > 0) {
    cart.push({
      productName: products[index].name,
      quantity,
      price: products[index].price
    });
    alert(`${products[index].name} added to cart`);
    updateCartButton();
  }
}

function updateCartButton() {
  const cartBtn = document.getElementById("view-cart-btn");
  cartBtn.textContent = `View Cart (${cart.length})`;
}

function openCart() {
  const modal = document.getElementById("cartModal");
  const cartItems = document.getElementById("cartItems");
  const form = document.getElementById("checkoutForm");

  cartItems.innerHTML = cart.map((item, i) => {
    return `<p>${i + 1}. ${item.productName} - Qty: ${item.quantity} @ ₹${item.price}</p>`;
  }).join("");

  modal.classList.add("active");
  form.style.display = "block";
}

function closeCart() {
  document.getElementById("cartModal").classList.remove("active");
}

function startCheckout() {
  const name = document.getElementById("buyerName").value;
  const desc = document.getElementById("buyerDesc").value;
  const phone = document.getElementById("buyerPhone").value;

  if (!name || !desc || !phone) {
    alert("Please fill all details");
    return;
  }

  let message = `Hello, I'm ${name}%0A${desc}%0AInterested in:%0A`;
  let total = 0;
  cart.forEach((item, i) => {
    message += `${i + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price} each%0A`;
    total += item.quantity * item.price;
  });
  message += `%0ATotal: ₹${total}`;

  const url = `https://wa.me/917066335993?text=${message}`;
  window.open(url, "_blank");
}
