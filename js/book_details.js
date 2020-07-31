//获取当前用户登录信息
ajax('/api/user', {}, 'get')
    .then(res => {
        // console.log(res);
    });


//获取某本书的内容
var id = window.location.href.split("=")[1]
ajax('/api/book/one', { id: id }, 'get')
    .then(res => {
        // console.log(res);
        book(res);
        render = getScore(res.data.score, res.data.commentCount)
        chapter = getChapter(res.data.totalSection)
    });

//添加书名,作者等
function book(res) {
    $('.detailnew-title ')[0].innerHTML = `${res.data.title}`;
    $('.info-author')[0].innerHTML = `${res.data.author}`;
    $('.info-tags')[0].innerHTML = `${res.data.tag}`;
    $('.detailnew-bj')[0].style.backgroundImage = `linear-gradient( -180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100% ), url("${res.data.pic}")`
    $('.ellipsis')[0].innerHTML = `${res.data.desc}`;
    $('.updata')[0].innerHTML = `更新至${res.data.totalSection}话`
    $('.item-score')[0].innerHTML = `${res.data.score}`
    $('.item-hot')[0].innerHTML = `${res.data.hot}`
}

//加入书架
$('.add').click(function () {
    window.location = '../bookshelf.html';
})

//开始阅读
$('.red').click(function () {
    window.location = `../book_section.html?id=${id}`;
})

//点击详情
function tabClick() {
    $('.details').click(function () {
        $('.details-page')[0].style.display = 'block';
        $('.interaction-page')[0].style.display = 'none';
        $('.details')[0].className = 'tab-title details action';
        $('.interaction')[0].className = 'tab-title interaction';
    })
    $('.interaction').click(function () {
        $('.interaction-page')[0].style.display = 'block';
        $('.interaction')[0].className = 'tab-title interaction action';
        $('.details')[0].className = 'tab-title details';
        $('.details-page')[0].style.display = 'none';
    })
}
tabClick();

//点击评分，跳转到互动
$('.extra-intro-item').click(function () {
    $('.interaction').trigger("click");
})
//获取某本书的评论互动
ajax('/api/comment', { bookId: id, page: 1, pageSize: 5 }, 'get')
    .then(res => {
        // console.log(res);
        render(res.data)
    });
//添加评论到页面
var render = null
function getScore(score, commentCount) {
    return function bookDetails(res) {
        $('.interaction-page').append($(`
        <div class="record">
            <span class="score">${score}分</span>
            <span class="commentCount">${commentCount}人评分(满分5分)</span>
        </div>
        <div class="hot">热门评论</div>`))
        for (let i = 0; i < res.length; i++) {
            $('.interaction-page').append($(`
                <div class="unicmt-item">
                    <div>
                        <img src='${res[i].avatar}' alt="" class="head_logo">
                    </div>
                    <div class="content-mess">
                        <div class="item_top">
                            <div class="user_name">用户名:${res[i].nickname}</div>
                            <div class="unicmt-right">
                                <div class="dzan"></div>
                                <div class="number">${res[i].zan}</div>
                            </div>
                        </div>
                        <div class="user_comment">${res[i].content}</div>
                    </div>
                </div>
            `))
        }
        dianzan(res)
    }
}

//点赞
ajax('/api/zan', { commentId: '5f202c32bfba6437bc263003' }, 'POST')
    .then(res => {
        console.log(res);
        dianzan(res.data);
    });
//点赞+1，number+1
var xen = true;
function dianzan(res) {
    $('.dzan').click(function () {
        if (xen) {
            this.nextElementSibling.innerText = Number(this.nextElementSibling.innerText) + 1;
            xen = false;
            $(this)[0].style.backgroundImage = ` url("../img/hand.png")`
        } else {
            this.nextElementSibling.innerText = Number(this.nextElementSibling.innerText) - 1;
            $(this)[0].style.backgroundImage = ` url(https://s.bdstatic.com/common/openjs/likeComponent/img/like-frame-heavy.png)`
            xen = true;
          if(this.isZan==ture){

          }
        }
    })
}

//获取所有章节信息
ajax('/api/section/all', { bookId: id }, 'GET')
    .then(function (res) {
        // console.log(res);
        chapter(res)
        chapterItemAs(res);
        actionSort(res);
    });

//书籍首页目录正序获取
function chapterItemAs(res) {
    $('.chapter-list').html('')
    for (let i = 0; i < 3; i++) {
        $('.chapter-list').append($(`
            <div class="chapter-item">
                <span class="chapter-item-text">${String(res.data[i].title)}</span> 
            </div>
        
        `))
    }
}
//书籍首页目录逆序获取
function chapterItemRc(res){
    $('.chapter-list').html('')
    Goworng(res)
    for (let i = res.data.length - 1; i > res.data.length -4; i--) {
        $('.chapter-list').append($(`
            <div class="chapter-item">
                <span class="chapter-item-text">${String(res.data[i].title)}</span> 
            </div>
        
        `))
        
    }
}
//书籍首页目录 倒序，顺序
var sore = false;
function actionSort(res) {
    $('.title-bar-action').click(function () {
        if (sore) {
            $('.order-text').html(`正序`)
            chapterItemAs(res)
            sore = false;
        }
        else {
            $('.order-text').html(`倒序`)
            chapterItemRc(res)
            sore = true
        }
    })
}



// 点击查看全部，所有章节出现
var chapter = null
function getChapter(totalSection) {
    return function getChapters(res) {
        $('.showmore-bar').click(function () {
            $('.chapters')[0].style.display = "block";
            $('.chapter-lists')[0].style.display = 'block';
            $('.detailnew-action')[0].style.display = "none"
            $('.detailnew-tab')[0].style.display = "none"
            $('.detailnew-intro')[0].style.display = "none"
            $('.detailnew-chapter')[0].style.display = "none"
            $('.top-border')[0].style.display = "none"
            $('.chapters').html($(`
                <div class="allchapter">
                    <div class="chapter-title-bar">
                        <span class="chapter-status">连载中</span>
                        <span class="chapter-status-text">更新至${totalSection}话</span>
                        <span class="chater-close-icon"></span>
                    </div>
                    <div class="chater-order">
                        <div class="chapter-index-item">
                            <span class="chapter-index-item-text">1-20</span> 
                        </div>
                        <div class="order">
                            <span class="chapter-order-text">升序</span>
                        </div>
                    </div>
                </div>
                `))

            Goworng(res)
            ascendingFill(res)
            closeChapter()
            Sort(res)
        })
    }
}

// 去掉false
function Goworng(res){
    res.data = res.data.filter(item => "false" !== item.title)
}
//点击关闭按钮
function closeChapter() {
    $('.chater-close-icon').click(function () {
        $('.chapters')[0].style.display = 'none';
        $('.chapter-lists')[0].style.display = 'none';
        $('.detailnew-action')[0].style.display = "flex "
        $('.detailnew-tab')[0].style.display = "flex"
        $('.detailnew-intro')[0].style.display = "block"
        $('.detailnew-chapter')[0].style.display = "block"
        $('.top-border')[0].style.display = "block"
    })
}

//章节倒序填充
function reverseFilling(res) {
    $('.chapter-lists').html('')
    for (let i = res.data.length - 1; i > 0; i--) {
        $('.chapter-lists').append($(`
                        <div class="chapter-lists-text">
                            <div class="list">${String(res.data[i].title)}</div> 
                        </div>
                    
                    `))
    }
}

//章节升序填充
function ascendingFill(res) {
    $('.chapter-lists').html('')
    for (let i = 0; i < res.data.length; i++) {
        $('.chapter-lists').append($(`
                <div class="chapter-lists-text">
                    <div class="list">${String(res.data[i].title)}</div> 
                </div>
            
            `))
    }
}

//章节倒序，顺序
var flag = false;
function Sort(res) {
    $('.order').click(function () {
        if (flag) {
            $('.chapter-order-text').html(`升序`)
            ascendingFill(res)
            flag = false;
        }
        else {
            $('.chapter-order-text').html(`倒序`)
            $('.chapter-index-item-text').html('20-1')
            reverseFilling(res)
            flag = true
        }
    })
}


//随机查询书
ajax('/api/rand', { size: '5' }, 'GET')
    .then(function (res) {
        console.log(res);
        recommend(res)
        // console.log(res.data[0]._id);
    });
function recommend(res) {
    for (let i = 0; i < res.data.length; i++) {
        // window.location = `../book_section.html?id=${id}`;
        $('.cover-img')[i].src = `${res.data[i].pic}`
        $('.content-title')[i].innerHTML = `${res.data[i].title}`
        $('.content-tag-list')[i].innerHTML = `${res.data[i].tag}`

    }

}

//根据标签显示相关书单
ajax('/api/tag', { tag: '3' }, 'GET')
    .then(function (res) {
        console.log(res);
        tagFind(res)
    });
function tagFind(res) {

}