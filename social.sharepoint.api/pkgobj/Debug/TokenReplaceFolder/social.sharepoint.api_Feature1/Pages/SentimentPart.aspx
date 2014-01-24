<%@ Page language="C#" Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register Tagprefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<WebPartPages:AllowFraming ID="AllowFraming" runat="server" />

<html>
<head>
    <title></title>

    <script type="text/javascript" src="../Scripts/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="../Scripts/knockout-3.0.0.js"></script>
    <script type="text/javascript" src="../Scripts/bootstrap.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/MicrosoftAjax.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.core.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script type="text/javascript" src="../Scripts/App.js" </script>
    <script type=”text/javascript” src=”http://ajax.aspnetcdn.com/ajax/knockout/knockout-2.1.0.js”></script>
    <link rel="Stylesheet" type="text/css" href="../Content/app.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/bootstrap.min.css" />
    <script type="text/javascript">
        'use strict';

        // Set the style of the client web part page to be consistent with the host web.
        (function () {
            var hostUrl = '';
            if (document.URL.indexOf('?') != -1) {
                var params = document.URL.split('?')[1].split('&');
                for (var i = 0; i < params.length; i++) {
                    var p = decodeURIComponent(params[i]);
                    if (/^SPHostUrl=/i.test(p)) {
                        hostUrl = p.split('=')[1];
                        document.write('<link rel="stylesheet" href="' + hostUrl + '/_layouts/15/defaultcss.ashx" />');
                        break;
                    }
                }
            }
            if (hostUrl == '') {
                document.write('<link rel="stylesheet" href="/_layouts/15/1033/styles/themable/corev15.css" />');
            }
        })();
    </script>
</head>
<body>
  <div id="socialPart">
    <div class="header">
        <i class="glyphicon glyphicon-globe"></i>
        <h2 class="header">
            Social Sentiment
        </h2>
    </div>
    <div id="content" class="content">
       <div  id="left-nav" class="pull-left">
          <ul class="nav nav-pills nav-stacked">
            <li class="active"><a href="#">All</a></li>
            <li><a class="text-center" href="#">T</a></li>
            <li><a class="text-center" href="#">F</a></li>
            <li><a class="text-center" href="#">S</a></li>
          </ul>
        </div>
        <img id="loadingMsg"  src="../images/loading120.gif" />
        <ul id="post-list"  data-bind="foreach: posts">   
           <li class="post">
             <h3 class="title" data-bind="text: title"></h3>   
             <p class="message" data-bind="text: message">

             </p>
           </li>

        </ul>
    </div>

  </div>
  <div id="twitter" class="hide">

  </div>

</body>
</html>
