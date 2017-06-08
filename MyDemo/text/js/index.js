angular.module("myapp",[]).controller("con",function ($scope,$filter) {
    $scope.data=localStorage.data?JSON.parse(localStorage.data):[];
    $scope.done=localStorage.done?JSON.parse(localStorage.done):[];
    $scope.titIndex=0;
    $scope.isshow=true;
    $scope.search="";
    $scope.tit=$scope.data[$scope.titIndex];
    $scope.$watch("search",function () {
        $scope.isshow=true;
        var arr=$filter("filter")($scope.data,{name:$scope.search});
        $scope.titIndex=0;
        $scope.tit=arr[$scope.titIndex];
    })
    // 添加事项
    $scope.add=function () {
        var obj={};
        obj.id=getId($scope.data);
        var d=new Date();
        var str = d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate();
        obj.name=str;
        obj.son=[];
        $scope.isshow=true;
        $scope.data.push(obj);
        $scope.titIndex=$scope.data.length-1;
        $scope.tit=obj;
        localStorage.data=JSON.stringify($scope.data);
    }
    // 删除事项
    $scope.del=function (id) {
        $scope.data.forEach(function (val,index) {
            if(val.id==id){
                $scope.data.splice(index,1);
                if(index==$scope.titIndex){
                    $scope.titIndex=$scope.data.length-1;
                    $scope.tit=$scope.data[$scope.titIndex];
                }
            }
        })
        if($scope.data.length==0){
            $scope.titIndex=0;
            $scope.tit=$scope.data[$scope.titIndex];
        }
        localStorage.data=JSON.stringify($scope.data);
    }
    // 跳
    $scope.tiao=function (id) {
        $scope.data.forEach(function (val,index) {
            if(id==val.id){
                $scope.titIndex=index;
            }
        })
        $scope.isshow=true;
        $scope.tit=$scope.data[$scope.titIndex];
    }
    // 改变事件
    $scope.change=function () {
        localStorage.data=JSON.stringify($scope.data);
    }
    // 添加事件
    $scope.addshi=function () {
        var obj={};
        obj.id=getId($scope.tit.son);
        obj.name="新建事件"+obj.id;
        obj.son=[];
        $scope.tit.son.push(obj);
        localStorage.data=JSON.stringify($scope.data);
    }
    // 删除事件
    $scope.delshi=function (id){
        $scope.tit.son.forEach(function (val,index) {
            if(val.id==id){
                $scope.tit.son.splice(index,1);
            }
        })
        localStorage.data=JSON.stringify($scope.data);
    }
    // 完成事件
    $scope.doneFun=function (id) {
        var index=getIndex($scope.tit.son,id);
        var obj=$scope.tit.son.splice(index,1);
        obj[0].id=getId($scope.done);
        $scope.done.push(obj[0]);
        localStorage.data=JSON.stringify($scope.data);
        localStorage.done=JSON.stringify($scope.done);
    }
    function getId(arr) {
        if(arr.length==0){
            return 1;
        }else{
            var id=arr[0].id;
            arr.forEach(function (val,index) {
                if(val.id>id){
                    id=val.id;
                }
            })
            return id+1;
        }
    }
    // 显示列表
    $scope.isDone=function () {
        $scope.isshow=false;
    }
    // 删除完成列表
    $scope.delDone=function (id){
        $scope.done.forEach(function (val,index) {
            if(val.id==id){
                $scope.done.splice(index,1);
            }
        })
        localStorage.done=JSON.stringify($scope.done);
    }
    function getIndex(arr,id) {
        arr.forEach(function (val,index) {
            if(arr.id==id){
                return index;
            }
        })
    }
})