
const exampleData = [];

for(let i=0; i< 26849 ;i++) {
  exampleData.push({
    code: i + 1,
    name: '奈落' + i,
    sex: i%2,
    age: Math.round(Math.random()*200)
  })
}

// 可分页的数据
exports.getPagiData = function(param = {}){
  const {
    limit,
    page,
    sex,
    age,
  } = param;
  
  let filterData = exampleData;
  
  if(sex !== undefined) {
    filterData = filterData.filter(item => item.sex == sex);
  }
  
  if(age !== undefined) {
    filterData = filterData.filter(item => item.age == age);
  }
  
  if(limit && page) {
    return {
      total: filterData.length,
      data: [].concat(filterData).splice((page -1 ) * limit, limit)};
  }
  
  return filterData;
}