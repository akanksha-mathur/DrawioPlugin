/**
 * Sample plugin.
 */
Draw.loadPlugin(function(ui) {

	var graph = ui.editor.graph;
	var enabled = true;
	var counter = 0;
	
	// Creates the shape for the shape number and puts it into the draw pane
	var redrawShape = graph.cellRenderer.redrawShape;
	graph.cellRenderer.redrawShape = function(state, force, rendering)
	{
		alert("added");
		console.log("added console");
	};

	// Destroys the shape number
	var destroy = graph.cellRenderer.destroy;
	graph.cellRenderer.destroy = function(state)
	{
		destroy.apply(this, arguments);
		
		if (state.secondLabel != null)
		{
			state.secondLabel.destroy();
			state.secondLabel = null;
		}
	};
	
	graph.cellRenderer.getShapesForState = function(state)
	{
		return [state.shape, state.text, state.secondLabel, state.control];
	};
	
	var validate = graph.view.validate;
	graph.view.validate = function()
	{
		counter = 0;
		validate.apply(this, arguments);
	};
	
	// Extends View menu
	mxResources.parse('number=Number');

    // Adds action
    var action = ui.actions.addAction('number...', function()
    {
		enabled = !enabled;
		graph.refresh();
    });
	
    action.setToggleAction(true);
	action.setSelectedCallback(function() { return enabled; });
    
	var menu = ui.menus.get('view');
	var oldFunct = menu.funct;
	
	menu.funct = function(menu, parent)
	{
		oldFunct.apply(this, arguments);
		
		ui.menus.addMenuItems(menu, ['-', 'number'], parent);
	};
	
	// Forces refresh if file was loaded before plugin
	if (ui.getCurrentFile() != null)
	{
		graph.refresh();
	}
});
