<template>
  <div class="Userdata">
      <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="colId"
      label="收藏编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="kehuId"
      label="客户编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="songId"
      label="歌曲编号"
      width="180">
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
          <!--
            scope.&index  列的索引
            scope.row  这一行的数据
        -->
        <el-button
          size="mini"
          @click="handleDelete(scope.$index, scope.row)">取消收藏</el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>

<style>
  .Userdata{
    margin: 2%;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: rgb(158, 195, 209);
  }
</style>

<script>

import {getInfo,deleteById} from '@/api/song/collectionset';

  export default {
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } 
          return 'success-row';
      },
      handleDelete(index,row){
          deleteById({id:row.colId}).then(res =>{
          this.getAll(); 
          this.$message({
            showClose: true,
            message: '取消收藏成功',
            type: 'success'
          });     
        }).catch(err =>{
          this.$message({
            showClose: true,
            message: '取消收藏失败',
            type: 'error'
          });
        })
      },
      getAll(){
        getInfo().then(res =>{
          console.info("success")
          this.tableData = res;
          //console.info(this.tableData);
        }).catch(err =>{
          console.info("error")
          console.info(err);
        })
      }
    },
    data() {
      return {
        form:{
            colId: "",
            kehuId: "",
            songId: "",
        },
        dialogFormVisible:false,
        tableData: []
      }
    },
    created(){
      this.getAll();
    }
 }
</script>