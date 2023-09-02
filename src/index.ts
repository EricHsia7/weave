import { Timeweaver, getDurationAndFormat } from './core/index.ts';
import { searchItemsbyname } from './core/storage.ts';
import { durationToPixel, generateActivityHTML, updateStatus, updateButtonStatus } from './user-interface/index.ts';

import './user-interface/css/index.css';

//for development

const ErrorStackParser = require('error-stack-parser');
const StackTrace = require('stacktrace-js');

window.onerror = async function (message, source, lineno, colno, error) {
  StackTrace.fromError(error).then(function (stackTrace) {
    var parsedStackTrace = stackTrace.map(function (frame) {
      return {
        functionName: frame.functionName,
        fileName: frame.fileName,
        lineNumber: frame.lineNumber,
        columnNumber: frame.columnNumber
      };
    });
    console.log('%c ----------', 'color: #888;');
    parsedStackTrace.forEach((e) => {
      console.log(`%c func: ${e.functionName}\npath: ${e.fileName}\nlocation: L${e.lineNumber} C${e.columnNumber}`, 'color: rgba(255,0,0,1); background-color: rgba(255,0,0,0.09);');
    });
  });
};

window.weaver = new Timeweaver();

window.weave = function () {
  //initialize
  var t = searchItemsbyname('time_weaver_x_').sort(function (a, b) {
    var a = JSON.parse(String(localStorage.getItem(a))).start;
    var b = JSON.parse(String(localStorage.getItem(b))).start;
    return b - a;
  });
  weaver = new Timeweaver(t.length > 0 ? JSON.parse(String(localStorage.getItem(t[0]))) : new Date());
  updateStatus();
  interaction.loadFont('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@200;400;500;700&display=swap', 'Noto Sans', 'googleFontsNotoSans');
};

export default window.weave;
