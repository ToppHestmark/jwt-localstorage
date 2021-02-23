import { baseUrl } from "./settings/api.js";
import { displayMessage, createMenu } from "./components/index.js";
import { getUsername } from "./utils/storage.js";

createMenu();

const createProducts = async () => {
  const productContainer = document.querySelector(".product-container");
  const username = getUsername();

  try {
    const productsData = await (await fetch(`${baseUrl}products`)).json();

    productContainer.innerHTML = "";
    productsData.map((product) => {
      let editPage = "";
      if (username) {
        editPage = `<a href="edit.html?id=${product.id}">Edit</a>`;
      }

      productContainer.innerHTML += `
        <div class="product">
            <h4>${product.name}</h4>
            <p>Price: ${product.price}</p>
            <a href="detail.html?id=${product.id}">Details</a>
            ${editPage}
        </div>`;
    });
  } catch (error) {
    console.log(error);
    displayMessage("error", error, ".product-container");
  }
};
createProducts();
