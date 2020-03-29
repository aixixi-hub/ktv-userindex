<template>
  <div class="Userdata">
      <el-table
    :data="tableData"
    style="width: 100%"
    height="660"
    :row-class-name="tableRowClassName">
    <el-table-column
      fixed
      prop="albunId"
      label="专辑编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="albumName"
      label="专辑名字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="albumMajor"
      label="专辑简介"
      width="360">
    </el-table-column>
    <el-table-column
      prop="albumPublishtime"
      label="发行时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="albumUrl"
      label="专辑图片"
      width="720"
      align="center">
      <template slot-scope="scope">
         <img :src="scope.row.albumUrl" style="width:720px;height:200px;" @click="openImg(scope.row.imageUrl)">
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

import {getInfo} from '@/api/album/albumset';

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
            albunId: "",
            albumName: "",
            albumMajor: "",
            albumPublishtime: "",
            albumUrl: "",
        },
        imgVisible: false,
        tableData: [],
      }
    },
    created(){
      this.getAll();
    }
 }
</script>