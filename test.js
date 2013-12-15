var Vector2 = require('./lib/Vector2');
var Vector3 = require('./lib/Vector3');
var Vector4 = require('./lib/Vector4');
var Quaternion = require('./lib/Quaternion');
var Matrix3 = require('./lib/Matrix3');

var assert = require('assert');

var ovec2 = new Vector2();
var ovec3 = new Vector3();
var ovec4 = new Vector4();
var oquat = new Quaternion();

var iterations = 10000;
var EPSILON = 0.000001;

function equalish(a, b) {
    return Math.abs(a - b) < EPSILON;
}

////// 
/// There are lots of improvements we can do here for tests.

console.log("----- Test Suite -----");

var components = ['x', 'y', 'z', 'w'];
var testVals = [-5, -10, 20, 13];

function testConstructor(name, ctor, numComponents) {
    console.log("-- Testing", name, "constructor")
    for (var i=0; i<numComponents; i++) {
        var c = components[i];
        var v = testVals[i];
        var obj = new ctor(testVals[0], testVals[1], testVals[2], testVals[3]);

        assert.strictEqual(new ctor()[c], 0, "Default "+name+"."+c);
        assert.strictEqual(obj[c], v, "New "+name+"."+c);
        assert.strictEqual(new ctor( obj )[c], v, "Copy constructor "+name+"."+c);
    }
};

function testSet(name, obj, vals, numComponents) {
    // console.log("-- Testing", name, "set()");
    obj.set.apply(obj, vals);
    for (var i=0; i<numComponents; i++) {
        var c = components[i];
        assert.strictEqual(obj[c], vals[i], name+".set() "+c);
    }
}
    
function testOp(name, ctor, func, vals1, vals2, res, numComponents, funcVal) {
    // console.log("---- Testing "+name+"."+func+"()");
    var n = new ctor();
    var n2 = new ctor();

    n.set.apply(n, vals1);
    n2.set.apply(n2, vals2);
    var ret = n[func](funcVal || n2);
    assert.strictEqual(ret, n, name+"."+func+"() did not return this");

    for (var i=0; i<numComponents; i++) {
        var c = components[i];
        assert.ok( equalish( n[c], res[i] ), name+"."+func+"() "+c+" -- got "+n[c]+", expected "+res[i] );    
    }   
}

testConstructor("Vector2", Vector2, 2);
testConstructor("Vector3", Vector3, 3);
testConstructor("Vector4", Vector4, 4);
testConstructor("Quaternion", Quaternion, 4);

testSet("Vector2", ovec2, [10, -15], 2);
testSet("Vector3", ovec3, [10, -15, 50], 3);
testSet("Vector4", ovec4, [5, -5, 72, 1], 4);
testSet("Quaternion", oquat, [5, -5, 72, 1], 4);


console.log("-- Testing Vector2");
testOp("Vector2", Vector2, "copy", [0, 0], [10, 50], [10, 50], 2);
testOp("Vector2", Vector2, "add", [-10, 2], [10, 50], [0, 52], 2);
testOp("Vector2", Vector2, "sub", [-10, 2], [10, 50], [-20, -48], 2);
testOp("Vector2", Vector2, "mul", [-10, 2], [10, 50], [-100, 100], 2);
testOp("Vector2", Vector2, "div", [-10, 2], [10, 50], [-1, 0.04], 2);
testOp("Vector2", Vector2, "scale", [-10, 2], [], [-250, 50], 2, 25);
testOp("Vector2", Vector2, "negate", [-10, 2], [], [10, -2], 2, 0);
testOp("Vector2", Vector2, "normalize", [-10, 2], [], [-0.9805806756909202, 0.19611613513818404], 2, 0);
testOp("Vector2", Vector2, "normalize", [0, 0], [], [0, 0], 2, 0);
testOp("Vector2", Vector2, "lerp", [50, 10], [15, 50], [50, 10], 2);

console.log("-- Testing Vector3");
testOp("Vector3", Vector3, "copy", [0, 0, 0], [10, 50, 25], [10, 50, 25], 3);
testOp("Vector3", Vector3, "add", [-10, 2, 32], [10, 50, 25], [0, 52, 57], 3);
testOp("Vector3", Vector3, "sub", [-10, 2, 32], [10, 50, 25], [-20, -48, 7], 3);
testOp("Vector3", Vector3, "mul", [-10, 2, 32], [10, 50, 25], [-100, 100, 800], 3);
testOp("Vector3", Vector3, "div", [-10, 2, 32], [10, 50, 25], [-1, 0.04, 1.28], 3);
testOp("Vector3", Vector3, "scale", [-10, 2, 32], [], [-250, 50, 800], 3, 25);
testOp("Vector3", Vector3, "negate", [-10, 2, 32], [], [10, -2, -32], 3, 0);
testOp("Vector3", Vector3, "normalize", [-10, 2, 32], [], [-0.29774566708770683, 0.05954913341754137, 0.9527861346806619], 3, 0);
testOp("Vector3", Vector3, "normalize", [0, 0, 0], [], [0, 0, 0], 3, 0);
testOp("Vector3", Vector3, "lerp", [50, 10, 10], [15, 50, 75], [50, 10, 10], 3);

console.log("-- Testing Vector4");
testOp("Vector4", Vector4, "copy", [0, 0, 0, 0], [10, 50, 25, 12], [10, 50, 25, 12], 4);
testOp("Vector4", Vector4, "add", [-10, 2, 32, -7], [10, 50, 25, 12], [0, 52, 57, 5], 4);
testOp("Vector4", Vector4, "sub", [-10, 2, 32, -7], [10, 50, 25, 12], [-20, -48, 7, -19], 4);
testOp("Vector4", Vector4, "mul", [-10, 2, 32, -7], [10, 50, 25, 12], [-100, 100, 800, -84], 4);
testOp("Vector4", Vector4, "div", [-10, 2, 32, -7], [10, 50, 25, 14], [-1, 0.04, 1.28, -0.5], 4);
testOp("Vector4", Vector4, "scale", [-10, 2, 32, -7], [], [-250, 50, 800, -175], 4, 25);
testOp("Vector4", Vector4, "negate", [-10, 2, 32, -7], [], [10, -2, -32, 7], 4, 0);
testOp("Vector4", Vector4, "normalize", [-5, 0, 10, 0], [], [-0.4472135954999579, 0, 0.8944271909999159, 0], 4, 0);
testOp("Vector4", Vector4, "normalize", [0, 0, 0, 0], [], [0, 0, 0, 0], 4, 0);
testOp("Vector4", Vector4, "lerp", [50, 10, 10, 25], [15, 50, 75, 12], [50, 10, 10, 25], 4);


console.log("-- Testing Quaternion");
testOp("Quaternion", Quaternion, "copy", [0, 0, 0, 0], [10, 50, 25, 12], [10, 50, 25, 12], 4);
testOp("Quaternion", Quaternion, "add", [-10, 2, 32, -7], [10, 50, 25, 12], [0, 52, 57, 5], 4);
testOp("Quaternion", Quaternion, "sub", [-10, 2, 32, -7], [10, 50, 25, 12], [-20, -48, 7, -19], 4);
testOp("Quaternion", Quaternion, "scale", [-10, 2, 32, -7], [], [-250, 50, 800, -175], 4, 25);
testOp("Quaternion", Quaternion, "normalize", [-5, 0, 10, 0], [], [-0.4472135954999579, 0, 0.8944271909999159, 0], 4, 0);
testOp("Quaternion", Quaternion, "normalize", [0, 0, 0, 0], [], [0, 0, 0, 0], 4, 0);
testOp("Quaternion", Quaternion, "lerp", [50, 10, 10, 25], [15, 50, 75, 12], [50, 10, 10, 25], 4);
testOp("Quaternion", Quaternion, "mul", [-50, 10, 25, 0], [23, -21, 75.2, 2.5], [1152, 4360, 882.5, -520], 4);

function testQuatRotationTo(a, b, expected, msg, tvec, rvec) {
    oquat.idt();
    var ret = oquat.rotationTo( new Vector3(a[0], a[1], a[2]), 
                                new Vector3(b[0], b[1], b[2]) );
    assert.strictEqual(ret, oquat, "Quaternion.rotationTo() does not return this");
    if (!tvec) {
        assert.ok( equalish(oquat.x, expected[0]) 
                && equalish(oquat.y, expected[1])
                && equalish(oquat.z, expected[2])
                && equalish(oquat.w, expected[3]), "Quaternion.rotationTo() "+msg);    
    } else {
        ovec3.set(tvec[0], tvec[1], tvec[2]);
        ovec3.transformQuat(oquat);

        assert.ok( equalish(ovec3.x, rvec[0]) 
                && equalish(ovec3.y, rvec[1])
                && equalish(ovec3.z, rvec[2]), "Quaternion.rotationTo() "+msg);    
    }
        
}

testQuatRotationTo([0, 1, 0], [1, 0, 0], [0, 0, -0.707106, 0.707106], "at right angle");
testQuatRotationTo([0, 1, 0], [0, 1, 0], null, "when vectors are parallel", [0, 1, 0], [0, 1, 0]);
testQuatRotationTo([1, 0, 0], [-1, 0, 0], null, "when vectors are opposed X", [1, 0, 0], [-1, 0, 0]);
testQuatRotationTo([0, 1, 0], [0, -1, 0], null, "when vectors are opposed Y", [0, 1, 0], [0, -1, 0]);
testQuatRotationTo([0, 0, 1], [0, 0, -1], null, "when vectors are opposed Z", [0, 0, 1], [0, 0, -1]);

//TODO: matrix & quat tests
//TODO: compare against gl-matrix