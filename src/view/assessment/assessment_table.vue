<template>
  <div>
    <button @click="exportExcel" >导出数据</button>
  <el-table :data="tableData" show-summary id="out-table"  style="width:100%">
    <template v-for="(item,index) in tableLabel">
    <el-table-column :key="index" :prop="item.prop" :label="item.label"></el-table-column>
    </template>
      <el-table-column label="操作">
      <template slot-scope="scope">
       <el-button type="text" @click="showDialogVisible(scope.row.s_id)">编辑</el-button>
      </template>

      <el-dialog title="修改信息" :visible.sync="dialogVisible" :before-close="handleClose" center :append-to-body='true' :lock-scroll="false" width="40%">
        <el-form :model="tableList" ref="tableList" label-width="140px" label-position="labelPosition" >
          <el-form-item label="id"  >
              <el-input v-model="tableList.s_id" disabled></el-input>
          </el-form-item>
          <el-form-item label="2013-2014学年" prop="year1" >
              <el-input v-model="tableList.year1"></el-input>
          </el-form-item>
           <el-form-item label="2014-2015学年" prop="year2" >
              <el-input v-model="tableList.year2"></el-input>
          </el-form-item>
           <el-form-item label="2015-2016学年" prop="year3" >
              <el-input v-model="tableList.year3"></el-input>
          </el-form-item>
           <el-form-item label="2016-2017学年" prop="year4" >
              <el-input v-model="tableList.year4"></el-input>
          </el-form-item>
           <el-form-item label="2017-2018学年" prop="year5" >
              <el-input v-model="tableList.year5"></el-input>
          </el-form-item>
          

        </el-form>
       <span slot="footer" >
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click.native="updateForm('tableList')">确 定</el-button>
        </span>
      </el-dialog>
    </el-table-column>
  </el-table>
  </div>


</template>

<script>

  import FileSaver from 'file-saver'
  import XLSX from 'xlsx'
  import qs from 'qs'
export default {
  methods: {
         updateForm(forName){
            this.$http.request({
              method:'POST',
              url:'http://localhost:80/index.php/bases/basedata/updateData',
              data:qs.stringify(this.tableList)
            }).then(res=>{
              if(res.status!=200){
                return this.$message.error('数据更新失败！')
              }
              this.dialogVisible=false
              // this.updateForm()
              this.$message.success('更新用户信息成功')            
            }).catch(error=>{

            });
         },
         exportExcel () {
             var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'))

             var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
             try {
                 FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '5学年考核结果情况.xlsx')
             } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
             return wbout
         },
         showDialogVisible(s_id){      
           var data1=qs.stringify({
             id:s_id
           });
           this.$http.request(
             {
               url:'http://localhost/index.php/bases/basedata/findid',
               method:'POST',
              data:data1,

         }).then(res=>{
             if(res.status==200){
                this.tableList=res.data
             } else{

             }                                    
           }).catch(error=>{

           });
            this.dialogVisible =true
            // this.showDialogVisible();
         },

handleClose(done){
        this.$confirm('确定关闭吗').then(() => {
          done();
          console.info("点击右上角 'X' ，取消按钮或遮罩层时触发");
        }).catch(() => {

          console.log("点击确定时触发");
        });
    },

    getList() {
      var that = this;
      this.$http
        .post("http://localhost/index.php/bases/basedata/selectAll")
        .then(res => {
          if (res.status == 200) {
            that.tableData = res.data; 

          }
        })
        .catch(error => {
          alert("网络连接失败");
        });
    },


  },
  mounted(){
      getTableData().then(res=>{
        this.tableData = res.data
        console.log(res.data)
    })
  },
  created: function() {
    

    this.getList();
  },
  data() {
    return {
dialogVisible: false,
      tableList:[
      ],
      tableData: {        
      },
      tableLabel: [
        { label: "编号", prop: "s_id" },
        { label: "名称", prop: "s_name" },
        { label: "计分办法", prop: "s_jf" },
        { label: "评价标准和计分方法", prop: "s_bz" },
        { label: "13-14学年", prop: "year1" },
        { label: "14-15学年", prop: "year2" },
        { label: "15-16学年", prop: "year3" },
        { label: "16-17学年", prop: "year4" },
        { label: "17-18学年", prop: "year5" },

      ]
    }
  }
}
</script>

<style scoped>
.home-container {
  height: 100%;
}
</style>
