var vesselId = 3;
var queue = [];

$(document).ready(function()
{
	vesselId = window.location.hash.match(/\d+/) | 3;

	begin();
	apiCall("connect");
	$(document).on('keydown', 'input', function(e) {
	    if(e.which == 13) {
	    	apiCall($("input").val());
	    	$("input").val("");
	        return false;
	    }
	});
	updateTerminal();
	$("input").focus();
});

function begin()
{
	var responseHeight = 20;
	var screenHeight = $(window).height() - 100;
	var responseLimit = Math.ceil(screenHeight/responseHeight);

	for (var i = responseLimit - 1; i >= 0; i--) {
		$("terminal").append("<response></response>")
	}
}

function apiCall(command)
{
	responded("> <span class='user'>"+(command == "" ? "look" : command)+"</span>");

	var cmd = "paradise_"+vesselId+"_"+command.replace(/ /g,"_");
	console.log("API > "+cmd);
	$.ajax({ type: "GET", url: "http://api.xxiivv.com/index.php", data: { command:cmd } }).done(function( response ) {
		responded(response);
	});	
}

function responded(response)
{
	if( response.indexOf("::") > -1 ){ become(response.match(/\d+/)) ; return; }

	var lines = response.split("\n");
	for (i = 0; i < lines.length; i++) { 
	    queue.push(lines[i]);
	}
}

function become(vesselId)
{
	window.location.hash = "#"+vesselId;
	location.reload();
}

function markup(text)
{
	// Rune
	var rune = text.charAt(0);
	text = text.replace(rune+" ","<rune>"+rune+"</rune>");

	// Templates
	templates = text.match(/\{\{(.*?)\}\}/g);
	if(templates == null){ return text; }

	// Actions
	for (i = 0; i < templates.length; i++) { 
		var name = templates[i].indexOf("|") > -1 ? templates[i].split("|")[0] : templates[i];
		var action = templates[i].indexOf("|") > -1 ? templates[i].split("|")[1] : templates[i];
	    text = text.replace(templates[i],"<action data='"+action+"'>"+name+"</action>");
	}

	// Cleanup
	text = text.split("{{").join("");
	text = text.split("}}").join("");

	// Bind
	$("action").on( "click", function() {
		var cmd = $(this).attr("data");
		$("input").val(cmd);
		$("input").focus();
	});

	return text;
}

function updateTerminal()
{
	if(queue.length > 0){
		$("terminal").append("<response>"+markup(queue[0])+"</response>");
		queue.splice(0, 1);	
	}
	setTimeout(function(){ updateTerminal(); }, 100);

	var responseHeight = 20;
	var screenHeight = $(window).height() - 100;
	var responseLimit = Math.ceil(screenHeight/responseHeight);
	var responseCount = $("terminal").children().length;
	
	if(responseCount > responseLimit-2 && responseCount > 10){
		$('terminal response').first().remove();
	}
}