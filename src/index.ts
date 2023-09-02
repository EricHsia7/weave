import { Timeweaver, getDurationAndFormat } from './core/index';
import { searchItemsbyname } from './core/storage';
import { durationToPixel, generateActivityHTML, updateStatus } from './user-interface';

var weaver;

function weave() {
  var t = searchItemsbyname('time_weaver_x_').sort(function (a, b) {
    var a = JSON.parse(String(localStorage.getItem(a))).start;
    var b = JSON.parse(String(localStorage.getItem(b))).start;
    return b - a;
  });
  weaver = new Timeweaver(t.length > 0 ? JSON.parse(String(localStorage.getItem(t[0]))) : new Date());

  //initialize
}

export default weave();
