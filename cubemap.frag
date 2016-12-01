uniform sampler2D cubemap;        // pick up texture map installed in ShaderMaker

varying vec3 reflectionDirection; // vector from eye to object reflected in the normal
float Q=1.0/4.0;                  // quarter
float T=1.0/3.0;                  // third

vec2 computeTexCoords(vec3 R) {   // compute texture coordinates in cube map
     return vec2(3.5*Q,1.5*T);   
}

void main(void) {
    gl_FragColor = texture2D(cubemap, computeTexCoords(reflectionDirection));
} 
