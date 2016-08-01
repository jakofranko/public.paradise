var queue = [];

$(document).ready(function()
{
	var response_example = "* You are {{the unknown geomaitre}} in {{your pretty microwave}}.\n& your full name is the unknown geomaitre\n# create a teapot\n- {{your panther}}\n- {{your liger}}\n- {{your golden machine}}\n- {{your automated whale}}";
	
	

	$(document).on('keydown', 'input', function(e) {
	    if(e.which == 13) {
	    	responded(response_example);
	        return false;
	    }
	});

	updateTerminal();
});

function responded(response)
{
	var lines = response.split("\n");
	for (i = 0; i < lines.length; i++) { 
	    queue.push(lines[i]);
	}
}

function markup(text)
{
	templates = text.match(/\{\{(.*?)\}\}/g)
	return false;
}

function updateTerminal()
{
	if(queue.length > 0){
		$("terminal").append("<response>"+queue[0]+"</response>");
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