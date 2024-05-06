let vesselId; // set in the htmx.onLoad callback

const keyupEvent = new KeyboardEvent("keyup", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

class Vessel extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.action = this.dataset.action;
		this.name = this.dataset.name;
		this.attr = this.dataset.attr;
		this.addEventListener('click', function(e) {
			setQ(this.action);
			const c = setCommand(this.action);
			c.focus();
		});
	}
}

customElements.define('vessel-link', Vessel);

class Action extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.action = this.dataset.action;
		this.target = this.dataset.target;
		this.addEventListener('click', function(e) {
			setQ(this.action);
			const c = setCommand(this.action);
			c.focus();
		});
	}
}

customElements.define('action-link', Action);

function getQ() {
	return document.getElementById('q');
}

function setQ(value) {
	const q = getQ();
	q.value = `${vesselId} ${value}`;
	q.dispatchEvent(keyupEvent);
	return q;
}

function getCommand() {
	return document.getElementById('command');
}

function setCommand(value) {
	const c = getCommand();
	c.value = value;
	return c;
}

htmx.onLoad(function(content) {
	// Handle selecting these elements if they are part of the initial
	// page load or are being loaded via htmx's "out of band" process
	const command = content.id === 'command' ? content : content.querySelector('#command');
	const player_id = content.id === 'player_id' ? content : content.querySelector('#player_id');

	if (command) {
		command.addEventListener('keyup', function(e) {
			setQ(e.target.value);
		});
	}

	if (player_id) {
		vesselId = player_id.value;
	}
});
