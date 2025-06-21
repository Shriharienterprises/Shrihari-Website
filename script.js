const cart = [];

window.onload = function () {
  displayProducts(products);

  document.getElementById("searchInput").addEventListener("input", function () {
    const term = this.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(term));
    displayProducts(filtered);
  });
};

function displayProducts(productList) {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = '';
  productList.forEach((product, index) => {
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
}

function addToCart(index) {
  const qtyInput = document.getElementById(`qty-${index}`);
  const quantity = parseInt(qtyInput.value);
  if (quantity > 0) {
    const product = products[index];
    const existing = cart.findIndex(item => item.productName === product.name);
    if (existing !== -1) {
      cart[existing].quantity += quantity;
    } else {
      cart.push({
        productName: product.name,
        quantity,
        price: product.price
      });
    }
    alert(`${product.name} added to cart`);
    updateCartButton();
  }
}

function openCart() {
  const modal = document.getElementById("cartModal");
  const cartItems = document.getElementById("cartItems");
  const form = document.getElementById("checkoutForm");

  let total = 0;
  cartItems.innerHTML = cart.map((item, i) => {
    total += item.quantity * item.price;
    return `
      <div class="cart-item">
        <span>${i + 1}. ${item.productName} (₹${item.price})</span>
        <input type="number" value="${item.quantity}" min="1" id="editQty-${i}" />
        <button class="update-btn" onclick="updateCartItem(${i})">Update</button>
        <button onclick="removeCartItem(${i})">X</button>
      </div>
    `;
  }).join("");

  cartItems.innerHTML += `<hr><p style="font-weight:bold;">Total: ₹${total}</p>`;
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

function updateCartItem(index) {
  const newQty = parseInt(document.getElementById(`editQty-${index}`).value);
  if (newQty > 0) {
    cart[index].quantity = newQty;
    openCart();
    updateCartButton();
  }
}

function removeCartItem(index) {
  cart.splice(index, 1);
  openCart();
  updateCartButton();
}

document.getElementById("viewCartBtn").onclick = openCart;

function updateCartButton() {
  const btn = document.getElementById("viewCartBtn");
  btn.textContent = `View Cart (${cart.length})`;
}
