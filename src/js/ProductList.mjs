import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
  return `
<li class="product-card">
<a href="product_pages/?product=">
<img src="${product.Image}" alt="image of ">
<h3 class="card_brand">${product.Brand.Name}</h3>
<h2 class="card_name">${product.Name}</h2>
<p class="product-card__price>$${product.FinalPrice}</p>
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
    const list = await this.dataSource.getData();
    this.renderList(list);
  }

  renderList(list) {
    // const htmlList = list.map(productCard);
    // this.listElement.insertAdjacentHTML("afterbegin", htmlList.join(""));
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
