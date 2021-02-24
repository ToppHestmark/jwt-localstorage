import { clearStorage } from "../../utils/storage.js";

export default function logoutBtn() {
  const button = document.querySelector("#logout");

  if (button) {
    button.onclick = () => {
      const confirmation = confirm("Are you sure about logging out?");
      if (confirmation) {
        clearStorage();
        location.href = "/";
      }
    };
  }
}
