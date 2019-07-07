<template>
  <div class="app-container page">
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>0. 本页说明</span>
        </div>
        <div>
          <p>
                          本页代码 /vue-naraku-demo/vue-admin-template/src/views/naraku/datahub/message.vue
         </p>
        </div>
      </el-card>
    </div>
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>1. register、run、群发消息</span>
        </div>
        <div>
          <p>
            通过注册方法（register）、调用方法（run）实现任意组件间的通信（父子、兄弟）
          </p>
          <p>
            通过事件实现群发消息
          </p>
          <p>
            默认的，组件注册的方法与组件有相同的生命周期
          </p>
          <div>
            <el-row>
              <el-col :span="4">
                <el-checkbox-group v-model="checkList">
                  <template v-for="name in childrenNames">
                    <el-checkbox :label="name"></el-checkbox>
                  </template>
                </el-checkbox-group>
                <el-alert
                  title="收到的消息"
                  type="info"
                  :closable="false"
                  effect="dark">
                  <div>
                    <template v-for="msg in replayMessage">
                      <div>{{msg}}</div>
                    </template>
                  </div>
                </el-alert>
                <el-input
                  style="margin-top: 8px;"
                  v-model="message" 
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  clearable>
                </el-input>
                <div style="margin-top: 8px; height: 16px;">
                  <el-button 
                    @click="sendMessage"
                    style="margin-right: 8px;float: right;" type="primary" round size="mini">发送</el-button>
                </div>
              </el-col>
              <template v-for="name in childrenNames">
                <el-col :span="4">
                  <child :data-hub="dh" callAble :name='name'></child>  
                </el-col>
              </template>
            </el-row>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {DataHub, $Transform, noValue, NumberFormat} from 'naraku';
  import Child from './components/Child.vue';
  
  export default DataHub.inject({
    
  })({
    props: {
      dataHub: {
        type: DataHub,
        default: null
      }
    },
    components: {
      Child
    },
    data(){
     return {
       // 同一个组件有多个实例，通过名字做唯一标识
       childrenNames: ['IE', '360', 'QQ','Firefox', 'Chrome', ],
       checkList: [],
       message: '',
       replayMessage: []
     };
    },
    beforeDestroy() {
      
    },
    created() {

    },
    methods: {
      sendMessage() {
        this.replayMessage = [];
        
        if (this.checkList.length) {
          // 有选中目标则发消息
          this.checkList.forEach(name => {
            this.dhController.run('callChild:' + name, this.message).then((msg) => {
              this.replayMessage.push(name + "：" + msg);
            });
          })
        } else {
          // 没有选中目标则广播消息，通过回调函数接收反馈
          this.dhController.emit('你是谁？', (msg) => {
            this.replayMessage.push(msg);
          });
        }
        this.message = '';
      }
    }
    
  });
  
  
</script>

<style lang="scss" scoped>
  .page{
    
  }
</style>