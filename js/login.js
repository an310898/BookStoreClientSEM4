function showLogin() {
  document
    .querySelector(".popup-login-tab-item.popup-login-tab-login")
    .classList.add("active");
  document
    .querySelector(".popup-login-tab-item.popup-login-tab-register")
    .classList.remove("active");

  document.querySelector(".popup-login-content").style.display = "block";
  document.querySelector(".popup-register-content").style.display = "none";
}
function showRegister() {
  document
    .querySelector(".popup-login-tab-item.popup-login-tab-login")
    .classList.remove("active");
  document
    .querySelector(".popup-login-tab-item.popup-login-tab-register")
    .classList.add("active");

  document.querySelector(".popup-login-content").style.display = "none";
  document.querySelector(".popup-register-content").style.display = "block";
}
function login() {
  document.getElementById("login-user").innerHTML = ``;
  document.getElementById("login-password").innerHTML = ``;
  const userName = document.getElementById("login_username")?.value || "";
  const password = document.getElementById("login_password")?.value || "";
  if (userName.length < 6 || password.length < 6) {
    if (userName.length < 6) {
      document.getElementById(
        "login-user"
      ).innerHTML = `<div style="color:red;margin-top:5px">Tên tài khoan tối thiểu 6 kí tự</div>`;
    }
    if (password.length < 6) {
      document.getElementById(
        "login-password"
      ).innerHTML = `<div style="color:red;margin-top:5px">Mật khẩu tối thiểu 6 kí tự</div>`;
    }
    return;
  }

  const formData = {
    UserName: userName,
    Password: password,
  };

  fetch("http://localhost:8080/api/dynamic-procedure/UserLogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(data => {
      const re = data["#result-set-1"][0];
      if (re.result === 1) {
        let date = new Date();
        document.cookie = "userId=";
        document.cookie = "userName=";
        document.cookie = "fullName=";
        date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000); //expires after 7 days
        document.cookie = `userId=${
          re.userId
        };expires=${date.toGMTString()};path=/`;
        document.cookie = `userName=${
          re.userName
        };expires=${date.toGMTString()};path=/`;
        document.cookie = `fullName=${
          re.fullName
        };expires=${date.toGMTString()};path=/`;
        window.location.replace("index.html");
      } else {
        document.querySelector(".fhs-popup-msg.fhs-login-msg").innerText =
          "Sai tên đăng nhập hoặc mật khâu";
        console.log("đăng nhập thất bại");
      }
    });
}

function UserRegister() {
  const userName = document.getElementById("register_userName")?.value || "";
  const email = document.getElementById("register_email")?.value || "";
  const password = document.getElementById("register_password")?.value || "";

  const formData = {
    UserName: userName,
    Email: email,
    Password: password,
  };

  console.log(formData);

  fetch("http://localhost:8080/api/dynamic-procedure/UserRegister", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(data => {
      if (data["#result-set-1"][0].result === 2) {
        document.querySelector(".popup-register-content form").style.display =
          "none";
        document.querySelector(".popup-register-content").innerHTML =
          "<div style='color: green; display: flex;justify-content: center; margin-top:20px;' class='status-register'>Tạo tài khoản thành công</div>";
      } else {
        if (data["#result-set-1"][0].result === 0) {
          document.getElementById("validUserName").style.marginTop = "10px";
          document.getElementById("validUserName").innerHTML =
            "<span style='color:red'>Tên tài khoản đã tồn tại</span>";
          document.getElementById("btn-re").setAttribute("disabled", "true");
        } else if (data["#result-set-1"][0].result === 1) {
          document.getElementById("validEmail").style.marginTop = "10px";
          document.getElementById("validEmail").innerHTML =
            "<span style='color:red'>Email đã tồn tại</span>";
          document.getElementById("btn-re").setAttribute("disabled", "true");
        }
      }
    });
}

function checkRePass() {
  const password = document.getElementById("register_password")?.value || "";
  const rePassword =
    document.getElementById("re_register_password")?.value || "";

  if (rePassword !== password) {
    document.getElementById("textRepassNotMatching").style.marginTop = "10px";
    document.getElementById("textRepassNotMatching").innerHTML =
      "<span style='color:red'>Mật khẩu không trùng khớp</span>";
    document.getElementById("btn-re").setAttribute("disabled", "true");
  } else {
    document.getElementById("textRepassNotMatching").style.marginTop = "0";

    document.getElementById("textRepassNotMatching").innerHTML = "";
    if (activeRegisterButton()) {
      document.getElementById("btn-re").removeAttribute("disabled");
    }
  }
}

function validUserName() {
  const userName = document.getElementById("register_userName")?.value || "";

  if (userName.length < 6) {
    document.getElementById("validUserName").style.marginTop = "10px";
    document.getElementById("validUserName").innerHTML =
      "<span style='color:red'>Tên tài khoản phải tối thiểu có 6 kí tự</span>";
    document.getElementById("btn-re").setAttribute("disabled", "true");
  } else {
    document.getElementById("validUserName").style.marginTop = "0";
    document.getElementById("validUserName").innerHTML = "";
    if (activeRegisterButton()) {
      document.getElementById("btn-re").removeAttribute("disabled");
    }
  }
}

function checkPass() {
  const password = document.getElementById("register_password")?.value || "";
  //   console.log(password);
  if (password.length < 6) {
    document.getElementById("validPass").style.marginTop = "10px";
    document.getElementById("validPass").innerHTML =
      "<span style='color:red'>Mật khẩu phải tối thiểu có 6 kí tự</span>";
    document.getElementById("btn-re").setAttribute("disabled", "true");
  } else {
    document.getElementById("validPass").style.marginTop = "0";
    document.getElementById("validPass").innerHTML = "";
    if (activeRegisterButton()) {
      document.getElementById("btn-re").removeAttribute("disabled");
    }
  }
}

function checkEmail() {
  const email = document.getElementById("register_email")?.value || "";
  if (!isValidEmail(email)) {
    document.getElementById("validEmail").style.marginTop = "10px";
    document.getElementById("validEmail").innerHTML =
      "<span style='color:red'>Vui lòng nhập email hợp lệ</span>";
    document.getElementById("btn-re").setAttribute("disabled", "true");
  } else {
    document.getElementById("validEmail").style.marginTop = "0";
    document.getElementById("validEmail").innerHTML = "";
    if (activeRegisterButton()) {
      document.getElementById("btn-re").removeAttribute("disabled");
    }
  }
}

function activeRegisterButton() {
  const userName = document.getElementById("register_userName")?.value || "";
  const email = document.getElementById("register_email")?.value || "";
  const password = document.getElementById("register_password")?.value || "";
  const rePassword =
    document.getElementById("re_register_password")?.value || "";

  if (
    userName.length >= 6 &&
    password.length >= 6 &&
    password === rePassword &&
    isValidEmail(email)
  ) {
    return true;
  }
  return false;
}
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email);
}

function displayPass(elem) {
  const input = elem.parentNode.querySelector("input");
  if (input.getAttribute("type") === "password") {
    elem.parentNode.querySelector("input").setAttribute("type", "text");
  } else {
    elem.parentNode.querySelector("input").setAttribute("type", "password");
  }
}
