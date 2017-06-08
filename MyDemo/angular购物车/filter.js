angular.module("filter",[])
    .filter("minORmax",function () {
        return function (origin,type) {
            var temp=origin[0];
            var type=type||"min";
            for(var i=1;i<origin.length;i++){
                if(type=="min"){
                    if(temp>origin[i]){
                        temp=origin[i];
                    }
                }else if(type=="max"){
                    if(temp<origin[i]){
                        temp=origin[i];
                    }
                }
            }
            return temp;
        }
    }).filter("repect",function () {
    return function (origin) {
        var arr=[];
        for (var i=0;i<origin.length;i++){
            var flag=true;
            for(var j=0;j<arr.length;j++){
                if(origin[i]==arr[j]){
                    flag=false;
                    break;
                }
            }
            if(flag){
                arr.push(origin[i]);
            }
        }
        return arr;
    }
})