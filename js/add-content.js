/*
 File: js/add-content.js
 Full name: Yassir Kanane
 COMP 4601 Assignment 8
 Yassir Kanane, UMass Lowell Computer Science, yassir_kanane@student.uml.edu
 Updated on Dec. 1, 2019 at 3:47 PM */

//This function generates the table based on parameters fetched from input form.
function generateTable(tabIndex, addTab){  //table index and boolean to determine whether to a add tab

  //use parseInt function to convert to int
  var xFirst = parseInt(document.getElementById('row-first').value);
  var xLast = parseInt(document.getElementById('row-last').value);
  var yFirst = parseInt(document.getElementById('col-first').value);
  var yLast = parseInt(document.getElementById('col-last').value);
  var table;
  if(addTab == true){
    table = document.getElementById("table-" + tabIndex);
  }
  else {
    var table = document.getElementById("table-1");
  }

  //check if input was entered out of order and swap accordingly
  if(xFirst > xLast){
    var temp = xFirst;
    var temp2 = xLast;
    xFirst = temp2;
    xLast = temp;
  }

  if(yFirst > yLast){
    var temp = yFirst;
    var temp2 = yLast;
    yFirst = temp2;
    yLast = temp;
  }

  var tableHTML = "<thead> <tr> <th> </th>"   //0,0 cell blank to properly align
  //initialize the horizontal axis bounds by looping through range and forming
  //the table html via a string variable
  for (var i = xFirst; i <= xLast ;i++) {
    tableHTML += "<th>" + i + "</th>";
  }
  tableHTML += "</tr> </thead> <tbody> ";  //end first row

//nested for loop to initalize verticle range and row data for each value
  for(var j = yFirst; j <= yLast; j++){
    tableHTML += "<tr> <th scope=\"row\">" + j + "</td>";
    for(var i = xFirst; i <= xLast; i++){
      tableHTML += "<td>" + j*i + "</td>";
    }
    tableHTML += "</tr>";
  }
  tableHTML += "<tbody";
  table.innerHTML = tableHTML;
	
  //if generate tab button was clicked, save table to a tab
  if(addTab == true){
    document.getElementById('tabs-' + tabIndex).appendChild(table);
  }
}

//Learned about all the following tab related functions from: https://jqueryui.com/tabs/#manipulation
var tabTemplate = "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>";
var tabCounter = 2;
var tabs = $( "#tabs" ).tabs();

// function to add new tabs with table html already set up
function addTab() {
  var xFirst = parseInt(document.getElementById('row-first').value);
  var xLast = parseInt(document.getElementById('row-last').value);
  var yFirst = parseInt(document.getElementById('col-first').value);
  var yLast = parseInt(document.getElementById('col-last').value);

  //check if input was entered out of order and swap accordingly
  if(xFirst > xLast){
    var temp = xFirst;
    var temp2 = xLast;
    xFirst = temp2;
    xLast = temp;
  }

  if(yFirst > yLast){
    var temp = yFirst;
    var temp2 = yLast;
    yFirst = temp2;
    yLast = temp;
  }
  var label =  xFirst + " to " + xLast  + " x " + yFirst + " to " + yLast;
    id = "tabs-" + tabCounter,
    li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ) ),
    tabContentHtml = "<div class=\"table-responsive\">" +
    "<table class=\"table table-striped\" id=\"table-" + tabCounter + "\"></table>" + "</div>";

  tabs.find( ".ui-tabs-nav" ).append( li );
  tabs.append( "<div id='" + id + "'>" + tabContentHtml + "</div>" );
  tabs.tabs( "refresh" );
}

$( "#add-tab" ).click(function() {
  if ($('#inputForm').valid()) {
       addTab(); //add tab and create template table under tabs
       generateTable(tabCounter, true); //pass index for new table and true flag to add a tab
      $('#tabs').tabs('option', 'active', -1);  //change focus to newly created tab
       tabCounter++;
     }
})

//delete all tabs except home tab, source: https://stackoverflow.com/questions/18874298/jquery-remove-all-elements-except-for-first-one
$("#delete-all").on("click", function() {
   $("#tabs li").not(':first').remove();
    tabs.tabs( "refresh" );
});

// Delete the tab when the "X" in top right is click. x is "ui-icon-close"
 tabs.on( "click", "span.ui-icon-close", function() {
   var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
   $( "#" + panelId ).remove();
   tabs.tabs( "refresh" );
 });

//Slider functions begin here
//Learn about add sliders from this post: https://stackoverflow.com/questions/7523864/ui-slider-with-text-box-input
function addSliders(){
    //first row field
  $("#slider-row-first").slider({
        range: "min",
        value: 1,
        step: 1,
        min: -50,
        max: 50,
        slide: function( event, ui ) {
            $( "#row-first" ).val( ui.value );
            if($( "#inputForm" ).valid()){ //validate slider value, dynamically update table if valid
              generateTable(1, false);
            }

        }
  });
  //when input field is changes, change the slider as well
  $("#row-first").change(function () {
        var value = this.value.substring(0);
        console.log(value);
        if(value == ""){  //condition to prevent slide from being disabled on blank empty field
          value = 1;
        }
        $("#slider-row-first").slider("value", parseInt(value));
  });

  //second row field
    $("#slider-row-last").slider({
        range: "min",
        value: 1,
        step: 1,
        min: -50,
        max: 50,
        slide: function( event, ui ) {
            $( "#row-last" ).val( ui.value );
            if($( "#inputForm" ).valid()){
              generateTable(1, false);
            }
        }
  });

  $("#row-last").change(function () {
    var value = this.value.substring(0);
    if(value == ""){  //condition to prevent slide from being disabled on blank empty field
      value = 1;
    }
    console.log(value);
    $("#slider-row-last").slider("value", parseInt(value));
  });

  //third field, first column field
    $("#slider-col-first").slider({
        range: "min",
        value: 1,
        step: 1,
        min: -50,
        max: 50,
        slide: function( event, ui ) {
            $( "#col-first" ).val( ui.value );
            if($( "#inputForm" ).valid()){
              generateTable(1, false);
            }
        }
  });

  $("#col-first").change(function () {
    var value = this.value.substring(0);
    console.log(value);
    if(value == ""){  //condition to prevent slide from being disabled on blank empty field
      value = 1;
    }
    $("#slider-col-first").slider("value", parseInt(value));
  });

  //second column field
    $("#slider-col-last").slider({
        range: "min",
        value: 1,
        step: 1,
        min: -50,
        max: 50,
        slide: function( event, ui ) {
            $( "#col-last" ).val( ui.value );
            if($( "#inputForm" ).valid()){
              generateTable(1, false);
            }
        }
   });

   $("#col-last").change(function () {
    var value = this.value.substring(0);
    console.log(value);
    if(value == ""){  //condition to prevent slide from being disabled on null empty field
      value = 1;
    }
    $("#slider-col-last").slider("value", parseInt(value));

   });
}

//when document is fully loaded, select the form by id and trigger the validate with specified rules
//learned about this from http://webreference.com/programming/javascript/jquery/form_validation/index-2.html
$(document).ready(function(){
   generateTable(1, false);
    //Learned about this from this link: https://stackoverflow.com/questions/41779800/jquery-validate-validate-one-field-at-a-time
    //This prevents every field getting an error message while still allowing disabling and enabling the submit button
    $('#inputForm').on('blur keyup change', function () { // fires on every blur
        if ($('#inputForm').validate().checkForm()) {  // checks form for validity but doesnt trigger error messages
              $('#submitButton').prop('disabled', false);   // setting button attribute "disabled" to false will enable the button
              generateTable(1, false); //automatically generate when input is valid
        }
        else {
              $('#submitButton').prop('disabled', true);   // disables button
        }
    });
    //Define what rules should be applied to the form fields
  	$( "#inputForm" ).validate({
      	 rules:{
             rowFirst:{
               required: true,
               checkFloat: true,
               checkRange: true
             },
            rowLast:{
                required: true,
                checkFloat: true,
                checkRange: true
            },
          	colFirst:{
                required: true,
                checkFloat: true,
                checkRange: true
          	},
            colLast:{
                required: true,
                checkFloat: true,
                checkRange: true
            }
      	},
        //custom error message based on error
  	   messages: {
             rowFirst:{
                 required:"Both bounds are required for horizontal axis.",
                 number: "Please enter a valid integer."
             },
            rowLast:{
                required: "Both bounds are required for horizontal axis.",
                number: "Please enter a valid integer."
            },
           colFirst:{
               required: "Both bounds are required for vertical axis.",
               number: "Please enter a valid integer."
           },
            colLast:{
               required: "Both bounds are required for vertical axis.",
               number: "Please enter a valid integer."
            }
  	   }
	});

  $('#submitButton').click(generateTable);
  addSliders();

});

/*Custom method to check for floats and display error message
Learned about this from: https://stackoverflow.com/questions/241145/jquery-validate-plugin-how-to-create-a-simple-custom-rule*/
jQuery.validator.addMethod("checkFloat", function(value, element) {
    return this.optional(element) || (Number.isInteger(parseFloat(value)));
}, "Floats are not supported, please enter integers only.");

//custom rule to ensure the range entered does not crash website
jQuery.validator.addMethod("checkRange", function(value, element) {
    return this.optional(element) || (-50 <= value)&& (value <= 50);
}, "Please enter an integer between -50 and 50");
