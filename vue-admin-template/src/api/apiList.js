export default [
  {
    action: 'getProvince',
    url:'/api/cascade/getProvince'
  },
  {
    action: 'getCity',
    url:'/api/cascade/getCity'
  },
  {
    action: 'getPagiData',
    url:'/api/list/getPagiData'
  },
  {
    action: 'getSubmitHistory',
    url:'/api/form/getSubmitHistory'
  },
  {
    action: 'save',
    url:'/api/form/save',
    method: 'post'
  },
  {
    action: 'clearHistory',
    url:'/api/form/clearHistory'
  },
]
