<template>
  <div class="Userdata">
      <el-table
    :data="tableData"
    style="width: 100%"
    height="660"
    :row-class-name="tableRowClassName">
    <el-table-column
      fixed
      prop="singerId"
      label="歌手编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="singerName"
      label="歌手名字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="singerGender"
      label="歌手性别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="singerCategory"
      label="歌手类型"
      width="180">
    </el-table-column>
    <el-table-column
      prop="singerUrl"
      label="歌手图片"
      width="720"
      align="center">
      <template slot-scope="scope">
         <img :src="scope.row.singerUrl" style="width:600px;height:300px;" @click="openImg(scope.row.imageUrl)">
      </template>
    </el-table-column>
  </el-table>
  <el-dialog width="400px" :visible.sync="imgVisible" class="img-dialog">
      <el-card :body-style="{ padding: '0px' }">
        <img :src="dialogImgUrl" width="100%" height="100%">
      </el-card>
    </el-dialog>
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

import {getInfo} from '@/api/singer/singerset';

  export default {
    methods: {
      openImg(url) {
        if (url) {
          this.imgVisible = true
          this.dialogImgUrl = url
        }
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } 
          return 'success-row';
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
            singerId: "",
            singerName: "",
            singerGender: "",
            singerCategory: "",
            singerUrl: "",
        },
        imgVisible: false,
        tableData: []
      }
    },
    created(){
      this.getAll();
    }
 }
</script>