var vesselId = 3;
var queue = [];

function Vessel(element)
{
	this.action = element.attr("data-action");
	this.name = element.attr("data-name");
	this.attr = element.attr("data-attr");
}

$(document).ready(function()
{
	vesselId = window.location.hash.match(/\d+/);

	$("input").focus();

	$(document).on('keydown', 'input', function(e) {
	  if(e.which != 13) { return; }
	  window.location = "4+"+$("input").val().replace(/\ /g,"+");
  	$("input").val("");
    return false;
	});

	$("vessel").on("click", function()
	{
		var vessel = new Vessel($(this));
		$("input").val(vessel.action);
		$("input").focus();
	});
});

function apiCall(command)
{
	responded("> <span class='user'>"+(command == "" ? "look" : command)+"</span>");
	var cmd = vesselId+"_"+command.replace(/ /g,"_");
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
		console.log($(this));
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