//common vec4 functions
module.exports = {
	
    copy: function(otherVec) {
        this.x = otherVec.x;
        this.y = otherVec.y;
        this.z = otherVec.z;
        this.w = otherVec.w;
        return this;
    },

    set: function(x, y, z, w) {
        this.x = x||0;
        this.y = y||0;
        this.z = z||0;
        this.w = w||0;
        return this;
    },

    add: function(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
        this.w += v.w;
        return this;
    },

    subtract: function(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
        this.w -= v.w;
        return this;
    },

    scale: function(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;
        return this;
    },


    length: function() {
        var x = this.x,
            y = this.y,
            z = this.z,
            w = this.w;
        return Math.sqrt(x*x + y*y + z*z + w*w);
    },

    lengthSq: function() {
        var x = this.x,
            y = this.y,
            z = this.z,
            w = this.w;
        return x*x + y*y + z*z + w*w;
    },

    normalize: function() {
        var x = this.x,
            y = this.y,
            z = this.z,
            w = this.w;
        var len = x*x + y*y + z*z + w*w;
        if (len > 0) {
            len = 1 / Math.sqrt(len);
            this.x = x*len;
            this.y = y*len;
            this.z = z*len;
            this.w = w*len;
        }
        return this;
    },

    dot: function(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    },

    lerp: function(v, t) {
        var ax = this.x,
            ay = this.y,
            az = this.z,
            aw = this.w;
        t = t||0;
        this.x = ax + t * (v.x - ax);
        this.y = ay + t * (v.y - ay);
        this.z = az + t * (v.z - az);
        this.w = aw + t * (v.w - aw);
        return this;
    }
};