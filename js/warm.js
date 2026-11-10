/*! 菜菜专属 · 温暖文案池
 * 96 条夸夸 / 温馨文案，顺序抽签、抽完一轮才重新洗牌：
 * 连续 90 次显示不会重复（96 条全部用完后才会开启下一轮）。
 * 用法：TT.warm.draw() -> string
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(root);
  } else {
    root.TT = root.TT || {};
    root.TT.warm = factory(root);
  }
})(typeof self !== 'undefined' ? self : this, function (root) {
  'use strict';

  var LINES = [
    '菜菜今天也要好好吃饭呀',
    '你已经很棒了，真的',
    '慢慢来，事情都会一件件变好的',
    '今天也辛苦啦，摸摸头',
    '有我在，别担心',
    '你认真起来的样子最好看了',
    '别急，我们一步一步来',
    '这件小事交给它就好',
    '你值得所有温柔和好运',
    '今天也是被偏爱的一天',
    '做不好也没关系，我陪你重来',
    '你笑起来一定很好看',
    '累了就歇一会儿，不急',
    '你已经比昨天更厉害一点了',
    '不管怎样，先夸夸你',
    '你超厉害的，只是自己没发现',
    '今天也要元气满满呀',
    '别否定自己，你特别好',
    '生活偶尔乱糟糟，但你会把它理顺',
    '你负责可爱，剩下的交给我',
    '不用完美，完成就很了不起',
    '慢慢走，沿途也有风景',
    '你在我这里永远满分',
    '今天记得对自己好一点',
    '如果卡住了，就从头再来一次',
    '你已经做得很好了，真的',
    '有你在，普通的日子也发光',
    '遇到你是很幸运的事',
    '今天的你也值得一朵小红花',
    '慢慢来，你又不差',
    '别怕，我在呢',
    '你的努力都有被看见',
    '小小的进步也值得庆祝',
    '今天也要开开心心的',
    '你比自己想象中更勇敢',
    '我先替未来谢谢你',
    '认真生活的你最好看',
    '不急，我们有的是时间',
    '你今天也超棒的',
    '抱抱，辛苦啦',
    '一步一步来，会越来越顺的',
    '你已经很努力了，别太苛责自己',
    '今天也要记得喝水呀',
    '你值得被好好对待',
    '不管结果怎样，我都站你这边',
    '你的温柔值得被温柔以待',
    '这次也顺顺利利',
    '你有一种让人安心的魔力',
    '有你在，什么都变得可爱',
    '今天也是喜欢菜菜的一天',
    '你已经做得足够好了',
    '慢慢来，答案会自己出现',
    '你认真生活的样子闪闪发光',
    '小小的你，有大大的能量',
    '别慌，事情没那么糟',
    '今天也请多多关照自己',
    '你笑起来，天气都变好了',
    '辛苦一天啦，该休息了',
    '你负责发光，我负责鼓掌',
    '不管多难，你都撑过来了',
    '你比任何课表都重要',
    '今天的菜菜也很可爱',
    '我永远是你的后援团',
    '你值得世间所有美好',
    '慢一点也没关系，你不赶时间',
    '给你一个隔空的抱抱',
    '你已经很努力地在生活了',
    '今天也要给自己一点甜',
    '你很好，不用证明给谁看',
    '不管怎样，今天先夸你',
    '你是我见过最认真的人之一',
    '别怕出错，错了我们再改',
    '你的每一步都算数',
    '今天也请收下我的夸奖',
    '你温柔又坚定，真好',
    '有你在的地方就很暖',
    '累了就靠一下，没关系的',
    '你已经把很多事都做得很好了',
    '你值得一切顺利',
    '今天也是想你的一天',
    '慢慢来，你本来就很好',
    '你笑起来像小太阳',
    '别着急，先深呼吸一下',
    '你的小情绪也值得被接住',
    '今天也辛苦了，早点睡',
    '你比自己以为的更可靠',
    '遇到麻烦先找我，不要自己扛',
    '你的可爱是藏不住的',
    '今天也要相信好事会发生',
    '你已经很棒了，再夸你一次',
    '一点一点来，不着急',
    '你的努力值得被温柔回应',
    '今天也请好好被爱',
    '菜菜冲呀，我在这儿',
    '你已经很了不起了',
    '不许难过，抱一个'
  ];

  var KEY = 'caicai.warm.v1';
  var bag = [];
  var last = null;

  function getStorage() {
    try {
      return root.localStorage || null;
    } catch (e) {
      return null;
    }
  }

  function load() {
    var store = getStorage();
    if (!store) return;
    try {
      var raw = store.getItem(KEY);
      if (!raw) return;
      var data = JSON.parse(raw);
      if (data && Array.isArray(data.bag) && data.bag.every(function (n) {
        return typeof n === 'number' && n >= 0 && n < LINES.length;
      })) {
        bag = data.bag.slice();
        last = typeof data.last === 'number' ? data.last : null;
      }
    } catch (e) { /* 忽略损坏的缓存 */ }
  }

  function save() {
    var store = getStorage();
    if (!store) return;
    try {
      store.setItem(KEY, JSON.stringify({ bag: bag, last: last }));
    } catch (e) { /* 隐私模式可能禁用存储 */ }
  }

  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = arr[i];
      arr[i] = arr[j];
      arr[j] = t;
    }
    return arr;
  }

  function draw() {
    load();
    if (!bag.length) {
      bag = LINES.map(function (_, i) { return i; });
      shuffle(bag);
      // 新一轮的第一条不要和上一轮最后一条相同
      if (last !== null && bag.length > 1 && bag[0] === last) {
        var t = bag[0];
        bag[0] = bag[1];
        bag[1] = t;
      }
    }
    var idx = bag.shift();
    last = idx;
    save();
    return LINES[idx];
  }

  return {
    count: LINES.length,
    lines: LINES.slice(),
    draw: draw
  };
});
