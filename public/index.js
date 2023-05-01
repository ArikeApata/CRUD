const userList = document.querySelector(".user-list");
const addUser = document.querySelector(".add-user");
const newName = document.getElementById("name-value");
const newAge = document.getElementById("age-value");
const newAbout = document.getElementById("about-value");

const newGender = document.getElementById("gender-value");
const clickSubmit = document.querySelector(".submit");
let output = "";

const renderList = (posts) => {
  posts.forEach((post) => {
    output += `
            <div class="card col-md-6 mt-4">
          <div class="card-body" id=${post.id}>
          <h5 class="card-header py-3">${post.name}</h5>
            <h6 class="card-title mb-2 text-body-secondary">${post.gender}</h6>
            <p class="card-subtitle mb-2 text-body-secondary">${post.age}</p>
            <p class="card-text">${post.about}</p>
            <button class="btn btn-info py-0" id="edit-post">Edit</button>
            <button class="btn btn-danger py-0" id="delete-post">Delete</button>
          </div>
        </div>
            `;
  });
  userList.innerHTML = output;
};
const url = "/users";

// Get user list (Get request)
fetch(`${url}/list`)
  .then((res) => res.json())
  .then((data) => renderList(data));

//edit user (update/put)

userList.addEventListener("click", (e) => {
  e.preventDefault();
  let clickDelete = e.target.id == "delete-post";
  let clickEdit = e.target.id == "edit-post";

  let userId = e.target.parentElement.id;

  if (clickDelete) {
    fetch(`${url}/${userId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        alert("user removed!");
        location.reload();
      });
  }

  if (clickEdit) {
    const user = e.target.parentElement;
    let nameContent = user.querySelector(".card-header").textContent;
    let userGender = user.querySelector(".card-title").textContent;
    let userAge = user.querySelector(".card-subtitle").textContent;
    let userAbout = user.querySelector(".card-text").textContent;

    newName.value = nameContent;
    newGender.value = userGender;
    newAbout.value = userAbout;
    newAge.value = userAge;
  }
  clickSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    fetch(`${url}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newName.value,
        age: newAge.value,
        about: newAbout.value,
        gender: newGender.value,

        // add id
        id: Number(userId),
      }),
    })
      .then((res) => res.json())
      .then(() => location.reload());
  });
});

//   add new user (post request/create)

addUser.addEventListener("submit", (e) => {
  e.preventDefault();

  fetch(`${url}/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: newName.value,
      age: newAge.value,
      about: newAbout.value,
      gender: newGender.value,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert(data.msg);
        window.location.reload();
      }
    });
});
// fetch("/users/list");
