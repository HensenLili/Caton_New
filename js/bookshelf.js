ajax('/api/user',{},'get')
.then(res=>{
    console.log(res.data);
});