/**
 * @author mr.doob / http://mrdoob.com/
 */

THREE.Object3D = function ( material ) {

	this.position = new THREE.Vector3();
	this.rotation = new THREE.Vector3();
	this.scale = new THREE.Vector3( 1, 1, 1 );
	/** the offset from the position vector about which this object is rotated */
	this.centerOfRotation = new THREE.Vector3(0,0,0);

	this.matrix = new THREE.Matrix4();
	this.screen = new THREE.Vector3();

	this.material = material instanceof Array ? material : [ material ];
	this.overdraw = false;

	this.autoUpdateMatrix = true;

	/** flags an update in the object3d's values requiring a recalculation of it's matrix */
	this.dirty = true;
	/* internal flag to update all the object's children's matricies before they are rendered. */
	this.updateChildren = false;

	this.updateMatrix = function () {

		//Reducing render time by skipping matricies which need no update
		if (this.isDirty()==false) return;
		this.dirty = false;
		this.updateChildren = true;

		this.matrix.identity();
		//Translation (and matrix inheritance)
		if (this.parent != null)
		{
		  this.matrix.multiplySelf( this.parent.childTranslationMatrix( this.position.x, this.position.y, this.position.z ) );
		}
		else
		{
		  this.matrix.multiplySelf( THREE.Matrix4.translationMatrix( this.position.x, this.position.y, this.position.z ) );
		}
		//Rotation
		this.matrix.multiplySelf( THREE.Matrix4.rotationXMatrix( this.rotation.x ) );
		this.matrix.multiplySelf( THREE.Matrix4.rotationYMatrix( this.rotation.y ) );
		this.matrix.multiplySelf( THREE.Matrix4.rotationZMatrix( this.rotation.z ) );
		//Center of Rotation offsets
		if (this.centerOfRotation.x != 0 || this.centerOfRotation.y != 0 || this.centerOfRotation.z != 0)
			this.matrix.multiplySelf( THREE.Matrix4.translationMatrix( -this.centerOfRotation.x, -this.centerOfRotation.y, -this.centerOfRotation.z ) );
		//Scaling
		this.matrix.multiplySelf( THREE.Matrix4.scaleMatrix( this.scale.x, this.scale.y, this.scale.z ) );

	};

	this.childTranslationMatrix = function(cx, cy, cz) {

		this.updateMatrix();
//		m = THREE.Matrix4.translationMatrix(cx, cy, cz);
//		m.multiplySelf(this.matrix);
		m = this.matrix.clone();
		m.multiplySelf( THREE.Matrix4.translationMatrix(cx, cy, cz) );
		return m;

	};

	/** returns true if this object or any of it's parent's objects dirty flag is set to true*/
	this.isDirty = function()
	{
		return this.dirty || ( (this.parent!=null)? (this.parent.isDirty() == true ||this.parent.updateChildren == true ) : false );
	}

};
