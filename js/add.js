import { displayMessage, createMenu } from "./components/index.js";
import { getToken } from "./utils/storage.js";
import { baseUrl } from "./settings/api.js";

createMenu();

const form = document.querySelector("form");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitProduct);

function submitProduct(event) {
  event.preventDefault();
  message.innerHTML = "";

  const nameValue = name.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();

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

  addProduct(nameValue, priceValue, descriptionValue);
}

async function addProduct(name, price, description) {
  const url = `${baseUrl}products`;

  const data = JSON.stringify({
    name: name,
    price: price,
    description: description,
  });

  const token = getToken();

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const postProductRequest = await (await fetch(url, options)).json();
    console.log(postProductRequest);

    if (postProductRequest.created_at) {
      displayMessage("success", "New product added", ".message-container");
      form.reset();
    }

    if (postProductRequest.error) {
      displayMessage("error", postProductRequest.message, ".message-container");
    }
  } catch (error) {
    console.log(error);
    displayMessage("error", "Error occured when submit", ".message-container");
  }
}
