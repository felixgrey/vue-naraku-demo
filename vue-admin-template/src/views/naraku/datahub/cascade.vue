<template>
  <div class="app-container page">
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>0. 本页说明</span>
        </div>
        <div>
          <p>
                          本页代码 /vue-naraku-demo/vue-admin-template/src/views/naraku/datahub/cascade.vue
         </p>
        </div>
      </el-card>
    </div>
    <div class="row-margin">
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
        </div>
      </el-card>
    </div>
    <div class="row-margin">
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
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>3. 省市区数据联动示例</span>
        </div>
        <div >
          <p>DataHub最常见用法就是数据联动，这里以省市数据联动为例，当选择A、B、C省时，可以明显看到loading效果。</p>
          <p>通过DataHub组件，可以方便的实现任意组件任意层级之间的联动，只需简单的添加几行声明语句即可。</p>
          <p>当选中的省份清空时，由于不满足依赖条件，城市列表也清空。</p>
          <p>当子层级检索数据时，父层级的值处于锁定状态，值不可修改</p>
          <p>在很多情况下，select不使用v-model指令，而是使用:value直接绑定到DataHub数据集更方便。</p>
          <div>
            <el-select  
              clearable
              :disabled="dh.status('selectedProvince') === 'locked'"
              v-loading="dh.loading('province')"
              :value="dh.first('selectedProvince').value"  
              @change="value => {value ? dh.set('selectedProvince', {value}) : dh.set('selectedProvince',[]) }" 
              placeholder="请选择">
              <el-option
                v-for="item in dh.get('province')"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            <el-select 
              v-loading="dh.loading('city')"
              :value="dh.first('selectedCity').value"  
              @change="value => dh.set('selectedCity', {value})" placeholder="请选择">
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
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>4. 分页和过滤</span>
        </div>
        <div >
          <p>DataHub内置分页管理，只需声明pagination = true，并设置初始的分页信息即可。</p>
          <p>过滤和依赖的声明类似，最终都会以查询参数的形式提交到服务端。</p>
          <p>根本区别在于依赖是强制的，当依赖条件不满足时，数据集清空，过滤是可选的，为空时不做过滤，正常查询。   </p>
          <p>过滤条件通过可以通过dataHub.assign0方法快速和已有数据的第一条merge。</p>
          <p>本例当触发change事件时直接执行了set方法，所以立即执行请求，也可以将过滤条件保存在本地，当点击查询按钮时执行set。</p>
          <p>
            使用默认配置时，不需要手动设定pagination数据集
            <pre>
              <code>
    DataHub.pagination = {
      data: 'data', // 当启动分页时，保存数据信息的字段
      total: 'total' // 当启动分页时，保存数据总数的字段
    };
    
    DataHub.paginationData = {
      page: 1, // 第一页
      limit: 10, //每页10条
      total: 0, //数据总数0
    }
              </code>
            </pre>
          </p>
          <div>性别
            <el-select  
              v-loading="dh.loading('sexList')"
              :value="dh.first('selectedSex').sex"  
              @change="sex => dh.set('selectedSex', {sex})" placeholder="请选择">
              <el-option
                v-for="item in dh.get('sexList')"
                :key="item.value"
                :label="item.name"
                :value="item.value">
              </el-option>
            </el-select>
            年龄
            <span>
              <el-input 
                v-model="dh.first('selectedAge').age"
                @change="age => dh.set('selectedAge', {age})"
                placeholder="请输入内容"></el-input>
            </span>
          </div>
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
              layout="total, sizes, prev, pager, next, jumper"             
              @size-change="limit => dh.assign0('pagiListPagination', {limit})"
              @current-change="page => dh.assign0('pagiListPagination',{page})"
              :current-page="dh.first('pagiListPagination').page"
              :page-sizes="[5, 10, 20, 50]"
              :page-size="dh.first('pagiListPagination').limit"
              :total="dh.first('pagiListPagination').total">
            </el-pagination>
          </div>
        </div>
      </el-card>
    </div>
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>5. 全局联动、link</span>
        </div>
        <div >
          <p>头部（/vue-naraku-demo/vue-admin-template/src/layout/components/Navbar.vue）定义了一个选择省份的组件.</p>
          <p>这个组件的值是保存在全局的DataHub里，因此任何页面任何组件都可以访问。</p>
          <p>在很多场景下，用DataHub可以代替Vuex、Redux管理全局状态。</p>    
          <p>link方法可以用来同步全局DataHub的数据</p>
          头部选中值：{{gDh.first('currentProvince')}}同步值：{{dh.first('currentProvince')}}
        </div>
      </el-card>
    </div>
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>6. 传递给子组件</span>
        </div>
        <div >
          <p>
                           自己的DataHub实例可以作为页面级（或当前组件级）上下文传递给子组件（/vue-naraku-demo/vue-admin-template/src/views/naraku/datahub/components/Child.vue）            
          </p>
          <div style="margin-left: 24px;">
            <el-input 
              v-model="dh.first('childData').value"
              @change="value => dh.set('selectedAge', {value})"
              placeholder="请输入内容"></el-input>
          </div> 
          <child :data-hub="dh"></child>  
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {DataHub} from 'naraku';
  
  import Child from './components/Child.vue';
  
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
    // 选中的城市
    selectedCity: {
      // 当城市列表发生变化时，清空选中的城市
      clear: 'city',
    },
    // 带分页的数据
    pagiList:{
      action: 'getPagiData',
      // 检索用的过滤条件，支持多个过滤条件，依赖也一样可用多个。
      filter: ['selectedSex', 'selectedAge'], 
      pagination: true, // 设置为分页数据，会自动创建分页数据集，名称为XXXPagination
    },
    selectedAge:{
      default:{}
    },
    // 自动创建的分页数据集
//  pagiListPagination: {
//    // default是默认的初始数据
//    default : {
//      page: 1, // 默认第一页
//      limit: 5 // 默认每页条数
//    }
//  },
    // 性别列表，作为静态数据
    sexList:{
      default: [
        {
          value: 0,
          name: '女'
        },
        {
          value: 1,
          name: '男'
        },
        {
          value: null,
          name: '不限'
        }
      ]
    },
    // 传递给子组件的数据
    childData: {
      default: [{
        value: 123456
      }]
    }
  })({
    components: {
      Child
    },
    created(){
      // link数据
      this.dhController.link('currentProvince', this.gDh);
    }
  });
  
</script>

<style lang="scss" scoped>
  .page{
    margin-top: 12px;
  }
</style>