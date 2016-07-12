define(["directives/directives","moment"],function(e,t){e.directive("fnbwall",["deploydService","$compile","$rootScope","itemPerPage","authServices",function(e,n,r,i,s){function o(e,t){r.breakLineTitle="Food and Beverage",r.$broadcast("setBreakLineTitle"),$("#loading").show(),$("#overlay").show()}function u(n,o,u){function a(t){var r=(t-1)*i,u={limit:i,skip:r,sortCategories:"date",sortType:-1};s.GetCurrentUser(function(t){t==-1?(n.currUser="anonymous",n.displayname="anonymous",n.role=undefined,n.loadimgbydefault=!0):t.status=="active"&&(n.currUser=t.username,n.displayname=t.displayname,n.role=t.role,n.loadimgbydefault=t.loadimgbydefault),e.GetPostbyLimit(u,n.pageCategories,function(e){n.postdb=e,window.setTimeout(function(e){p(n,o)},0)})})}function c(e){return t(e)>=l&&t(e)<=f?t(e).fromNow():t(e).format("MMM Do YYYY, h:mm a")}function h(){var t={limit:i,skip:0,sortCategories:"date",sortType:-1};e.GetPostbyLimit(t,n.pageCategories,function(e){n.postdb=e,window.setTimeout(function(e){p(n,o)},0)})}function p(e,t){var n=$(t).find(".pContent");angular.forEach(n,function(e){d(e,function(e){$('<a class="btnExpand">Expand Now</a>').insertAfter(e)})}),$(t).find(".btnExpand").on("click",function(e){var t=e.currentTarget.text;switch(t){case"Expand Now":$(this).text("Collapse"),$(this.parentElement).find(".pContent").css("overflow","visible"),$(this.parentElement).find(".pContent").css("max-height","");break;case"Collapse":$(this).text("Expand Now"),$(this.parentElement).find(".pContent").css("overflow","hidden"),$(this.parentElement).find(".pContent").css("max-height","250px")}}),$("#loading").hide(),$("#overlay").hide()}function d(e,t){var n=e.style.overflow;if(!n||n==="visible")e.style.overflow="hidden";var r=e.clientWidth<e.scrollWidth||e.clientHeight<e.scrollHeight;e.style.overflow=n,r&&t(e)}n.pageCategories="fnb",r.$on("refreshPost",function(e){s.GetCurrentUser(function(e){e==-1?(n.currUser="anonymous",n.displayname="anonymous",n.role=undefined,n.loadimgbydefault=!0):e.status=="active"&&(n.currUser=e.username,n.displayname=e.displayname,n.role=e.role,n.loadimgbydefault=e.loadimgbydefault)}),h()}),$(o).ready(function(){e.GetPostbyLimit(u,n.pageCategories,function(e){e.length>0?e.length<=i?($("#loading").show(),$("#overlay").show(),a(1)):$("#pagination").twbsPagination({totalPages:Math.ceil(e.length/i),visiblePages:10,onPageClick:function(e,t){$("#loading").show(),$("#overlay").show(),a(t)}}):($("#loading").hide(),$("#overlay").hide())})}),n.openPost=function(e){n.currentPostTarget=this.post,!$(e.target).hasClass("dropdown-toggle")&&!$(e.target).hasClass("dropdown-item")&&!$(e.target).hasClass("btnExpand")&&!$(e.target).hasClass("card-img-top")&&(r.contentDetails=this.post,r.contentDetails.postType=n.pageCategories,r.$broadcast("openPost"))},n.openImage=function(e){n.openImgUrl=this.post.image,$(o).find("#image-popup").modal("show")},n.editPost=function(e){n.currentPostTarget=this.post,this.post.username!=n.currUser&&n.role!="admin"?alert("ops, something wrong, if this post belong to your, please report to admin!"):(r.contentDetails=this.post,r.contentDetails.postType=n.pageCategories,r.$broadcast("editPost"))},n.deletePost=function(e){n.currentPostTarget=this.post,this.post.username!=n.currUser&&n.role!="admin"?(alert("ops, something wrong, if this post belong to your, please report to admin!"),window.setTimeout(function(){o.find("#confirm-delete").modal("hide")},0)):$(o).find("#confirm-delete").modal("show")},$(o).find("#confirm-delete").on("show.bs.modal",function(e){var t=n.currentPostTarget;n.postTitle=t.title}),$(o).find(".btnDeletePost").on("click",function(t){if(n.currUser==n.currentPostTarget.username||n.role=="admin"){var r={id:n.currentPostTarget.id,status:"D",updatedby:n.currUser,lastdate:new Date};e.DeletePost(r,n.pageCategories,function(e){e.status=="D"&&(alert("your post has been deleted."),h()),o.find("#confirm-delete").modal("hide")})}else alert("You can't remove people post, if this post belong to you, there must be some error, please contact admin to solve this problem. Thanks.")});var f=t().endOf("day"),l=t().startOf("day")}return{restrict:"A",link:u,controller:["$scope","$element",o],template:'<div class="row listWrapper" style="margin-top:20px"><div class="card-columns"><div class="card cardContent" ng-repeat="post in postdb" ng-if="post.status == \'A\'" ng-click="openPost($event)"><div ng-if="post.image == \'null\' && currUser != \'anonymous\' && currUser == post.username || (role ==\'admin\' && post.image == \'null\')" style="position: absolute"><a href="" style="color:#c53232" class="dropdown-toggle glyphicon glyphicon-menu-down btn-lg" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a><div class="dropdown-menu" aria-labelledby="dpCategories" style="min-width:90px;max-width:90px"><a class="dropdown-item" ng-click="editPost($event)">Edit</a><a class="dropdown-item" data-toggle="modal" ng-click="deletePost($event)">Delete</a></div></div><img  ng-if="post.image != \'null\' && !loadimgbydefault" class="card-img-top" ng-click="openImage($event)" alt="Data Saving Mode" style="height: 30px;color:hsl(300, 69%, 53%);"><img  ng-if="post.image != \'null\' &&  loadimgbydefault" class="card-img-top" ng-click="openImage($event)" ng-src="{{post.image}}" alt="Card image cap"><div ng-if="post.image != \'null\' && currUser != \'anonymous\' && currUser == post.username || role == \'admin\'" style="position: absolute"><a href="" style="color:#c53232" class="dropdown-toggle glyphicon glyphicon-menu-down btn-lg" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a><div class="dropdown-menu" aria-labelledby="dpCategories" style="min-width:90px;max-width:90px"><a class="dropdown-item" ng-click="editPost($event)">Edit</a><a class="dropdown-item" data-toggle="modal" ng-click="deletePost($event)">Delete</a></div></div><div class="card-block ellipsis "><h5 class="card-title" style="color:#1515d1;border-bottom: solid 1px black;"><strong> {{post.title}} </strong></h5><p class="card-text pContent" style="max-height: 250px;overflow: hidden;" ng-bind-html = "post.content | newLine" ng-model="post.content" >  </p><p class="card-text"><small class="text-muted"> {{formatFromTodayDate(post.date)}} posted by <span ng-if="post.isfb == true && post.usenick == false"><a href="https://www.facebook.com/{{post.username}}" target="_blank"  style="color:#a8168f">{{post.displayname}}</a></span><span ng-if="post.isfb == false || post.usenick == true">{{post.displayname}}</span><i class="fa fa-star-o" aria-hidden="true" style="color:red" ng-if="post.usenick == true" data-toggle="tooltip" data-placement="bottom" title="This star mean the author use custom nickname to post."></i></small></p></div></div></div></div><nav><ul id="pagination" class="pagination-sm"></ul></nav><div class="modal fade" id="confirm-delete" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title" id="myModalLabel">Confirm Delete</h4></div><div class="modal-body"><p>Are you sure to delete this {{postTitle}} post?</p><p>Do you want to proceed?</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button><a class="btn btn-danger btn-ok btnDeletePost">Delete</a></div></div></div></div></div><div class="modal fade imageModal" id="image-popup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"> <div class="modal-body"><button type="button" class="close" data-dismiss="modal" style="position: absolute;right: 20;"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button><img class="imgOnScreen" style="width: 100%;;height:80%" ng-src="{{openImgUrl}}"></div></div></div></div>'}}])});