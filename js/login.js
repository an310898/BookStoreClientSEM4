function register() {
  const name = document.getElementById("nameRe")?.value || "";
  const userName = document.getElementById("userNameRe")?.value || "";
  const password = document.getElementById("passwordRe")?.value || "";
  const rePassword = document.getElementById("passwordRe")?.value || "";

  const formData = {
    UserName: userName,
    Password: password,
    FullName: name,
  };

  console.log(formData);

  fetch("http://localhost:8080/api/dynamic-procedure/UserRegister", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}

function checkRePass() {
  const password = document.getElementById("passwordRe")?.value || "";
  const rePassword = document.getElementById("rePasswordRe")?.value || "";

  if (rePassword !== password) {
    console.log("mat khau khong giong nhau");
  } else {
    console.log("mat khau da giong nhau");
  }
}
