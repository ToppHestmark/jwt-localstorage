import { getUsername } from "../../utils/storage.js";

export default function createMenu() {
  const { pathname } = document.location;

  const username = getUsername();

  let authLink = `
    <a 
      href="login.html" 
      class="${pathname === "/login.html" ? "active" : ""}"> 
    Login 
    </a>
  `;

  if (username) {
    authLink = `<span>Hello ${username} </span>`;
  }

  const menuContainer = document.querySelector(".menu-container");
  menuContainer.innerHTML = `
  <div class="menu">
    <a href="/" class="${pathname === "/" ? "active" : ""}"> Home </a>
    ${authLink}
  </div>
  `;
}
