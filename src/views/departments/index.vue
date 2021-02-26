<template>
  <div>
    <el-card class="tree-card">
      <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts"/>
      <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
        <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts"/>
      </el-tree>
    </el-card>
    <add-dept :show-dialog="showDialog"/>
  </div>
</template>

<script>
import TreeTools from "./components/tree-tools.vue";
import AddDept from "./components/add-dept";
import { getDepartments } from "@/api/departments";
import { tranListToTreeData } from "@/utils";
export default {
  data() {
    return {
      company: {},
      defaultProps: {
        label: "name",
      },
      departs: [],
      showDialog: false,
      node: null
    };
  },
  components: {
    TreeTools,
    AddDept,
  },
  created() {
    this.getDepartments();
  },
  methods: {
    async getDepartments() {
      const res = await getDepartments();
      this.company = { name: res.companyName, manager: "负责人" };
      this.departs = tranListToTreeData(res.depts, "");
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    }
  },
};
</script>

<style scoped>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}

.el-dropdown {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
