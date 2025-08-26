const form = document.getElementById("appointmentForm");
const userList = document.getElementById("userList");


const API_URL = "https://crudcrud.com/api/92cffec9583c45208629fc253424e0b1/appointment";


form.addEventListener("submit", function (event) {
  event.preventDefault();

  const userDetails = {
    username: document.getElementById("username").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
  };

  
  axios.post(API_URL, userDetails)
    .then((res) => {
      displayUserOnScreen(res.data);
      form.reset();
    })
    .catch((err) => console.error(err));
});


function displayUserOnScreen(user) {
  const li = document.createElement("li");
  li.textContent = `${user.username} - ${user.email} - ${user.phone} `;

  
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => {
    axios.delete(`${API_URL}/${user._id}`)
      .then(() => userList.removeChild(li))
      .catch((err) => console.error(err));
  };

  
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.onclick = () => {
    
    document.getElementById("username").value = user.username;
    document.getElementById("email").value = user.email;
    document.getElementById("phone").value = user.phone;

    
    axios.delete(`${API_URL}/${user._id}`)
      .then(() => userList.removeChild(li))
      .catch((err) => console.error(err));
  };

  li.appendChild(deleteBtn);
  li.appendChild(editBtn);
  userList.appendChild(li);
}


window.addEventListener("DOMContentLoaded", () => {
  axios.get(API_URL)
    .then((res) => {
      res.data.forEach((user) => displayUserOnScreen(user));
    })
    .catch((err) => console.error(err));
});
