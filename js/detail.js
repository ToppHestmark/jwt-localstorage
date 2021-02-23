import { baseUrlStrapi } from "./settings/api.js";
import displayMessage from "./components/common/displayMessage.js";

const params = new URLSearchParams(document.location.search);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productDetailsUrl = `${baseUrlStrapi}products/${id}`;
console.log(productDetailsUrl);

(async () => {
  try {
    const details = await (await fetch(productDetailsUrl)).json();

    document.title = details.name;

    const container = document.querySelector(".detail-container");
    container.innerHTML = `
        <h1>${details.name}</h1>
        <p>${details.description}</p>`;

    console.log(details);
  } catch (error) {
    displayMessage("error", error, ".detail-container");
  }
})();
