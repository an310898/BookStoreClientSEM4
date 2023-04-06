function login() {
  const userName = document.getElementById("userName")?.value || "";
  const password = document.getElementById("password")?.value || "";

  const formData = {
    UserName: userName,
    Password: password,
  };

  fetch("http://localhost:8080/api/dynamic-procedure/UserLogin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
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
        document.getElementById("wrongAccount").innerText =
          "Sai tên đăng nhập hoặc mật khâu";
        console.log("đăng nhập thất bại");
      }
    });
}

function register() {
  const name = document.getElementById("nameRe")?.value || "";
  const userName = document.getElementById("userNameRe")?.value || "";
  const password = document.getElementById("passwordRe")?.value || "";

  const formData = {
    UserName: userName,
    Password: password,
    FullName: name,
  };

  // console.log("register");
  fetch("http://localhost:8080/api/dynamic-procedure/UserRegister", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data["#result-set-1"][0].result === 1) {
        console.log("tao thanh cong");
        document.getElementById("formRegister").style.cssText +=
          "display: none";
        document.getElementById("register").innerHTML =
          "<div style='color: green; display: flex;justify-content: center; margin-top:20px;' class='status-register'>Tạo tài khoản thành công</div>";
      } else {
        document.getElementById("validUserName").innerHTML =
          "<span>Tên tài khoản đã tồn tại</span>";
        document.getElementById("btn-re").disabled = true;
      }
    });
}

function checkRePass() {
  const password = document.getElementById("passwordRe")?.value || "";
  const rePassword = document.getElementById("rePasswordRe")?.value || "";

  if (rePassword !== password) {
    document.getElementById("textRepassNotMatching").style.marginTop = "10px";
    document.getElementById("textRepassNotMatching").innerHTML =
      "<span>Mật khẩu không trùng khớp</span>";
    document.getElementById("btn-re").disabled = true;
  } else {
    document.getElementById("textRepassNotMatching").style.marginTop = "0";

    document.getElementById("textRepassNotMatching").innerHTML = "";
    if (activeRegisterButton()) {
      document.getElementById("btn-re").disabled = false;
      document.getElementById("btn-re").style.backgroundColor = "#ca2128";
    }
  }
}

function validUserName() {
  const userName = document.getElementById("userNameRe")?.value || "";

  if (userName.length < 6) {
    document.getElementById("validUserName").style.marginTop = "10px";
    document.getElementById("validUserName").innerHTML =
      "<span>Tên tài khoản phải tối thiểu có 6 kí tự</span>";
    document.getElementById("btn-re").disabled = true;
  } else {
    document.getElementById("validUserName").style.marginTop = "0";
    document.getElementById("validUserName").innerHTML = "";
    if (activeRegisterButton()) {
      document.getElementById("btn-re").disabled = false;
      document.getElementById("btn-re").style.backgroundColor = "#ca2128";
    }
  }
}

function checkPass() {
  const password = document.getElementById("passwordRe")?.value || "";
  if (password.length < 6) {
    document.getElementById("validPass").style.marginTop = "10px";
    document.getElementById("validPass").innerHTML =
      "<span>Mật khẩu phải tối thiểu có 6 kí tự</span>";
    document.getElementById("btn-re").disabled = true;
  } else {
    document.getElementById("validPass").style.marginTop = "0";
    document.getElementById("validPass").innerHTML = "";
    if (activeRegisterButton()) {
      document.getElementById("btn-re").disabled = false;
      document.getElementById("btn-re").style.backgroundColor = "#ca2128";
    }
  }
}

function activeRegisterButton() {
  const userName = document.getElementById("userNameRe")?.value || "";
  const password = document.getElementById("passwordRe")?.value || "";
  const rePassword = document.getElementById("rePasswordRe")?.value || "";

  if (userName.length >= 6 && password.length >= 6 && password === rePassword) {
    return true;
  }
  return false;
}
