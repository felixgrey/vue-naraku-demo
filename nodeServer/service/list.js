
const exampleData = [];

for(let i=0; i< 26849 ;i++) {
  exampleData.push({
    code: i + 1,
    name: '奈落' + i,
    sex: i%2,
    age: Math.round(Math.random()*200)
  })
}

exports.getPagiData = function(param = {}){
  const {
    limit,
    page
  } = param;
  
  if(limit && page) {
    return {
      total: exampleData.length,
      data: [].concat(exampleData).splice((page -1 ) * limit, limit)};
  }
  
  return exampleData;
}