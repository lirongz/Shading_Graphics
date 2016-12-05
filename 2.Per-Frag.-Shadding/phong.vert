// simple vertex shader
#version 120
varying vec3 N;
varying vec3 V;


uniform bool ambient, diffuse, specular;
void main()
{
	//gl_LightSourceParameters light = gl_LightSource[0];
	//gl_MaterialParameters mat = gl_FrontMaterial;
	 N= gl_NormalMatrix*gl_Normal;	
	 V = vec3(gl_ModelViewMatrix*gl_Vertex);

	gl_Position    = gl_ModelViewProjectionMatrix * gl_Vertex;
	//gl_FrontColor  = shading(P, N, light, mat);
	//gl_TexCoord[0] = gl_MultiTexCoord0;
}
