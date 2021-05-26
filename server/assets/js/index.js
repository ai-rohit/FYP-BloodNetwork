// $("#add_user").submit(function(event){
//     alert("Data Inserted Successfully!");
// })

// $("#update_user").submit(function(event){
//     event.preventDefault();

//     var unindexed_array = $(this).serializeArray();
//     var data = {}

//     $.map(unindexed_array, function(n, i){
//         data[n['name']] = n['value']
//     })

//     var request = {
//         "url" : `http://localhost:3000/api/users/${data.id}`,
//         "method" : "PUT",
//         "data" : data
//     }

//     $.ajax(request).done(function(response){
//         alert("Data Updated Successfully!");
//     })

// })

const form = document.querySelector("form");
const errors = document.querySelector(".all.error");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errors.textContent = "";
  const email = form.email.value;
  const password = form.password.value;
  var allCookies = document.cookie;
  console.log(allCookies);

  console.log("Hello");
  fetch("http://localhost:3000/admin/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      if (responseJson.status == "success") {
        window.location.replace("http://localhost:3000/admin");
      } else {
        errors.textContent = "*" + responseJson.message;
      }
    })
    .catch((error) => {});
});
