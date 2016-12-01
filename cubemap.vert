varying vec3 reflectionDirection;
void main() {
    reflectionVector=vec3(0,0,1);  // TODO: compute reflection vector in Model space

    // vertex shader output
    gl_Position    = gl_ModelViewProjectionMatrix * gl_Vertex;
    gl_FrontColor  = gl_Color;
    gl_TexCoord[0] = gl_MultiTexCoord0;
} 
