<template>
  <!-- // 省市区三级下拉直接绑定值
  // 只要给接口按照 固定形式即可实现 省市区三级选中 浅拷贝或者双向绑定的形式实现-->
  <el-row style="display: flex;justify-content: space-around;">
    <el-col :span="7">
      <el-select :disabled="isDisabled" v-model="Level1" placeholder="请选择">
        <el-option v-for="item in Level1List" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-col>
    <el-col :span="7">
      <el-select :disabled="isDisabled" v-model="Level2" placeholder="请选择">
         <el-option v-for="item in Level2List" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-col>
    <el-col :span="7">
      <el-select :disabled="isDisabled" v-model="Level3" placeholder="请选择">
      <el-option v-for="item in Level3List" :key="item.name" :label="item.name" :value="item.name"></el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
import arr from './config.js'
export default {
  name: "wSelect",
  props: {
    // 数据源
    data: {
       default:()=>[],
      type: Array
    },
    // 绑定的值
    selectValue: {
      default:()=>{
        return {
        }
      },
      type: Object
    },
    // 要绑定的名
    selectName: {
      default:'',
      type: String
    },
    // 默认地址
    defaultAddress:{
      default:()=>{
          return{}
        },
      type:Object
    },
    // 是否禁用
    isDisabled:{
      default:false,
      type:Boolean
    }
  },
  data() {
    return {
      Level1:'',
      Level2:'',
      Level3:'',
      Level1List:'',
      Level2List:'',
      Level3List:'',
    };
  },
  //基本函数
  computed: {
    //计算方法
  },
  watch: {
    //监听方法
    'Level1':function(newVal,oldVal){
      this.Level2List = ''
      this.Level3List = ''
      this.Level1List.map((val)=>{
        if(newVal === val.name){
            this.Level2 = ''
            this.Level3 = ''
            this.Level2List =  val.city
        }
      })
    },
     'Level2':function(newVal,oldVal){
       this.Level3List = ''
       this.Level3 = ''
        this.Level2List.map((val)=>{
        if(newVal === val.name){
           this.Level3List = val.area.map((laber)=>{
            return {name:laber}
          })
        }
      })
    },
     'Level3':function(newVal,oldVal){
       this.selectValue[this.selectName] = this.Level1+'-'+this.Level2+'-'+this.Level3
    }
  },
  methods: {
   yibu(){
     return new Promise(function(resolve,reject){
      //不用Promise用计时器也可以实现 但不会这个函数就拿来练了
      resolve()
     })
    }
  },
   //生命周期方法
  beforeCreate() {
    //创建前状态
    // console.log("创建前状态");
  },
  created() {
    this.Level1List = this.data.length>0?this.data:false || arr
    this.Level1 = this.defaultAddress.Level1
    this.yibu().then((val)=>{
            if(this.defaultAddress.Level1)
            this.Level1List.map((val)=>{
              if(this.defaultAddress.Level1 === val.name){
                    this.Level2List =  val.city
                      if(this.defaultAddress.Level2){
                       this.Level2 = this.defaultAddress.Level2
                        this.Level2List.map((val)=>{
                          if(this.defaultAddress.Level2 === val.name){
                            this.Level3 = this.defaultAddress.Level3
                            this.Level3List = val.area.map((laber)=>{
                              return {name:laber}
                            })
                          }
                        })
                         return Promise.resolve().then(()=>{
                            this.Level3 = this.defaultAddress.Level3
                         });  
                      }
              }
          })
        
    })
  },
  beforeMount() {
    console.log("挂载前状态");
  },
  mounted() {
    console.log("挂载结束状态");
  },
  beforeUpdate() {
    console.log("更新前状态");
  },
  updated() {
    console.log("更新完成状态");
  },
  beforeDestroy() {
    console.log("销毁前状态");
  },
  destroyed() {
    console.log("销毁完成状态");
  }
};
</script>
<style lang="scss" scoped>
::v-deep  .el-select.el-select--medium {
    width: 95%;
    margin-left: 10px;;
}
</style>