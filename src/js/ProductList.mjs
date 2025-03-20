import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
    <li class="product-card">
      <a href="/product_pages/?product=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h3>${product.Brand.Name}</h3>
        <p>${product.NameWithoutBrand}</p>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
    `;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    console.log("Fetching data for category:", this.category);
    const list = await this.dataSource.getData(this.category);
    console.log("Data received:", list);
    this.renderList(list);
    document.querySelector(".title").textContent = this.category;
}

  renderList(list) {
    // const htmlList = list.map(productCard);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlList.join(""));
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
