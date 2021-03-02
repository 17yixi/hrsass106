<template>
  <div v-loading="loading">
    <el-card class="tree-card">
      <tree-tools :tree-node="company" :is-root="true" @addDepts="addDepts"/>
      <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
        <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="getDepartments" @addDepts="addDepts" @editDepts="editDepts"/>
      </el-tree>
    </el-card>
    <add-dept ref="addDept" :show-dialog.sync="showDialog" :tree-node="node" @addDepts="getDepartments" />
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
      node: null,
      loading: false
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
      this.loading = true
      const res = await getDepartments();
      this.company = { name: res.companyName, manager: "负责人", id: "" };
      this.departs = tranListToTreeData(res.depts, "");
      this.loading = false
    },
    addDepts(node) {
      this.showDialog = true
      this.node = node
    },
    editDepts(node) {
      this.showDialog = true
      this.node = node
      this.$refs.addDept.getDepartDetail(node.id)
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
