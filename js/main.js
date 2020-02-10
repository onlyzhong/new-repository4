function domq(id) {
    return document.querySelector(id);
  }
  function domqAll(id) {
    return document.querySelectorAll(id);
  }
  //获取最大的盒子
  var box = domq("#box");
  //获取小图的div
  var small = domq(".small");
  //获取遮罩层
  var mask = domq(".mask");
  //获取大图的div
  var big = domq(".big");
  //获取大图
  var bigImg = big.children[0];
  // 鼠标进入事件
  box.onmouseover = function () {
    mask.style.display = "block";
    big.style.display = "block";
  };
  // 鼠标离开事件
  box.onmouseout = function () {
    mask.style.display = "none";
    big.style.display = "none"
  };
  //鼠标在小图上的移动事件
  small.onmousemove = function (evt) {
    console.log(evt.clientX);
    //声明变量x、y,使得鼠标处于遮罩层mask的中心
    var x = evt.clientX - mask.offsetWidth / 2;

    var y = evt.clientY - mask.offsetHeight / 2;
    //考虑到box的margin100px的问题
    y = y - box.offsetTop;

    x = x - box.offsetLeft;
    //当x等于0时，此时遮罩层mask已经贴紧box左侧，使得x=0保持mask贴紧box
    x = x < 0 ? 0 : x;
    //当y等于0时，此时遮罩层mask已经贴紧box上边，使得y=0保持mask贴紧box
    y = y < 0 ? 0 : y;
    //当x=small盒子的宽度与遮罩层mask差值时，此时遮罩层紧贴box右侧，应使得x等于他们的差值使得其贴紧右侧
    x = x > small.offsetWidth - mask.offsetWidth ? small.offsetWidth - mask.offsetWidth : x;
    //当y=small盒子的高度与遮罩层mask差值时，此时遮罩层紧贴box下边侧，应使得y等于他们的差值使得其贴紧下边侧
    y = y > small.offsetHeight - mask.offsetHeight ? small.offsetHeight - mask.offsetHeight : y;
    //设置遮罩层移动
    mask.style.left = x + "px";
    mask.style.top = y + "px";
    //声明maxX为大图片bigImg的移动距离；
    var maxX = bigImg.offsetWidth - big.offsetWidth;
    //移动比例maxX/small.offsetWidth - mask.offsetWidth
    var bigImgMoveX = x * maxX / (small.offsetWidth - mask.offsetWidth);
    var bigImgMoveY = y * maxX / (small.offsetWidth - mask.offsetWidth);
    //大图没脱标，故设置其margin 
    bigImg.style.marginLeft = -bigImgMoveX + "px";
    bigImg.style.marginTop = -bigImgMoveY + "px";
  }