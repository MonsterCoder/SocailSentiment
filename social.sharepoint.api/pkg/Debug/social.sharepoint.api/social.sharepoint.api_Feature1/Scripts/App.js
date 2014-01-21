'use strict';

var context = SP.ClientContext.get_current();

// This code runs when the DOM is ready and creates a context object which is needed to use the SharePoint object model
$(document).ready(function () {
    getFacebookFeed();

});

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
            ko.observableArray([]);
            alert(ResponseBody.data.length);
        }
        else {
            var httpCode = response.get_statusCode();
            var httpText = response.get_body();
        }

    }

    function onGetFacebookFeedFail() {
        alert(response.get_statusCode());
    }
}



