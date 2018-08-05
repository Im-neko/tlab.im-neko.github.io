exports.diffDay = (x, y) => {
  let diff = x-y;
  var d = Math.floor(diff/(24*60*60*1000));
  var h = Math.floor((diff-(d*24*60*60*1000))/(60*60*1000));
  return d?d+' days':h+' hours';
}