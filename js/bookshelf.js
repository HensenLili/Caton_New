var book = document.querySelector(".book");
var dataRes;
var card = false;
function dianj(){
  document.querySelector('.book>span').onclick=function(){
    window.location.href="./tuijian.html";
  }
}

document.querySelector('.searchfor').onclick=function(){
  window.location.href="./search.html";
}
document.querySelector('.user').onclick=function(){
  window.location.href="./public/Personal.html";
}


ajax("/api/user", {}, "get").then((res) => {
  if(!res.success){return}
  book.innerHTML=''
  dataRes = res.data.user.books;
  if(!dataRes[0]){
book.innerHTML=`<p>你的书架空空如也！</p>
                <span>去添加</span>`
                dianj();
  }
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
  a.href = `./book_details.html?id=${res._id}`;
  a.innerHTML = `
    <div class="card">
            <img src="${res.pic}" alt="" />
            <p>${res.title}</p>
            <span>更新至${res.totalSection}话</span>
            <p>阅读至${res.lastLook}话</p>
          </div>
  `;
  book.appendChild(a);
}
