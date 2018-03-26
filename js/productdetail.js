var mm,id;
$(function(){
   mm=new Mmm();
   id = getQueryString('id');
   mm.getProductDetail(id); 
})


var Mmm=function(){};

Mmm.prototype={
    /*获取商品详情*/ 
    getProductDetail: function(id){
        $.ajax({
            url: 'http://mmb.ittun.com/api/getdiscountproduct',
            data: {productid: id},
            success: function(data){
                console.log(data);
                var html=template('proDetailTemp',data);
                $('#main').html(html);
            }
        })
    }

}


/*获取地址栏中传递的参数*/
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}
