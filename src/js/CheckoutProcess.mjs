import { getLocalStorage } from "./utils.mjs";

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSubTotal() {
    // Calculate and display the total dollar amount of the items in the cart, and the number of items.
    this.itemTotal = this.list.reduce(
      (total, item) => total + item.FinalPrice,
      0,
    );
    const itemNumElement = document.querySelector(
      `${this.outputSelector} #num-items`,
    );
    const itemTotalElement = document.querySelector(
      `${this.outputSelector} #item-total`,
    );

    itemNumElement.innerText = this.list.length;
    itemTotalElement.innerText = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
    // Calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    const taxRate = 0.06; // 6% tax rate, adjust as needed
    this.tax = this.itemTotal * taxRate;

    this.shipping = this.itemTotal > 50 ? 0 : 10;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    // Display the totals
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // Once the totals are all calculated, display them in the order summary page
    const outputElement = document.querySelector(this.outputSelector);

    const taxElement = outputElement.querySelector("#tax");
    const shippingElement = outputElement.querySelector("#shipping");
    const orderTotalElement = outputElement.querySelector("#orderTotal");

    taxElement.innerText = `$${this.tax.toFixed(2)}`;
    shippingElement.innerText = `$${this.shipping.toFixed(2)}`;
    orderTotalElement.innerText = `$${this.orderTotal.toFixed(2)}`;
  }
}
