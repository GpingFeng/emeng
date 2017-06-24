/**
 * Created by guiliang on 2017/6/14 0014.
 */
$(function () {
    layui.use(['laypage','layer','form'], function() {
        var laypage = layui.laypage;
        var layer = layui.layer;
        var form = layui.form();

        var nums = 10;  //一页10条

        //ajax获取总页数,根据不同type获取
        $.ajax({
            url: 'getAllPermission',    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: { "pageNum": 1 ,"pageSize":10},    //可以不用
            type: "POST",   //请求方式
            success: function(data) {
                //请求成功时处理
                // console.log(vedioL);
                pages = data.length%10==0?data.length/10:(data.length/10+1);
                laypage({
                    cont: 'page'
                    ,pages:pages //得到总页数
                    ,skip:true
                    ,jump: function (obj) {
                        laypagesuccess(obj)
                    }
                }); 
            },
            error: function() {
                //请求出错处理
                pages = data.nums;
            }
        });

        //分页跳转函数
        function  laypagesuccess(obj) {
            console.log('当前页:'+obj.curr);
            //ajax获取文章列表
            $.ajax({
                url: "getAllPermission",    //请求的url地址  url_link_passages[tag]
                dataType: "json",   //返回格式为json
                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                data: { "pageNum": obj.curr ,"pageSize":10},    //参数值 可能不用
                type: "POST",   //请求方式
                success: function(data) {
                    //请求成功时处理
                    ajaxPageContent(data);
                },
                error: function() {
                    //请求出错处理
                    pages = data.nums; 
                }
            });
        }

        //ajax请求文章页函数（含有编辑删除处理函数）
        function ajaxPageContent(data) {
            /* alert('获取投稿列表失败');*/
            // var data = [{"id":3657,"mapping":"adverinsert","description":"添加广告","function":null,"state":1},{"id":3658,"mapping":"adverPage","description":"广告位分页查询","function":null,"state":1},{"id":3659,"mapping":"adverinsertSel","description":"添加广告","function":null,"state":1},{"id":3660,"mapping":"adverselectByPK","description":"根据id查找广告","function":null,"state":1},{"id":3661,"mapping":"adverupdateByPK","description":"根据id更新广告","function":null,"state":1},{"id":3662,"mapping":"adverupdateByPKS","description":"根据id更新广告","function":null,"state":1},{"id":3663,"mapping":"adverdelPK","description":"根据id删除广告","function":null,"state":1},{"id":3664,"mapping":"picupload","description":"文件上传接口","function":null,"state":1},{"id":3665,"mapping":"download1","description":"未设置解释","function":null,"state":1},{"id":3666,"mapping":"sousuo","description":"全文搜索","function":null,"state":1},{"id":3667,"mapping":"/image/getRandNum","description":"未设置解释","function":null,"state":1},{"id":3668,"mapping":"linksinsert","description":"插入链接","function":null,"state":1},{"id":3669,"mapping":"linkPage","description":"友情链接分页查询","function":null,"state":1},{"id":3670,"mapping":"linksinsertSelect","description":"插入链接","function":null,"state":1},{"id":3671,"mapping":"linksupdPKSelect","description":"更新链接","function":null,"state":1},{"id":3672,"mapping":"linksselectPK","description":"根据id查找查找链接","function":null,"state":1},{"id":3673,"mapping":"linksupdPK","description":"更新链接","function":null,"state":1},{"id":3674,"mapping":"linksdeletePK","description":"根据id删除链接","function":null,"state":1},{"id":3675,"mapping":"meetinsert","description":"添加会议信息","function":null,"state":1},{"id":3676,"mapping":"meetingPage","description":"会议分页查询","function":null,"state":1},{"id":3677,"mapping":"meetinsertSel","description":"添加会议信息","function":null,"state":1},{"id":3678,"mapping":"meetsousuo","description":"搜索会议","function":null,"state":1},{"id":3679,"mapping":"meetSelByPK","description":"根据id查找会议信息","function":null,"state":1},{"id":3680,"mapping":"meetupdByPK","description":"根据id更新会议信息(不包含会议内容）","function":null,"state":1},{"id":3681,"mapping":"meetupdByPKS","description":"根据id更新会议信息","function":null,"state":1},{"id":3682,"mapping":"meetdelPK","description":"根据id删除会议信息","function":null,"state":1},{"id":3683,"mapping":"meetupdByPKWB","description":"根据id更新会议(包含会议内容）","function":null,"state":1},{"id":3684,"mapping":"naviInsert","description":"添加","function":null,"state":1},{"id":3685,"mapping":"naviInsertS","description":"添加","function":null,"state":1},{"id":3686,"mapping":"naviselPK","description":"根据id查找","function":null,"state":1},{"id":3687,"mapping":"naviupPK","description":"根据id更新","function":null,"state":1},{"id":3688,"mapping":"naviupdatePKS","description":"根据id更新","function":null,"state":1},{"id":3689,"mapping":"naviselect","description":"查找所有二级菜单","function":null,"state":1},{"id":3690,"mapping":"navidelPK","description":"删除","function":null,"state":1},{"id":3691,"mapping":"/update/passage","description":"未设置解释","function":null,"state":1},{"id":3692,"mapping":"/insert/passage","description":"未设置解释","function":null,"state":1},{"id":3693,"mapping":"/delete/passage","description":"未设置解释","function":null,"state":1},{"id":3694,"mapping":"/getAllPermission","description":"超级管理员获取所有权限信息","function":null,"state":1},{"id":3695,"mapping":"/updatePermission","description":"修改权限信息","function":null,"state":1},{"id":3696,"mapping":"postinsert","description":"插入论坛","function":null,"state":1},{"id":3697,"mapping":"postPage","description":"论坛分页查询","function":null,"state":1},{"id":3698,"mapping":"userpostPage","description":"论坛分页查询","function":null,"state":1},{"id":3699,"mapping":"postsePK","description":"根据id查找论坛","function":null,"state":1},{"id":3700,"mapping":"postupPK","description":"更新","function":null,"state":1},{"id":3701,"mapping":"postupPKS","description":"更新","function":null,"state":1},{"id":3702,"mapping":"postdePK","description":"根据id删除论坛","function":null,"state":1},{"id":3703,"mapping":"postupPKW","description":"更新","function":null,"state":1},{"id":3704,"mapping":"post_like","description":"用户论坛点赞","function":null,"state":1},{"id":3705,"mapping":"/addRole","description":"增加角色","function":null,"state":1},{"id":3706,"mapping":"/getAllRole","description":"超级管理员获取所有角色","function":null,"state":1},{"id":3707,"mapping":"/updateRole","description":"修改角色","function":null,"state":1},{"id":3708,"mapping":"/updateRolePermission","description":"修改角色权限","function":null,"state":1},{"id":3709,"mapping":"/getPermissionsByRole","description":"获取角色权限","function":null,"state":1},{"id":3710,"mapping":"/deleteSchool","description":"删除学校信息","function":null,"state":1},{"id":3711,"mapping":"/getSchools","description":"获取学校信息","function":null,"state":1},{"id":3712,"mapping":"/insertSchool","description":"添加学校信息","function":null,"state":1},{"id":3713,"mapping":"/updateSchool","description":"修改学校信息","function":null,"state":1},{"id":3714,"mapping":"/test","description":"未设置解释","function":null,"state":1},{"id":3715,"mapping":"testException","description":"未设置解释","function":null,"state":1},{"id":3716,"mapping":"/test1","description":"未设置解释","function":null,"state":1},{"id":3717,"mapping":"userApplyform","description":"后台生成报名表(普通方式报名)","function":null,"state":1},{"id":3718,"mapping":"applyPage","description":"报名表分页查询","function":null,"state":1},{"id":3719,"mapping":"userApplyformCode","description":"后台生成报名表(邀请码方式报名)","function":null,"state":1},{"id":3720,"mapping":"selectAllApply","description":"管理员查看所有报名信息","function":null,"state":1},{"id":3721,"mapping":"selectByPrimaryKey","description":"根据id查找用户报名信息","function":null,"state":1},{"id":3722,"mapping":"upByPK","description":"根据user_id进行更新","function":null,"state":1},{"id":3723,"mapping":"upByPKS","description":"根据user_id进行更新","function":null,"state":1},{"id":3724,"mapping":"deleteByPrimaryKey","description":"根据主键删除报名信息","function":null,"state":1},{"id":3725,"mapping":"/findUser","description":"根据信息查询用户","function":null,"state":1},{"id":3726,"mapping":"/login","description":"用户登录","function":null,"state":1},{"id":3727,"mapping":"/logout","description":"用户退出登录","function":null,"state":1},{"id":3728,"mapping":"/addUser","description":"添加用户/用户注册","function":null,"state":1},{"id":3730,"mapping":"/deleteUser","description":"删除用户","function":null,"state":1},{"id":3731,"mapping":"/getUserByRole","description":"获取某种角色的所有用户","function":null,"state":1},{"id":3732,"mapping":"/getAllUser","description":"获取所有用户以及角色","function":null,"state":1},{"id":3733,"mapping":"/submit/page","description":"用户投稿页面跳转","function":null,"state":1},{"id":3734,"mapping":"/submit/passage","description":"用户投稿提交","function":null,"state":1},{"id":3735,"mapping":"videodownload","description":"视频下载","function":null,"state":1},{"id":3736,"mapping":"addvideo","description":"进入视频管理添加页面","function":null,"state":1},{"id":3737,"mapping":"videoinsert","description":"视频上传","function":null,"state":1},{"id":3738,"mapping":"videoPage","description":"视频资源分页查询","function":null,"state":1},{"id":3739,"mapping":"videoselectBycha","description":"根据章节id查找所有","function":null,"state":1},{"id":3740,"mapping":"videoselectByle","description":"根据课程id查找所有","function":null,"state":1},{"id":3741,"mapping":"videoselectPK","description":"根据主键查找视频","function":null,"state":1},{"id":3742,"mapping":"selectlession","description":"选择课程之后，加载该课程的所有章节","function":null,"state":1},{"id":3743,"mapping":"videoupdByPK","description":"全部字段更新","function":null,"state":1},{"id":3744,"mapping":"videoupdByPKS","description":"选择字段更新","function":null,"state":1},{"id":3745,"mapping":"videodelByPK","description":"根据id删除视频","function":null,"state":1},{"id":3746,"mapping":"/getAllUser1111111111","description":"获取所有用户以及角色","function":null,"state":1},{"id":3747,"mapping":"manageEmeng","description":"未设置解释","function":null,"state":1}]

            var $operation = '<td class="td-manage"><a title="编辑" href="javascript:;" class="my-edit" style="text-decoration:none"><i class="layui-icon" style="margin:0 20px;">&#xe642;</i></a></td>';
            //渲染数据
            var $tbody = $('.iframe-content .layui-table tbody');
            $tbody.html("");
            var my_length = data.length;
            $.each(data,function (index,element) {
                var $tr = $('<tr></tr>');
                $tr.data('ids',element.id)
                $tr.append("<td class='mapping' style='width: 110px;'>"+element.mapping+"</td>");
                $tr.append("<td class='description'  style='width: 10em'>"+element.description+"</td>");
                $tr.append("<td class='function'>"+element.function+"</td>");
                $tr.append($operation);
                $tbody.append($tr);

                /*每个编辑按钮的注册事件*/
                var $my_edits = $('.my-edit i');
                /* alert($my_edits.length);*/
                if($my_edits.length==my_length){
                    $my_edits.on('click',authorityEdit)
                }
            })
        }

        // 编辑用户处理函数，点击添加图标的时候触发
        function authorityEdit() {
            var id = $(this).parents('tr').data('ids');
            console.log('编辑的URlid:'+id);
            var mapping1 = $(this).parents('tr').children('td.mapping').text();
            var fun1 = $(this).parents('tr').children('td.function').text();

            layer.open({
                type: 2,
                area: ['530px', '530px'],
                fix: false, //不固定
                maxmin: true,
                shadeClose: true,
                shade:0.4,
                title: id,
                offset: '30px',
                content: 'authorityEdit.html',
                end: function () {
                    location.reload();
                },//请求方式
                success:function () {
                            //插入数据
                            $("#layui-layer-iframe1").contents().find("#authorityInfoform input.id").val(mapping1);
                            $("#layui-layer-iframe1").contents().find("#authorityInfoform textarea.text").val(fun1);
             
                            //提交之后的处理
                            $("#layui-layer-iframe1").contents().find("#authorityInfoform").on('submit',function (e) {
                            //取得修改后的值
                            var afterMapping = $("#layui-layer-iframe1").contents().find("#authorityInfoform input.id").val();
                            var afterFun = $("#layui-layer-iframe1").contents().find("#authorityInfoform textarea.text").val();
                            
                            console.log(afterFun);
                            console.log(afterMapping);
                                //把数据传到后台
                                $.ajax({
                                    url: "/updatePermission",    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                                    data :{"id":id,"function":afterFun,"mapping":afterMapping},
                                     // data: { "id": $contribute_id,'type':$contribute_type,'recommond':$contribute_degree },    //参数值 可能不用
                                    type: "POST",   //请求方式
                                    success: function(data) {
                                        //请求成功时处理
                                        layer.alert("添加成功", {icon: 6},function () {
                                            // 获得frame索引
                                            layer.closeAll('iframe');
                                        });
                                    },
                                    error: function() {
                                        //请求出错处理
                                       alert("请求失败啦");
                                    }
                                });
                                return false;
                            });

                }
            });

        }
    });
})



