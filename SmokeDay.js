function SmokeDay(num, duffTime, money) {
  //读取缓存
  var STRING = ["SmokeData", "SmokeDiffTime"];
  if ($cache.get(STRING[0]) == undefined) {
    $cache.set(STRING[0], {
      num: 0, //数量
      money: 0 //耗资
    });
  }
  if ($cache.get(STRING[1]) == undefined) {
    $cache.set(STRING[1], new Date());
  }
  var data = $cache.get(STRING[0]);

  //视图属性
  num.text = data.num + "支";
  money.text = data.money.toFixed(2) + "元";

  var timer = $timer.schedule({
    interval: 1,
    handler: function() {
      var diff = $cache.get(STRING[1]);

      //距离上一支时差
      duffTime.text =
        parseInt((new Date().getTime() - diff.getTime()) / 1000) + "秒前";
    }
  });

  //吸一支
  this.absorb = function() {
    data.num += 1;
    data.money += 1.15;

    //视图属性
    num.text = data.num + "支";
    money.text = data.money.toFixed(2) + "元";

    $cache.set(STRING[1], new Date());
    refresh();
  };

  //刷新缓存
  function refresh() {
    $cache.set(STRING[0], data);
    //timer.invalidate();
  }

  //清除缓存
  this.clear = function() {
    $cache.clear();
  };
}
