xnode
=====

An extendable version of a DOM Node

Background
----------

In traditional UI programming we are used to rely on extending components using object oriented programming. For example,
we can create a window component, and then we extend it into a dialog component that has a number of buttons and an icon, 
and then we extend that into a message box that shows a message with an OK button. The HTML DOM has UI objects in a somewhat
similar way, but unfortunatly these are not possible to extend. This is because they do not have constructors. When we
want to create a `Div` object we do:

````
var element = document.createElement("div");
````

We don't do `var element = new Div()` or something like that which would be necessary in order to create a subclass that
extends the Div DOM object.

Solution
--------

This xnode hack, where xnode stands for extensible node, makes this possible. Using xnode, we can create elements using
constructors instead of the `document.createElement` function. A hello world example would look like this:

````
var element = new xnode.Div();
element.innerHTML="Hello World";
document.body.appendChild(element);
````

Another example
---------------

This example create a dialog box and attaches it to the body:

````
function MyDialog(text) {
	xnode.Div.call(this);

	this.okButton = new xnode.Button();
	this.okButton.style.position = "absolute";
	this.okButton.style.bottom = "10px";
	this.okButton.style.left = "50%";
	this.okButton.style.width = "100px";
	this.okButton.style.marginLeft = "-50px";
	this.okButton.innerHTML = "Ok";
	this.appendChild(this.okButton);

	this.style.background = "#ff0000";
	this.style.width = "300px";
	this.style.height = "200px";
	this.style.position = "absolute";

	this.textElement = new xnode.Div();
	this.textElement.innerHTML = text;
	this.textElement.style.top = "10px";
	this.appendChild(this.textElement);

	this.okButton.on("click", function() {
		console.log("button click");
	});
}

inherits(MyDialog, xnode.Div);

var myDialog = new MyDialog("hello world");
document.body.appendChild(myDialog);
````
