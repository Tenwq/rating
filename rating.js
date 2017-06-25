var rating = (function () {
    //策略
    var strategies = {
        entire:function () {
            return 1;
        },
        half:function(){
            return 2;
        },
        quarter:function(){
            return 4;
        }
    };
    var Rating = function (el,options) {
        this.$el = $(el);
        this.opts = $.extend({},Rating.DEFAULTS,options);


        if(!strategies[this.opts.mode]){
            this.opts.mode = "entire";
        }
        this.ratio = strategies[this.opts.mode]();
        this.opts.total *= this.ratio;
        this.opts.num *= this.ratio;
        this.itemWidth = 76 / this.ratio;
        this.displayWidth = this.opts.num * this.itemWidth;
    };
    Rating.DEFAULTS = {
        mode:"entire",
        total:5,
        num:2,
        readOnly:false,
        select:function () {},
        chosen:function () {}
    };
    Rating.prototype = {
        init:function () {
            this.buildHTML();
            this.setCSS();
            if(!this.opts.readOnly){
                this.bindEvent();
            }
        },
//            创建html结构
        buildHTML:function () {
            var html = "";
            html += "<div class='rating-display'></div><ul class='rating-mask'>";
            for(var i = 0;i<this.opts.total;i++){
                html += "<li class='rating-item'></li>";
            }
            html += "</ul>";
            this.$el.html(html);
        },
//            设置CSS样式
        setCSS:function () {
            this.$el.width(this.opts.total * this.itemWidth);
            this.$display = this.$el.find(".rating-display");
            this.$display.width(this.displayWidth);
            this.$el.find("li").width(this.itemWidth);
        },
//            绑定事件
        bindEvent:function () {
            var self = this;
            this.$el.on("mouseover",".rating-item",function () {
                var count = $(this).index() + 1;
                self.$display.width(count * self.itemWidth);
                typeof self.opts.select === "function" && self.opts.select.call(this,count,self.opts.total);
                self.$el.trigger("select",[count,self.opts.total]);
            }).on("click",".rating-item",function () {
                var count = $(this).index() + 1;
                self.displayWidth = count * self.itemWidth;
                typeof self.opts.chosen === "function" && self.opts.chosen.call(this,count,self.opts.total);
                self.$el.trigger("chosen",[count,self.opts.total]);
            }).on("mouseout",function () {
                self.$display.width(self.displayWidth);
            });
        },
//            解绑定事件
        unbindEvent:function () {
            this.$el.off();
        }
    };
    var init = function (el,option) {
        var $el = $(el),
            rating = $el.data("rating");
        if(!rating){
            $el.data("rating",(rating = new Rating(el,typeof option === "object" && option)));
            rating.init()
        }

        if(typeof option === "string") rating[option]();
    };

    $.fn.extend({
        rating:function (option) {
            return this.each(function () {
                init(this,option);
            })
        }
    });
    return {
        init:init
    }
})();
