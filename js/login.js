const config = "http://47.106.96.222:2333";
var pup = document.querySelector(".pup");
  try {
    document.querySelector(".pup>span").onclick = function () {
      window.location.href = "./public/login.html";
    };
    document.querySelector(".back").onclick = function () {
      window.history.go(-1);
    };
  } catch (err) {}


function ajax(Url, data, type) {
  let ran = new Promise(function (resolve, reject) {
    $.ajax({
      url: config + Url,
      type: type,
      dataType: "JSON",
      data: data,
      crossDomain: true,
      xhrFields: {
        withCredentials: true, // 携带跨域cookie
      },
      success: function (res) {
        resolve(res);
      },
      error: function () {
        reject("请求失败！");
      },
    });
  });
  return ran;
}

// ajax('/api/login',{username:'root',password:'root'},'post')
// .then(res=>{
//     console.log(res);
// });

ajax("/api/user", {}, "get").then((res) => {
  if (!res.success) {
    pup.style.display = "block";
  }
});

//内容总高度
function scrollHeight() {
  return document.documentElement.scrollHeight || document.body.scrollHeight;
}
//视窗高度
function clientHeight() {
  return document.documentElement.clientHeight || document.body.clientHeight;
}
//滚动区域的高度
function scrollTop() {
  return document.documentElement.scrollTop || document.body.scrollTop;
}
