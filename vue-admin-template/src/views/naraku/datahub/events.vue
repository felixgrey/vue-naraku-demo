<template>
  <div>
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>0. 本页说明</span>
        </div>
        <div>
          <p>
            本页代码：(/vue-naraku-demo/vue-admin-template/src/views/naraku/datahub/events.vue)
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
  </div>
</template>

<script>
  import { DataHub, Blank } from 'naraku';
  import Child from './components/Child.vue';

  //习惯了React的类修饰器写法，可以采用如下的语法糖，看起来更整齐
  export default @DataHub.inject({
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
      },
      data() {
        return {
          listenWhen: false,
          listenAll: false,
          listenOn: false,
          listenOnce: false,
          
          changeCount: 0,
          whenValue: '--',
          allValue: '--',
          onValue: '--',
          onceValue: '--',
        }
      },
      methods: {
        deleteData(){
          this.changeCount = 0;
          this.whenValue = '--';
          this.allValue = '--';
          this.onValue = '--';
          this.onceValue = '--';
          this.dh.delete('testData1');
          this.dh.delete('testData2');
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