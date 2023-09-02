import { getDurationAndFormat } from '../core/index.ts';

var md5 = require('md5');


window.fabric_element_update = {};
window.fabric_activity_element_update = {};

export function durationToPixel(ms: number): number {
  return (ms / 1000 / 60) * 70;
}

export function generateActivityHTML(activity): string {
  var translateY = 0;
  return activity
    .reverse()
    .map((e) => {
      translateY += durationToPixel(e.end - e.start);
      return `<div class="activity" style="--activity-height:${durationToPixel(e.end - e.start)}px;--activity-translateY:${translateY - durationToPixel(e.end - e.start)}px" type="${e.type}"></div>`;
    })
    .join('');
}

export function updateStatus(): void {
  var status = weaver.getStatus();
  document.querySelector('.dashboard .current_fabric').innerText = status.fabric;
  document.querySelector('.dashboard .current_passed_time').innerText = getDurationAndFormat(0, status.passed);
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
        element[0].querySelector('.fabric_block_activity').innerHTML = `${generateActivityHTML(u.activity)}`;
        element[0].style.setProperty('--fabric-height', `${durationToPixel(u.end - u.start)}px`);
      } else {
        var block = document.createElement('div');
        block.setAttribute('index', u.index);
        block.classList.add('fabric_block');
        block.style.setProperty('--fabric-height', `${durationToPixel(u.end - u.start)}px`);
        block.innerHTML = `<div class="fabric_block_name"><input type="text" value="${u.name}" index="${u.index}" onkeyup="weaver.setFabricNameTo(${u.index},event)" onselectionchange="weaver.setFabricNameTo(${u.index},event)"></div><div class="fabric_block_activity">${generateActivityHTML(u.activity)}</div>`;
        document.querySelector('.fabric').prepend(block);
      }

      j += 1;
    });

  window.requestAnimationFrame(updateStatus);
}
