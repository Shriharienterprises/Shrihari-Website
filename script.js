
let cart = [];

function addToCart(productName, price) {
  const quantity = parseInt(prompt(`Enter quantity for ${productName}:`, 1));
  if (!isNaN(quantity) && quantity > 0) {
    cart.push({ productName, quantity, price });
    alert(`${productName} added to cart.`);
  }
}

function openCart() {
  let cartContent = "Items in Cart:\n";
  let total = 0;

  cart.forEach((item, index) => {
    cartContent += `${index + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price} each\n`;
    total += item.quantity * item.price;
  });

  const name = prompt("Enter your name:");
  const note = prompt("Describe your requirement:");
  const phone = prompt("Enter your WhatsApp number:");

  if (name && note && phone) {
    let message = `Hello, I am ${name}.%0A${note}%0AOrder:%0A`;

    cart.forEach((item, index) => {
      message += `${index + 1}. ${item.productName} - Qty: ${item.quantity} - ₹${item.price} each%0A`;
    });

    message += `%0ATotal: ₹${total}`;
    const whatsappUrl = `https://wa.me/917066335993?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}
