/**
 * Created by guiliang on 2017/6/6 0006.
 */
layui.use(['element'], function() {
    $ = layui.jquery;
    element = layui.element();

   /* $('#contribute_list').on('click',function () {
        var _href = $(this).data('href');
        console.log(_href);
        $('.myframe').attr('src',_href);
    })*/

$('.left .layui-side-scroll ul li a[data-href]').on('click',function () {
    var data_href = $(this).data('href');
    console.log(data_href);
    $('.myframe').attr('src',data_href);
})
})