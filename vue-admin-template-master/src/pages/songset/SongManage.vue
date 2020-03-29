<template>
  <div class="Userdata">
      <el-table
    :data="tableData"
    style="width: 100%"
    :row-class-name="tableRowClassName">
    <el-table-column
      prop="songId"
      label="歌曲编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="songName"
      label="歌曲名字"
      width="180">
    </el-table-column>
    <el-table-column
      prop="albumId"
      label="专辑编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="songUrl"
      label="在线播放"
      width="180">
      底部
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
          <!--
            scope.&index  列的索引
            scope.row  这一行的数据
        -->
        <el-button
          size="mini"
          @click="showEditPage(scope.$index, scope.row)">收藏</el-button>
      </template>
    </el-table-column>
  </el-table> 
  <el-dialog :title="flag" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- <el-form-item label="歌曲编号">
         <el-input v-model="form.songId" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="歌曲名字">
         <el-input v-model="form.songName" autocomplete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="收藏编号">
         <el-input v-model="form.colId" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户名字">
         <el-input v-model="form.kehuname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="客户编号">
         <el-input v-model="form.kehuId" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="歌曲编号">
        <el-input v-model="form.songId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="edit">确 定</el-button>
      </div>
    </el-dialog>
  1.电梯<audio src="../../music/1.mp3" controls="controls"></audio>
  2.明天有雨<audio src="@/music/2.mp3" controls="controls"></audio>
  3.考虑到可能再也见不到你<audio src="@/music/3.mp3" controls="controls"></audio><br>
  4.北京巷弄<audio src="@/music/4.mp3" controls="controls"></audio>
  5.那时雨<audio src="@/music/5.mp3" controls="controls"></audio>
  6.七秒钟的记忆<audio src="@/music/6.mp3" controls="controls"></audio><br>
  7.虐心<audio src="@/music/7.mp3" controls="controls"></audio>
  8.他的猫<audio src="@/music/8.mp3" controls="controls"></audio>
  9.致曾来过的你<audio src="@/music/9.mp3" controls="controls"></audio><br>
  10.眼泪<audio src="@/music/10.mp3" controls="controls"></audio>
  11.尚好的青春<audio src="@/music/11.mp3" controls="controls"></audio>
  12.伟大的渺小<audio src="@/music/12.mp3" controls="controls"></audio><br>
  13.四点四十四<audio src="@/music/13.mp3" controls="controls"></audio>
  14.穿越<audio src="@/music/14.mp3" controls="controls"></audio>
  15.只有爱<audio src="@/music/15.mp3" controls="controls"></audio><br>
  16.你的深情<audio src="@/music/16.mp3" controls="controls"></audio>
  17.无尽光芒<audio src="@/music/17.mp3" controls="controls"></audio>
  18.我是我的<audio src="@/music/18.mp3" controls="controls"></audio><br>
  19.微笑以后<audio src="@/music/19.mp3" controls="controls"></audio>
  20.有没有<audio src="@/music/20.mp3" controls="controls"></audio><br></span>
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

import {getInfos} from '@/api/song/songset';
import {getInfo,add} from '@/api/song/collectionset';

  export default {
    name:'music',
    methods: {
      ready(){
          console.log("play click");
      },
      pause(){
          console.log("pause click");
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 0) {
          return 'warning-row';
        } 
          return 'success-row';
      },
      showEditPage(index,row){
        this.flag = "是否收藏该歌曲";
        this.form.songId=row.songId;
        this.form.songName=row.songName;
        this.form.kehuId=row.kehuId;
        this.form.colId=row.colId;
        this.dialogFormVisible=true;
      },
      edit(){
        if(this.flag === "是否收藏该歌曲"){
          add(this.form).then(res =>{
            // 先隐藏对话框  再提示收藏成功
            this.dialogFormVisible = false;
            this.$message({
                showClose: true,
                message: '收藏成功',
                type: 'success'
            });    
            }).catch(err =>{
            this.$message({
                showClose: true,
                message: '收藏失败',
                type: 'error'
            });
            })
        }
      },
      getAlls(){
        getInfos().then(res =>{
          console.info("success")
          this.tableData = res;
          //console.info(this.tableData);
        }).catch(err =>{
          console.info("error")
          console.info(err);
        })
      },
      getAllc(){
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
            songId: "",
            songName: "",
            albumId: "",
            songUrl: "",
            colId: "",
            kehuId: "",
            kehuname: "灰灰",
        },
        dialogFormVisible:false,
        tableData: [],
        //btableData: [],
      }
    },
    created(){
      this.getAlls();
    }
 }
</script>