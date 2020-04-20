<template>
  <div class="app-container">
    <el-form :inline="true" :model="search" class="demo-form-inline">
      <el-form-item label="搜索">
        <el-input v-model="search.user" placeholder="请输入学生姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="searchEvent">查询</el-button>
        <el-button type="success" @click="addStudent">添加</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="姓名">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="年龄" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.age }}</span>
        </template>
      </el-table-column>
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">{{ scope.row.gender}}</template>
      </el-table-column>
      <el-table-column label="毕业于" align="center">
        <template slot-scope="scope">{{ scope.row.from }}</template>
      </el-table-column>
      <el-table-column label="居住地" align="center">
        <template slot-scope="scope">{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="电话" align="center">
        <template slot-scope="scope">{{ scope.row.tel }}</template>
      </el-table-column>
      <el-table-column label="家乡" align="center">
        <template slot-scope="scope">{{ scope.row.hometown }}</template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="最近更新时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{dateFormat('YYYY-mm-dd HH:MM',scope.row.date) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row,true)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="学生信息" :visible.sync="dialogFormVisible">
      <el-form :model="student">
        <el-form-item label="学生姓名" :label-width="formLabelWidth">
          <el-input v-model="student.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="gender">
          <el-radio-group v-model="student.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="student.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="居住地" :label-width="formLabelWidth">
          <el-input v-model="student.address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth">
          <el-input v-model="student.tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="毕业学校" :label-width="formLabelWidth">
          <el-input v-model="student.from" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="家乡" :label-width="formLabelWidth">
          <el-input v-model="student.hometown" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveStudent">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="centerDialogVisible" width="30%" center>
      <span>确定删除此条数据吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteStudent">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getList,
  deleteStudent,
  saveStudent,
  updateStudent
} from "@/api/table";

export default {
  data() {
    return {
      isEdit: false, //是否是编辑学生信息  true--编辑  false--新增
      search: {
        user: ""
      },
      centerDialogVisible: false,
      //学生信息
      student: {
        name: "",
        age: "",
        gender: "",
        from: "",
        address: "",
        hometown: "",
        tel: ""
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      list: null, //学生数据
      listLoading: true
    };
  },
  created() {
    //获取学生列表
    this.fetchData();
  },
  methods: {
    searchEvent() {
      this.$message("努力开发中");
    },
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        this.list = response.data.students;
        this.listLoading = false;
      });
    },
    /**
     * 保存学生信息
     */
    saveStudent() {
      let student = this.student;
      if (student.name == "") {
        this.$message({
          message: "请输入学生姓名",
          type: "warning"
        });
        return;
      }
      let reg = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字 ，判断正整数用/^[1-9]+[0-9]*]*$/
      if (!reg.test(student.age)) {
        this.$message({
          message: "请输入正确的年龄",
          type: "warning"
        });
        return;
      }
      //新增学生
      if (!this.isEdit) {
        saveStudent(student).then(response => {
          this.fetchData();
          this.dialogFormVisible = false;
        });
      } else {
        //编辑学生信息
        updateStudent(student).then(response => {
          this.fetchData();
          this.dialogFormVisible = false;
        });
      }
    },
    addStudent() {
      this.isEdit = false;
      this.student = {
        name: "",
        age: "",
        gender: "",
        from: "",
        address: "",
        hometown: "",
        tel: ""
      };
      this.dialogFormVisible = true;
    },
    deleteStudent() {
      deleteStudent({ id: this.student._id }).then(response => {
        this.fetchData();
        this.centerDialogVisible = false;
      });
    },
    handleEdit(index, row, isEdit) {
      this.isEdit = isEdit;
      this.dialogFormVisible = true;
      this.student = row;
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.centerDialogVisible = true;
      this.student = row;
      console.log(index, row);
    },

    dateFormat(fmt, date) {
      let ret = "";
      date = new Date(date);
      const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      };
      for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
          fmt = fmt.replace(
            ret[1],
            ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
          );
        }
      }
      return fmt;
    }
  }
};
</script>
