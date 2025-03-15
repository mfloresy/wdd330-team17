import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productData = new ProductData("tents");
console.log(productData);
const element = document.querySelector(".product-list");
const productList = new ProductList("tents", productData, element);
console.log(productList);


productList.init();









const modals = document.getElementById("modal")
const button = document.getElementById("callBtn")
const closeButton = document.querySelector("#closeBtn")



button.addEventListener("click", () => {
    modals.style.display = "block";
})

closeButton.addEventListener("click", () => {
    modals.style.display = "none";
}
)




