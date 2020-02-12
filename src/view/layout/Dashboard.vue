<template>
  <el-container class="home-container">
    <el-aside width="200px">

      <el-menu :unique-opened="true" router :default-active="$route.path" @select="handleSelect">
              <div class="user-menu-box" v-for="menu in menus" :key="menu.id">
                  <el-menu-item v-if="!menu.child" :index="menu.path">
                      <icon :name="menu.icon" :w="20" :h="20"></icon>
                      <span slot="title" v-text="menu.name"></span>
                  </el-menu-item>
                  <el-submenu v-if="menu.child" :index="menu.path">
                      <template slot="title">
                          <icon :name="menu.icon" :w="20" :h="20"></icon>
                          <span slot="title" v-text="menu.name"></span>
                      </template>
                      <el-menu-item-group>
                          <el-menu-item v-for="subMenu in menu.child" :key="subMenu.id" v-text="subMenu.name"
                              :index="subMenu.path"></el-menu-item>
                      </el-menu-item-group>
                  </el-submenu>
              </div>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
       <div class="brclass">
         <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="o in breadcrumbList" :key="o.id">{{o.name}}
              </el-breadcrumb-item>
          </el-breadcrumb>
       </div>
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

  export default {

      data () {
          return {
              activeMenu: '',
              indexBreadcrumbs: [],
              menus: [{
                id:'1',
                name:'首页',
                path:'/dashboard'
              },{
                  id: '2',
                  name: '用户管理',
                  icon: 'menhuguanli',
                  path: '#2',
                  child: [{
                      id: '1-1',
                      name: '权限',
                      path: '/auth'
                  }]
              }, ]
          }
      },
      watch: {
          $route () {
              this.handChange()
          }
      },
      computed: {
          breadcrumbList () {
              let breadcrumbs = []
              let menuList = this.menus
              this.indexBreadcrumbs.map(item => {
                  for (let i = 0; i < menuList.length; i++) {
                      if (item === menuList[i].path) {
                          breadcrumbs.push(menuList[i])
                          if (menuList[i].child) {
                              menuList = menuList[i].child
                          }
                          break;
                      }
                  }
              })
              return breadcrumbs
          }
      },
      methods: {
          handChange () {
              this.$emit('hand-change', this.breadcrumbList)
          },
          handleSelect (index, indexPath) {
              this.indexBreadcrumbs = indexPath
          }
      },
      created () {
          this.handChange()
      }
  }
</script>

<style scoped>
  .home-container{
      height: 100% ;
  }
  .el-header{
      background-color: #FFFFFF;
      color: #333;
      text-align: center;
      line-height: 60px;
  }

  .el-aside {
            background-color: #FFFFFF;
      color: #333;
      text-align: center;
      line-height: 200px;
  }

  .el-main {
      background-color: #E9EEF3;
      color: #333;
      text-align: center;
      line-height: 160px;
      height: 100%;
  }

  body > .el-container {
      margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
      line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
      line-height: 320px;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
  }
  .brclass{
    position: absolute;
    top: 25px;
  }

</style>
