
var submitHistory = [];
var submitCount = 0;

exports.getSubmitHistory = function() {
  return submitHistory;
}

exports.save = function(data) {

  // 模拟延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      submitHistory.push(data);
      resolve(`提交了${(++submitCount)}次数据`);
    }, 2000);
  });
}

exports.clearHistory = function() {
  submitCount = 0;
  submitHistory = [];
  return null;
}

