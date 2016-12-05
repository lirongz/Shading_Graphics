varying vec3 reflectionDirection; 
void main() {
	//vec3 N=normalize(gl_NormalMatrix*gl_Normal); //calculate the normal vector in ViewSpace
	vec3 P=gl_Vertex.xyz/gl_Vertex.w;	//calculate the position of vertex in view space
		//ViewSpace=EyeSpace=CameraSpace
	vec3 E= (gl_ModelViewMatrixInverse*vec4(0,0,0,1)).xyz;   //the camera position in eye space
	vec3 V=normalize(P.xyz-E.xyz); //direction towards the viewer(from camera to vertex
   // reflectionVector=vec3(0,0,1);  // TODO: compute reflectionVector in Model space
	reflectionDirection=(reflect(gl_Normal,V));

    // vertex shader output
    gl_Position    = gl_ModelViewProjectionMatrix * gl_Vertex;
    gl_FrontColor  = gl_Color;
    gl_TexCoord[0] = gl_MultiTexCoord0;
} 
