import { Timeweaver, getDurationAndFormat } from './core/index.ts';
import { searchItemsbyname } from './core/storage.ts';
import { durationToPixel, generateActivityHTML, updateStatus } from './user-interface';

import './user-interface/css/index.css';

window.weaver = new Timeweaver();

window.weave = function () {
  //initialize
  var t = searchItemsbyname('time_weaver_x_').sort(function (a, b) {
    var a = JSON.parse(String(localStorage.getItem(a))).start;
    var b = JSON.parse(String(localStorage.getItem(b))).start;
    return b - a;
  });
  weaver = new Timeweaver(t.length > 0 ? JSON.parse(String(localStorage.getItem(t[0]))) : new Date());
  updateStatus()
};

export default window.weave;
