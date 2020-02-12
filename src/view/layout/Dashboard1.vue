<style scoped>
    
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    
</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">

                <div class="layout-logo-left">
                    <router-link to="/test">首页</router-link>
                </div>

                <Submenu name="1" >
                    <template slot="title">
                        <Icon type="ios-people"></Icon>
                        用户管理
                    </template>

                    <MenuItem name="1-1">
                        <router-link to="/UserManagement/auth">权限</router-link> 
                    </MenuItem>
                    <MenuItem name="1-2">
                    <router-link to="/UserManagement/department">部门</router-link> 
                    </MenuItem>
                    <MenuItem name="1-3">
                    <router-link to="/UserManagement/employee">员工</router-link> 
                    </MenuItem>
                    

                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                       校内工作量
                    </template>
                    <MenuItem name="2-1">
						<router-link to="/inside/inupload">文件录入</router-link> 
						</MenuItem>
                    <MenuItem name="2-2">审核</MenuItem>
                    <MenuItem name="2-3">
						<router-link to="/inside/intable">数据显示（表格）</router-link> 
						</MenuItem>
                     <MenuItem name="2-4">
						 <router-link to="/inside/incharts">数据对比(图)</router-link> 
						 </MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                       校外工作量
                    </template>
                    <MenuItem name="3-1">
						<router-link to="/outside/outupload">文件录入</router-link> 
						</MenuItem>
                    <MenuItem name="3-2">
						审核
						</MenuItem>
                    <MenuItem name="3-3">
						数据修正
						</MenuItem>
                    <MenuItem name="3-4">
						<router-link to="/outside/outtbable">数据显示（表格）</router-link> 
						</MenuItem>
                     <MenuItem name="3-5">
							<router-link to="/outside/outcharts"> 数据对比（图）</router-link> 
						 </MenuItem>
                </Submenu>

                <Submenu name="4">
                    <template slot="title">
                        <Icon type="ios-ionic-outline"></Icon>
                    业绩考核
                    </template>
                    <MenuItem name="4-1">
						 <router-link to="/assessment/assessment_write">数据录入</router-link>
						</MenuItem>
                    <MenuItem name="4-2">
						<router-link to="/assessment/assessment_import">数据导入</router-link>
						</MenuItem>
                    <MenuItem name="4-3">
						<router-link to="/assessment/assessment_table">数据显示（表格）</router-link>
						</MenuItem>
                     <MenuItem name="4-4">
						<router-link to="/assessment/assessment_chart"> 数据对比（图）</router-link>
						 </MenuItem>
                </Submenu>

                <Submenu name="5">
                    <template slot="title">
                        <Icon type="ios-folder-outline"></Icon>
                    文件管理
                    </template>
                     <MenuItem name="5-1"><router-link to="file/fileupload">文件上传</router-link></MenuItem>
                    <MenuItem name="5-2">查看文件</MenuItem>

                </Submenu>


            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">

            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">

            </Header>

            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}">

                    <BreadcrumbItem replace=true>Home</BreadcrumbItem>

                    <BreadcrumbItem replace=true>Components
                            
                    </BreadcrumbItem>

                    <BreadcrumbItem replace=true>Layout</BreadcrumbItem>
                </Breadcrumb>

                <Card>

                    <div style="height: 600px">
                        <router-view>
                            
                        </router-view>
                    </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
    export default {
        return:{
            
        },
        methods:{
            

        },
        computed:{

        },
        watch:{

        }


    }
</script>
