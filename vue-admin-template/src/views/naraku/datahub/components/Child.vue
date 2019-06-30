<template>
  <div class="app-container child-page row-margin">
     <el-alert
        :title="'我是'+ (name || '子组件')"
        type="error"
        :closable="false"
        effect="dark">
        <div style="margin-top: 4px;">
          <div>
            我的数据：{{pDh && pDh.first(source)}}
          </div>
          <template v-if="callAble" >
               <div>
              我被呼叫的次数：{{callCount}}
            </div>
            <div>
              我被呼叫的信息：
            </div>
            <div style="margin-left: 12px;">
              {{callInfo}}
            </div>
            <div>
              我要回复的信息：<el-input style="margin-top: 4px;" 
                type="textarea"
                v-model="replyInfo" placeholder="请输入内容">             
              </el-input>
            </div>
            <div style="margin-top: 8px; height: 16px;">
              <el-button 
                @click="submit"
                style="margin-right: 8px;float: right;" type="primary" round size="mini">发送</el-button>
            </div>
          </template>
        </div>
      </el-alert>
  </div>
</template>

<script>
  import { DataHub } from 'naraku';

  //记录已经存在的name
  const nameMap = {};

  export default {
    props: {
      dataHub: {
        type: DataHub,
        default: null
      },
      name: {
        type: String,
        default: ''
      },
      source: {
        type: String,
        default: 'childData'
      },
      callAble: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        callCount: 0,
        callInfo: '',
        replyInfo: '',
        replyName: 'child-' + this.name + '-reply',
        pDh: null // 避免警告
      }
    },
    beforeDestroy() {
      // 销毁的时候删除记录
      nameMap[this.name] = false;
      // 删除回复信息
      this.pDh.delete(this.replyName);
    },
    methods: {
      // 表单、过滤条件的提交也可以这么做
      submit() {
        this.pDh && this.pDh.set(this.replyName, this.replyInfo);
        this.replyInfo = '';
      }
    },
    created() {

      // 因为没有使用DataHub.inject方法，所以没有自己独立的dataHub对象，也没有全局的dataHub对象
      // console.log(this.dh) // undefinded
      // console.log(this.gDh) // undefinded

      // 本组件以name作为唯一标识，可以为空但不能重复
      if(this.name !== '' && nameMap[this.name]) {
        throw new Error('重复的名字:' + this.name);
        nameMap[this.name] = true;
      }

      if(this.dataHub) {
        // 如果从父组件传递了dataHub属性，执行dataHub.bind，会注入dataHub对象并创建Controller实例
        this.dataHub.bind(this);

        // this.pDh即注入的dataHub,pDh的含义是propsDataHub
        // console.log(this.pDh);
        // console.log(this.pDh === this.dataHub); // true
        
        // 组件通信（常用）：注册一个方法，通过name属性做唯一标识
        this.pDhController.register('callChild:' + this.name, (callInfo = '') => {
          this.callCount++;
          this.callInfo = callInfo;
          this.replyInfo = '';
          
          // 如果没回复之前的信息，不再等待回复提交
          this.offOnce && this.offOnce();

          return new Promise((resolve) => {
            // 这里也可以用vue的watch实现，DataHub内置支持一次性监听，使用更方便
            this.offOnce = this.pDhController.once(this.replyName, ([data]) => resolve(data));
          });
        });

        // 广播通信（不常用）：注册一个事件
        this.pDhController.on('你是谁？', (callback) => {
          this.callCount++;
          this.callInfo = '你是谁？';
          this.replyInfo = '';

          // 如果参数是回调函数，则回复信息
          if (typeof callback === 'function') {
            if(/ie/ig.test(this.name)) {
              // IE长延迟回复 @_@！
              setTimeout(() => {
                callback( '我是' + this.name)
              }, 2000);
            } else {
              setTimeout(() => {
                callback('我是' + this.name)
              }, 200);
            }
          }
        });
      }
    },
  };
</script>

<style lang="scss" scoped>
  .child-page {
    width: 240px;
    line-height: 16px;
  }
</style>