$(function(){
	
	console.time('all');
	
	var btn1 = jsCow.get(jsCow.res.components.button, { 
		text: 'Button', 
		icon: {
			name: 'user',
			direction: 'l'
		}
	});

	btn1.run();
	
	console.timeEnd('all');
	console.log(jsCow.componentsObjectList.length, "components created...");
	
});
