//获取章节内容
var f = window.location.href.split("?")[1]
// console.log( window.location.href)
let id = f.split("&")[0].split("=")[1]
let chapter = f.split("&")[1].split("=")[1]
console.log(f.split("&")[1].split("=")[1]);
var data = { bookId: id, chapter};
console.log(data)
function get(data) {
    ajax('/api/section', data, 'get')
        .then(res => {
            // console.log(res);
            content(res);
        });
}
get(data)
//添加章节内容到页面
function content(res) {
    for (let i = 0; i < res.data[0].content.length; i++) {
        $('.chapter-content').append($(`
            <img  src ="${res.data[0].content[i]}"/>
`))
    } 
}
//点击返回，返回书籍
$('.back').click(function () {
    window.location = `./book_details.html?id=${id}`;

})

//点击下一章，获取下面的章节
$('.next').click(function () {
    $('.chapter-content')[0].innerHTML = ""
    data.chapter++
    get(data)
})
//点击上一章，获取上面的章节
$('.before').click(function () {
    $('.chapter-content')[0].innerHTML = ""
    data.chapter--
    if(data.chapter < 1){
        data.chapter = 1
    }
    get(data)
})

//点击windows，back出现
let flag = false;
window.document.addEventListener('click', function () {
    if (flag) {
        $('.back')[0].style.display = 'block'
        $('.next')[0].style.display = "block"
        $('.before')[0].style.display = "block"
        flag = false;
    }
    else {
        $('.back')[0].style.display = 'none'
        $('.next')[0].style.display = 'none'
        $('.before')[0].style.display = 'none'
        flag = true;
    }
})

