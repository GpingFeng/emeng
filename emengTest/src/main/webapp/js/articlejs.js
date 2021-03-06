/**
 * Created by guiliang on 2017/6/14 0014.
 */
$(function () {
    layui.use(['laypage','layer','form'], function() {
        var laypage = layui.laypage;
        var layer = layui.layer;
        var form = layui.form();

        var nums = 10;  //一页10条
        var pages= 10;  //共10页 模拟 实际用ajax获取到
        var title;

        /*urllink不同分类的文章访问页面总数和页面内容的接口*/
        /*a-l为类型为1-12的文章,w和x代表阅读书目和精品在线,*/
        var url_link_pages = ['z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y'];
        var url_link_passages = ['Z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'];
        //获取当前分类type
        var tag = $('.iframe-content').data('tag');
        console.log('url总页数链接:'+url_link_pages[tag]);
        console.log('url文章对象链接:'+url_link_passages[tag]);

        //ajax获取总页数,根据不同type获取
        $.ajax({
            url: ''/*url_link_pages[tag]*/,    //请求的url地址
            dataType: "json",   //返回格式为json
            async: true, //请求是否异步，默认为异步，这也是ajax重要特性
            data: { "type": tag },    //可以不用
            type: "POST",   //请求方式
            success: function(data) {
                //请求成功时处理
                pages = data.nums;
            },
            error: function() {
                //请求出错处理
                pages = 20;
                laypage({
                    cont: 'page'
                    ,pages:pages //得到总页数
                    ,skip:true
                    ,jump: function (obj) {
                        laypagesuccess(obj)
                    }
                });
            }
        });



        //分页跳转函数
        function  laypagesuccess(obj) {
            /* alert(obj.curr);//obj.curr表示选择的页码*/
            console.log('当前页:'+obj.curr);
            //ajax获取文章列表
            $.ajax({
                url: "",    //请求的url地址  url_link_passages[tag]
                dataType: "json",   //返回格式为json
                async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                data: { "pageNum": obj.curr ,"pageSize":10},    //参数值 可能不用
                type: "POST",   //请求方式
                success: function(data) {
                    //请求成功时处理
                    pages = data.nums;
                },
                error: function() {
                    //请求出错处理

                    ajaxPageContent();
                }
            });
        }

        //ajax请求文章页函数（含有编辑删除处理函数）
        function ajaxPageContent() {
            /* alert('获取投稿列表失败');*/
            //渲染函数（其实应该在success里面）
            var data = {'data':
               [{'id':79,'title':'我是动态获取的文章标题','content':'我是动态的内容而且要经过删减的是吧是的呀哈哈哈我也不知道什么鬼图片怎么办啦？','author':'老茶客','publish_time':'2016-15-15','up':0},
                {'id':1,'title':'我是动态获取的标题','content':'我是动态的内容而且要经过删减的是吧是的呀哈哈哈我也不知道什么鬼图片怎么办啦？','author':'老茶客','publish_time':'2016-15-15','up':0},
                {'id':2,'title':'我是动态获取的标题','content':'我是动态的内容而且要经过删减的是吧是的呀哈哈哈我也不知道什么鬼图片怎么办啦？','author':'老茶客','publish_time':'2016-15-15','up':1},
                {'id':3,'title':'我是动态获取的标题','content':'我是动态的内容而且要经过删减的是吧是的呀哈哈哈我也不知道什么鬼图片怎么办啦？','author':'老茶客','publish_time':'2016-15-15','up':1},
                {'id':4,'title':'我是动态获取的标题','content':'我是动态的内容而且要经过删减的是吧是的呀哈哈哈我也不知道什么鬼图片怎么办啦？','author':'老茶客','publish_time':'2016-15-15','up':0},
                {'id':5,'title':'我是动态获取的标题','content':'我是动态的内容而且要经过删减的是吧是的呀哈哈哈我也不知道什么鬼图片怎么办啦？','author':'老茶客','publish_time':'2016-15-15','up':1},
                {'id':6,'title':'我是动态获取的标题','content':'我是动态的内容而且要经过删减的是吧是的呀哈哈哈我也不知道什么鬼图片怎么办啦？','author':'老茶客','publish_time':'2016-15-15','up':0},
                {'id':7,'title':'我是动态获取的标题','content':'我是动态的内容而且要经过删减的是吧是的呀哈哈哈我也不知道什么鬼图片怎么办啦？','author':'老茶客','publish_time':'2016-15-15','up':1},
                {'id':8,'title':'我是动态获取的标题','content':'我是动态的内容而且要经过删减的是吧是的呀哈哈哈我也不知道什么鬼图片怎么办啦？','author':'老茶客','publish_time':'2016-15-15','up':0},
                {'id':900,'title':'我是动态获我是动态获取的标题我是动态获取的标题我是动态获取的标题我是动态获取的标题我是动态获取的标题我是动态获取的标题取的标题','content':'我是动态的而且要经过删减的是吧是的呀而且要经过删减的是吧是的呀而且要经过删减的是吧是的呀而且要经过删减的是吧是的呀而且要经过删减的是吧是的呀而且要经过删减的是吧是的呀而且要经过删减的是吧是的呀而且要经过删减的是吧是的呀内容而且要经过删减的是吧是的呀哈哈哈我也不知道什么鬼图片怎么办啦？','author':'老茶客','publish_time':'2016-15-17','up':1}]
            }
            var $operation = '<td class="td-manage"><a title="编辑" href="javascript:;" class="my-edit" style="text-decoration:none"><i class="layui-icon">&#xe642;</i></a><a title="删除" href="javascript:;"  class="my-delete" style="text-decoration:none"><i class="layui-icon">&#xe640;</i></a></td>';
            //渲染数据
            var $operation_up = '<td class="td-manage"><a title="编辑" href="javascript:;" class="my-edit" style="text-decoration:none"><i class="layui-icon">&#xe642;</i></a><a title="删除" href="javascript:;"  class="my-delete" style="text-decoration:none"><i class="layui-icon">&#xe640;</i></a><a title="置顶" href="javascript:;" class="my-up" style="text-decoration:none"><i class="layui-icon">&#xe62f;</i></a></td>';
            var $operation_down = '<td class="td-manage"><a title="编辑" href="javascript:;" class="my-edit" style="text-decoration:none"><i class="layui-icon">&#xe642;</i></a><a title="删除" href="javascript:;"  class="my-delete" style="text-decoration:none"><i class="layui-icon">&#xe640;</i></a><a title="取消置顶" href="javascript:;" class="my-down" style="text-decoration:none"><i class="layui-icon">&#xe601;</i></a></td>';
            var $tbody = $('.iframe-content .layui-table tbody');
            $tbody.html("");
            $.each(data.data,function (index,element) {
                var $tr = $('<tr></tr>');
                $tr.data('ids',element.id)
                $tr.append("<td class='article-title' style='width: 20em'>"+element.title+"</td>");
                $tr.append("<td class='article-content'  style='width: 30em'>"+element.content+"</td>");
                $tr.append("<td>"+element.author+"</td>");
                $tr.append("<td>"+element.publish_time+"</td>");
                if(tag==1){
                    if(element.up==0)
                        $tr.append($operation_up);
                    else if(element.up==1)
                        $tr.append($operation_down);
                }
                else $tr.append($operation);
                $tbody.append($tr);

                /*/var $my_tr = $('.layui-table tr');
                 if($my_tr.length==11)
                 for(i=0;i<11;i++)
                 console.log($($my_tr[i]).data['ids']);*/
                /*每个编辑按钮的注册事件*/
                var $my_edits = $('.my-edit i');
                /* alert($my_edits.length);*/
                if($my_edits.length==10){
                    $my_edits.on('click',contributeEdit)
                }

                /*每个删除按钮注册事件*/
                var $my_delete = $('.my-delete');
                if($my_delete.length==10){
                    $my_delete.on('click',contributeDelete)
                }
            })
        }


        /*编辑处理函数*/
        function contributeEdit() {
            /*console.log($(this).parents('tr').data('ids'));*/
            var id = $(this).parents('tr').data('ids');
            console.log('编辑的文章id:'+id);
            var title = $(this).parents('tr').children().eq(0).text();
            var content = $(this).parents('tr').children().eq(1).text();
            layer.open({
                type: 2,
                area: ['530px', '530px'],
                fix: false, //不固定
                maxmin: true,
                shadeClose: true,
                shade:0.4,
                title: id,
                offset: '30px',
                content: 'contributeEdit.html',
                end: function () {
                    location.reload();
                },//请求方式
                success:function () {
                    $.ajax({
                        url: "",    //请求的url地址
                        dataType: "json",   //返回格式为json
                        async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                        data: { "id": id },    //参数值
                        type: "POST",
                        success: function(data) {
                            //请求成功时处理
                            pages = data.nums;
                        },
                        error: function() {
                            //请求出错处理
                            /*alert('获取投稿内容失败');*/
                            var data = {'id':79,'title':'我是动态获取的标题第二次ajax获取到的','content':'<p style="color:red">我是动态的内容而且要经过删减的是吧是的呀哈哈哈我也不知道什么鬼图片怎么办啦？</p><img src="images/banner.png" style="width: 200px"/>','author':'老茶客','publish_time':'2016-15-15'}//模拟返回文章
                            /*alert(data.title);*/
                            /* var a = document.getElementById('layui-layer-iframe1').contentWindow.document.getElementsByClassName('contribute-edit-title');
                             console.log(a)*/
                            $("#layui-layer-iframe1").contents().find("#title").val(data.title);
                            $("#layui-layer-iframe1").contents().find("#contribute-edit-content").html(data.content);
                            $("#layui-layer-iframe1").contents().find("#contribute-type").on('change',function () {
                                if($(this).val()==12){
                                    $("#layui-layer-iframe1").contents().find("#teest").show();
                                }
                                else $("#layui-layer-iframe1").contents().find("#teest").hide();
                            });
                            /* $("#layui-layer-iframe1").contents().find("#contribute-pass").on('click',function(){
                             /!*alert($('.layui-layer-title').text());//文章对应的id*!/
                             if( ($("#layui-layer-iframe1").contents().find("#contribute-type").val()==12&&$("#layui-layer-iframe1").contents().find("#recommend_degree").val()!='')||$("#layui-layer-iframe1").contents().find("#contribute-type").val()!=12){
                             alert('成功')
                             }
                             })*/
                            /* form.on('submit(go)', function(data){
                             alert('submit');
                             return false;
                             });*/
                            /* $("#layui-layer-iframe1").contents().find("#contribute_pass").on('click',function () {
                             $("#layui-layer-iframe1").contents().find("#contribute_submit").click();

                             layer.alert("保存成功", {icon: 6},function () {
                             // 获得frame索引
                             /!* var index = parent.layer.getFrameIndex(window.name);
                             console.log(index)
                             //关闭当前frame
                             parent.layer.close(index);
                             layer.closeAll('iframe');
                             });

                             return false;

                             })*/
                            $("#layui-layer-iframe1").contents().find("#contribute_form").on('submit',function (e) {
                                /*console.log($('.layui-layer-title').text());
                                 console.log($("#layui-layer-iframe1").contents().find("#contribute-type").val());
                                 console.log($("#layui-layer-iframe1").contents().find("#recommend_degree").val());*/
                                var $contribute_id = $('.layui-layer-title').text();
                                var $contribute_type = $("#layui-layer-iframe1").contents().find("#contribute-type").val();
                                var $contribute_degree = $("#layui-layer-iframe1").contents().find("#contribute-type").val()==12?$("#layui-layer-iframe1").contents().find("#recommend_degree").val():null;
                                console.log($contribute_id);
                                console.log($contribute_type);
                                console.log($contribute_degree);
                                //把投稿数据传到后台
                                $.ajax({
                                    url: "",    //请求的url地址
                                    dataType: "json",   //返回格式为json
                                    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                                    data: { "id": $contribute_id,'type':$contribute_type,'recommond':$contribute_degree },    //参数值 可能不用
                                    type: "POST",   //请求方式
                                    success: function(data) {
                                        //请求成功时处理
                                        pages = data.nums;
                                    },
                                    error: function() {
                                        //请求出错处理
                                        /*alert('获取总页数失败');*/
                                        layer.alert("通过投稿成功", {icon: 6},function () {
                                            // 获得frame索引
                                            //关闭当前frame
                                            layer.closeAll('iframe');
                                        });
                                    }
                                });
                                return false;
                            })

                        }
                    });
                }
            });
            /*alert($('.layui-layer-title').html())//这里保存的是点击的文章id*/
            /*投稿内容页显示代码ajax请求*/
            var id = $('.layui-layer-title').text();
            /*alert(id)*/

        }

        /* 删除处理函数*/
        function contributeDelete() {
            var id = $(this).parents('tr').data('ids');
            /*alert(id);*/
            /*删除某篇投稿ajax及接口*/
            layer.confirm('确认要删除吗？',function(index){
                //捉到被选中的，发异步进行删除
                $.ajax({
                    url: "",    //请求的url地址
                    dataType: "json",   //返回格式为json
                    async: true, //请求是否异步，默认为异步，这也是ajax重要特性
                    data: { "id": id },    //参数值 可能不用
                    type: "POST",   //请求方式
                    success: function(data) {
                        //请求成功时处理
                        pages = data.nums;
                    },
                    error: function() {
                        //请求出错处理
                        /*弹出删除投稿成功并刷新页面*/
                        layer.msg('删除成功', {icon: 1});
                        console.log('删除的文章id:'+id)
                        window.location.reload();
                    }
                });
            });

        }

    });

})



