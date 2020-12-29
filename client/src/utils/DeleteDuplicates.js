function DeleteDuplicates(arr) {
  var counts = arr.reduce(function (counts, item) {
    counts[item] = (counts[item] || 0) + 1;
    return counts;
  }, {});
  return Object.keys(counts).reduce(function (arr, item) {
    if (counts[item] === 1) {
      arr.push(item);
    }
    return arr;
  }, []);
}

export default DeleteDuplicates;
