var fs=require("fs");
var path=require("path");
function aa(f) {
    fs.readdir(f,function(error,data){
        if(!data){
            return;
        }
        data.forEach(function(file,index){
            console.log(file);
            aa(file)
        })
    })
}
aa("./");