<template>
  <div>
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>0. 本页说明</span>
        </div>
        <div>
          <p>
            本页代码：/vue-naraku-demo/vue-admin-template/src/views/naraku/datahub/events.vue
          </p>
          <p>
            本页采用了声明语法糖
          </p>
        </div>
      </el-card>
    </div>
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>1. 各种监听方式对比</span>
        </div>
        <div>
          <p>
            when最常用，用于监听数据变化
          <p>
                             当某个状态的变化引发多个数据集变化，而这些数据集共同决定某项业务操作时用all
          </p>
          <p>
            on通常用于监听事件，once一次性监听事件
          </p>
          <el-button @click="deleteData">删除值</el-button>
          <el-button @click="changeData1">testData1变化</el-button>
          <el-button @click="changeData2">testData2变化</el-button>
          <p>
            当前testData1 = {{dh.first('testData1')}}, testData2 = {{dh.first('testData2')}}
          </p>
          <div class="row-margin">
            <el-alert title="when [testData1,testData2]" type="success" :closable="false">
              <div>
                当<span class="warn-text">全部</span>监听的数据集有数据时，触发回调， 之后<span class="warn-text">任意</span>监听的数据集变化都会触发回调
              </div>
            </el-alert>
            <div class="row-margin-top">
              <el-switch active-text="监听" inactive-text="取消" v-model="listenWhen"></el-switch>
              <span class="show-value">值：{{whenValue}}</span>
            </div>
          </div>
          <div class="row-margin">
            <el-alert title="all [testData1,testData2]" type="success" :closable="false">
              <div>
                当<span class="warn-text">全部</span>监听的数据集有数据时，触发回调， 之后监听的数据集<span class="warn-text">全部</span>变化才会触发回调
              </div>
            </el-alert>
            <div class="row-margin-top">
              <el-switch active-text="监听" inactive-text="取消" v-model="listenAll"></el-switch>
              <span class="show-value">值：{{allValue}}</span>
            </div> 
          </div>
          <div class="row-margin">
            <el-alert title="on testData1" type="success" :closable="false">
              <div>
                只有在<span class="warn-text">监听后</span>数据发生变化，才触发回调，<span class="warn-text">不支持</span>监听多数据集
              </div>
            </el-alert>
            <div class="row-margin-top">
              <el-switch active-text="监听" inactive-text="取消" v-model="listenOn"></el-switch>
              <span class="show-value">值：{{onValue}}</span>
            </div>
          </div>
          <div class="row-margin">
            <el-alert title="once testData1" type="success" :closable="false">
              <div>
                只有在<span class="warn-text">监听后</span>数据发生变化，才触发回调， 之后<span class="warn-text">不再</span>继续监听，不支持监听多数据集
              </div>
            </el-alert>
            <div class="row-margin-top">
              <el-switch active-text="监听" inactive-text="取消" v-model="listenOnce"></el-switch>
              <span class="show-value">值：{{onceValue}}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>2. set、status、emit</span>
        </div>
        <div>
          <p style="line-height: 24px;">
            set数据时会触发几个事件：<br/>
            1. $dataChange事件，同时触发同名事件<br/>
            2. 如果status发生变化，会触发$statusChange事件，同时触发$statusChange:XXX（名称）事件<br/>
            3. 状态包括：undefined、loading、locked、set、error<br/>
            4. delete操作也会触发相关事件（delete方法与js操作符冲突，vue模板编译失败，提供别名deleteData）<br/>
            5. 可以通过emit方法手动触发事件，自定义的事件名称不要和数据集名称相同，以免冲突。
          </p>
          <div>
            <p>
              示例：监听someData数据集的$dataChange、someData、$statusChange、$statusChange:set、customEvent事件
            </p>
            <el-switch active-text="监听" inactive-text="取消" v-model="listenData"></el-switch>
            <el-button style="margin-left: 16px;" @click="() => dh.deleteData('someData')">dh.deleteData('someData')</el-button>
            <el-button @click="() => dh.set('someData',{})">dh.set('someData',{})</el-button>
            <el-button @click="() => dh.emit('customEvent',{})">dh.emit('customEvent',{})</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>3. fetch</span>
        </div>
        <div>
          <p>
            fetch方法绕过了DataHub数据集定义，直接获取数据，一般用于获取某条数据详情信息或临时数据等不适合定义数据集的场景
          </p>
          <el-button @click="getCity">getCity</el-button>
        </div>
      </el-card>
    </div>
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>4. submit、refresh</span>
        </div>
        <div>
          <p>
            submit用于提交表单，同时提供锁定数据、刷新数据功能
          </p>
          <p>
            提交历史：<el-button  @click="clearHistory">清空历史</el-button>
            <pre>
              <code>
{{JSON.stringify(dh.get('submitHistory'), null, 2)}}
              </code>
            </pre>
          </p>
          <p>
            childData状态： {{dh.status('childData')}}
          </p>
          <el-card class="box-card" style="width: 300px;">
            <el-form 
                v-loading="dh.loading('form')"
               :model="formData" label-width="80px">
              <el-form-item label="用户名称">
                 <el-input v-model="formData.name"></el-input>
              </el-form-item>
              <el-form-item label="用户名称">
                 <el-input v-model="formData.password"></el-input>
              </el-form-item>
              <el-switch active-text="数据集" inactive-text="单条数据" v-model="submitList"></el-switch>
               <el-button type="primary" @click="submitForm">提交</el-button>
            </el-form>
          </el-card>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { DataHub, Blank } from 'naraku';
  import Child from './components/Child.vue';
  import { Message } from 'element-ui';

  //习惯了React的类修饰器写法，可以采用如下的语法糖，看起来更整齐
  export default @DataHub.inject({
    // 获取提交历史
    submitHistory: {
      action: 'getSubmitHistory'
    },
    // 用来提交的数据集
    form: {
      // form = true的时候不会自动请求action
      action: 'save',
      // 设置属性form = true，表示是用来提交的
      form: true,
      // 小技巧：提交的参数可以通过定义依赖/过滤的方式配置
      filter: 'formConfig'
    },
    clearHistory:{
      action: 'clearHistory',
    },
    // 提交配置
    formConfig:{
      default: {list: false}
    },
    // 传递给子组件的数据
    childData: {
      default: [{
        count: 0
      }]
    }
  })
  class extends Blank { // 必须继承Blank

    // 定义一个vue属性，把配置信息写在这
    vue = {
      components: {Child},
      watch: {
        submitList: function(list){
          this.dh.set('formConfig',{list})
        },
        listenWhen: function(flag){
          if (flag) {
            this.whenOn();
          } else {
            this.whenOff();
          }
        },
        listenAll: function(flag){
          if (flag) {
            this.allOn();
          } else {
            this.allOff();
          }
        },
        listenOn: function(flag){
          if (flag) {
            this.onOn();
          } else {
            this.onOff();
          }
        },
        listenOnce: function(flag){
          if (flag) {
            this.onceOn();
          } else {
            this.onceOff();
          }
        },
        listenData: function(flag){
          if (flag) {
            this.dataChangeOn();
          } else {
            this.dataChangeOff();
          }
        },
      },
      data() {
        return {
          listenWhen: false,
          listenAll: false,
          listenOn: false,
          listenOnce: false,
          listenData: false,
          submitList: false,
          
          changeCount: 0,
          whenValue: '--',
          allValue: '--',
          onValue: '--',
          onceValue: '--',
          offList: [],
          
          eventList: [
          '$dataChange', 'someData', 'customEvent',
          '$statusChange', '$statusChange:someData',
          '$delete:someData',
          ],
          
          formData: {name: 'admin', password: '123456'}
        }
      },
      created(){

      },
      methods: {
        submitForm(){
          // 提交form数据集
          this.dh.submit('form', {
            // 要提交的数据，会自动打包成数组
            data: this.formData,
            // 在提交过程中，需要锁定的数据集，通常是查询条件
            lock: 'childData',
            // 提交成功后，需要刷新的数据，通常是数据列表
            refresh: 'submitHistory'
          }).then((data) => {
            // 提交成功后返回的数据
            Message({
              message: JSON.stringify(data, null, 2),
              type: 'info',
              duration: 5 * 1000
            });
          })
        },
        clearHistory(){
          this.dh.submit('clearHistory').then(()=>{
            // 也可以这样手动刷新
            this.dh.refresh('submitHistory');
          });
        },
        getCity(){
          this.dhController.fetch('getCity', {value: 210000}).then(data => {
            Message({
                message: JSON.stringify(data, null, 2),
                type: 'info',
                duration: 5 * 1000
              });
          })
        },
        deleteData(){
          this.changeCount = 0;
          this.whenValue = '--';
          this.allValue = '--';
          this.onValue = '--';
          this.onceValue = '--';
          this.dh.delete('testData1');
          this.dh.delete('testData2');
        },
        
        dataChangeOn(){
          let msgIndex = 0;
        
          this.eventList.forEach((name) => {
            let off = this.dhController.on(name, () => {
              // 因为Message一次只能弹出一个，而事件是同时触发的，这里加上计数器和延时，分别弹出
              setTimeout(() => {
                Message({
                  message: `触发${name}事件`,
                  type: 'info',
                  duration: 5 * 1000
                });
                msgIndex --;
              }, 100 * (msgIndex++));
              
              console.log(`触发${name}事件`);
            });
            
            this.offList.push(off);
          });
        },
        
        dataChangeOff() {
          this.offList.forEach(off => off());
          this.offList = [];
        },
        
        whenOn(){
          // this.offWhen是解除监听方法
          this.offWhen = this.dhController.when(['testData1', 'testData2'],(data)=>{
            this.whenValue = data;
          })
        },
        whenOff(){
          this.offWhen && this.offWhen();
          this.offWhen = null;
        },
        
        allOn(){
          this.offAll = this.dhController.all(['testData1', 'testData2'],(data)=>{
            this.allValue = data;
          })
        },
        allOff(){
          this.offAll && this.offAll();
          this.offAll = null;
        },
        
        onOn(){
          this.offOn = this.dhController.on('testData1', (data)=>{
            this.onValue = data;
          })
        },
        onOff(){
          this.offOn && this.offOn();
          this.offOn = null;
        },
        
        onceOn(){
          this.offOnce = this.dhController.once('testData1',(data)=>{
            this.onceValue = data;
          })
        },
        onceOff(){
          this.offOnce && this.offOnce();
          this.offOnce = null;
        },
        
        changeData1(){
          this.changeCount++;
          this.dh.set('testData1',{count1: this.changeCount});
        },
        changeData2(){
          this.changeCount++;
          this.dh.set('testData2',{count2: this.changeCount});
        },
      }
    }

  };
</script>

<style lang="scss" scoped>
  .warn-text {
    font-weight: 900;
    color: #e6a23c;
  }
  .show-value{
    font-weight: 900;
    margin-left: 12px;
    color: #f56c6c;
  }
</style>