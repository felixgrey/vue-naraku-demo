
// 省份列表
exports.getProvince = function(){
  
  return [
    {name: '辽宁省', value: '210000'},
    {name: '浙江省', value: '330000'},
    {name: 'A省', value: 'A10000'},
    {name: 'B省', value: 'B10000'},
    {name: 'C省', value: 'C10000'},
  ];
}

// 城市列表
exports.getCity = function(param = {}) {
  
  if (!param.value) {
    return [];
  }
  
  // 辽宁省
  if (param.value === '210000') {
    return [
      {name: '沈阳市', value: '210100'},
      {name: '大连市', value: '210200'},
      {name: '鞍山市', value: '210300'},
      {name: '铁岭市', value: '211200'},
    ];
  }
  
  // 浙江省
  if (param.value === '330000') {
    return [
      {name: '杭州市', value: '330100'},
      {name: '宁波市', value: '330200'},
      {name: '温州市', value: '330300'},
      {name: '绍兴市', value: '330600'},
    ];
  }
  
  // 其他省份模拟延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['a', 'b', 'c', 'd', 'e',].map((name, index) => ({
        name: param.value[0] +'-'+ name+'市',
        value: name.toUpperCase() +'10'+ (index + 1)+ '00'
        })));
    }, 600);
  });
  
}