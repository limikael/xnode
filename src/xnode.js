function extend(target, base) {
	target.prototype = Object.create(base.prototype);
	target.prototype.constructor = target;
}

function XNode(type) {
	this.node=document.createElement(type);
}

Object.defineProperty(XNode.prototype,"style",{
	get: function() {
		return this.node.style;
	}
});

Object.defineProperty(XNode.prototype,"innerHTML",{
	get: function() {
		return this.node.innerHTML;
	},

	set: function(value) {
		this.node.innerHTML=value;
	}
});

function XDiv() {
	XNode.call(this,"div");
}

extend(XDiv,XNode)

var Node_appendChild=Node.prototype.appendChild;
Node.prototype.appendChild=function(child) {
	if (child instanceof XNode)
		Node_appendChild.call(this,child.node);

	else
		Node_appendChild.call(this,child);
}

var Node_removeChild=Node.prototype.removeChild;
Node.prototype.removeChild=function(child) {
	if (child instanceof XNode)
		Node_removeChild.call(this,child.node);

	else
		Node_removeChild.call(this,child);
}