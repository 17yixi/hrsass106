<template>
  <el-dialog :title="showTitle" :visible="showDialog" @close="btnCancel">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input style="width: 80%" placeholder="1-50个字符" v-model="formData.name" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input style="width: 80%" placeholder="1-50个字符" v-model="formData.code" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          style="width: 80%"
          placeholder="请选择"
          v-model="formData.manager"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in peoples"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          style="width: 80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
          v-model="formData.introduce"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOK">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import {
  getDepartments,
  addDepartments,
  getDepartDetail,
  updateDepartments,
} from "@/api/departments";
import { getEmployeeSimple } from "@/api/employees";
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false,
    },
    treeNode: {
      type: Object,
      dafault: null,
    },
  },
  data() {
    const checkNameRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments();
      if (this.formData.id) {
        isRepeat = depts
          .filter(
            (item) => item.id !== this.formData.id && item.pid === this.treeNode.pid
          )
          .some((item) => item.name === value);
      } else {
        const isRepeat = depts
          .filter((item) => item.pid === this.treeNode.id)
          .some((item) => item.name === value);
        isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback();
      }
    };
    const checkCodeRepeat = async (rule, value, callback) => {
      const { depts } = await getDepartments();
      let isRepeat = false;
      if (this.formData.id) {
        isRepeat = depts.some(
          (item) => item.id !== this.formData.id && item.code === value && value
        );
      } else {
        isRepeat = depts.some((item) => item.code === value && value);
      }
      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback();
    };
    return {
      peoples: [],
      formData: {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      },
      rules: {
        name: [
          { required: true, message: "部门名称不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "部门名称要求1-50个字符", trigger: "blur" },
          { validator: checkNameRepeat, trigger: "blur" },
        ],
        code: [
          { required: true, message: "部门编码不能为空", trigger: "blur" },
          { min: 1, max: 50, message: "部门编码要求1-50个字符", trigger: "blur" },
          { validator: checkCodeRepeat, trigger: "blur" },
        ],
        manager: [{ required: true, message: "部门负责人不能为空", trigger: "blur" }],
        introduce: [
          { required: true, message: "部门介绍不能为空", trigger: "blur" },
          { trigger: "blur", min: 1, max: 300, message: "部门介绍要求1-50个字符" },
        ],
      },
    };
  },
  computed: {
    showTitle() {
      return this.formData.id ? "编辑部门" : "新增子部门";
    },
  },
  methods: {
    async getEmployeeSimple() {
      this.peoples = await getEmployeeSimple();
    },
    btnOK() {
      this.$refs.deptForm.validate(async (isOK) => {
        if (isOK) {
          if (this.formData.id) {
            await updateDepartments(this.formData);
          } else {
            await addDepartments({ ...this.formData, pid: this.treeNode.id });
          }
          this.$emit("addDepts");
          this.$emit("update:showDialog", false);
        }
      });
    },
    btnCancel() {
      this.formData = {
        name: "",
        code: "",
        manager: "",
        introduce: "",
      };
      this.$refs.deptForm.resetFields();
      this.$emit("update:showDialog", false);
    },
    async getDepartDetail(id) {
      this.formData = await getDepartDetail(id);
    },
  },
};
</script>

<style></style>
