define(["directives/directives"],function(e){e.directive("directCreatePost",["$compile","deploydService","$cookies","authServices","$rootScope",function(e,t,n,r,i){function s(e,n,s){function o(e,t){switch(t){case"Other":f(e,"other");break;case"BehTahan":f(e,"complain");break;case"F&B":f(e,"fnb");break;case"Sport":f(e,"sport");break;case"LoveStory":f(e,"love");break;case"Entertainment":f(e,"entertainment");break;case"S&R":f(e,"salesnrent");break;case"L&F":f(e,"lnf");break;default:f(e,"public")}}function u(e){var t=document.createElement("canvas"),n=e.width,r=e.height,i=800,s=600;n>r?n>i&&(r=Math.round(r*=i/n),n=i):r>s&&(n=Math.round(n*=s/r),r=s),t.width=n,t.height=r;var o=t.getContext("2d");return o.drawImage(e,0,0,n,r),t.toDataURL("image/jpeg",.7)}function a(t,r){var i=$(n).find("#imgInp")[0];if(i.files&&i.files[0]){var s=new FileReader;s.readAsArrayBuffer(i.files[0]),s.onload=function(n){var i=new Blob([n.target.result]);window.URL=window.URL||window.webkitURL;var s=window.URL.createObjectURL(i),o=new Image;o.src=s,o.onload=function(){var n=u(o),i=n.replace(/^data:image\/(png|jpeg|jpg);base64,/,"");$.ajax({xhr:function(){var t=new window.XMLHttpRequest;return e.imgProgress=!0,t.upload.addEventListener("progress",function(t){if(t.lengthComputable){var n=t.loaded/t.total;n=parseInt(n*100),console.log(n),e.$apply(function(){e.progressUpload=n}),n===100}},!1),t},url:"https://api.imgur.com/3/image",type:"POST",datatype:"json",data:{image:i,type:"base64",album:"3VqTp"},beforeSend:function(e){e.setRequestHeader("Authorization","Bearer "+t+"")},success:function(e){r(e)},error:function(e){r(e)}})}}}}function f(e,n){t.CreatePost(e,n,function(e){e!=undefined&&e.id!=undefined&&(alert("Successful posted."),l(),$("#loading").hide(),$("#overlay").hide(),i.$broadcast("refreshPost"))})}function l(){e.currUser!="anonymous"?(n.find(".inputNickname").val(""),n.find(".txtTitle").val(""),n.find(".categoriesFieldset > .form-group  input:radio")[8].checked=!0,n.find("input#chkNickname").prop("checked",!1),n.find(".txtComment").val(""),e.isCheck=!1,e.isDisable=!0,e.disableNickname=!1,$(n).find("#imgInp").val(""),e.previewImg=" ",e.imgLoaded=!1,e.imgProgress=!1,e.progressUpload=0,window.setTimeout(function(){$(n).find(".previewIMG").attr("src","")},0)):(n.find(".inputNickname").val(""),n.find(".txtTitle").val(""),n.find(".categoriesFieldset > .form-group  input:radio")[8].checked=!0,n.find(".txtComment").val(""),e.disableNickname=!0,n.find("input#chkNickname").prop("checked",!0),e.isCheck=!0,e.isDisable=!1,$(n).find("#imgInp").val(""),e.previewImg=" ",e.imgLoaded=!1,e.imgProgress=!1,e.progressUpload=0,window.setTimeout(function(){$(n).find(".previewIMG").attr("src","")},0))}function c(t){if(t.files&&t.files[0]){var r=new FileReader;r.onload=function(t){e.$apply(function(){e.previewImg=t.target.result,e.imgLoaded=!0})},t.files[0].type=="image/jpeg"||t.files[0].type=="image/png"||t.files[0].type=="image/jpeg"?r.readAsDataURL(t.files[0]):alert("Only supported jpg/jpeg/png image type.")}else e.$apply(function(){e.previewImg=" ",e.imgLoaded=!1}),$(n).find(".previewIMG").attr("src","")}$(n).ready(function(){e.isDisable=undefined,e.isCheck=undefined,e.disableNickname=undefined,e.disableCategories=undefined,i.$on("createPost",function(t){e.currUser=undefined,r.GetCurrentUser(function(t){t==-1?(e.userName="anonymous",e.currUser="anonymous",e.isfb=!1,n.find("input#chkNickname").addClass("checked"),n.find(".categoriesFieldset > .form-group  input:radio")[8].checked=!0,n.find(".categoriesFieldset > div > .radio-inline").css("color","gainsboro"),n.find(".categoriesFieldset > div > .help-block").html("you have no login, only able post to Public's wall.").css("color","red"),e.disableCategories=!0,e.isCheck=!0,e.isDisable=!1,e.disableNickname=!0):t.status=="active"&&(e.userName=t.username,e.currUser=t.displayname,e.isfb=t.role=="FB"?!0:!1,n.find(".categoriesFieldset > div > .radio-inline").css("color",""),n.find(".categoriesFieldset > div > .help-block").html(""),n.find("input#chkNickname").removeClass("checked"),n.find(".categoriesFieldset > .form-group  input:radio")[8].checked=!0,e.disableCategories=!1,e.isCheck=!1,e.disableNickname=!1,e.isDisable=!0)})}),n.find("input#chkNickname").change(function(){n.find("input#chkNickname").is(":checked")?(n.find("input#chkNickname").addClass("checked"),e.$apply(function(){e.isDisable=!1})):(n.find("input#chkNickname").removeClass("checked"),e.$apply(function(){e.isDisable=!0}))}),n.find(".submitPost").on("click",function(t){var i=n.find("input#chkNickname").is(":checked");if(i){var s=n.find(".inputNickname").val();if(s=="")return;if(s.length<3||s.length>25){n.find(".inputNickname").parent().parent().find(".help-block").html("Length must between 3 - 25.").css("color","red");return}n.find(".inputNickname").parent().parent().find(".help-block").html("")}var u=n.find(".txtTitle").val();if(u==""){n.find(".txtTitle").parent().find(".help-block").html("Please enter your title").css("color","red");return}if(u.length<3||u.length>28){n.find(".txtTitle").parent().find(".help-block").html("Length must between 3 - 28.").css("color","red");return}n.find(".txtTitle").parent().find(".help-block").html("");var f=n.find(".txtComment").val().trim();if(f==""){n.find(".txtComment").parent().find(".help-block").html("Please enter your comment").css("color","red");return}if(f.length<5||f.length>5e3){n.find(".txtComment").parent().find(".help-block").html("Length must between 5 - 5000.").css("color","red");return}n.find(".txtComment").parent().find(".help-block").html("");if(e.currUser=="anonymous")var l="Public";else var l=n.find(".categoriesFieldset > .form-group  input:radio:checked").val();$("#loading").show(),$("#overlay").show();var c={username:e.userName,displayname:i?s:e.currUser,title:u,content:f,image:"null",liked:[],commentedCount:0,shited:[],loved:[],disliked:[],date:new Date,usenick:s!=undefined?!0:!1,isfb:e.isfb};$(n).find("#imgInp").val()==undefined||$(n).find("#imgInp").val()==""?o(c,l):r.RequestAccessToken(function(e){e.access_token!=undefined?a(e.access_token,function(e){e.status!=200?alert("Ops, you are in traffic. Someone was uploading the image, We are using free image hosting to save cost, bo bian, please try again after few second. Paisei. :-)"):(c.image=e.data.link,o(c,l))}):e==-1&&(alert("Something wrong with the server, please report to admin with code : Ime99nw."),$("#loading").hide(),$("#overlay").hide())})}),n.find(".cancelPost").on("click",function(e){n.modal("hide")}),$(n).find("#imgInp").change(function(){c(this)}),e.closePreview=function(){$(n).find("#imgInp").val(""),e.previewImg=" ",e.imgLoaded=!1,e.imgProgress=!1,window.setTimeout(function(){$(n).find(".previewIMG").attr("src","")},0)}}),$("#my_create_post_Modal").on("hidden.bs.modal",function(){l()})}return{restrict:"E",template:'<div class="modal fade" id="my_create_post_Modal" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">Create new post</h4></div><form role="form"><div class="form-group"><label for="usr">Name : {{currUser}}</label></div><div class="form-group"><div class="input-group"><span class="input-group-addon"><input type="checkbox" id="chkNickname" aria-label="Checkbox for following text input" ng-checked="isCheck" ng-disabled="disableNickname">Use nickname</span><input type="text" class="form-control inputNickname" data-minlength="5" maxlength="25" required aria-label="Text input with checkbox" ng-disabled="isDisable"></div><div class="help-block with-errors"></div></div><div class="form-group"><label for="usr">Post Title : </label><input type="text" class="form-control txtTitle" required data-minlength="5" maxlength="28" id="usr" placeholder="Enter your post Title."><div class="help-block with-errors"></div></div><fieldset class="categoriesFieldset" ng-disabled="disableCategories"><div class="form-group"><label for="usr">Categories : </label><label class="radio-inline"><input type="radio" name="optradio" value="F&B"> F&B</label><label class="radio-inline"><input type="radio" name="optradio" value="Sport"> Sport</label><label class="radio-inline"><input type="radio" name="optradio" value="BehTahan"> Beh Tahan</label><label class="radio-inline"><input type="radio" name="optradio" value="LoveStory"> Love Story</label><label class="radio-inline"><input type="radio" name="optradio" value="Entertainment"> Entertainment</label><label class="radio-inline"><input type="radio" name="optradio" value="S&R"> Sales & Rent</label><label class="radio-inline"><input type="radio" name="optradio" value="L&F"> Lost & Found</label><label class="radio-inline"><input type="radio" name="optradio" value="Other"> Other</label><label class="radio-inline"><input type="radio" name="optradio" value="Public"> Public</label><div class="help-block with-errors"></div></div></fieldset><div class="form-group"><label for="comment">Comment:</label><textarea class="form-control txtComment" rows="5" id="comment" data-minlength="15" maxlength="5000" required></textarea><div class="help-block with-errors"></div></div><div class="form-group" style="text-align: left"><form id="form1" runat="server"><input type="file" id="imgInp" style="width: 220px;" /><img ng-src="{{previewImg}}" class="previewIMG img-rounded" alt="Image Preview" style="max-height: 30px;" /><button type="button" class="close" style="float:none;margin-left:3px" ng-show="imgLoaded" ng-click="closePreview()">x</button></form></div><div class="form-group" style="text-align: left"><progress class="progress progress-striped progress-success" value="{{progressUpload}}" max="100" ng-show="imgProgress"></progress></div><div class="modal-footer form-group"><button type="submit" class="btn btn-default submitPost">Submit</button><button type="button" class="btn btn-default cancelPost">Close</button></form></div></div></div></div>',link:s,replace:!0}}])});