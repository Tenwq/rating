# rating
来自慕课网“星级评分原理和实现"第五种实现方法
调用方法：
   $("#rating").rating({
        mode:"entire",//entire整颗星星，half半颗星星，quarter 1/4颗星星
        total:5,//星星总数
        num:1,//点亮的星星个数
        readOnly:false,//只读
//      select:function (count,total) {//鼠标经过 count:当前经过的位置，total：总个数
//            console.log(this)
//            console.log(count+"/"+total);
//        },
        chosen:function (count,total) {//当前选中 count:当前选中的位置，total：总个数
            $("#rating").rating("unbindEvent");
        }
    });
