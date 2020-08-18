# element 二次封装
### 节省业务代码、提高可维护性

### 安装
#### 下载 npm i element-w
#### 使用 
```javascript
// 基于element要先安装element和scss（scss不要最新版）安装失败会报红 组件图片相关的依赖了Viewer组件 内部已经注册过了 如果要改参数可以在main里在引用一次覆盖配置
import ElementW from 'element-w';
Vue.use(ElementW)
```
### wSelect
| 参数               |           说明 |  类型   |                可选值                 |  默认值  |
| :----------------- | -------------: | :-----: | :-----------------------------------: | :------: |
| **data**           | 省市区json数据 |  Array  |      组件内置了json数据 可以不写      | [{},...] |
| **selectValue**    |     绑定的对象 | Object  |            例：{dizhi:''}             |    {}    |
| **selectName**     |         值名称 | String  |               例：dizhi               |    ''    |
| **defaultAddress** | 默认展示省市区 | Object  | {Level1:'省',Level2:'市',Level3:'区'} |    {}    |
| **isDisabled**     |       是否禁用 | Boolean |              true/fales               |  fales   |

```html
<wSelect 
   :data="dizhi" 
   :selectValue="form" 
   selectName="address" 
   :defaultAddress="{Level1:'山东',Level2:'临沂',Level3:'罗庄区'}">
</wSelect>
// 可省略
<wSelect :selectValue="form" selectName="address"></wSelect>
```
```javascript
//地址可以不填，组件默认数据form  https://blog.csdn.net/youshi520000/article/details/70808580 
//https://github.com/modood/Administrative-divisions-of-China 这个数据比较全可以自己再封装一次
data() { 
  return {
        dizhi:[
            {
                name:'山西',
                city:[
                    {
                    name:'太原',
                    area:['小店区','迎泽区',...]
                    }
                ]
            }
         ],
        form:{address:''},
      	}
      }
```

### wUpload
| 参数               |             说明 |  类型   |       可选值        |                            默认值                            |
| :----------------- | :--------------- | :-----: | :-----------------: | :----------------------------------------------------------: |
| **blockStyle**     |         组件高宽 | Object  |          -          |                {}                |
| **buttomStyle**    |         按钮样式 | Object  |          -          | {} |
| **url**            | 默认图片 支持b64 | String  |          -          |                          '图片地址'                          |
| **uploadName**     |     绑定的属性名 | String  |          -          |                           例：name                           |
| **uploadValue**    |     绑定的属性值 | Object  |          -          |                        例：{name:''}                         |
| **EfileType**      |     导出图片格式 | Boolean | true:file/fales:B64 |                             true                             |
| **imgType**        |     限制上传类型 | String  |          -          |        "image/gif, image/jpeg, image/png, image/jpg"         |
| **openWindowType** |     限制选择类型 | String  |          -          |        "image/gif, image/jpeg, image/png, image/jpg"         |
| **imgSize**        |     限制图片大小 | Number  |          -          |                           3145728                            |

```html
  <wUpload 
     :uploadValue="uploadValue" 
      uploadName="address" 
     :blockStyle="blockStyle"
     :buttomStyle="buttomStyle" 
     url="图片地址可以是b64"
     >

     </wUpload>
```
```javascript
data() { 
  return {
  	blockStyle:{width:'300px',height:'300px'},
    uploadValue:{address:''},
    buttomStyle:{
        width:'',
        height:'',
        top:'',
        show:true,
        title:'请上传图片',
        type:'success'
    }
  }
}
```





### wDialog
| 参数                |                     说明 |  类型   |   可选值   |              默认值              |
| :------------------ | -----------------------: | :-----: | :--------: | :------------------------------: |
| **title**           |               Dialog标题 | String  |     -      |                ''                |
| **show**            |             弹窗隐藏显示 | Boolean | true/fales |              fales               |
| **componentSelect** |                   组件名 | String  |     -      |                ''                |
| **top**             |                  弹窗top | String  |     -      |              '3vh'               |
| **width**           |                   弹窗宽 | String  |     -      |              '50%'               |
| **height**          |                   弹窗高 | String  |     -      |             '800px'              |
| **isShowFooter**    |         底部按钮是否隐藏 | Boolean | true/fales |              fales               |
| **footerTitle**     |                 底部按钮 | Object  |     -      | { btn1: "保 存", btn2: "取 消" } |
| **parentFun**       |               父组件方法 | String  |     -      |                ''                |
| **childrenFun**     |               子组件方法 | String  |     -      |                ''                |
| **parentparameter** |             父->字的参数 | Object  |     -      |                {}                |
| **besidesClose**    |     是否允许点击遮罩关闭 | Boolean | true/fales |               true               |
| **topIndex**        | 是否将当前弹窗设为最上层 | Boolean | true/fales |               true               |
```html
   <wDialog :data="dialog">
      <!-- 支持匿名插槽 但匿名插槽无法使用父子组件传值 -->
    </wDialog>
```
```javascript
  methods:{
      add(){
         this.dialog = JSON.parse(JSON.stringify(this.$dialogConfig))
         this.dialog.title = '店铺添加'
         this.dialog.show = true
         this.dialog.componentSelect = require("./components/Popup-MAdd")
         this.dialog.parentFun = 'parentFuns'
         this.dialog.childrenFun = 'childrenFuns'
      }
  }
```


### wTable
#### count
| 参数                  |                  说明 |   类型   |   可选值   |  默认值  |
| :-------------------- | --------------------: | :------: | :--------: | :------: |
| **tabth**             |                  列名 |  Array   |     -      | [{},...] |
| **tabHeight**         |             table高度 |  String  |     -      |  100px   |
| **getRow**            |            获取当前行 | Function |   ()=>{}   |   null   |
| **loading**           |         table加载icon | Boolean  | true/fales |  fales   |
| **tabData**           |                数据源 |  Array   |     -      | [{},...] |
| **btnColumnWidth**    |       right操作栏宽度 |  String  |     -      |  200px   |
| **isSelected**        |        是否隐藏单选框 | Boolean  | true/fales |   true   |
| **selectedOperation** | bottom 单选框操作按钮 |  Array   |     -      | [{},...] |
| **stripe**            |            开启斑马线 | Boolean  | true/fales |  fales   |
| **isPageCtronl**      |          是否隐藏分页 | Boolean  | true/fales |   true   |
| **pageCtronl**        |             table分页 |  Array   |     -      | [{},...] |

#### tabth 列属性

| 参数      |  说明 |  类型  | 可选值 | 默认值 |
| :-------- | ----: | :----: | :----: | :----: |
| **laber** | title | String |   -    | “序号” |
| **prop**  | value | String |   -    |  “id”  |
| **width** |  列宽 | String |   -    | “200”  |

#### btn 按钮属性

| 参数             |                          说明 |   类型   |   可选值   |      默认值      |
| :--------------- | ----------------------------: | :------: | :--------: | :--------------: |
| **title**        |                      按钮标题 |  String  |     -      | “添加/编辑/删除” |
| **functionName** |                  所执行的方法 | Function |   ()=>{}   |       null       |
| **type**         |               element按钮样式 |  String  |     -      |    “primary”     |
| **size**         |               element按钮大小 |  String  |     -      |     “small”      |
| **columnNames**  |  tabth->laber，输入则开启权限 |  String  |     -      |       “id”       |
| **status**       | look权限,数组内的值隐藏或禁用 |  Array   |     -      |      [0,1]       |
| **pattern**      |  look type，真开启禁用 假隐藏 | Boolean  | true/fales |      fales       |

#### selectedOperation 全选操作按钮属性

| 参数  | 说明 | 类型 | 可选值 |默认值|
| :-----| ----: | :----: | :----: | :----: |
|**title**  | 按钮标题| String | - | “全部删除”|
|**type**  | element按钮样式| String | - | “primary”|
|**size**  | element按钮大小| String | - | “small”|
|**functionName**  | 点击按钮触发| Function | ()=>{} | null|

#### pageCtronl 分页属性

| 参数  | 说明 | 类型 | 可选值 |默认值|
| :-----| ----: | :----: | :----: | :----: |
|**tag**  | title| String | - | “序号”	  |
|**currentPage**  | 当前页| String | - | “id”|
|**pageLimit**  | 每页显示| String | - | “200”|
|**total**  | 总条数| String | - | “200”|
|**functionName**  | 点击分页触发| Function | ()=>{} | null|


##### tag	{laber:'总记录数:',type:'success',val:1,laberTail:'个'}
laber：标题、type:element样式、val:值、laberTail:单位可为空

#### 示例Dome1
```html
 <wTable :auto="table"></wTable>
```

```javascript
  data() { 
  	return {
		table:{ 
        // 配色方案 默认 default(蓝),success(绿),info(灰),warning(黄),danger(红)
        tabth:[
              {laber:'序号',prop:'id',width:''},
              {laber:'姓名',prop:'name',width:''},
              {laber:'地址',prop:'address',width:'250'},
              {laber:'日期',prop:'date',width:''},
              {laber:'头像',prop:'img',width:'300'},
              {laber:'状态1',prop:'status1',width:''},
              {laber:'在线状态',prop:'status2',width:''},
        ],
        // Table高度
        tabHeight:'550',
        // 获取当前行数据  this.GetRow
        getRow:'',
        // 页面加载中 -> axios请求是开启 请求结束关闭
        loading:false,
        // 数据源
        tabData:[
          {id:1,
          name:'张大仙',
          address:'上海市普陀区金沙江路 1517 弄',
          date:'1596105777',
          img:'',
          status1:0,
          status2:0,
          },
          {id:2,
          name:'张冰心',
          address:'上海市普陀区金沙江路 1517 弄',
          date:'1596105777',
          img:'',
          status1:1,
          status2:1,
          },
          {id:3,
          name:'张AA',
          address:'上海市普陀区金沙江路 1517 弄',
          date:'1596105777',
          img:'',
          status1:0,
          status2:3,
          }
        ],
        // 操作栏宽度
        btnColumnWidth:'200',
        // 按钮
        btn: [
              {title:'编辑',
			  functionName:null,
			  type:'default',
			  size:'small',
			  columnNames:'status1',
			  status:[],
			  pattern:false
			  },
              {title:'删除',
			  functionName:null,
			  type:'danger',
			  size:'small',
			  columnNames:'status1',
			  status:[1],
			  pattern:false
			  },
            ],
          // 是否隐藏单选框
          isSelected:true,
          selectedOperation:[
          { title:'全部启用',type:'danger', size:'mini',functionName:null},
          { title:'全部删除',type:'default', size:'mini',functionName:null},
         ],
        // table自带的边框
        border:false,
        // 斑马线 
        stripe:false,
        // 分页
        pageCtronl: {
          tag:[
            {laber:'总记录数:',type:'default',val:3,laberTail:'个'},
            {laber:'已启用:',type:'success',val:3,laberTail:'个'},
            {laber:'已禁用:',type:'danger',val:3,laberTail:'个'},
            ],
          currentPage: 1, // 当前页
          pageLimit: 10, // 每页显示10条
          total: 3,
          functionName:null
      },
    },
    }
  }
```

#### 示例Dome2(加上规则)
```html
 <wTable :auto="table"></wTable>
```

```javascript
  data() { 
  	return {     
        table:{ 
        // 配色方案 默认 default(蓝),success(绿),info(灰),warning(黄),danger(红)
        tabth:[
              {laber:'序号',prop:'id',width:''},
              {laber:'姓名',prop:'name',width:''},
              {laber:'地址',prop:'address',width:'250'},
              {laber:'日期',prop:'date',width:''},
              {laber:'头像',prop:'img',width:''},
              {laber:'状态1',prop:'status1',width:''},
              {laber:'状态2',prop:'status2',width:''},
              {laber:'在线状态',prop:'status3',width:''},
              {laber:'粉丝数量',prop:'fans',width:''},
        ],
        // Table高度
        tabHeight:'550',
        // 获取当前行数据  this.GetRow
        getRow:'',
        // 页面加载中 -> axios请求是开启 请求结束关闭
        loading:false,
        // 数据源
        tabData:[
          {id:1,
          name:'张大仙',
          address:'上海市普陀区金沙江路 1517 弄',
          date:'1596105777',
          img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=251289958,1860898046&fm=26&gp=0.jpg',
          status1:0,
          status1:0,
          status3:0,
          fans:1000,
          },
          {id:2,
          name:'张冰心',
          address:'上海市普陀区金沙江路 1517 弄',
          date:'1596105777',
          img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=251289958,1860898046&fm=26&gp=0.jpg',
          status1:1,
          status2:1,
          status3:1,
          fans:888,
          },
          {id:3,
          name:'张AA',
          address:'上海市普陀区金沙江路 1517 弄',
          date:'1596105777',
          img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=251289958,1860898046&fm=26&gp=0.jpg',
          status1:0,
          status2:0,
          status3:2,
          fans:666,
          }
        ],
        // 操作栏宽度
        btnColumnWidth:'200',
        // 按钮
        btn: [
              {title:'编辑',functionName:null,type:'default',size:'small',columnNames:'status1',status:[],pattern:false},
              {title:'删除',functionName:null,type:'danger',size:'small',columnNames:'status1',status:[1],pattern:false},
            ],
          // 是否隐藏单选框
          isSelected:false,
          selectedOperation:[
          { title:'全部启用',type:'default', size:'mini',functionName:null},
          { title:'全部删除',type:'danger', size:'mini',functionName:null},
         ],
        // table自带的边框
        border:false,
        // 斑马线 
        stripe:false,
        // 分页
        pageCtronl: {
          tag:[
            {laber:'总记录数:',type:'default',val:3,laberTail:'个'},
            {laber:'已启用:',type:'success',val:3,laberTail:'个'},
            {laber:'已禁用:',type:'danger',val:3,laberTail:'个'},
            ],
          currentPage: 1, // 当前页
          pageLimit: 10, // 每页显示10条
          total: 3,
          functionName:null
      },
    },
    }
  }
created() {
//配色方案 默认 default(蓝),success(绿),info(灰),warning(黄),danger(红)
//传值 数据源、列名、规则 、触发方法（只有开关和排序有方法入口）
//添加前缀或后缀    
   wg.getTabPSuffix({tabList:this.table.tabData,columnNames:'name',puffix:'前',suffix:'后'}) 
//单颜色
wg.getTabColor({tabList:this.table.tabData,columnNames:'name',style:'red'})
//单标签
wg.getTabTag({tabList:this.table.tabData,columnNames:'address',style:'danger'})           //多色tag标签
wg.getTabStatusTag({
    tabList:this.table.tabData,
    columnNames:'status3',
    isNew:false,
    style:[{val:0,style:'success',title:'在线'},{val:1,style:'warning',title:'隐身'}]
	}) 
//排序
wg.getTabSort({
    tabList:this.table.tabData,
    columnNames:'soft',
    size:{min:0,max:100},
    functionName:this.GetPage
})         
//圆形按钮开关
wg.getTabState({
    tabList:this.table.tabData,
    columnNames:'status1',
    style:[{title:''},{title:''}],
    functionName:(val)=>{}
})  
//文字按钮开关
wg.getTabState2({ 
    tabList:this.table.tabData,
    columnNames:'status2',
    style:[{title:'开启',style:'success'},{title:'关闭',style:'danger'}],
    functionName:this.StatusClicks
})
//图片
wg.getTabImg({tabList:this.table.tabData,columnNames:'img'})     
//时间戳
wg.getTabTime({tabList:this.table.tabData,columnNames:'date'})                           },
```