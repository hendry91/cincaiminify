define(["directives/directives"],function(e){e.directive("directEditPost",["$compile","deploydService","$cookies","authServices","$rootScope",function(e,t,n,r,i){function s(e,n,s){$(n).ready(function(){i.$on("editPost",function(t){content=i.contentDetails,e.postid=content.id,e.postTitle=content.title,e.postContent=content.content,e.backupContent=angular.copy(content.content),e.postDate=e.formatFromTodayDate(content.date),e.postBy=content.displayname,e.postType=content.postType,e.usenick=content.usenick,n.find(".txtComment").autoGrow({extraLine:!0}),n.modal("show")})}),e.btnSubmitEdit=function(s){var o=n.find(".txtComment").val().trim();if(e.backupContent===o){n.find(".txtComment").parent().find(".help-block").html("Please modify your content.").css("color","red");return}if(o==""){n.find(".txtComment").parent().find(".help-block").html("Please enter your comment").css("color","red");return}if(o.length<5||o.length>5e3){n.find(".txtComment").parent().find(".help-block").html("Length must between 5 - 5000.").css("color","red");return}n.find(".txtComment").parent().find(".help-block").html(""),r.GetCurrentUser(function(r){if(r==-1)alert("Login error, if saw this message, please report to admin.");else{var s=r.username,u={postid:e.postid,username:s,content:e.backupContent},a={postid:e.postid,content:o,updatedby:s,lastdate:new Date};t.Addbackup(u,"backuppost",function(r){r.id!=undefined?t.UpdatePost(a,e.postType,function(e){e.id!=undefined?(alert("Post updated."),i.$broadcast("refreshPost"),n.modal("hide")):alert("Something wrong, please report to admin with code x00979.")}):alert("Something wrong, please report to admin with code x00978.")})}})}}return{restrict:"E",template:'<div class="modal fade" id="my_editPost_Modal" role="dialog"><div class="modal-dialog"><!-- Modal content--><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">&times;</button><h4 class="modal-title">{{postTitle}}</h4><small class="text-muted"> {{postDate}} was posted by :{{postBy}}<i class="fa fa-star-o" aria-hidden="true" style="color:red" ng-if="usenick == true" data-toggle="tooltip" data-placement="bottom" title="This star mean the author use custom nickname to post."></i></small></div><img src="img/loading.gif" id="loading-indicator" style="display:none" /><form role="form"><div class="form-group"><textarea class="form-control txtComment overflowauto" rows="10" maxlength="5000" required style="max-height: 400px;min-height: 100px;background: #fafffd;padding-left: 10px;padding-top: 10px;overflow: auto;" class="form-control" id="comment" ng-bind-html = "postContent | newLine" ng-model="postContent"></textarea><div class="help-block with-errors"></div></div></form><div class="modal-footer form-group"><button type="submit" class="btn btn-default" ng-click="btnSubmitEdit()">Submit</button><button type="button" class="btn btn-default cancelPost" data-dismiss="modal">Close</button></div></div></div></div>',link:s,replace:!0}}])});