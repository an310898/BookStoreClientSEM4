function addToCart(bookId) {
  let date = new Date();
  date.setTime(date.getTime() + 7 * 24 * 60 * 60 * 1000);
  if (getCookie("arrayCart").length > 2) {
    let arrayBook = JSON.parse(getCookie("arrayCart"));
    arrayBook.push(bookId);
    document.cookie = `arrayCart=[${arrayBook}];expires=${date.toGMTString()};path=/`;
    // console.log(getCookie("arrayCart"));
    return;
  }

  document.cookie = `arrayCart=[${bookId}];expires=${date.toGMTString()};path=/`;
}
