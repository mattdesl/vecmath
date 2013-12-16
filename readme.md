## vecmath

This is a small vector module, built with the optimized codebase of [gl-matrix](https://github.com/toji/gl-matrix) but using objects and JavaScript paradigms instead of typed arrays. 

## install

With node:

```
npm install vecmath

... in code ...
var Matrix4 = require('vecmath').Matrix4;
```

Or you can grab the UMD build from the `build` folder, which will work with RequireJS or a non-module app.

## Why another library?

gl-matrix is indeed one of the best and fastest vector/matrix libraries for real-time JavaScript, especially for WebGL purposes (thanks to its use of typed arrays). However, it leads to a poor end-user experience, for example if you are buidling a 2D or 3D game framework on top of gl-matrix. The end-user code looks like this:

```javascript
var test = vec3.create();
var other = vec3.fromValues(5, 2, 1);
var other2 = vec3.copy( vec3.create(), other );

var x = sprite.position[0] + otherSprite.position[0];
vec3.normalize( sprite.velocity, sprite.velocity );
vec3.scale( sprite.velocity, sprite.velocity, 5 );

foobar( sprite.velocity[0], sprite.velocity[1], sprite.velocity[2] );

.. etc ..
```

Using array indices is error-prone, has no auto-completion or IDE refactoring, and makes your code more difficult to read. The static method calls also tend to bloat your math code. It just doesn't feel "right" with a language as dynamic as JavaScript. 


Instead, with this module, the above code can be written like so:

```javascript
var test = new Vector3();
var other = new Vector3(5, 2, 1);
var other2 = new Vector3(other);

var x = sprite.position.x + otherSprite.position.x;

sprite.velocity.normalize().scale(5);

foobar( sprite.x, sprite.y, sprite.z );
```

It adds features like method chaining, optional parameters to constructor, and XYZW access for clean end-user code. 

## What about performance?

The reason gl-matrix is so blazingly fast is mostly because its code is highly optimized. It unrolls loops, uses inline code everywhere, and takes advantage of JS variable caching. 

The difference between property and array accessors is negligible for the vast majority of applications. Thanks to optimizations on JS engines (V8, SpiderMonkey, etc), hidden classes and inline caches are _really_ fast nowadays (and will probably only get faster). As you can see in the following benchmarks, class-based Vectors actually outperform array access:
 
http://jsperf.com/gl-matrix-vs-objects/4  
http://jsperf.com/gl-matrix-vs-vecmath

## What about WebGL?

Using a typed array (if available) for matrices was definitely the right choice of gl-matrix, and so we do the same for WebGL compatibility. Matrix objects have `val`, which is the backing array (Float32Array, or falls back to Array for old browsers).

```javascript
var mat = new Matrix4();

gl.uniformMatrix4fv(loc, false, mat.val);
```

## What about new objects?

Just like in gl-matrix, the API tries to encourage re-using vectors to avoid allocations. So often your code will look like this:

```javascript
myVec.add( tmp.set(0, 10, 50) );
```

However, if you need to create new objects (out of laziness or some other reason), all functions that take a vector/quaternion type will support lightweight objects as well:

```javascript
myVec.add({ x:0, y: 10, z: 50 });
```

These are usually a lot faster to allocate than a Vector class, or a Float32Array (in the case of gl-matrix). 

If you find yourself creating a lot of objects, you should use a Pool to reduce allocations. 

## Extra features

The library does its best to stay consistent with the gl-matrix API, but also includes a couple extra features:

- `Vector3.project(projMatrix)`: this method is useful for projecting a 3D point into 2D space
- `Vector3.unproject(viewport, invProjMatrix)`: useful for _un_projecting a 2D point into 3D space

## TODO:

- Move docs over from gl-matrix
- Add licensing information since most of the code belongs to gl-matrix (???)
- Add mat2 and mat2d
- Test Quaternion + Matrix classes and compare with gl-matrix results
- Further improvements to test suite, using mocha or something
- Standalone UMD build for non-node users