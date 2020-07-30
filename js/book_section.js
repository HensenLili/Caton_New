//获取章节内容
ajax('/api/section', { bookId: '5f202c32bfba6437bc262fe3', chapter: '1' }, 'get')
    .then(res => {
        console.log(res);
        content(res)
        console.log(res.data[0].content.length);
    });
//添加章节内容到页面
function content(res) {
    for (let i = 0; i < res.data[0].content.length; i++) {
        $('.chapter-content').append($(`
            <img  src ="${res.data[0].content[i]}"/>
`))
    }

}
