import { baseUrl } from "../../settings/api.js";
import { getToken } from "../../utils/storage.js";

export default function deleteBtn(id) {
  const deleteBtnContainer = document.querySelector(".delete-container");

  deleteBtnContainer.innerHTML = `
  <button 
    type="button"
    class="delete"
    >
    Delete
  </button>
  `;

  const deleteButton = document.querySelector("button.delete");
  deleteButton.onclick = async () => {
    console.log(id);

    const confirmation = confirm("Are you sure about deleting this product?");
    console.log(confirmation);

    if (confirmation) {
      const url = `${baseUrl}products/${id}`;
      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const deleteRequest = await (await fetch(url, options)).json();
        console.log(deleteRequest);
        location.href = "/";
      } catch (error) {
        console.log(error);
      }
    }
  };
}
