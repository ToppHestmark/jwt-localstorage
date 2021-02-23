import { displayMessage, createMenu } from "./components/index.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

createMenu();

const params = new URLSearchParams(document.location.search);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productDetailsUrl = `${baseUrl}products/${id}`;

const form = document.querySelector("form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const idInput = document.querySelector("#id");
const message = document.querySelector(".message-container");
const loading = document.querySelector(".loading");

(async function () {
  try {
    const details = await (await fetch(productDetailsUrl)).json();

    name.value = details.name;
    price.value = details.price;
    description.value = details.description;
    idInput.value = details.id;

    console.log(details);
  } catch (error) {
    console.log(error);
  } finally {
    loading.style.display = "none";
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  message.innerHTML = "";

  const nameValue = name.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const idValue = idInput.value;

  if (
    nameValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Please supply proper values",
      ".message-container"
    );
  }

  updateProduct(nameValue, priceValue, descriptionValue, idValue);
}

async function updateProduct(name, price, description, id) {
  const url = `${baseUrl}products/${id}`;
  const data = JSON.stringify({
    name: name,
    price: price,
    description: description,
  });

  const token = getToken();

  const options = {
    method: "PUT",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const updateProductRequest = await (await fetch(url, options)).json();
    console.log(updateProductRequest);

    if (updateProductRequest.updated_at) {
      displayMessage("success", "Product updated", ".message-container");
    }

    if (updateProductRequest.error) {
      displayMessage("error", postProductRequest.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", "Error occured when update", ".message-container");
  }
}
