var book = document.querySelector(".book");
var dataRes;
var card = false;

ajax("/api/user", {}, "get").then((res) => {
  if(!res.success){return}
  book.innerHTML=''
  dataRes = res.data.user.books;
  for (const i in dataRes) {
    jiaz(dataRes[i]);
    if((i-0+1)==(dataRes.length)){
      if(!((dataRes.length - 2) % 3)) {
            let div = document.createElement("div");
            div.classList.add('card');
            book.appendChild(div);
        }
    }
  }
});

function jiaz(res) {
  let a = document.createElement("a");
  a.href = `./book_section.html?id=${res._id}`;
  a.innerHTML = `
    <div class="card">
            <img src="${res.pic}" alt="" />
            <p>${res.title}</p>
            <span>更新至${res.totalSection}话</span>
            <p>阅读至0话</p>
          </div>
  `;
  book.appendChild(a);
}
