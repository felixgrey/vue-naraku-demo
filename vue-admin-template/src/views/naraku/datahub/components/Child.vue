<template>
  <div class="app-container page">
    {{pDh && pDh.first('childData')}}
  </div>
</template>

<script>
  import {DataHub} from 'naraku';
  
  //记录已经存在的name
  const nameMap = {}
  
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
    },
    data(){
     return {      
      code: Date.now(),
      pDh: null //避免警告...
     }
    },
    beforeDestroy() {
      // 销毁的时候删除记录
      nameMap[this.name] = false;
    },
    created() {
      // 本组件以name作为唯一标识，可以为空但不能重复
      if(this.name !== '' && nameMap[this.name]) {
        throw new Error('重复的名字:'+this.name);
        nameMap[this.name] = true;
      }

      if(this.dataHub){
        // 如果从父组件传递了dataHub属性，执行dataHub.bind，会注入dataHub对象并创建Controller实例
        this.dataHub.bind(this);
        //this.pDh即注入的dataHub,pDh的含义是propsDataHub
        console.log(this.pDh)
        console.log(this.pDh === this.dataHub) // true
        
        // 注册一个方法，可以获得code属性，通过name属性做唯一标识
        this.pDhController.register('getCode:'+ name, ()=> this.code);
        
      }
      
      // 因为没有使用DataHub.inject方法，所以没有自己独立的dataHub对象，也没有全局的dataHub对象
      console.log(this.dh) // undefinded
      console.log(this.gDh) // undefinded
    },
  };
  
  
</script>

<style lang="scss" scoped>
  .page{
    
  }
</style>