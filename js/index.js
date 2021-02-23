import { baseUrl } from "./settings/api.js";
import { displayMessage, createMenu } from "./components/index.js";

createMenu();

const createProducts = async () => {
  const productContainer = document.querySelector(".product-container");

  try {
    const productsData = await (await fetch(`${baseUrl}products`)).json();

    productContainer.innerHTML = "";
    productsData.map((product) => {
      productContainer.innerHTML += `
        <div class="product">
            <h4>${product.name}</h4>
            <p>Price: ${product.price}</p>
            <a href="detail.html?id=${product.id}">Details</a>
            <a href="edit.html?id=${product.id}">Edit</a>
        </div>`;
    });
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
};
createProducts();
