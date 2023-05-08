function addToCart(bookId) {
  const amount = document.querySelectorAll("input#qty")[0]?.value || 1;
  console.log(amount);
  const date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  if (getCookie("arrayCart").length > 2) {
    let arrayBook = JSON.parse(getCookie("arrayCart"));
    for (let i = 0; i < amount; i++) {
      arrayBook.push(bookId);
    }
    document.cookie = `arrayCart=[${arrayBook}];expires=${date.toGMTString()};path=/`;
    // console.log(getCookie("arrayCart"));
    alert("Thêm giỏ hành thành công");

    return;
  }
  arrayBook = [];
  for (let i = 0; i < amount; i++) {
    arrayBook.push(bookId);
  }
  document.cookie = `arrayCart=[${arrayBook}];expires=${date.toGMTString()};path=/`;
  alert("Thêm giỏ hành thành công");
}
