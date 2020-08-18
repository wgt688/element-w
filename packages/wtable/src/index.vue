<template>
    <div> 
    <el-table
        :data="tabDatas"
        :height="tabHeights" 
        :border="borders"
        :stripe="stripes"
        @row-click="Getrow"
        ref="multipleTable"
        v-loading="loadings"
        style="width: 100%;">

        <el-table-column  type="selection" width="55" v-if="!isSelecteds" />
        <el-table-column  v-for="(item,index) in tabths"
        :prop="item.prop"
        :label="item.laber"
        :width="item.width"
        >
          <template slot-scope="scope">
            <div v-if="scope.row[item.prop].constructor==Object">
                <div v-if="!scope.row[item.prop].type">
                    <el-tag :type="scope.row[item.prop].typeColor">{{scope.row[item.prop].columnValue}}</el-tag>
                </div>
                <div v-else-if="scope.row[item.prop].type==1">
                   <el-tag :type="scope.row[item.prop].typeColor">{{scope.row[item.prop].showValue}}</el-tag>
                </div>
                <div v-else-if="scope.row[item.prop].type==2">
                    <span :style="{color:scope.row[item.prop].typeColor}">{{scope.row[item.prop].columnValue}}</span>
                </div>
                <div v-else-if="scope.row[item.prop].type==3">
                    <el-input-number v-model="scope.row[item.prop].columnValue" controls-position="right" @change="scope.row[item.prop].functionName(getTabZero(scope.row))" :min="scope.row[item.prop].size.min" :max="scope.row[item.prop].size.max"></el-input-number>
                </div>
                 <div v-else-if="scope.row[item.prop].type==4">
                    <el-switch v-model="scope.row[item.prop].columnValue" @change="scope.row[item.prop].functionName(getTabZero(scope.row))" :active-text="scope.row[item.prop].letTitle" :inactive-text="scope.row[item.prop].rigTitle"></el-switch>
                </div>
                 <div v-else-if="scope.row[item.prop].type==5">
                    <viewer>
                        <img style="width: 40px;height:40px;" :src="scope.row[item.prop].columnValue">
                    </viewer>       
                </div>
                <div style="cursor: pointer;" @click="scope.row[item.prop].columnValue = !scope.row[item.prop].columnValue,scope.row[item.prop].functionName(getTabZero(scope.row))" v-else-if="scope.row[item.prop].type==6"> 
                    <el-tag :type="scope.row[item.prop].style1.style" v-if="scope.row[item.prop].columnValue">{{scope.row[item.prop].style1.title}}</el-tag>
                    <el-tag :type="scope.row[item.prop].style2.style" v-else>{{scope.row[item.prop].style2.title}}</el-tag>
                </div>
              </div>
            <div v-else>
                <span>{{scope.row[item.prop]}}</span>
            </div>
          </template>
        </el-table-column>

      <!-- 因为每条数据都要判断按钮太冗余了 这里如果开启则全部开启 如果不使用则全部不使用 -->
      <el-table-column
        label="操作"
        :width="btnColumnWidths" 
        v-if="btns.length>0"
        fixed="right">
        <template slot-scope="scope">
           <!-- 该数据有没有 -->
          <div class="btn">
            <!-- for -->
            <template v-for="(item,index) in btns" >
                <!-- 第一层判断是否开启了权限 -->
                <template v-if="item.columnNames">

                  <template v-if="scope.row[btns[index].columnNames].constructor==Object">
                              <!-- 判断使用了那种规则 -->
                                <template v-if="item.pattern">  <!-- 第一种规则 禁用-->
                                  <template v-if="item.status.includes(scope.row[item.columnNames].columnValue)">
                                    <el-button
                                      @click.native.prevent="item.functionName!=null?item.functionName(getTabZero(scope.row)):''"
                                      :type="item.type"
                                      :disabled="true"
                                      style="flex-grow: 1;margin-right: 10px;"
                                      :size="item.size">
                                      {{item.title}}
                                      </el-button>
                                  </template>
                                  <template v-else>
                                      <el-button
                                      @click.native.prevent="item.functionName!=null?item.functionName(getTabZero(scope.row)):''"
                                      :type="item.type"
                                      style="flex-grow: 1;margin-right: 10px;"
                                      :size="item.size">
                                      {{item.title}}
                                      </el-button>
                                  </template>   
                                </template>
                                <template v-else>  <!-- 第二种规则 隐藏-->
                                  <template v-if="item.status.includes(scope.row[item.columnNames].columnValue)">
                                  </template>
                                  <template v-else>
                                      <el-button
                                      @click.native.prevent="item.functionName!=null?item.functionName(getTabZero(scope.row)):''"
                                      :type="item.type"
                                      style="flex-grow: 1;margin-right: 10px;"
                                      :size="item.size">
                                      {{item.title}}
                                      </el-button>
                                  </template>   
                                </template>
                                 <!-- 判断使用了那种规则 -->
                  </template>

                  <template v-else>
                          <!-- 判断使用了那种规则 -->
                            <template v-if="item.pattern">  <!-- 第一种规则 禁用-->
                              <template v-if="item.status.includes(scope.row[item.columnNames])">
                                <el-button
                                  @click.native.prevent="item.functionName!=null?item.functionName(getTabZero(scope.row)):''"
                                  :type="item.type"
                                  :disabled="true"
                                  style="flex-grow: 1;margin-right: 10px;"
                                  :size="item.size">
                                  {{item.title}}
                                  </el-button>
                              </template>
                              <template v-else>
                                  <el-button
                                  @click.native.prevent="item.functionName!=null?item.functionName(getTabZero(scope.row)):''"
                                  :type="item.type"
                                  style="flex-grow: 1;margin-right: 10px;"
                                  :size="item.size">
                                  {{item.title}}
                                  </el-button>
                              </template>   
                            </template>
                            <template v-else>  <!-- 第二种规则 隐藏-->
                              <template v-if="item.status.includes(scope.row[item.columnNames])">
                              </template>
                              <template v-else>
                                  <el-button
                                  @click.native.prevent="item.functionName!=null?item.functionName(getTabZero(scope.row)):''"
                                  :type="item.type"
                                  style="flex-grow: 1;margin-right: 10px;"
                                  :size="item.size">
                                  {{item.title}}
                                  </el-button>
                              </template>   
                            </template>
                    <!-- 判断使用了那种规则 -->
                  </template>

                </template>

                 <template v-else>
                      <el-button
                                @click.native.prevent="item.functionName!=null?item.functionName(getTabZero(scope.row)):''"
                                :type="item.type"
                                style="flex-grow: 1;margin-right: 10px;"
                                :size="item.size">
                                {{item.title}}
                      </el-button>
                 </template>
                <!-- 第一层判断是否开启了权限 -->
             
            </template>
            <!-- for -->
          </div>
        </template>
        </el-table-column>

   </el-table>

    <!-- $parent[selectedOperation.functionName] 本来是通过拿父级来获取方法 无故失效了 -->
   <div class="pages">
      <div style="width: 50%;display: flex;">
        <el-button v-for="(items,indexs) in selectedOperations" v-if="!isSelecteds" :size="items.size"  @click.native.prevent="items.functionName!=null?items.functionName(getTabZero($refs.multipleTable.selection)):''" :type="items.type" style="margin-right: 10px;">{{items.title}}</el-button>
        <el-tag v-for="(item,index) in pageCtronls.tag" :closable="false" :type="item.type" style="width: auto;padding: 0p 10px 0px 10px;margin-right: 10px;">
        <span>{{item.laber}}{{item.val}}{{item.laberTail}}</span>
      </el-tag>
    </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageCtronls.total"
        :current-page.sync="pageCtronls.currentPage"
        :page-size="pageCtronls.pageLimit"
        @current-change="pageCtronls.functionName"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "wTable",
    props: {
    //自动化处理 绑定值 会损耗一定的速度
    auto:{
      default:{},
      type:Object
    },
    getRow:{
      default:null,
      type:Function
    },
    //表头
    tabth: {
      default: ()=>[
          {laber:'姓名',prop:'name',width:''},
          {laber:'日期',prop:'date',width:''},
          {laber:'地址',prop:'address',width:''},
      ],
      type: Array
    },
    // 加载中
    loading:{
      default:false,
      type:Boolean
    },
    // Table高度
    tabHeight:{
        default:'500',
        type:String
    },
    // Table数据源  只改变颜色就改为对象形式 加标签就改成数组形式
    // 更新思路 这个是组件页不处理逻辑 逻辑放在主页面拿到数据源 写一个方法数组[{字段名：status,判断条件:1,颜色：红色},{字段名：status,判断条件:2,颜色：蓝色}] 这种形式进行判断
    // 第二种损耗时间应该会比第一种多 因为第一种边遍历边判断 第二种是遍历两次
    getInitData:{
      default:true,
      type:Boolean
    },
    tabData:{
        default: ()=>[
          {//配色方案 默认 default(蓝),success(绿),info(灰),warning(黄),danger(红)
          date: '2016-05-03',
          name:   {type:0,columnValue:'王小虎',typeColor:'red'},          //假为颜色
          address:{type:1,columnValue:'山东省临沂市',typeColor:'warning'} //真为标签
        },{
          date: '2016-05-03',
          name:    {type:0,columnValue:'王小虎',typeColor:'red'},
          address: {type:1,columnValue:'山东省临沂市',typeColor:'warning'}
        },{
          date: '2016-05-03',
          name:   {type:0,columnValue:'王小虎',typeColor:'red'},
          address:{type:1,columnValue:'山东省临沂市',typeColor:'warning'}
        }
        ],
        type: Array
    },
    // 规则
    // rules:{
    //  default: ()=>[],
    //  type: Array
    // },
    // 是否隐藏单选框
    isSelected:{
         default:true,
         type:Boolean
    },
    // 单选框操作
      selectedOperation: { 
      default:()=>[
          { title:'全部删除',type:'danger', size:'mini',functionName:'SelectedOperation'},
          { title:'全部删除',type:'danger', size:'mini',functionName:'SelectedOperation'},
      ],
      type: Array
    },
    // 操作栏宽度
    btnColumnWidth:{
        default:'200',
        type:String
    },
    //title->按钮标题、functionName->按钮方法、type->按钮样式、size->按钮大小、columnNames->那行列加权限、status->根据status数组内的值决定显示、pattern ->[true: 禁用模式| fales:隐藏模式]
    btn: { 
      default: ()=>[
          {title:'查看',functionName:'aaa',type:'text',size:'',columnNames:'',status:[0,11],pattern:false},
          {title:'删除',functionName:'aaa',type:'text',size:'',columnNames:'',status:[0],pattern:false},
      ],
      type: Array
    },
    // table自带的边框
     border:{
        default:false,
        type:Boolean
    },
    // 斑马线
    stripe:{
        default:false,
        type:Boolean
    },
    // 分页
    pageCtronl:{
      default:()=>{
        return {
          tag:[
              {laber:'总记录数:',type:'success',val:'10',laberTail:'条',style:{width:'130px',marginRight:'10px'}},
              {laber:'总收入:',type:'success',val:'10',laberTail:'元',style:{width:'130px',marginRight:'10px'}},
              {laber:'总支出:',type:'success',val:'10',laberTail:'元',style:{width:'130px',marginRight:'10px'}},
            ],
          currentPage: 1, // 当前页
          pageLimit: 10,  // 每页显示10条
          total: 30,
          functionName:'',
        }
      },
      type:Object
    },
    // 设置行样式
    // setRowStyle:{
    //     default: ()=>[
    //       {fuName:'getTabTag',columnName:'name',style:'success'}
    //     ],
    //     type: Array
    // },
  },
  data() {
    return {
      tabths:'',
      tabHeights:'',
      tabDatas:'',
      isSelecteds:'',
      selectedOperations:'',
      btnColumnWidths:'',
      btns:'',
      borders:'',
      stripes:'',
      pageCtronls:'',
      getRows:'',
      loadings: false,
      getInitDatas:'',
      ruless:''
      // setRowStyles:''
    }
  },
  // 基本函数
  computed: {
    //计算方法
  },
  watch: {
  // 监听方法
    auto:{
      handler() {
          this.autos()
       },
      deep: true
    }
  },
  methods: {
      // 去除规则
      getTabZero(tabList = [],rules = []){
        if(!this.getInitDatas) return tabList;
        const obj = {}
        const arr = []
        for(let index in tabList){
            if(!Array.isArray(tabList)){
                obj[index] = tabList[index].constructor==Object?tabList[index].columnValue:tabList[index]
            }else{
                for(let index2 in tabList[index]){
                    obj[index2] = tabList[index][index2].constructor==Object?tabList[index][index2].columnValue:tabList[index][index2]
                }
                arr.push(obj)   
            }
        }
        if(!Array.isArray(tabList)){
            return obj
        }else{
            return arr
        }
    },
    // 获取当前行
    Getrow(val){
      if(this.getRows){
        this.getRows(this.getTabZero(val))
      }
    },
    // 防止数组变异多加的一个监听缺陷就是会让页面加载慢
    autos(){
        for(let index in this.auto){
          this[index+'s'] = this.auto[index]
        }
    }
  },
  //生命周期方法
  beforeCreate() {
    //创建前状态
  },
  created() {
    // 自动绑定父子组件属性
    for(let index in this.auto){
      this[index+'s'] = this.auto[index]
    }
  },
  // beforeMount() {
  // },
  mounted() {
  },
  beforeUpdate() {
    // 更新前状态
  },
  updated() {
    // 更新完成状态
  },
  beforeDestroy() {
    // 销毁前状态
  },
  destroyed() {
    // 销毁完成状态
  }
}
</script>
<style lang="scss" scoped>

::v-deep .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 1px 30px 0 rgba(0, 0, 0, 0.1);
}
::v-deep .el-card {
    border: none!important;
    background-color: #FFF;
    color: #303133;
    border-radius: 6px;
    -webkit-transition: .3s;
    transition: .3s;
}
.btn {
    width: 100%;
    display: flex;
    justify-content: center;
}
::v-deep .el-button+.el-button {
    margin-left: 0px;
}
::v-deep .el-table__fixed-right {
    width: 200px;
    background: #fff;
    right: 0px!important;
    height: 100%!important;
    
}
::v-deep .cell {
    display: flex;
    justify-content: space-evenly;
}
::v-deep  .el-table th>.cell {
    box-sizing: border-box;
    position: relative;
    vertical-align: middle;
    padding-left: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    width: 100%;
    display: flex;
}
::v-deep  .el-table th.is-leaf, .el-table td{
    background: rgb(238, 241, 246);
    color: rgb(96, 98, 102);
}
// 分页
.pages {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 10px;
}
</style>