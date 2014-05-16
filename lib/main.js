var buttons = require('sdk/ui/button/action');
var tabs    = require("sdk/tabs");
var data    = require("sdk/self").data; //for including files
var panel   = require("sdk/panel");

var links = []; //holds the links
//panels
var history_panel = panel.Panel({
  contentURL: data.url("history_panel.html"),
  contentScriptFile: data.url("history_panel.js")
});

//add-on link
var history_button = buttons.ActionButton({
  id: "link-tree-history",
  label: "Link Tree - History",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleHistoryClick
});

function handleHistoryClick(state) {
  // history_panel.show();
  for each (var tab in tabs)
    links.push(tab);
  // tabs.open("http://www.mozilla.org/");
}

//a custom event that will be called after the panel "show" event
history_panel.on("show", function() {
  history_panel.port.emit("show"); 
});

// Listen for events called "link-clicked" coming from
// the content script.
history_panel.port.on("link-clicked", function (link) {
  console.log(link);
  history_panel.hide();
  tabs.open(link.tab.id)
});

//the flow
/*
on page
  clicks on links will 
    be tracked,
    get the id,
    assigned as child to the page

on history panel
  links (with thumbnail) will be displayed in hierarchical view

  --------------------
  ancestor
  --------------------
  self link | siblings
  --------------------
  children
  --------------------

  https://developer.mozilla.org/en-US/Add-ons/SDK/High-Level_APIs/tabs
*/