(function(){
  chrome.commands.onCommand.addListener(function(command) {
    alert("HELLO THIS IS TAB");
    chrome.tabs.insertCSS(null, {file: "stylesheets/page_dialog.css"});
    chrome.tabs.executeScript(null, {file: "javascripts/page_dialog.js"});
  });
})();