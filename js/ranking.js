var idx = 0;
var lastx = 0;
var idxs;
// var yem=0;
var dataArr = [
  { page: 1, pageSize: 10, sort: "ture" },
  { page: 1, pageSize: 10, sort: "ture", sex: "0" },
  { page: 1, pageSize: 10, sort: "ture", sex: "1" },
  { page: 1, pageSize: 10, sort: "ture", tag: "精品" },
];
var topp = document.querySelector(".top");
var contt = document.querySelector(".cont");
var adian = document.querySelectorAll(".nav > a ");

//获取排行数据
function rank(data) {
  ajax("/api/book", data, "get").then((res) => {
    idxs = 0;
    for (let i = 0; i < res.data.length; i++) {
      if (idx < 3) {
        crOne(res.data);
      } else {
        crTwo(res.data);
      }
      idx++;
      idxs++;
    }
  });
}
//载入页面
function crOne(res) {
  let a = document.createElement("a");
  a.href = `${config}/api/book/one?id=${res[idxs]._id}`;
  a.innerHTML = `
    <div class="top${idx + 1}">
    <img src="./img/top${idx + 1}.png" alt="" />
    <img src="${res[idxs].pic}" alt="" />
    <img src="${res[idxs].pic}" alt="" />
    <p>${res[idxs].title}</p>
    <span>更新至${res[idxs].totalSection}话</span>
    </div>
`;
  topp.appendChild(a);
}

function crTwo(res) {
  let span = "";
  for (let i = 0; i < res[idxs].tag.length; i++) {
    span += `<span> ${res[idxs].tag[i]} </span>`;
  }
  let a = document.createElement("a");
  a.href = `${config}/api/book/one?id=${res[idxs]._id}`;
  a.innerHTML = `
  <div class="card">
  <img src="${res[idxs].pic}" alt="" />
  <div>
    <p>${res[idxs].title}</p>
    <span>更新至 ${res[idxs].totalSection}话</span>
    <div class="clin">
      ${span}
    </div>
    <p class="intr">
      ${res[idxs].desc}
    </p>
    <p>${idx + 1}</p>
  </div>
</div>
`;
  contt.appendChild(a);
}

for (const i in adian) {
  adian[i].onclick = function () {
    for (const i in dataArr) {
        dataArr[i].page=1;
    }
    adian[lastx].classList.remove("anf");
    adian[i].classList.add("anf");
    lastx = i;
    topp.innerHTML = "";
    contt.innerHTML = "";
    idx = 0;
    data = dataArr[i];
    rank(data);
  };
}

rank(dataArr[0]);

window.onscroll = function (e) {
  if(scrollTop()+clientHeight()==scrollHeight()){
    dataArr[lastx].page++;
    rank(dataArr[lastx])
  }
};

