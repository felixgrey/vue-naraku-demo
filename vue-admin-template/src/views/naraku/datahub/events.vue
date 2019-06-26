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
          <div class="row-margin">
            <el-alert title="when" type="success" :closable="false">
              <div>
                当<span>全部</span>监听的数据集有数据时，触发回调，之后<span>任意</span>监听的数据集变化都会触发回调
              </div>
            </el-alert>
            <el-switch v-model="listenWhen"></el-switch>
          </div>
          <div class="row-margin">
            <el-alert title="all" type="success" :closable="false">
              <div>
                当<span>全部</span>监听的数据集有数据时，触发回调，之后监听的数据集<span>全部</span>变化才会触发回调
              </div>
            </el-alert>
            <el-switch v-model="listenAll"></el-switch>
          </div>
          <div class="row-margin">
            <el-alert title="on" type="success" :closable="false">
              <div>
                只有在<span>监听后</span>数据发生变化，才触发回调，不支持监听多数据集
              </div>
            </el-alert>
            <el-switch v-model="listenOn"></el-switch>
          </div>
          <div class="row-margin">
            <el-alert title="once" type="success" :closable="false">
              <div>
                只有在监听后数据发生变化，才触发回调，之后<span>不再</span>继续监听，不支持监听多数据集
              </div>
            </el-alert>
            <el-switch v-model="listenOn"></el-switch>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import { DataHub, blank } from 'naraku';

  //习惯了React的类修饰器写法，可以采用如下的语法糖
  export default @DataHub.inject({

  })
  class A extends blank { // 一定要继承blank

    // 定义一个vue属性，把配置信息写在这
    vue = {
      data() {
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