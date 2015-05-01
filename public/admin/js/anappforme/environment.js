var ENV = {
	/* identify if any of the popular devices*/
 	device : {
		iOS : false,
		android : false,
		iPad : false,
		touchSupport: false
	},      
	
	screen: {
		orientation:null,
		height:null,
		width: null
	},
	
	/* zoom percent -- useful to adjust drag-drop events and to scale appWrapper to fill the screen */
	
	zoom: 100
}