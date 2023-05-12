function getBookTable() {
  fetch("http://1.52.115.73:8080/api/dynamic-procedure/GetBookTable", {
    method: "POST",
  })
    .then(res => res.json())
    .then(x => {
      const data = x["#result-set-1"]

        .map(y => {
          const date = new Date(y.CreatedDate);

          return `<tr>
                                                    <td>${y.id}</td>
                                                    <td>${y.Name}</td>
                                                    <td>
                                                        ${y.Author}
                                                    </td>
                                                    <td>${y.Price} đ</td>
                                                    <td>${date.toLocaleDateString(
                                                      "vi-VN",
                                                      {
                                                        weekday: "short",
                                                        year: "numeric",
                                                        month: "long",
                                                        day: "numeric",
                                                      }
                                                    )}</td>
                                                    <td style="padding:0"><div style="display: flex;justify-content: space-evenly;align-items: center;">
                                                    <i class="fa-solid fa-pen-to-square"></i>
                                                    <i style="cursor: pointer;" onclick="hideProduct(${
                                                      y.id
                                                    })" class="fa-solid fa-minus"></i></div></td>
                                                </tr>`;
        })
        .join("");

      document.querySelector("#data-table-product").innerHTML = data;
    });
}
getBookTable();
function hideProduct(bookId) {
  const formData = {
    BookId: bookId,
  };
  fetch("http://1.52.115.73:8080/api/dynamic-procedure/HideBook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  })
    .then(res => res.json())
    .then(x => {
      if (x["#update-count-1"] > 0) {
        // alert("Thành công");
        showSwal("Ẩn thành công", "", "success");
        getBookTable();
      }
    });
}
