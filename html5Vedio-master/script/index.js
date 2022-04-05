window.onload = function() { (function() {

        //自适应页面高度;
        var headerHeight = 0;

        setTimeout(function() {
            //延迟以便获取准确的高度，微信中默认打开webview获取的页面高度很高
            var mHeight = document.documentElement.clientHeight - headerHeight;
            var $content = document.querySelector(".container");

            $content.style.minHeight = mHeight + "px"; //css('min-height',mHeight);
        },
        100);

        var $h5vedio = document.querySelector("#h5_vedio");
        $h5vedio.style.height = document.documentElement.clientHeight - headerHeight + "px";

        //初始化操作-初始化时间显示
        function setVedioTime() {
            this.Media = document.getElementById("video1");
            this.Jctrl = document.querySelector("#J_ctrl");
            this.allTime = document.querySelector("#allTime");
            this.currentTimeNode = document.querySelector("#currentTime");

            //计算时间
            this.formate_time = function(ti) {
                var t = "",
                a = parseInt(ti),
                _s = a % 60,
                _m = parseInt(a / 60); //minute, 
                _h = 0;
                return _m > 60 && (_h = parseInt(_m / 60), //小时存在 _h = 小时数
                _m = parseInt(n % 60)),
                //计算分钟数
                10 > _m && (_m = "0" + _m),
                10 > _s && (_s = "0" + _s),
                t = _h ? _h + ":" + _m + ":" + _s: _m + ":" + _s;
            };

            //用于设置滑动滑块时的样式
            this.setMovingDot = function(wt) {
                this.j_process.style.width = wt + 10 + "px";
                this.j_process_dot.style.left = wt + "px";
            };
        }
        setVedioTime.prototype.initTime = function() {
            this.currentTime = Number(this.Media.currentTime); //视频当前播放时间
            this.vedioTime = Number(this.Media.duration); //视频总时间
            this.allTime.firstChild.nodeValue = "/" + this.formate_time(this.vedioTime); //设置视频播放总时长
            this.currentTimeNode.firstChild.nodeValue = this.formate_time(this.currentTime); //设置视频初始时间
            this.initProcess();
        };
        //设置进度条长度
        setVedioTime.prototype.initProcess = function() {
            this.j_process_all = document.querySelector('.vedio-process');
            this.j_process = document.querySelector('.vedio-process-status');
            this.j_process_dot = document.querySelector('.vedio-process-dot');

            var processWidth = 0; //进度条总长度
            var dotwidth = this.j_process_dot.offsetWidth;
            processWidth = (this.currentTime / this.vedioTime) * (this.j_process_all.offsetWidth - dotwidth); //进度条长度要减去点的宽度
            //processWidth = this.j_process_all.offsetWidth;
            this.setMovingDot(processWidth);
        };
        //各种操作
        setVedioTime.prototype.initOpetaionFun = function() {
            var that = this;
            var moveBar = this.setMoveOpe();
            //点击按钮开始或暂停视频
            this.Jctrl.onclick = function() {
                var bartimer;
                if (that.Media.paused) {
                    that.Media.play();
                    this.className = "btn-control-play";
                    bartimer = window.setInterval(function() {
                        that.initTime();
                    },
                    100);
                } else {
                    that.Media.pause();
                    this.className = "btn-control";
                    window.clearInterval(bartimer);
                }
            };
            this.j_process_dot.addEventListener("touchstart", moveBar.moveStart),
            this.j_process_dot.addEventListener("touchmove", moveBar.moveIng),
            this.j_process_dot.addEventListener("touchend", moveBar.moveEnd);

        };
        //拖动滑块设置播放时间
        setVedioTime.prototype.setMoveOpe = function() {
            var ope = {};
            var that = this;
            return ope = {
                moveStart: function() {

},
                moveIng: function(e) {
                    var X = e.touches[0].pageX;
                    var precess_width = that.j_process_all.offsetWidth,
                    treasure_width = that.j_process_dot.offsetWidth;
                    X < -5 ? X = -5 : (X > precess_width ? X = precess_width - 5 : X > precess_width - treasure_width + 12 && (X = precess_width - treasure_width + 12)),
                    that.space = X;
                    var duration = parseInt(that.vedioTime),
                    time = duration * X / parseInt(precess_width);
                    that.currentTimeNode.firstChild.nodeValue = that.formate_time(time);
                    that.setMovingDot(X);
                },
                moveEnd: function() {
                    var precess_width = that.j_process_all.offsetWidth;
                    var duration = parseInt(that.vedioTime),
                    currentTime = duration * that.space / parseInt(precess_width - 5);
                    console.log(that.vedioTime);
                    that.Media.currentTime = currentTime;
                }
            };
        };
        //初始化函数
        setVedioTime.prototype.initFinial = function() {
            this.initTime();
            this.initOpetaionFun();
        };

        var vedioPlay = new setVedioTime();
        vedioPlay.initFinial();
    })();

};