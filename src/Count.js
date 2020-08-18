
// 获取任意天 年月日
     function getTime(num=0) { 
        num *=24
        var timestamp = (new Date()).getTime();
        var now = new Date(timestamp-num*60*60*1000);
        var year=now.getFullYear();  //取得4位数的年份
        var month=now.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
        var date=now.getDate();      //返回日期月份中的天数（1到31）
        var hour=now.getHours();     //返回日期中的小时数（0到23）
        var minute=now.getMinutes(); //返回日期中的分钟数（0到59）
        var second=now.getSeconds(); //返回日期中的秒数（0到59）
        return year+"-"+month+"-"+date
    }
// 获取随机颜色
     function getColor() {
        return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6); 
    }

/**
 * 公共方法
 * @method getTab$
 * @param {Object} data.tabList     要修改的数据源
 * @param {String} data.columnNames 要修改的列
 * @param {String} data.typeColor   要加的颜色
 * @param {Number} data.type        [0:单标签 | 1:多标签 | 2:颜色 | 3:排序 | 4:开启关闭 | 5:图片 | 6:开启关闭文字版 ]不需要传 规则2 代表颜色 组件会将2的type数据加上typeColor
 * @return {Object}                 [{type:0',columnNames:'name',typeColor:'warning'}]  因为是传的引用无需返回值
 */

 /**
 * @param {Object} data.tabList     数据源
 * @param {String} data.columnNames 列名
 * @param {String} data.typeColor   要加的颜色
 * @param {Number} data.type        [0:单标签 ]
 * @return {Object}                 [{type:0',columnNames:'name',typeColor:'warning'}]  
 */
     function getTabTag(data){
        for(let j=0,leng = data.tabList.length;j<leng;j++){  
            data.tabList[j][data.columnNames] = {type:0,columnValue:data.tabList[j][data.columnNames],typeColor:data.style} 
        }
    }

/**
 * @param {Object} data.tabList     数据源
 * @param {String} data.columnNames 列名
 * @param {String} data.style       [{val:0,style:'color',title:'下单中'}] 解读init值为0则显示下单中
 * @param {Number} data.type        [1:多标签 ]
 * @param {Number} data.isNew       是否显示原始数据
 * @return {Object}                 columnValue:{type:2,columnValue:initValue,showValue:'要显示的值',typeColor:'success'}
 */
     function getTabStatusTag(data){
                for(let j=0,leng = data.tabList.length;j<leng;j++){  
                        for(let i=0,lengs = data.style.length;i<lengs;i++){
                            if(data.style[i].val ==  data.tabList[j][data.columnNames]){
                                data.tabList[j][data.columnNames] = {type:1,showValue:data.isNew?data.tabList[j][data.columnNames]:data.style[i].title,columnValue:data.tabList[j][data.columnNames],typeColor:data.style[i].style} 
                            }
                        }
                }
    }

 /**
 * @param {Object} data.tabList     数据源
 * @param {String} data.columnNames 列名
 * @param {String} data.typeColor   要加的颜色
 * @param {Number} data.type        [2:颜色 ]
 * @return {Object}                 $columnValue:{type:2,columnNames:'name',typeColor:'red'} 
 */
     function getTabColor(data){     
        for(let j=0,leng = data.tabList.length;j<leng;j++){  
            data.tabList[j][data.columnNames] = {type:2,columnValue:data.tabList[j][data.columnNames],typeColor:data.style} 
        }
    }

 /**
 * @param {Object} data.tabList     数据源
 * @param {String} data.columnNames 列名
 * @param {String} data.typeColor   要加的颜色
 * @param {Number} data.type        [3:排序 ]
 * @return {Object}                 $columnValue:{type:2,columnNames:'name',typeColor:'red'} 
 */
     function getTabSort(data){
        for(let j=0,leng = data.tabList.length;j<leng;j++){  
            data.tabList[j][data.columnNames] = {type:3,columnValue:data.tabList[j][data.columnNames],size:data.size,functionName:data.functionName} 
        }
    }

 /**
 * @param {Object} data.tabList     数据源
 * @param {String} data.columnNames 列名
 * @param {String} data.typeColor   要加的颜色
 * @param {Number} data.type        [4:排序 ]
 * @return {Object}                 $columnValue:{type:4,columnNames:'name',typeColor:'red',style:[letTitle:'右边标题',rigTitle:'左边标题'],functionName:''} 
 */
     function getTabState(data){
        for(let j=0,leng = data.tabList.length;j<leng;j++){  
            data.tabList[j][data.columnNames] = {type:4,columnValue:data.tabList[j][data.columnNames],letTitle:data.style[0].title,rigTitle:data.style[1].title,functionName:data.functionName} 
        }
    }
    // 支持b64
     function getTabImg(data){
        for(let j=0,leng = data.tabList.length;j<leng;j++){  
            data.tabList[j][data.columnNames] = {type:5,columnValue:data.tabList[j][data.columnNames]} 
        }
    }
     function getTabState2(data){
        for(let j=0,leng = data.tabList.length;j<leng;j++){  
            data.tabList[j][data.columnNames] = {type:6,columnValue:data.tabList[j][data.columnNames],style1:data.style[0],style2:data.style[1],functionName:data.functionName} 
        }
    }
/**
 * @param {Number} str     时间戳
 * @return {Object}        2020-7-30 18:42:57
 */
     function getTabTime(data){
        for(let j=0,leng = data.tabList.length;j<leng;j++){  
            data.tabList[j][data.columnNames] =  this.getDate(data.tabList[j][data.columnNames])
        }
    }

     function getDate(str){  
        var d = new Date(str * 1000);    //根据时间戳生成的时间对象 
        return d.getFullYear() + "-" +(d.getMonth() + 1) + "-" + d.getDate()+' '+d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();
     }
 /**
 * @param {Object} data.tabList     数据源
 * @param {String} data.columnNames 列名
 * @param {String} data.puffix      前缀
 * @param {Number} data.suffix      后缀
 * @return {string}                
 */
     function getTabPSuffix(data){
        for(let j=0,leng = data.tabList.length;j<leng;j++){  
            if(data.tabList[j][data.columnNames].constructor===Object){
                data.tabList[j][data.columnNames].showValue =  data.puffix+data.tabList[j][data.columnNames].columnValue+data.suffix
            }else{
                data.tabList[j][data.columnNames] = data.puffix+data.tabList[j][data.columnNames]+data.suffix
            }
        }
    }

export default {
    getTabTag,
    getTabStatusTag,
    getTabColor,
    getTabSort,
    getTabState,
    getTabImg,
    getTabState2,
    getTabTime,
    getDate,
    getTabPSuffix
}