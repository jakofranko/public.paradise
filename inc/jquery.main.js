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
});

function apiCall(command)
{
	console.log("API > "+command);
	responded("> <span class='user'>"+command+"</span>");
	var response = "* You are {{the unknown geomaitre}} in {{your pretty microwave}}.\n& Today is your lucky day, you are finaly free from chains. Today is your lucky day, you are finaly free from chains.\n# create a teapot\n- {{Your panther}}\n- {{Your liger}}\n- {{your golden machine}}\n- {{your automated whale}}";
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
	var rune = text.charAt(0);
	text = text.replace(rune+" ","<rune>"+rune+"</rune>");

	templates = text.match(/\{\{(.*?)\}\}/g);

	if(templates == null){ return text; }

	for (i = 0; i < templates.length; i++) { 
	    text = text.replace(templates[i],"<action>"+templates[i]+"</action>");
	}
	text = text.split("{{").join("");
	text = text.split("}}").join("");

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