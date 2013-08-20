(function(){
  var globals = {
    domain_regex: new RegExp("[^/]+://(www\.)?([^/]+)")
  };

  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.type === "get_urls"){
      chrome.tabs.getAllInWindow(null, function(tabs){
        var domains = {};
        for(var i = 0; i < tabs.length; i++){
          //group tabs by domain
          var domain = globals.domain_regex.exec(tabs[i].url)[2];
          if(domains[domain]){
              domains[domain].push(tabs[i]);
          } else {
              domains[domain] = [tabs[i]];
          }
        }
        sendResponse(domains);
      });
      //listener must return true for response to be sent
      return true;
    } else if(request.type === "change_tab"){
      chrome.tabs.update(request.tabId, {active: true});
      sendResponse();
      return true;
    }
  });

  chrome.commands.onCommand.addListener(function(command) {
    chrome.tabs.insertCSS(null, {file: "stylesheets/page_dialog.css"});
    chrome.tabs.executeScript(null, {file: "javascripts/page_dialog.js"});
  });

})();