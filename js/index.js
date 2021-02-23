import { baseUrlStrapi } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";

(async () => {
  const container = document.querySelector(".product-container");

  try {
    const products = await (await fetch(`${baseUrlStrapi}products`)).json();

    container.innerHTML = "";

    products.map((product) => {
      container.innerHTML += `
        <a class="product" href="detail.html?id=${product.id}">
            <h4>${product.name}</h4>
            <p>Price: ${product.price}</p>
        </a>`;
    });
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
})();
