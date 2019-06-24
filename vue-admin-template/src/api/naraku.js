import {DataHub, paramToQuery} from 'naraku';
import request from '@/utils/request';

import apiList from './apiList.js';

/*
这里是配置分页信息的，当pagination为true的时候返回的数据不仅包含了分页数据，也要包含总数据条数
这个配置用来正确的处理数据和页数信息
DataHub.pagination={
  data: 'data',
  total: 'total'
}
*/

function addFetcher(type, url, method = 'get') {
  
  // 在这里添加请求数据的方法
  DataHub.addFetcher(type, (args) => {
    const {
      param, // param是由依赖条件、过滤条件merge而成的参数，通常是请求条件
      data,  // data是提交的数据，通常是提交表单的内容
      pagination, // 是否分页
      form // 是否是form
    } = args;
    
    let submitData = form ? data : param; // 通常情况下，form提交的是数据，其他时候提交的是请求参数
    
    return request({
      url: paramToQuery(url, method ==='post' ? {} : submitData),
      method,
      data: submitData
    }).then(res => res.data);
  });
}

// 如果使用了swagger等工具， apiList可以自动生成
apiList.forEach(({type, url, method = 'get'}) => {
  addFetcher(type, 'http://localhost:7000'+ url, method);
})


