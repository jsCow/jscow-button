/**
  * jsCow button component is a reusable component used in client side jsCow applications. 
  * A button is a component, which enables users to interact with an application. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  	@class jsCow.res.components.button
  * @type Class Provides the main class of the component
  * @constructor 
*/

/**
  * Will be triggert when the mouse cursor is moved over the component view.
  * @event mouseover
  */
/**
  * Will be triggert when the mouse cursor is leaving the component view.
  * @event mouseout
  */
/**
  * Will be triggert when the mouse pointer is over the element, and the mouse button is pressed on the component view.
  * @event press
  */
/**
  * Will be triggert when the mouse pointer is over the element, and the mouse button is not more pressed on the component view.
  * @event pressed
  */
/**
  * Will be triggert when the user clicked on the component view.
  * @event click
  */
jsCow.res.components.button = function() {};
jsCow.res.components.button.prototype = {

	/**
	  * The init method will be called by initializing the component. 
	  * The model, view and controller should be set within this method.
		
		this.addController(jsCow.res.controller.button);
		this.addModel(jsCow.res.model.button);
		this.addView(jsCow.res.view.button);
		
	  * @method init
	  * @public
	  * @return {Object} Instance of the component itself.
	  */
	init: function() {
		
		this.addController(jsCow.res.controller.button);
		this.addModel(jsCow.res.model.button);
		this.addView(jsCow.res.view.button);
		
		return this;
	},
	
	/**
	  * This method is a user interaction method to set the button text.
	  	
	  	// New button instance with a default text
	  	var btn = jsCow.get(jsCow.res.components.button, { 
	  		text: 'Default button text' 
	  	);

	  	// Set button text by method
	  	btn.text('My button text');
	
	
	  * @method text
	  * @param {String} text Text of the button.
	  * @public
	  * @return {Object} Instance of the component itself.
	  */
	text: function(text) {
		
		if (typeof text !== 'undefined' && typeof text === 'string') {
			this.trigger('text', {
				text: text
			});
		}
		
		return this;
	},
	
	/**
	  * This method is a user interaction method to set a button icon.
	  * The available icons comes from the icon font 'Font Awesome' and are included in the standard jsCow theme.
	
		var btn = jsCow.get(jsCow.res.components.button, { 
			text: 'Button', 
			icon: {
				direction: 'l',
				name: 'user',
				prefix: 'fa fa-'
			}
		});
	
	  * @method icon
	  * @param {Object} {options} Set the options for the button icon. Implemented directions are 'l' (left) and 'r' (right). The default prefix is a Font Awesome prefix like 'fa fa-'.
	  * @public
	  * @return {Object} Instance of the component itself.
	  */
	icon: function(o) {
		
		var options;

		if ( typeof o === 'undefined') {

			options = false;

		} else if ( typeof o === 'object') {

			options = $.extend(true, {
				direction: 'l',
				name: 'user',
				prefix: 'fa fa-'
			}, o);

		}

		this.trigger('icon', {
			icon: options
		});
		
		return this;
	}
	
};


/**
  * Represents the model class of the jsCow button component. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  * @class jsCow.res.model.button
  * @type Class Provides the model class of the component
  * @constructor 
  */

jsCow.res.model.button = function() {
	
	/**
	  * JSON object with all model data.
	  * Default model data are:
		
		{
			enabled: true,
			visible: true,
			text: ""
		}

	  * 
	  * @property data
	  * @type Object
	  */
	
	this.data = {
		enabled: true,
		visible: true,
		text: ""
	};
	
};
jsCow.res.model.button.prototype = {

	/**
	  * The model init method will only trigger the internal component event 'model.ready'.
	  * The event data are the model data.
	  * Default listener for this event is registered in the controller of the component. 
	  	
	  	this.trigger("model.ready", this.data);

	  * @method init
	  * @private
	  */
	init: function() {
		this.trigger("model.ready", this.data);
	}
	
};


/**
  * Represents the view class of the jsCow button component. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  * @class jsCow.res.view.button
  * @type Class Provides the view class of the component
  * @constructor 
  */

jsCow.res.view.button = function() {
	
	/**
	  * Objekt for all needed HTML-DOM elements of the component.
	  * 
	  * @property dom
	  * @type Object
	  * @default {} Object
	**/
	this.dom = {};
	
	/**
	  * Represents the html main container of the component.
	  * 
	  * @property dom.main
	  * @type Object
	  * @default <div/> jQuery DIV object
	**/
	this.dom.main = $('<div/>').addClass('jsc-btn');

	/**
	  * Represents the inner html container of the component.
	  * The button component do not need and not use this property. Therefore its commented out.
	  * 
	  * @property dom.content
	  * @type Object
	  * @default <div/> jQuery DIV object
	**/
	//this.dom.content = $('<div/>').addClass('jsc-btn-content clearfix').appendTo(this.dom.main);
	
};
jsCow.res.view.button.prototype = {
	
	/**
	  * The view init method can used to set default view properties.
	  * By trigger the event 'model.ready' the controller will trigger the event 'view.init' to call this method.
	  * This method register all jquery events for mouseover, mouseout, press, pressed and click on the button component. 
	  	
	  	// For example
	  	this.trigger("mouseover");
	  	this.trigger("mouseout");
	  	this.trigger("press");
	  	this.trigger("pressed");
	  	this.trigger("click");
		
		// The view init will be triggered by the controller
	  	this.trigger(
	  		"view.init", 
	  		this.cmp().config()
	  	);

	  * @method init Set all jquery events and trigger the component event 'view.update'.
	  */
	
	init: function(e) {
		
		// Hover
		this.dom.main.hover(
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.dom.main.addClass('jsc-btn-hover');
						self.trigger("mouseover");
					}
				};
			})(this, e),
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.dom.main.removeClass('jsc-btn-hover');
						self.trigger("mouseout");
					}
				};
			})(this, e)
			
		).mousedown( 
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.dom.main.addClass('jsc-btn-press');
						self.trigger("press");
					}
				};
			})(this, e)
			
		).mouseup( 
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.dom.main.removeClass('jsc-btn-press');
						self.trigger("pressed");
					}
				};
			})(this, e)
			
		).click( 
			
			(function(self, e) {
				return function() {
					if (e.data.enabled) {
						self.dom.main.removeClass('jsc-btn-press');
						self.trigger("click");
					}
				};
			})(this, e)
			
		);
		
		this.dom.text = $('<span/>').appendTo( this.dom.main );
		this.dom.icon = $('<i/>');

		this.trigger("view.update", e.data);
	},
	
	/**
	  * The view update method will update the complete component view by trigger the event 'view.update' with all available model data.
	  	
	  	this.trigger(
	  		"view.update", 
	  		this.cmp().config()
	  	);

	  * @method update
	  * @param {object} eventdata Contains all sent event data
	  */

	update: function(e) {	
		
		if (e.data.enabled) {
			
			this.dom.main
				.removeClass('jsc-btn-disabled')
				.addClass('jsc-btn');
			
			if (!e.data.text || e.data.text === '') {
				this.dom.text
					.addClass('hidden');
			} else {
				this.dom.text
					.html(e.data.text)
					.removeClass('hidden')
					.show();
			}
			
			if (e.data.visible) {
				this.dom.main.show();
			}else{
				this.dom.main.hide();
			}
			
			if (e.data.icon) {
				this.dom.icon
					.addClass(e.data.icon.prefix+''+e.data.icon.name);
				
				switch (e.data.icon.direction) {
					
					case 'l':
						this.dom.text.before(this.dom.icon);
						break;
					case 'r':
						this.dom.text.after(this.dom.icon);
						break;
						
					default:
						this.dom.text.before(this.dom.icon);
						break;

				}

			}else{
				
			}
			
		}else{
			
			this.dom.main
				.removeClass('jsc-btn')
				.addClass('jsc-btn-disabled');
			
		}
	}
	
};


/**
  * Represents the controller class of the jsCow button component. 
  * 
  * @author Mario Linz <jscow@gmx.de>
  * @class jsCow.res.controller.button
  * @type Class Provides the controller class of the component
  * @constructor 
  */

jsCow.res.controller.button = function() {};
jsCow.res.controller.button.prototype = {
	
	/**
	  * The controller init method register all needed events within the controller and provides all related event handler.

	  	// Code examples
	  	this.on("model.ready", this.isModelReady);
		this.on("text", this.text);
		this.on("icon", this.icon);

	  * @method init
	  */

	init: function() {
		this.on("model.ready", this.isModelReady);
		this.on("text", this.text);
		this.on("icon", this.icon);
	},
	

	/**
	  * The controller isModelReady method is an event handler and will be triggert by the event 'model.ready' with all available model data.
	  * Is the model ready the 'view.init' event will triggert by this handler with all available model data again.
	  	
	  	this.trigger(
			"view.init", 
			e.data
		);

	  * @method isModelReady
	  * @param {object} eventdata Contains all sent event data
	  */

	isModelReady: function(e) {
		this.trigger(
			"view.init", 
			e.data
		);
	},
	

	/**
	  * The controller text method is an event handler and will only set the text for the button.
	  * This handler will be triggert by the component specific event 'text'.
	  	
	  	this.cmp().config({
			text: e.data.text
		});

	  * @method text
	  * @param {object} eventdata Contains all sent event data
	  */

	
	text: function(e) {
		this.cmp().config({
			text: e.data.text
		});
	},
	

	/**
	  * The controller icon method is an event handler and will only set the icon configuration for the button.
	  * This handler will be triggert by the component specific event 'icon'.
	  	
	  	this.cmp().config({
			icon: e.data.icon
		});

		// Configuration example for the event data
		{
			direction: 'l',
			name: 'user',
			prefix: 'fa fa-'
		}
		
	  * @method icon
	  * @param {object} eventdata Contains all sent event data
	  */

	icon: function(e) {
		this.cmp().config({
			icon: e.data.icon
		});
	}
	
};
