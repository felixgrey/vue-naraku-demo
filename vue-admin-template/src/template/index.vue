<template>
  <div class="app-container page">
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>1. title</span>
        </div>
        <div>
          <p>
            
          </p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {DataHub, $Transform, noValue, NumberFormat} from 'naraku';
  
  export default DataHub.inject({
    
  })({
    props: {
      dataHub: {
        type: DataHub,
        default: null
      }
    },
    data(){
     return {}; 
    },
    beforeDestroy() {
      
    },
    created() {
      
    },
    methods: {
      formatPercent(num, extend){ // 百分数
        return NumberFormat.percent(num, extend)
      },
      formatThsepar(num, extend){ // 添加千位分隔符
        return NumberFormat.thsepar(num, extend);
      },
    }
    
  });
  
  
</script>

<style lang="scss" scoped>
  .page{
    
  }
</style>