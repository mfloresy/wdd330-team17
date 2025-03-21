import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");
    
    addQuantityEventListeners(cartItems);
    
    displayCartTotal(cartItems);
  } else {
    document.querySelector(".product-list").innerHTML = "";
  }
}

function addQuantityEventListeners(cartItems) {
  const decreaseButtons = document.querySelectorAll(".quantity-decrease");
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const itemIndex = parseInt(this.dataset.index);
      updateQuantity(itemIndex, -1);
    });
  });
  
  const increaseButtons = document.querySelectorAll(".quantity-increase");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", function() {
      const itemIndex = parseInt(this.dataset.index);
      updateQuantity(itemIndex, 1);
    });
  });
  
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", function() {
      const itemIndex = parseInt(this.dataset.index);
      const newValue = parseInt(this.value);
      
      if (newValue >= 1) {
        setDirectQuantity(itemIndex, newValue);
      } else {
        this.value = 1;
        setDirectQuantity(itemIndex, 1);
      }
    });
  });
}

function updateQuantity(itemIndex, change) {
  const cartItems = getLocalStorage("so-cart") || [];
  
  if (!cartItems[itemIndex].Quantity) {
    cartItems[itemIndex].Quantity = 1;
  }
  
  cartItems[itemIndex].Quantity += change;
  
  if (cartItems[itemIndex].Quantity < 1) {
    cartItems[itemIndex].Quantity = 1;
  }
  
  setLocalStorage("so-cart", cartItems);
  
  renderCartContents();
}

function setDirectQuantity(itemIndex, newQuantity) {
  const cartItems = getLocalStorage("so-cart") || [];
  
  cartItems[itemIndex].Quantity = newQuantity;
  
  setLocalStorage("so-cart", cartItems);
  
  renderCartContents();
}

function cartItemTemplate(item, index) {
  if (!item.Quantity) {
    item.Quantity = 1;
  }
  
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <div class="cart-card__quantity-controls">
    <button class="quantity-decrease" data-index="${index}">-</button>
    <input type="number" min="1" class="quantity-input" value="${item.Quantity}" data-index="${index}">
    <button class="quantity-increase" data-index="${index}">+</button>
  </div>
  <p class="cart-card__price">$${(item.FinalPrice * item.Quantity).toFixed(2)}</p>
</li>`;

  return newItem;
}

function calculateTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => {
    const quantity = item.Quantity || 1;
    return sum + (item.FinalPrice * quantity);
  }, 0);

  return total;
}

function displayCartTotal(cartItems) {
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotalElement = document.querySelector(".cart-total");

  if (cartItems && cartItems.length > 0) {
    const total = calculateTotal(cartItems);

    const formattedTotal = `Total: $${total.toFixed(2)}`;

    cartTotalElement.textContent = formattedTotal;
    cartFooter.classList.remove("hide");
  } else {
    cartFooter.classList.add("hide");
  }
}

renderCartContents();