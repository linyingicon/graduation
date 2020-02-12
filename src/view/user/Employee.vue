<template>
  <div>
    <Card>
    <tables ref="tables" editable searchable search-place="top" v-model="showdata" :columns="columns" @on-delete="handleDelete"  />
    <Page :total="dataCount" :page-size="pageSize" show-total @on-change="changepage" show-elevator></Page>
    <Button style="margin: 10px 0;" type="primary" @click="exportExcel">导出为Csv文件</Button>
    </Card>
  </div>
</template>

<script>
import Tables from '_c/tables'
import { getUserInfoData } from '@/api/data'
export default {
  name: 'tables_page',
  components: {
    Tables
  },
  data () {
    return {
      showdata:[],
      pageSize:10,
      dataCount: 0,
      columns: [
        { title:'工号', key:'t_id',sortable:true},
        { title: '姓名', key: 't_name', sortable: true },
        { title: '职称', key: 't_jobtitle' ,sortable:true},
        { title:'部门', key: 't_department', sortable:true},
        {
          title: '操作',
          key: 'handle',
          options: ['delete','add'],
          button: [
            (h, params, vm) => {
              return h('Poptip', {
                props: {
                  confirm: true,
                  title: '你确定要删除吗?'
                },
                on: {
                  'on-ok': () => {
                    vm.$emit('on-delete', params)
                    vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
                  }
                }
              }
              )
            }
          ]
        }
      ],
      tableData: []
    }
  },
  methods: {
    changepage(index){
        var _star = (index - 1)* this.pageSize
        var _end  = index * this.pageSize
        this.showdata = this.tableData.slice(_star,_end) 
    },
    handleDelete (params) {
      console.log(params)
    },
    exportExcel () {
      this.$refs.tables.exportCsv({
        filename: `table-${(new Date()).valueOf()}.csv`
      })
    }
  },
  mounted () {
    // https://www.jianshu.com/p/15e7a3eeff6b
    getUserInfoData().then(res => {
      this.tableData = res.data
      console.log( res.data)
      this.dataCount = this.tableData.length
      if(this.dataCount < this.pageSize ){
        this.showdata=this.tableData
      }else{
        this.showdata=this.tableData.slice(0,this.pageSize)
      }
    })
  }
}
</script>

<style>

</style>
