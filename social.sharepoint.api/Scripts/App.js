﻿'use strict';

var context = SP.ClientContext.get_current();
var vm = new ViewModel();
var isbusy = false;
// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    if (isbusy==true) { return }
    isbusy = true
    getTwitterPosts();
    ko.applyBindings(vm);
    isbusy = false;
});

function getTwitterPosts() {
    var request = new SP.WebRequestInfo();
    request.set_url("https://twitter.com/adt");
    request.set_method("GET");

    var emptyString = SP.ScriptUtility.emptyString;

    var response = SP.WebProxy.invoke(context, request);
   
    context.executeQueryAsync(onSuccess, onFail);
    alert("after");
    function onSuccess() {
        alert("success");
        var ResponseBody = response.get_body();
        alert(ResponseBody);
    }

    function onFail() {
        alert("fail");
    }
}

function ViewModel() {
    var self = this;
    self.posts = ko.observableArray();
    self.addFacebookPost = function (data) {
        var post = new Post();
        post.type = "fb";
        post.created_time = data.created_time;

        if (data.type === "link") {
            post.title = data.name;
            post.picture = data.picture;
            post.message = data.message;
        } else if (data.type === "status") {
            post.message = data.story;
        } else {
            return;
        }

        self.posts.push(post);
    }

    return self;
}

function Post() {
    var self = this;
    self.title = "";
    self.type = "";
    self.picture = "";
    self.message = "";
    self.link = "";
    self.created_time = "";
}

function getFacebookFeed() {
    var request = new SP.WebRequestInfo();
    request.set_url("https://graph.facebook.com/AutomaticDataProcessing/feed?access_token=525131460933427|I1I4Opj4FT25bKL6uwUiFwnJC8s");
    request.set_method("GET");
    request.set_headers({ "Accept": "application/json" });
    var emptyString = SP.ScriptUtility.emptyString;

    var response = SP.WebProxy.invoke(context, request);

    context.executeQueryAsync(onGetFacebookFeedSuccess, onGetFacebookFeedFail);
    function onGetFacebookFeedSuccess() {
        if (response.get_statusCode() == 200) {
            var ResponseBody = JSON.parse(response.get_body());

            for (var i = 0, len = ResponseBody.data.length; i < len; i++) {
                vm.addFacebookPost(ResponseBody.data[i]);
            }
        }
        else {
            var httpCode = response.get_statusCode();
            var httpText = response.get_body();
            alert(httpText);
        }

    }

    function onGetFacebookFeedFail() {
        alert(response.get_statusCode());
        //(response.get_statusCode());
    }
}



