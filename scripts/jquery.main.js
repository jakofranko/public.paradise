var vesselId = 3;
var queue = [];

function Vessel(element)
{
	this.action = element.attr("data-action");
	this.name = element.attr("data-name");
	this.attr = element.attr("data-attr");
}

function Action(element)
{
	this.action = element.attr("data-action");
	this.target = element.attr("data-target");
}

$(document).ready(function()
{
	vesselUrl = window.location.pathname.replace("/","");
	vesselId = parseInt(vesselUrl.split("+")[0]);

	$("input").focus();

	$(document).on('keydown', 'input', function(e) {
	  if(e.which != 13) { return; }
	  window.location = vesselId+"+"+$("input").val().replace(/\ /g,"+");
  	$("input").val("");
    return false;
	});

	$("vessel").on("click", function()
	{
		var vessel = new Vessel($(this));
		$("input").val(vessel.action);
		$("input").focus();
	});

	$("action").on("click", function()
	{
		var action = new Action($(this));
		$("input").val(action.action);
		$("input").focus();
	});

	$(".expand_chat").on("click", function()
	{
		$(".forum").addClass("expanded");
	});
});