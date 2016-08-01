var queue = [];

$(document).ready(function()
{	
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

function apiCall(command)
{
	console.log("API > "+command);
	responded("> <span class='user'>"+command+"</span>");
	var response = "* You are {{the unknown geomaitre}} in {{your pretty microwave|leave}}.\n& Today is your lucky day, you are finaly free from chains. Lucky day, you are finaly free from chains.\n# create a teapot\n- {{Your panther|enter your panther}}\n- {{Your liger|enter your panther}}\n- {{your golden machine|use your machine}}\n- {{your automated whale|use your machine}}";
	responded(response);
}

function responded(response)
{
	var lines = response.split("\n");
	for (i = 0; i < lines.length; i++) { 
	    queue.push(lines[i]);
	}
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
}

$(window).resize(function()
{

});

$(window).load(function()
{

});

$(window).scroll(function()
{

});