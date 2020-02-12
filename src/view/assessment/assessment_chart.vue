<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'


export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '500px'
    }
  },
  data() {
    return {
      chart: null,
      ychar:''
    }
  },
  mounted() {
    this.getChart()
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    getChart(){
      this.$http.request({
        url:'http://localhost/index.php/bases/basedata/countAll',
        method:'POST',        
      }).then(res=>{
            if(res.status!=200){
              return  this.$message.error("获取柱状图失败！")
            }
            else{
               this.chart = echarts.init(document.getElementById(this.id))
              this.ychar=res.data
      this.chart.setOption({
                color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {           
            type : 'shadow'        
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['2013-2014学年', '2014-2015学年', '2015-2016学年', '2016-2017学年', '2017-2018学年'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:this.ychar
        }
    ]
            });
            }
      }).catch(error=>{
          alert("网络连接失败");
      });
    },


  }
}
</script>
