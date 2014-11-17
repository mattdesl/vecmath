## no longer maintained

Although classes and chainable methods can lead to cleaner code and might be easier for rapid prototyping, they ultimately are not as good for module interoperability as plain arrays. For modules I would recommend [gl-vec2](https://github.com/stackgl/gl-vec2), [gl-vec3](https://github.com/stackgl/gl-vec3), [gl-mat4](https://github.com/stackgl/gl-mat4), etc. as it's more modular and generic. Examples:

https://www.npmjs.org/package/delaunay-triangulate
https://www.npmjs.org/package/simplify-path  
https://www.npmjs.org/package/chaikin-smooth
https://www.npmjs.org/package/bezier
https://www.npmjs.org/package/adaptive-bezier-curve
https://www.npmjs.org/package/triangulate-contours
https://www.npmjs.org/package/bunny
https://www.npmjs.org/package/parse-svg-path

etc.

--

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

## performance

The reason gl-matrix is so blazingly fast is mostly because its code is highly optimized. It unrolls loops, uses inline code everywhere, and takes advantage of JS variable caching. 

Thanks to optimizations on JS engines (V8, SpiderMonkey, etc), hidden classes and inline caches are _really_ fast nowadays (and will probably only get faster). As you can see in the following benchmarks, class-based Vectors actually outperform array access:
 
http://jsperf.com/gl-matrix-vs-objects/4  
http://jsperf.com/gl-matrix-vs-vecmath

It's important to realize that the difference between property and array accessors is negligible for the vast majority of applications, so you shouldn't be sacrificing code readability and maintainability for a change that won't make a dent in the long run.

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
- `Vector3.unproject(viewport, invProjMatrix)`: useful for *un*projecting a 2D point into 3D space

## TODO:

- Move docs over from gl-matrix
- Add licensing information since most of the code belongs to gl-matrix (???)
- Add mat2 and mat2d
- Test Quaternion + Matrix classes and compare with gl-matrix results
- Further improvements to test suite, using mocha or something
- Make it more modular by placing each class in its own module. Will probably be `math-vector2`, `math-vector3`, etc. since `vector2` is already taken.

## License

MIT
