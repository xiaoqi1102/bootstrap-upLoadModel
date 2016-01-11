/**
 * Created by xiaoqi on 2015/12/21.
 */
var Tool=function(){};
Tool.prototype={
  openModel:function(id,callback){
      $("#"+id).modal('show');
      this.formClear(id);
      if(callback){
          callback();
      }
  },
    hideModel:function(id){
        $("#"+id).modal('hide');
    },
    formClear:function(id){
        $('#'+id).find('textarea,input,select').val('');
    },
    getYMD:function(date){
        if(!date){
            return '';
        }
        var d=new Date(date);
        var year= d.getFullYear();
        var mouth= d.getMonth()+1;
        var day= d.getDate();
        var result;
        if(mouth<10){
            mouth='0'+mouth;
        }
        if(day<10){
            day='0'+day;
        }
         result=year+'-'+mouth+'-'+day;
        return result;
    },
};