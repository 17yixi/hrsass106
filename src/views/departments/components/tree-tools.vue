<template>
  <el-row
    type="flex"
    align="middle"
    justify="space-between"
    style="height: 40px; width: 100%"
  >
    <el-col>
      <span>{{ treeNode.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <el-col>{{ treeNode.manager }}</el-col>
        <el-col>
          <el-dropdown @command="operateDepts">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="!isRoot" command="del">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import { delDepartments } from "@/api/departments";
export default {
  props: {
    treeNode: {
      type: Object,
      required: true,
    },
    isRoot: {
      type: Boolean,
      defalut: false,
    },
  },
  methods: {
    operateDepts(type) {
      if (type === "add") {
        this.$emit('addDepts', this.treeNode)
      } else if (type === "edit") {
        this.$emit('editDepts', this.treeNode)
      } else {
        this.$confirm("确认删除数据吗？")
          .then(() => {
            return delDepartments(this.treeNode.id);
          })
          .then(() => {
            this.$emit("delDepts");
            this.$message.success("删除部门成功");
          });
      }
    },
  },
};
</script>

<style></style>
