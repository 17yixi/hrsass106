<template>
  <div>
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row style="height: 60px">
            <el-button icon="el-icon-plus" size="small" type="primary" @click="showDialog = true"
              >新增角色</el-button
            >
          </el-row>
          <el-table border="" :data="list">
            <el-table-column label="序号" width="120" type="index" />
            <el-table-column label="角色名称" width="240" prop="name" />
            <el-table-column label="描述" prop="description" />
            <el-table-column label="操作">
              <template slot-scope="{ row }">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row.id)"
                  >编辑</el-button
                >
                <el-button size="small" type="danger" @click="deleteRole(row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-row type="flex" justify="center" align="middle" style="height: 60px">
            <!-- 分页组件 -->
            <el-pagination
              :current-page="page.page"
              :page-size="page.pagesize"
              :total="page.total"
              layout="prev, pager, next"
              @current-change="changePage"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司管理" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top: 50px">
            <el-form-item label="公司名称">
              <el-input disabled style="width: 400px" v-model="formData.name" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input disabled style="width: 400px" v-model="formData.companyAddress" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input disabled style="width: 400px" v-model="formData.mailbox" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="3"
                disabled
                style="width: 400px"
                v-model="formData.remarks"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog title="编辑弹层" :visible="showDialog" @close="btnCancel">
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="120px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="roleForm.description" />
        </el-form-item>
      </el-form>
      <!-- 底部 -->
      <el-row slot="footer" type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button size="small" type="primary" @click="btnOK">确定</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  getRoleList,
  getCompanyInfo,
  deleteRole,
  getRoleDetail,
  updateRole,
  addRole,
} from "@/api/setting";
import { mapGetters } from "vuex";
export default {
  name: "setting",
  data() {
    return {
      activeName: "first",
      list: [],
      page: {
        page: 1,
        pagesize: 2,
        total: 0,
      },
      formData: {},
      showDialog: false,
      roleForm: {
        name: "",
        description: "",
      },
      rules: {
        name: [{ required: true, message: "角色名称不能为空", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["companyId"]),
  },
  methods: {
    async getRoleList() {
      const { rows, total } = await getRoleList(this.page);
      this.list = rows;
      this.page.total = total;
    },
    changePage(newPage) {
      this.page.page = newPage;
      this.getRoleList();
    },
    async getCompanyInfo() {
      const res = await getCompanyInfo(this.companyId);
      this.formData = res;
    },
    async deleteRole(id) {
      try {
        await this.$confirm("确认删除该角色？");
        await deleteRole(id);
        this.getRoleList();
        this.$message.success("删除角色成功！");
      } catch (error) {
        console.log(error);
      }
    },
    async editRole(id) {
      this.roleForm = await getRoleDetail(id);
      // console.log(res);
      this.showDialog = true;
    },
    btnCancel() {
      this.roleForm = {
        name: "",
        description: "",
      };
      this.showDialog = false;
      this.$refs.roleForm.resetFields();
    },
    async btnOK() {
      try {
        await this.$refs.roleForm.validate();
        if (this.roleForm.id) {
          await updateRole(this.roleForm);
        } else {
          await addRole(this.roleForm);
        }
        this.getRoleList();
        this.$message.success("操作成功");
        this.showDialog = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getRoleList();
    this.getCompanyInfo();
  },
};
</script>

<style></style>
