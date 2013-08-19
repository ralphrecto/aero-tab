(function(){
  var globals = {
    containerId: "aero-tab-dialog"
  };

  var container = document.getElementById(globals.containerId);
  if(container){
    document.body.removeChild(container);
  } else {
    chrome.runtime.sendMessage({type: "get_urls"}, function(response){
      var domain_ul = document.createElement("ul");

      //add domain groups to container
      for(domain in response){
        if(response.hasOwnProperty(domain)){
          var favurl = response[domain][0].favIconUrl || "default_favicon.png";
          var li = document.createElement("li");
          var img = document.createElement("img");
          img.setAttribute("src", favurl);
          li.appendChild(img);
          domain_ul.appendChild(li);
        }
      }
      var container = document.createElement("div");
      container.id = globals.containerId;
      container.appendChild(domain_ul);
      document.body.appendChild(container);
    });
  }
})();