window.onload = function(){
var oBall = document.getElementById("ball");
var oWard = document.getElementById("ward"); 
var oZhuankuai = document.getElementById("zhuankuai"); 
var oGrade = document.getElementById("grade");
var oDocu = document.getElementById("body");
function Breakout(ward, zhuankuai, ball, docu) {
    this.x = 0;
    this.y = 0;
    this.speed = 1;
    this.xSpeed = this.speed; //10
    this.ySpeed = -this.speed; //-10
    this.ward = ward;
    this.zhuankuai = zhuankuai;
    this.docu = docu;
    this.ball = ball;
    this.grade = 0;
    this.flag = 0;
    this.grade = 0;
}
Breakout.prototype = {
    init: function () {
        this.createBrick();
        this.wardMove();
        this.ballStart();
        this.checkGrades();
    },
   //砖块排列
    createBrick:function(){
        var oBox=document.getElementById("zhuankuai");
        var str=" ";
    for (var i = 0; i < 10; i++) {
        for (var j = 0; j < 16; j++) {
            str += "<div style='left:" + j * 90 + "px;top:" + i * 30 + "px;'>"+"<p style='color:#368'>病毒</p>"+"</div>";
            
        }
    }
    oBox.innerHTML = str;
    },
    wardMove: function () {
        this.addevent(this.docu, 'mousemove', this.mouseMove.bind(this));
    },
    mouseMove: function (e) {
        var e = window.event || e;
        var Left = e.pageX - this.ward.offsetWidth / 2 - 40;
        this.ward.style.left = Left + 'px';
    },
    ballStart: function () {
        //点击小球游戏开始，小球开始运动
        this.addevent(this.ball, 'click', this.ballMove.bind(this));
    },

    ballMove: function () {
        this.ballCrash(); 
        setTimeout(this.ballMove.bind(this), 1);
    },
    ballCrash: function () {
        this.x = parseInt(this.ball.offsetLeft);
        this.y = parseInt(this.ball.offsetTop);
        var x = parseInt(this.ball.offsetLeft);
        var h = parseInt(this.ball.offsetTop);

        if (Math.abs(this.x - this.ward.offsetLeft) < 120 && Math.abs(this.y - this.ward.offsetTop) < 30) {
            this.ySpeed = -this.ySpeed;
            this.y = this.ward.offsetTop - 40; 
            this.ward.style.background = this.ranColor();
        }


       //判断小球和砖块是否碰撞
        for (var i = 0; i < this.zhuankuai.children.length; i++) { 
         var disappear = this.zhuankuai.children[i];
            if ((this.x - parseInt(disappear.offsetLeft)) < (70) && (this.x - parseInt(disappear
                .offsetLeft)) > 0 && (this.y - parseInt(disappear.offsetTop)) <= (20) && (this.y -
                    parseInt(disappear.offsetTop)) >= (10)) {
                this.ySpeed = -this.ySpeed;
                this.grade++;
                this.zhuankuai.removeChild(disappear);
            }
        }
        oGrade.innerHTML = this.grade;
    

       
        if (x >= 1400) {
            this.xSpeed = -this.speed;
        }
        if (x <= 10) {
            this.xSpeed = this.speed;
        }
        //判断小球是否与底边碰撞
        if (h >= 680) {
            this.ySpeed = -this.speed;
            this.checkStart();
        }
        if (h <= 0) {
            this.ySpeed = this.speed;
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.ball.style.left = this.x + 'px';
        this.ball.style.top = this.y + 'px';
    },
    checkStart: function () {
        if (confirm('游戏结束，点击确定重新开始')) {
            window.location = "test1.html";
        } else {
            document.getElementById("body").style.display = "none";
            document.getElementById("title").style.display = "none";
            document.getElementById("grade").style.color="rgb(0, 255, 85)";
            
        }
    },
    ranColor: function () {
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += '368';
        }
        return color;
    },
  
    addevent: function (element, type, handler) {
        return element.addEventListener ? element.addEventListener(type, handler, false) : element
            .attachEvent('on' + type, handler);
    },
    removeHandler: function (element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = null;
        }
    },
}
var breakout = new Breakout(oWard, oZhuankuai, oBall, oDocu);
breakout.init();

}