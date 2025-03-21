import {
  getLocalStorage,
  setLocalStorage,
  getParam,
  loadHeaderFooter,
} from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const productID = getParam("product");

const products = new ProductDetails(productID, dataSource);
products.init();

function addProductToCart(product) {
  let cartItems = getLocalStorage("so-cart");
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }
  product.Quantity = 1;

  const existingProductIndex = cartItems.findIndex(
    (item) => item.Id === product.Id,
  );

  if (existingProductIndex >= 0) {
    cartItems[existingProductIndex].Quantity += 1;
  } else {
    cartItems.push(product);
  }
  setLocalStorage("so-cart", cartItems);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
