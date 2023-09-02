export function searchItemsbyname(name) {
  var gh = [];
  for (var t in window.localStorage) {
    if (String(t).indexOf(name) > -1) {
      gh.push(t);
    }
  }
  return gh;
}