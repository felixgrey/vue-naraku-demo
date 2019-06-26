<template>
  <div>
    <div class="row-margin">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>1. 各种监听方式对比</span>
        </div>
        <div>  
          <p>
                            只要有数据，无论什么时候监听，都能得到数据
          </p>
          <el-button>清空值</el-button>
          <el-button>触发值变化</el-button>
          <div>
            <el-alert
              title="用when监听，当全部监听的数据集有数据时，触发回调，之后任意监听的数据集变化都会触发回调"
              type="success">
            </el-alert>
            <el-switch v-model="listenWhen"></el-switch>
          </div>
          <div>
            <el-alert
              title="用load监听，只要有数据，即触发回调，并且只触发一次，load不支持监听多数据集"
              type="success">
            </el-alert>
            <el-switch v-model="listenLoad"></el-switch>
          </div>
          <div>
            <el-alert
              title="用all监听，当全部监听的数据集有数据时，触发回调，之后监听的数据集全部变化才会触发回调"
              type="success">
            </el-alert>
            <el-switch v-model="listenAll"></el-switch>
          </div>
          <div>
            <el-alert
              title="用on监听，只有在监听后数据发生变化，才触发回调，不支持监听多数据集"
              type="success">
            </el-alert>
            <el-switch v-model="listenOn"></el-switch>
          </div>
          <div>
            <el-alert
              title="用once监听，只有在监听后数据发生变化，才触发回调，之后不再继续监听"
              type="success">
            </el-alert>
            <el-switch v-model="listenOn"></el-switch>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {DataHub, blank} from 'naraku';
  
  //习惯了React的类修饰器写法，可以采用如下的语法糖
  export default @DataHub.inject({
    
  })
  class A extends blank {
    
    // 定义一个vue属性，把配置信息写在这
    vue={
      data(){
        return {
          listenWhen: true,
          listenLoad: true,
          listenAll: true,
          listenOn: true,
          listenOnce: true,
        }
      }
    }
    
  };
  
</script>

<style>
</style>