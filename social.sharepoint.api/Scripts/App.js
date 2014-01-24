'use strict';

var context = SP.ClientContext.get_current();
var vm = new ViewModel();

// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    var str = Math.random();
    if ($("#loadingMsg").is(':visible')) {
        load()
        setInterval(load, 900000);
    }
  

    ko.applyBindings(vm);
});

function load() {
  getTwitterPosts();
  getFacebookFeed();
}


function ViewModel() {
    var self = this;
    self.posts = ko.observableArray();
    self.filter = ko.observable('all');
    self.addFacebookPost = function (data) {
        var post = new Post();
        post.type = "facebook";
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
    
    self.setFilter = function (d,f) {
        self.filter(d);
        var posts = self.posts()

        if (self.filter() != 'all' && self.filter() != 'facebook') {
            $("li.facebook").hide()
        } else {
            $("li.facebook").show()
        }

        if (self.filter() != 'all' && self.filter() != 'twitter') {
            $("li.stream-item").hide()
        } else {
            $("li.stream-item").show()
        }
    };

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
    self.visible= ko.observable(true)
}


function getTwitterPosts() {
    var request = new SP.WebRequestInfo();
    request.set_url("https://twitter.com/adt");
    request.set_method("GET");

    var emptyString = SP.ScriptUtility.emptyString;

    var response = SP.WebProxy.invoke(context, request);
   
    context.executeQueryAsync(onSuccess, onFail);
    function onSuccess() {
        $("#loadingMsg").hide();
        if (response.get_statusCode() == 200) {
            var ResponseBody = response.get_body();
            $("#twitter").html(ResponseBody);
            $(".stream-item-footer").remove();
            var tweets = $("#twitter li.stream-item");
            for (var i = 0, len = tweets.length; i < len; i++) {
                $("#post-list").prepend(tweets[i]);
            }
           
         
        }
        else {
            var httpCode = response.get_statusCode();
            var httpText = response.get_body();
            alert(httpText);
        }

       

    }

    function onFail() {

        $("#loadingMsg").hide();
        alert("Fetching Twitter feeds failed.");
    }
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
        $("#loadingMsg").hide();
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
        $("#loadingMsg").hide();
        alert(response.get_body());
    }
}



