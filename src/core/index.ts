var md5 = require('md5');

class Timeweaver {
  constructor(a) {
    this.start = new Date().getTime();
    if (a instanceof Date) {
      this.start = a.getTime();
      this.end = null;
      this.fabric = [];
      this.id = Math.random() * 10000;
      this.cutFabric(a);
    } else {
      if (typeof a === 'number') {
        this.start = a;
        this.end = null;
        this.fabric = [];
        this.id = Math.random() * 10000;
        this.cutFabric(a);
      } else {
        if (typeof a === 'object') {
          if (a.type === 'time_weaver') {
            this.start = a.start;
            this.end = a.end;
            this.fabric = a.fabric;
            this.id = a.id;
          } else {
            this.end = null;
            this.fabric = [];
            this.id = Math.random() * 10000;
          }
        }
      }
    }
    this.type = 'time_weaver';
  }
  endWeaving(a) {
    this.end = new Date().getTime();
    if (a instanceof Date) {
      this.end = a.getTime();
    } else {
      if (typeof a === 'number') {
        this.end = a;
      }
    }
  }
  cutFabric(a) {
    var timeStamp = new Date().getTime();

    if (a instanceof Date) {
      timeStamp = a.getTime();
    } else {
      if (typeof a === 'number') {
        timeStamp = a;
      }
    }

    var fabric_obj = {
      type: 'fabric',
      activity: [],
      start: timeStamp,
      name: `Lap ${this.fabric.length + 1}`
    };

    this.fabric.push(fabric_obj);
  }
  pauseLap(a) {
    var timeStamp = new Date().getTime();

    if (a instanceof Date) {
      timeStamp = a.getTime();
    } else {
      if (typeof a === 'number') {
        timeStamp = a;
      }
    }
    var pause_obj = {
      type: 'pause',
      start: timeStamp
    };

    if (this.fabric.length > 0) {
      var activity_instance = this.fabric[this.fabric.length - 1].activity;
      if (activity_instance.length > 0) {
        if (activity_instance[activity_instance.length - 1].type === 'continue') {
          this.fabric[this.fabric.length - 1].activity.push(pause_obj);
        }
      } else {
        this.fabric[this.fabric.length - 1].activity.push(pause_obj);
      }
    }
  }
  continueLap(a) {
    var timeStamp = new Date().getTime();

    if (a instanceof Date) {
      timeStamp = a.getTime();
    } else {
      if (typeof a === 'number') {
        timeStamp = a;
      }
    }
    var continue_obj = {
      type: 'continue',
      start: timeStamp
    };
    if (this.fabric.length > 0) {
      var activity_instance = this.fabric[this.fabric.length - 1].activity;
      if (activity_instance[activity_instance.length - 1].type === 'pause') {
        this.fabric[this.fabric.length - 1].activity.push(continue_obj);
      }
    }
  }
  switchActivityType() {
    var status = this.getStatus();
    if (status.activity === 'pause') {
      this.continueLap();
    } else {
      this.pauseLap();
    }
  }
  getBlocks(a) {
    var timeStamp = new Date().getTime();

    if (a instanceof Date) {
      timeStamp = a.getTime();
    } else {
      if (typeof a === 'number') {
        timeStamp = a;
      }
    }
    var arr = this.fabric;
    var arr_len = arr.length;
    var blocks = [];
    var this_end = timeStamp || this.end;
    for (var i = 0; i < arr_len; i++) {
      var this_item = arr[i];
      var previous_item = arr[i - 1];
      var next_item = arr[i + 1];
      var block = {
        start: i === 0 ? this.start : this_item.start,
        end: i === arr_len - 1 ? this_end : next_item.start,
        name: this_item.name
      };

      var activity_blocks = [];
      var this_item_activity = this_item.activity;
      var this_item_activity_len = this_item_activity.length;
      for (var f = 0; f < this_item_activity_len; f++) {
        var this_activity = this_item_activity[f];
        var previous_activity = this_item_activity[f - 1] || this_activity;
        var activity_block = {
          start: f === 0 ? block.start : previous_activity.start,
          end: this_activity.start < block.end ? this_activity.start : block.end,
          type: f === 0 ? 'continue' : previous_activity.type
        };
        activity_blocks.push(activity_block);
        if (f === this_item_activity_len - 1) {
          if (this_activity.start < block.end) {
            activity_block = {
              start: activity_block.end,
              end: block.end,
              type: this_item_activity_len > 1 ? (previous_activity.type === 'continue' ? 'pause' : 'continue') : this_activity.type
            };
            activity_blocks.push(activity_block);
          }
        }
      }
      if (this_item_activity_len === 0) {
        var activity_block = {
          start: block.start,
          end: block.end,
          type: 'continue'
        };
        activity_blocks.push(activity_block);
      }
      block.activity = activity_blocks;
      blocks.push(block);
    }
    return blocks;
  }
  getStatus(a) {
    var timeStamp = new Date().getTime();

    if (a instanceof Date) {
      timeStamp = a.getTime();
    } else {
      if (typeof a === 'number') {
        timeStamp = a;
      }
    }

    var blocks = this.getBlocks();
    var fabric = blocks.filter((e) => (e.start <= timeStamp && e.end >= timeStamp ? true : false));
    var activity = fabric.length > 0 ? fabric[0].activity.filter((e) => (e.start <= timeStamp && e.end >= timeStamp ? true : false)) : [{ type: 'null' }];

    return { passed: timeStamp - (fabric.length > 0 ? fabric[0].start : 0), activity: activity.length > 0 ? activity[0].type : 'continue', fabric: fabric.length > 0 ? fabric[0].name : 'null' };
  }
  saveToLocalStorage() {
    var json = {
      start: this.start,
      end: this.end,
      fabric: this.fabric,
      id: this.id,
      type: this.type
    };
    var hash = md5(JSON.stringify(json));
    if (!(hash === this.hash)) {
      this.hash = hash;
      localStorage.setItem('time_weaver_x_' + this.id, JSON.stringify(json));
    }
  }

  setLapNameTo(index, event) {
    var target_fabric = this.fabric[index];
    target_fabric.name = event.target.value;
    this.fabric.splice(index, 1, target_fabric);
    this.saveToLocalStorage();
  }
}

var dt2 = function (t1, t2) {
  function Ym(y) {
    var m_total = 0;
    var m_c = 0;
    for (var m = 0; m < 12; m++) {
      var f = new Date();
      f.setFullYear(y);
      f.setDate(1);
      f.setMonth(m);
      f.setDate(0);
      m_total += f.getDate();
      m_c += 1;
    }
    return (m_total / m_c).toFixed(10);
  }
  var tday_ym = Ym(new Date().getFullYear());
  var g = [60 * 60 * 24 * tday_ym * 12 * 1000, 60 * 60 * 24 * tday_ym * 1000, 60 * 60 * 24 * 1000, 60 * 60 * 1000, 60 * 1000, 1000];
  var gg = function (j) {
    return Math.floor(g[j]);
  };
  var fl = function (a, b) {
    return Math.abs(Math.floor(a / gg(b)));
  };
  var f = Math.abs(t1 - t2);
  var y = f - (f % gg(0));
  var m = f - y - ((f - y) % gg(1));
  var d = f - y - m - ((f - y - m) % gg(2));
  var h = f - y - m - d - ((f - y - m - d) % gg(3));
  var mm = f - y - m - d - h - ((f - y - m - d - h) % gg(4));
  var s = f - y - m - d - h - mm - ((f - y - m - d - h - mm) % gg(5));

  var padding = function (num) {
    return (num < 10 ? '0' : '') + num;
  };
  var string_arr = [];
  var return_arr = [];
  var g_year, g_month, g_date, g_hour, g_minute, g_second;
  var gy = [fl(y, 0), fl(m, 1), fl(d, 2), fl(h, 3), fl(mm, 4), fl(s, 5)];
  if (gy[0] > 0) {
    string_arr.push(gy[0]);
    string_arr.push('Y ');
    g_year = 1;
  }

  if (gy[1] > 0) {
    string_arr.push(gy[1]);
    string_arr.push('M ');
    g_month = 1;
  }

  if (gy[2] > 0) {
    string_arr.push(gy[2]);
    string_arr.push('D ');
    g_date = 1;
  }

  if (gy[3] > 0) {
    string_arr.push(padding(gy[3]));
    string_arr.push('h ');
    g_hour = 1;
  } else {
    if (g_date === 1 || g_year === 1 || g_month === 1) {
      string_arr.push('00');
      string_arr.push('h ');
      g_hour = 1;
    }
  }
  if (gy[4] > 0) {
    string_arr.push(padding(gy[4]));
    string_arr.push('m ');
    g_minute = 1;
  } else {
    if (g_hour === 1) {
      string_arr.push('00');
      string_arr.push('m ');
      g_minute = 1;
    }
  }

  if (gy[5] > 0) {
    string_arr.push(padding(gy[5]));
    string_arr.push('s');
    g_second = 1;
  } else {
    // if (g_minute === 1) {
    string_arr.push('00');
    string_arr.push('s');
    g_second = 1;
    // }
  }

  return string_arr.join('');
};

function searchItemsbyname(name) {
  var gh = [];
  for (var t in window.localStorage) {
    if (String(t).indexOf(name) > -1) {
      gh.push(t);
    }
  }
  return gh;
}
var t = searchItemsbyname('time_weaver_x_').sort(function (a, b) {
  var a = JSON.parse(String(localStorage.getItem(a))).start;
  var b = JSON.parse(String(localStorage.getItem(b))).start;
  return b - a;
});
var weaver = new Timeweaver(t.length > 0 ? JSON.parse(String(localStorage.getItem(t[0]))) : new Date());
var fabric_element_update = {};
var fabric_activity_element_update = {};

function getActivityHTML(activity) {
  var translateY = 0;
  return activity
    .reverse()
    .map((e) => {
      translateY += ms_to_px(e.end - e.start);
      return `<div class="activity" style="--activity-height:${ms_to_px(e.end - e.start)}px;--activity-translateY:${translateY - ms_to_px(e.end - e.start)}px" type="${e.type}"></div>`;
    })
    .join('');
}

var ms_to_px = function (ms) {
  return (ms / 1000 / 60) * 70;
};

function updateStatus() {
  var status = weaver.getStatus();
  document.querySelector('.dashboard .current_fabric').innerText = status.fabric;
  document.querySelector('.dashboard .current_passed_time').innerText = dt2(0, status.passed);
  document.querySelector('.dashboard .current_activity').innerText = status.activity;
  weaver.saveToLocalStorage();
  var f = -1;
  var j = 0;
  var ss = -1;
  var blocks = weaver
    .getBlocks(new Date())
    .map((d) => {
      ss += 1;
      return Object.assign(d, { index: ss });
    })
    .filter((e) => {
      f += 1;
      var h = String(fabric_element_update[`d_${f}`]);
      fabric_element_update[`d_${f}`] = md5(JSON.stringify(e));
      return h === md5(JSON.stringify(e)) ? false : true;
    })
    .forEach((u) => {
      var element = document.querySelectorAll(`.fabric .fabric_block[index="${u.index}"]`);
      if (element.length > 0) {
        //existing
        element[0].querySelector('.fabric_block_activity').innerHTML = `${getActivityHTML(u.activity)}`;
        element[0].style.setProperty('--fabric-height', `${ms_to_px(u.end - u.start)}px`);
      } else {
        var block = document.createElement('div');
        block.setAttribute('index', u.index);
        block.classList.add('fabric_block');
        block.style.setProperty('--fabric-height', `${ms_to_px(u.end - u.start)}px`);
        block.innerHTML = `<div class="fabric_block_name"><input type="text" value="${u.name}" index="${u.index}" onkeyup="weaver.setLapNameTo(${u.index},event)" onselectionchange="weaver.setLapNameTo(${u.index},event)"></div><div class="fabric_block_activity">${getActivityHTML(u.activity)}</div>`;
        document.querySelector('.fabric').prepend(block);
      }

      j += 1;
    });

  window.requestAnimationFrame(updateStatus);
}
updateStatus();
