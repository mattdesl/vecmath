
var Vector3 = require('./lib/index').Vector3;
var Vector4 = require('./lib/index').Vector4;
var Matrix4 = require('./lib/index').Matrix4;

var near = 1,
	far = 100,
	viewportWidth = 500,
	viewportHeight = 250,
	fieldOfView = 65 * Math.PI / 180,
	position = new Vector3(),
	up = new Vector3(0, 1, 0),
	projection = new Matrix4(),
	view = new Matrix4(),
	combined = new Matrix4(),
	invProjectionView = new Matrix4(),
	tmpVec3 = new Vector3(),
	direction = new Vector3(0, 0, -1);

var aspect = viewportWidth / viewportHeight;


///////


//create a perspective matrix for our camera
projection.perspective(fieldOfView, aspect, 
					Math.abs(near), Math.abs(far));

//build the view matrix 
tmpVec3.copy(position).add(direction);
view.lookAt(position, tmpVec3, up);

//projection * view matrix
combined.copy(projection).mul(view);

//invert combined matrix, used for unproject
invProjectionView.copy(combined).invert();


console.log(invProjectionView.val);


var vec3 = require('gl-matrix').vec3;
var vec4 = require('gl-matrix').vec4;
var mat4 = require('gl-matrix').mat4;

var tmpvec32 = vec3.create(),
	position2 = vec3.create(),
	up2 = vec3.fromValues(0, 1, 0),
	direction2 = vec3.fromValues(0, 0, -1),
	view2 = mat4.create(),
	projection2 = mat4.create(),
	combined2 = mat4.create(),
	invProjectionView2 = mat4.create();


//create a perspective matrix for our camera
mat4.perspective(projection2, 
				 fieldOfView,
				 aspect, Math.abs(near), Math.abs(far));

//build the view matrix 
var tmp = vec3.add(tmpvec32, position2, direction2);

mat4.lookAt(view2, position2, tmp, up2);

//projection * view matrix
mat4.multiply(combined2, projection2, view2);

//invert combined matrix, used for unproject
mat4.invert(invProjectionView2, combined2);

console.log(invProjectionView2);