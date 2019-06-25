<template>
  <div class="app-container page">
    <div class="row-margin-top">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>1. 请求接口</span>
        </div>
        <div >
          <p>
                        在本项目中，所有接口定义都保存在/vue-naraku-demo/vue-admin-template/src/api/apiList.js文件中。
                       如果使用了swagger等工具， apiList可以自动生成。
         </p>
          <p>
                    在本项目中，请求接口在/vue-naraku-demo/vue-admin-template/src/api/naraku.js做统一管理。
                    一般情况下，通过自动生成的接口文件即可满足需求，无需额外配置。
          </p>
          
         <p>
           在本项目中，/vue-naraku-demo/nodeServer是一个很简单的node服务器，控制台下进入目录，输入node server即可启动(需先进行 npm install)。
         </p>
         <p>
           具体应用案例参考本页代码 /vue-naraku-demo/vue-admin-template/src/views/naraku/datahub/cascade.vue
         </p>
                      
        </div>
      </el-card>
    </div>
    <div class="row-margin-top">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>2. 创建实例</span>
        </div>
        <div >
          <p>
            在Vue 2.x中,使用如下代码创建实例
            <pre>
              <code>
  import {DataHub} from 'naraku';
  DataHub.inject({
    /* dataHub 定义内容*/  
  })({
    /* Vue 组件定义内容*/  
  })                      
            </code>
            </pre>
          </p>
        </div>
      </el-card>
    </div>
    <div class="row-margin-top">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>3. 省市区数据联动示例</span>
        </div>
        <div >
          <p>
            DataHub最常见用法就是数据联动，这里以省市数据联动为例，当选择A、B、C省时，可以明显看到loading效果。<br/>
                              通过DataHub组件，可以方便的实现任意组件任意层级之间的联动，只需简单的添加几行声明语句即可。
          </p>
          <div>
            <el-select  
              v-loading="dh.loading('province')"
              v-model="selectedProvince"  
              @change="(value) => dh.set('selectedProvince', {value})" placeholder="请选择">
              <el-option
                v-for="item in dh.get('province')"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select 
              v-loading="dh.loading('city')"
              v-model="selectedCity" 
              @change="(value) => dh.set('selectedCity', {value})" placeholder="请选择">
              <el-option
                v-for="item in dh.get('city')"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>     
          </div>       
        </div>
      </el-card>
    </div>
    <div class="row-margin-top">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>4. 分页</span>
        </div>
        <div >
          <p>
            DataHub内置分页管理，只需声明pagination = true，并设置初始的分页信息即可。
          </p>
           <el-table
            size="mini"
            :data="dh.get('pagiList')"
            style="width: 100%">
            <el-table-column prop="code" label="代码"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
            <el-table-column prop="sex" label="性别">
              <template slot-scope="{row}">
                {{row.sex ? '男' : '女'}}
              </template>
            </el-table-column>
            <el-table-column prop="age" label="年龄"></el-table-column>
          </el-table>  
          <div class="row-margin-top" style="height: 40px;">
            <el-pagination
              style="float: right;"
              @size-change="(limit) => dh.assign0('pagiListPagination', {limit})"
              @current-change="(page) => dh.assign0('pagiListPagination',{page})"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 50]"
              :page-size="dh.first('pagiListPagination').limit"
              layout="total, sizes, prev, pager, next, jumper"
              :total="dh.first('pagiListPagination').total">
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {DataHub} from 'naraku';
  import '@/styles/markdown.css';
  
  export default DataHub.inject({
    // 获取省份列表
    province: { // 数据集名称 province
      action: 'getProvince'
    },
    // 根据选中的省份，获取城市列表
    city: {
      action: 'getCity',
      dependence: 'selectedProvince' // 依赖选中的省，可以用数据表示多重依赖
    },
    // 分页数据
    pagiList:{
      action: 'getPagiData',
      pagination: true, // 设置为分页数据，会自动创建分页数据集，名称为XXXPagination
    },
    // 自动创建的分页数据集
    pagiListPagination: {
      // default是默认的初始数据
      default : {
        page: 1, // 默认第一页
        limit: 5 // 默认每页条数
      }
    }
  })({
    props: {
    },
    data() {
     return {
       selectedProvince: null,
       selectedCity: null,
       currentPage: 1
     };
    },
    created() {
      
    },
    methods: {
    }
    
  });
  
  
</script>

<style lang="scss" scoped>
  .page{
    margin-top: 12px;

  }
</style>