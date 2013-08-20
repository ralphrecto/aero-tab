(function(){
  //globals
  var g = {
    blanketId: "aero-blanket", 
    domainMenuId: "aero-domain-menu",
    tabMenuId: "aero-tab-menu"
  };

  function clear(){
    $("#"+g.domainMenuId).remove();
    $("#"+g.tabMenuId).remove();
    $("#"+g.blanketId).remove();
  }

  var domain_menu = document.getElementById(g.domainMenuId);
  if(domain_menu){
    clear();
  } else {
    chrome.runtime.sendMessage({type: "get_urls"}, function(response){
      var domain_ul = document.createElement("ul");
      //add domain groups to menu
      for(domain in response){
        if(response.hasOwnProperty(domain)){
          var favurl = response[domain][0].favIconUrl || "default_favicon.png";
          var domain_li = document.createElement("li");
          $(domain_li).html("<span>"+domain+"</span>");
          //add toggle for tab menu
          var click_callback = (function(domain){
            return function(){
              var tab_ul = document.createElement("ul");
              for(var i = 0; i < response[domain].length; i++){
                var tab_li = document.createElement("li");
                $(tab_li).html("<span>"+response[domain][i].title+"</span>");
                //switch to tab when clicked
                var tab_callback = (function(i){
                  return function(){
                    chrome.runtime.sendMessage({
                      type: "change_tab",
                      tabId: response[domain][i].id
                    }, clear);
                  }
                })(i);
                $(tab_li).click(tab_callback);
                $(tab_ul).append(tab_li);
              }
              var tab_menu = document.getElementById(g.tabMenuId);
              if(tab_menu){
                $(tab_menu).html(tab_ul);
              } else {
                var tab_menu = document.createElement("div");
                $(tab_menu).attr("id", g.tabMenuId);
                $(tab_menu).html(tab_ul);
                $(document.body).append(tab_menu);
              }
            }
          })(domain);
          $(domain_li).click(click_callback);
          $(domain_ul).append(domain_li);
        }
      }
      var blanket = document.createElement("div");
      $(blanket).attr("id", g.blanketId);
      $(blanket).html("&nbsp;");
      $(document.body).append(blanket);
      var domain_menu = document.createElement("div");
      $(domain_menu).attr("id", g.domainMenuId);
      $(domain_menu).append(domain_ul);
      $(document.body).append(domain_menu);
    });
  }
})();