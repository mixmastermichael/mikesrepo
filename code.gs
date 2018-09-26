function onOpen() {
   var ui = SpreadsheetApp.getUi();
   ui.createMenu('Get Values')
       .addItem('Go to google docs now! Yeeehaw!', 'getValues')
       .addToUi();
    }

  //this creates a menu that we can access from google sheets, "Go!" is the action used to execute the function below 



function getValues() {
  var fileName = "LinkScriptDoc"; // This is a filename of new Document that the google sheets will create
  //this will be the name of the doc that's already created every time we run the script on the sheet
  
  // start Escape Sequences - vars and delclaration here. \n indicates new line - just a reminder fyi!
  // useful Escape Sequences: \" - inserts a double quote character
  // we're using temp header and temp footer for the static parts in the document... might need to add tempbody
  var tempHeader = "<#function linker trackerName>\n<#local link = {\n ";
  var tempBody = "{#- \"UTM\" #}\n";
  var tempFooter = "\n}>\n</#function>\n";
  
  
  
  
  // this is what is using the linker function - automates utm 
  
  
  var values = SpreadsheetApp.getActiveSheet().getDataRange().getValues();
  //Retrieves an array of all the data in the sheet indexed by rows and columns.


  var v = values.slice(1, values.length);
  var res = v.map(function(e, i){return '"' + e[0] + '" : "' + e[1] + '"' + (i < v.length - 1 ? "," : "")}).join("\n");
  //making a new line and having "linktracking" : "linkURL" as the format with escapes
  
  DocumentApp.create(fileName).getBody().setText(tempHeader + tempBody + res + tempFooter);
  //sets the text for get values "v" into tempHeader and tempFooter and puts "res" which is the values in between the closing line(s)
}
