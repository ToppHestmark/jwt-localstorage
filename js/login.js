import displayMessage from "./components/common/displayMessage.js";
import { saveToken, saveUser } from "./utils/storage.js";
import { baseUrlStrapi } from "./settings/api.js";

const form = document.querySelector("form");
const username = document.querySelector("#username");
const password = document.querySelector("#password");
const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();
  message.innerHTML = "";

  const usernameValue = username.value.trim();
  const passwordValue = password.value.trim();

  if (usernameValue.length === 0 || passwordValue.length === 0) {
    return displayMessage("warning", "Invalid values", ".message-container");
  }

  performLogin(usernameValue, passwordValue);
}

async function performLogin(username, password) {
  const url = baseUrlStrapi + "auth/local";

  const data = JSON.stringify({ identifier: username, password: password });

  const options = {
    method: "POST",
    body: data,
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const jsonToken = await (await fetch(url, options)).json();
    console.log(jsonToken);

    if (jsonToken.user) {
      // displayMessage("success", "Successfully logged in", ".message-container");

      saveToken(jsonToken.jwt);
      saveUser(jsonToken.user);

      location.href = "/";
    }

    if (jsonToken.error) {
      displayMessage("warning", "Invalid login details", ".message-container");
    }
  } catch (error) {
    console.log(error);
  }
}
