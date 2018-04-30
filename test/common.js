export default function () {
  console.log('common...')
}

/* eslint-disable */
// for a 60Hz monitor, requestAnimationFrame will trigger the callback every 16.67ms (1000 / 60 == 16.66...)
// todo: for performance concern, add threshold, to control how many times fn will be called in one minute
var ticking = false
export function requestFrame (fn, giveup) {
  if (!giveup || !ticking) {
    window.requestAnimationFrame(() => {
      ticking = false
      fn()
    })
    ticking = true
  }
}

export function isEmpty (val) {
  return val === undefined || val === null || val === ''
}

export function isString (value) {
  return typeof value === 'string'
}

export function isNumber (value) {
  return typeof value === 'number'
}

export function isObject (value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object'
}

export function isFunction (value) {
  return typeof value === 'function'
}

export function isUndefined (value) {
  return typeof value === 'undefined'
}

export function isInvalidDate (value) {
  return value.toString() === 'Invalid Date'
}

export const isArray = Array.isArray

export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null;
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
    let date;
    if (typeof time == 'object') {
        date = time;
    } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000;
        date = new Date(time);
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    };
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key];
        if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
        if (result.length > 0 && value < 10) {
            value = '0' + value;
        }
        return value || 0;
    });
    return time_str;
}

export function formatTime(time, option) {
    time = +time * 1000;
    const d = new Date(time);
    const now = Date.now();

    const diff = (now - d) / 1000;

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) { // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
    }
}

// 格式化时间
export function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    const search = url.substring(url.lastIndexOf('?') + 1);
    const obj = {};
    const reg = /([^?&=]+)=([^?&=]*)/g;
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1);
        let val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}


export function param2Obj(url) {
    const search = url.split('?')[1];
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}


export function scrollTo(element, to, duration) {
    if (duration <= 0) return;
    const difference = to - element.scrollTop;
    const perTick = difference / duration * 10;
    setTimeout(() => {
        console.log(new Date())
        element.scrollTop = element.scrollTop + perTick;
        if (element.scrollTop === to) return;
        scrollTo(element, to, duration - 10);
    }, 10);
}

export function toggleClass(element, className) {
    if (!element || !className) {
        return;
    }
    let classString = element.className;
    const nameIndex = classString.indexOf(className);
    if (nameIndex === -1) {
        classString += '' + className;
    } else {
        classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length);
    }
    element.className = classString;
}

export const pickerOptions = [
    {
        text: '今天',
        onClick(picker) {
            const end = new Date();
            const start = new Date(new Date().toDateString());
            end.setTime(start.getTime());
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一周',
        onClick(picker) {
            const end = new Date(new Date().toDateString());
            const start = new Date();
            start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近一个月',
        onClick(picker) {
            const end = new Date(new Date().toDateString());
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
        }
    }, {
        text: '最近三个月',
        onClick(picker) {
            const end = new Date(new Date().toDateString());
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
        }
    }]

export function getTime(type) {
    if (type === 'start') {
        return new Date().getTime() - 3600 * 1000 * 24 * 90
    } else {
        return new Date(new Date().toDateString())
    }
}

// 对象深拷贝
export function deepCopy(source) {
    var result = {};

    if (typeof source !== 'object' || source === null) {
        return source;
    }

    if (Object.prototype.toString.apply(source) == '[object Array]') {
        result = [];
        for(let i = 0, len = source.length; i < len; i++) {
            let temp = typeof source[i] === 'object' ? deepCopy(source[i]) : source[i];
            result.push(temp);
        }
    } else {
        for(var key in source) {
            if (source.hasOwnProperty(key)) {
                result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
            }
        }
    }
    return result;
}

export function formatTimeStamp(timestamp, Cformat) {
    let format =  Cformat || "yyyy年MM月dd日 hh:mm";
    if (!timestamp || !/^\d+$/.test(timestamp)) {
        timestamp = 0;
    }
    let addZero = function (val) {
        return /^\d{1}$/.test(val) ? '0' + val : val;
    };

    let year = '',
        month = '',
        day = '',
        hours = '',
        minutes = '',
        seconds = '',
        week = '',
        weekStr = '';
    let date = new Date(timestamp);

    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();
    week = date.getDay();

    switch (week) {
        case 0:
            weekStr = '日';
            break;
        case 1:
            weekStr = '一';
            break;
        case 2:
            weekStr = '二';
            break;
        case 3:
            weekStr = '三';
            break;
        case 4:
            weekStr = '四';
            break;
        case 5:
            weekStr = '五';
            break;
        case 6:
            weekStr = '六';
            break;
    }

    month = addZero(month);
    day = addZero(day);
    hours = addZero(hours);
    minutes = addZero(minutes);
    seconds = addZero(seconds);

    return format.replace('yyyy', year).replace('MM', month).replace('dd', day).replace("hh", hours).replace("mm", minutes).replace("ss", seconds).replace('W', weekStr);
}

// get url params
export function getQueryString(name) {
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"),
        r = window.location.search.substr(1).match(reg);

    if(r!=null)return  decodeURIComponent(r[2]); return null;
}
function on (element, evt, handler) {
  element.addEventListener(evt, handler, false);
}

function off (element, evt, handler) {
  element.removeEventListener(evt, handler, false);
}

function isFunction (value) {
  return typeof value === 'function'
}

function newNode (item) {
  // var node = Object.create(null)
  // node.item = item
  // return node.next = node.prev = node
  return item.next = item.prev = item
}

function LinkList (arr) {
  var this$1 = this;

  this.list = [];
  // arr.forEach(item => this.append(item))
  arr.forEach(function (item, index) {
    item.index = index;
    this$1.append(item);
  });
}

LinkList.prototype.append = function (item) {
  var node = newNode(item);
  this.list.push(node);
  if (!this.tail) {
    return this.head = this.tail = node
  }
  node.prev = this.tail;
  node.next = this.tail.next;
  this.tail.next = node;
  node.next.prev = node;
  return this.tail = node
};

// for a 60Hz monitor, requestAnimationFrame will trigger the callback every 16.67ms (1000 / 60 == 16.66...)
var vendorPrefixes = ['webkit','moz','ms','o'];
var raf = vendorPrefixes.reduce(function (result, next) { return result || window[(next + "RequestAnimationFrame")]; }, window.requestAnimationFrame);
var caf = vendorPrefixes.reduce(function (result, next) { return result || window[(next + "CancelAnimationFrame")]; }, window.cancelAnimationFrame);
if (!raf || !caf) {
  var last = 0;
  raf = function (fn) {
    var now = +new Date();
    last = Math.max(now, last + 16);
    return setTimeout(fn, last - now)
  };
  caf = clearTimeout;
}
// window.raf = raf
// window.caf = caf

var cubic = function (k) { return --k * k * k + 1; };

// TODO: desktop support, mouse / pointer events
// var touch = 'ontouchstart' in window
// export var pointerdown = touch ? 'touchstart' : 'mousedown'
// export var pointermove = touch ? 'touchmove' : 'mousemove'
// export var pointerup = touch ? 'touchend' : 'mouseup'
var pointerdown = 'touchstart';
var pointermove = 'touchmove';
var pointerup = 'touchend';

var computedProp = function (el, prop) { return window.getComputedStyle(el, null).getPropertyValue(prop); };

var FAST_THRESHOLD = 120;
var FAST_INTERVAL = 250;
var MAX_INTERVAL = 1000;
var MAX_PART = MAX_INTERVAL * 2 / 3;
var AUTO_TIMEOUT = 3000;

var defaultOptions = {
  auto: false,
  cycle: true,
  expose: false,
  root: null, // required
  elms: [], // required
  index: 0,
  width: window.screen.width, // if css is false, need width & height
  height: 200,
  css: false
};

var hides = document.createElement('div');
hides.style.display = 'none';
document.body.appendChild(hides);

function swipeIt (options) {
  var opts = Object.assign({}, defaultOptions,
    options);

  var index = opts.index;
  var root = opts.root;
  var elms = opts.elms;
  var width = opts.width;
  var height = opts.height;
  var cycle = opts.cycle;
  var expose = opts.expose;
  var auto = opts.auto;
  var css = opts.css;

  if (!root) { return }

  if (css) {
    width = Number(computedProp(root, 'width').slice(0, -2));
    height = Number(computedProp(root, 'height').slice(0, -2));
  }
  var main = root.children[0], animations = {main: -1, timeouts: []}, threshold = width / 3;

  /*
   * 0000: start
   * 0001: dragging
   * 0010: animating
   * 0100: vertical scrolling
   */
  var phase = 0, autoPhase = 0;
  var restartX = 0, direction = 0; // -1: left, 0: na, 1: right
  var x = 0, startTime = 0, startX = 0, currentX = 0, startY = 0, slides = [];
  var two = false;

  var current = elms[index];

  var show = function (el) { return main.appendChild(el); };
  var stopR = function () { return !cycle && currentX > startX && current === slides.head; };
  var stopL = function () { return !cycle && currentX <= startX && current === slides.tail; };
  init();

  return {
    destroy: destroy, index: function (_) { return current.index; }
  }

  function onTouchStart (evt) {
    caf(animations.main);
    while (animations.timeouts.length) { clearTimeout(animations.timeouts.splice(0, 1)[0]); }
    phase = 0;
    direction = 0;

    var touch = evt.touches[0];
    startTime = Date.now();
    restartX = currentX = startX = touch.pageX;
    startY = touch.clientY;
  }

  function onTouchMove (evt) {
    if (phase === 2 || phase === 4) { return }

    var touch = evt.touches[0];
    var gap = touch.pageX - currentX;

    if (phase === 0 && Math.abs(gap) * 2 < Math.abs(touch.clientY - startY)) {
      phase = 4;
      return
    }

    var _d = gap > 0 ? 1 : -1;
    if (direction !== _d) {
      restartX = currentX;
      startTime = Date.now();
      direction = _d;
    }

    phase = 1;
    currentX = touch.pageX;

    x = x + gap;
    moveX(main, x);

    evt.preventDefault();
  }

  function moveRight () {
    two || hide(current.next);
    current = current.prev;
    if (!stopR()) {
      moveEx(current.prev, current.x - width);
      show(current.prev);
    }
  }

  function moveLeft () {
    two || hide(current.prev);
    current = current.next;
    if (!stopL()) {
      moveEx(current.next, current.x + width);
      show(current.next);
    }
  }

  function onAutoAnimation () {
    if (-current.x - x <= width / 2) { autoPhase = 0; }
    else if (autoPhase === 0) {
      autoPhase = 1;
      moveLeft();
    }
  }

  function autoCallback () {
    animations.timeouts.push(setTimeout(function () { return animate(main, x, x - width, MAX_PART, onAutoAnimation, autoCallback); }, AUTO_TIMEOUT));
  }

  function onTouchEnd (evt) {
    if (phase === 4) { return }
    phase = 2;
    var right = currentX > restartX;
    var fast = (Date.now() - startTime) < FAST_THRESHOLD;

    if (!stopR() && !stopL()) {
      var cx = current.x + x;
      if (fast) {
        if (right && cx > 0) { moveRight(); }
        else if (!right && cx < 0) { moveLeft(); }
      } else if (cx > threshold) { moveRight(); }
      else if (cx < -threshold) { moveLeft(); }
    }

    var to = current.x * -1;

    var t = Math.min(Math.max(MAX_INTERVAL * Math.abs(to - x) / width, FAST_INTERVAL), MAX_PART);
    animate(main, x, to, fast ? FAST_INTERVAL : t);
    auto && autoCallback();
  }

  function animate (elm, from, to, interval, onAnimation, callback) {
    var start = Date.now();
    function loop () {
      isFunction(onAnimation) && onAnimation();
      var now = Date.now();
      var during = now - start;
      if (during >= interval) {
        moveX(elm, to);
        isFunction(callback) && callback();
        return
      }
      var distance = (to - from) * cubic(during / interval) + from;
      x = distance;
      moveX(elm, distance);
      animations.main = raf(loop);
    }
    loop();
  }

  function init () {
    if (elms.length === 0) { return }
    if (!expose) { root.style.overflow = 'hidden'; }
    root.style.position = 'relative';
    if (!css) {
      root.style.width = width + 'px';
      root.style.height = height + 'px';
    }
    if (elms.length === 2 && cycle) {
      elms.push(elms[0].cloneNode(true));
      show(elms[2]);
      elms.push(elms[1].cloneNode(true));
      show(elms[3]);
    }
    var one = elms.length === 1;
    two = elms.length === 2;
    slides = new LinkList(elms);
    moveEx(current, 0);
    one || two || moveEx(current.prev, -width);
    one || moveEx(current.next, width);
    elms.forEach(function (el) {
      el.style.position = 'absolute';
      if (!css) {
        el.style.width = width + 'px';
        el.style.height = height + 'px';
      }
      el.style.overflow = 'hidden';
      if (!two && !one && el !== current && el !== current.prev && el !== current.next) { hide(el); }
    });

    if (one) { return }

    if (!two && !cycle && index === 0) { hide(current.prev); }
    if (!two && !cycle && index === elms.length - 1) { hide(current.next); }

    destroy();
    on(root, pointerdown, onTouchStart);
    on(root, pointermove, onTouchMove);
    on(root, pointerup, onTouchEnd);

    auto && autoCallback();
  }

  function destroy () {
    off(root, pointerdown, onTouchStart);
    off(root, pointermove, onTouchMove);
    off(root, pointerup, onTouchEnd);
  }
}
var moveEx = function (el, x) { el.x = x; moveX(el, x); };
var hide = function (el) { return hides.appendChild(el); };

function moveX (el, x) {
  if (!el) { return }
  el.style.transition = el.style.webkitTransition = '';
  el.style.transform = el.style.webkitTransform = "translate3d(" + x + "px, 0, 0)";
}

export {swipeIt};
