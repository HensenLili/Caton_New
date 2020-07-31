var tag = "";
var nav = document.querySelector(".nav");
var formm = document.querySelector(".form");
var content = document.querySelector(".content");
var cladata = { page: 1, pageSize: 10 };
var loading=`<div class="loading">
              <div class="kuai kuai_one"></div>
              <div class="kuai kuai_two"></div>
              <div class="kuai kuai_three"></div>
              <div class="kuai kuai_four"></div>
              </div>`
ajj(cladata);

//获取分类标签
ajax("/api/tag", {}, "get").then((res) => {
  for (const i in res.data) {
    tag += `<span>${res.data[i].name}</span>`;
  }
  formm.innerHTML += tag;
});

//添加标签点击事件
nav.onclick = function (e) {
  cladata.page = 1;
  if (e.target.tagName != "SPAN") return;
  var spArr = e.path[1].children;
  for (let i = 0; i < spArr.length; i++) {
    spArr[i].classList.remove("clo");
  }
  content.innerHTML = loading;
  e.target.classList.add("clo");
  pabd(e.target.innerText);
  ajj(cladata);
};

//获取漫画
function ajj(cladata) {
  ajax("/api/book", cladata, "get").then((res) => {
    if (cladata.page == 1) {
      content.innerHTML = '';
      if (res.data == "") {
        content.innerHTML = "<p>这个分类空空如也，看看其他的吧！</p>";
      }
    }
    for (let i = 0; i < res.data.length; i++) {
      crThree(res.data, i);
    }
  });
}

function pabd(text) {
  switch (text) {
    case "全部1":
      delete cladata.tag;
      break;
    case "全部2":
      delete cladata.finsh;
      break;
    case "全部3":
      delete cladata.sex;
      break;
    case "连载":
      cladata.finsh = false;
      break;
    case "完结":
      cladata.finsh = true;
      break;
    case "男生":
      cladata.sex = 0;
      break;
    case "女生":
      cladata.sex = 1;
      break;
    default:
      cladata.tag = text;
  }
}

function crThree(res, idx) {
  let span = "";

  for (let i = 0; i < res[idx].tag.length; i++) {
    span += `<span> ${res[idx].tag[i]} </span>`;
  }
  let a = document.createElement("a");
  a.href = `./book_details.html?id=${res[idx]._id}`;
  a.innerHTML = `
    <div class="card">
    <img src="${res[idx].pic}" alt="" />
    <div>
      <p>${res[idx].title}</p>
      <span>更新至 ${res[idx].totalSection}话</span>
      <div class="clin">
        ${span}
      </div>
      <p class="intr">
        ${res[idx].desc}
      </p>
    </div>
  </div>
  `;
  content.appendChild(a);
}

window.onscroll = function (e) {
  if (scrollTop() + clientHeight() == scrollHeight()) {
    cladata.page += 1;
    console.log(cladata.page);
    ajj(cladata);
  }
};
