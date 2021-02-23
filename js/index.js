import { baseUrlStrapi } from "./settings/api.js";
import { displayMessage, createMenu } from "./components/index.js";

createMenu();

const createProducts = async () => {
  const productContainer = document.querySelector(".product-container");

  try {
    const productsData = await (await fetch(`${baseUrlStrapi}products`)).json();

    productContainer.innerHTML = "";
    productsData.map((product) => {
      productContainer.innerHTML += `
        <a class="product" href="detail.html?id=${product.id}">
            <h4>${product.name}</h4>
            <p>Price: ${product.price}</p>
        </a>`;
    });
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
};
createProducts();
