/**
 * Created by xiaoqi on 2015/12/30.
 */
//todo 此上传插件依赖jquery bootstrap3.3.5 的模态框组件
var upLoadModel=function(options){
    //默认参数
    this.options={
        upLoadBox:'upLoadBox',
        defaultImg:'/images/zanwu.jpg',
        openBtn:'openUpLoadBtn',
        url:'upload.php',
        formId:'upLoadForm',
        imgId:'showImg2',
        modalId:'upLoadModal',
        fileInputId:'absFileInput',
        titleId:'title',
        descriptionId:'description',
        openCallback:function(){

        },
        beforeUploadCallback:function(){},
        successCallback:function(){
            console.log('success upload');
        }
    };
    if(options){
       // debugger;
        if(options.titleId){
            this.options.titleId=options.titleId;
        }
        if(options.descriptionId){
            this.options.descriptionId=options.descriptionId;
        }
        if(options.upLoadBox){
            this.options.upLoadBox=options.upLoadBox;
        }
        if(options.defaultImg){
            this.options.defaultImg=options.defaultImg;
        }
        if(options.openBtn){
            this.options.openBtn=options.openBtn;
        }
        if(options.url){
            this.options.url=options.url;
        }
        if(options.formId){
            this.options.formId=options.formId;
        }
        if(options.imgId){
            this.options.imgId=options.imgId;
        }
        if(options.modalId){
            this.options.modalId=options.modalId;
        }
        if(options.successCallback){
            this.options.successCallback=options.successCallback;
        }
        if(options.openCallback){
            this.options.openCallback=options.openCallback;
        }
        if(options.beforeUploadCallback){
            this.options.beforeUploadCallback=options.beforeUploadCallback;
        }
    }

    this.log(this.options);
   /*this.init();*/
};
upLoadModel.prototype={
    log:function(v){
        console.log(v);
    },
    submit:function(){

    },
    loadModel:function(){
        var modal;
        modal='<div class="modal fade" id="'+this.options.modalId+'">'+
            '    <div class="modal-dialog">'+
            '        <form method="post"  class="form-horizontal" id="'+this.options.formId+'" enctype="multipart/form-data"  >'+
            '            <div class="modal-content">'+
            '                <div class="modal-header">'+
            '                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
            '                    <h4 class="modal-title">上传文件</h4>'+
            '                </div>'+
            '                <div class="modal-body">'+
            '                    <input type="text" id="token" name="token" class="hidden"/>'+
            '                    <div class="form-group">'+
            '                        <div class="col-lg-3 col-lg-offset-2">'+
            '                            <img src="'+this.options.defaultImg+'" class="img-rounded" alt="" id="'+this.options.imgId+'" style="max-width: 100px;max-height: 120px"/>'+
            '                        </div>'+
            '                    </div>'+
            '                    <div class="form-group">'+
            '                        <label for="'+this.options.titleId+'" class="control-label col-lg-2">文件名</label>'+
            '                        <div class="col-lg-7">'+
            '                            <input id="'+this.options.titleId+'" name="title" type="text" class="form-control"/>'+
            '                        </div>'+
            '                    </div>'+
          /*  '                    <div class="form-group">'+
            '                        <label for="'+this.options.descriptionId+'" class="control-label col-lg-2">描述</label>'+
            '                        <div class="col-lg-7">'+
            '                            <textarea name="'+this.options.descriptionId+'" id="'+this.options.descriptionId+'"  class="form-control" rows="3"></textarea>'+
            '                        </div>'+
            '                    </div>'+*/
            '                    <div class="form-group">'+
            '                        <div class="col-lg-7 col-lg-offset-2">'+
            '                            <input type="file" name="'+this.options.fileInputId+'" id="absFileInput" />'+
            '                        </div>'+
            '                    </div>'+
            '                </div>'+
            '                <div class="modal-footer">'+
            '                    <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>'+
            '                    <button type="submit" class="btn btn-primary">上传图片</button>'+
            '                </div>'+
            '            </div><!-- /.modal-content -->'+
            '        </form>'+
            '    </div><!-- /.modal-dialog -->'+
            '</div><!-- /.modal -->';

        var isHaveModel=document.getElementById(this.options.modalId);
        if(isHaveModel){
            console.error('modalId 与 dom 原有元素重复 请重新设置');
        }else{

            $('#'+this.options.upLoadBox).append(modal);
            console.log(this.options.upLoadBox);
            this.log('has append');
        }
    },
    binding:function(){
        //debugger;
        //todo 依赖工具集tool.js
        var tool=new Tool();
        var that=this;
        var title,
            description,
            file,
            token,
            upLoadObj;
      $('#'+this.options.openBtn).bind('click',function(){
          $('#'+that.options.imgId).attr('src',that.options.defaultImg);
          tool.openModel(that.options.modalId);
          that.options.openCallback();
          //$('#'+that.options.modalId).modal('show');
      });
        $('#'+this.options.upLoadBox+' #'+this.options.fileInputId).bind('change',function(){
            file=document.getElementById(that.options.fileInputId).files[0];
            var filePath=   window.URL.createObjectURL(document.getElementById(that.options.fileInputId).files[0]);
            $('#'+that.options.imgId).attr('src',filePath);
        });
      $('#'+this.options.upLoadBox+' #'+this.options.formId).bind('submit',function(e){
          e.preventDefault();
          var xhr=new XMLHttpRequest();
          xhr.open('post',that.options.url,true);
         // debugger;
          xhr.onreadystatechange=function(){
             if(xhr.readyState==4){
                 switch (xhr.status){
                     case 200:
                         var res=xhr.responseText;
                         res= JSON.parse( res)
                         console.log( res );
                        // console.log(res.isError);
                         if(!res.isError){
                            // this.log(res);
                             that.options.successCallback(res);
                             setTimeout(function(){
                                 $('#'+that.options.modalId).modal('hide');
                             },500);
                         }else{
                          fit.showMessageModal('提示信息',res.errorDesc,function(){},function(){});
                         }
                         break;
                     case  403:
                         fit.loginTimeout();
                         break;
                 }

             }
          };
          var formData=new FormData();

          title=$('#'+that.options.upLoadBox+' #'+that.options.titleId).val();
          description=$('#'+that.options.upLoadBox+' #'+that.options.descriptionId).val();
          token=fit.getToken();
          file=document.getElementById(that.options.fileInputId).files[0];
        //  debugger;
          upLoadObj={
              title:title,
              token:token,
            /*  description:description,*/
              file:file
          };
          that.options.beforeUploadCallback(upLoadObj);
          if(file==null){
              console.log('file is null');
              fit.showMessageModal('温馨提示','请先选择文件再上传',null,function(){});
              return;
          }
          formData.append('title',title);
       //   formData.append('description',description);
          formData.append('file',file);
          formData.append('token',token);

          xhr.send(formData);

      });
    },
    init:function(){
       this.loadModel();
        this.binding();
    }

};