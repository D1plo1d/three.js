/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Text = function ( text, material ) {

	THREE.Particle.call( this, material );

	this.text = text;
	this.font = "20pt Verdana, sans-serif";
	/** if set to true enables scaling of the font size to match it's distance from the camera */
	this.fontScaling = true;
	/** 3d or 2d. 2d draws the text always flat on the screen, 3d skews and rotates the text with it's orientation in 3d space */
	this.context = "3d";
	
	this.getWidth = function()
	{
		//TODO: placeholder
		return 1.2;
	}

	this.getHeight = function()
	{
		//TODO: placeholder
		return 0.5;
	}

};

THREE.Text.prototype = new THREE.Particle();
THREE.Text.prototype.constructor = THREE.Text;
