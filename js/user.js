function SaveUserInformation() {
  const userId = getCookie("userId");
  const fullName = document.querySelector("#fullName")?.value || "";
  const email = document.querySelector("#email")?.value || "";
  const phoneNumber = document.querySelector("#telephone")?.value || "";
  const gender =
    document
      .querySelectorAll("#gender input.gender-radio:checked")[0]
      ?.getAttribute("id") || 0;

  const formData = {
    UserId: userId,
    FullName: fullName,
    Email: email,
    PhoneNumber: phoneNumber,
    gender: gender === "male" ? 0 : 1,
  };
  console.log(formData);

  return;
  fetch("http://localhost:8080/api/dynamic-procedure/SaveUserInformation", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
}
