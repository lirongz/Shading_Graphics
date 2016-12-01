#version 120
uniform bool ambient, diffuse, specular;

vec4 shading(vec3 P, vec3 N, gl_LightSourceParameters light, gl_MaterialParameters mat) {
	vec4 result = vec4(0,0,0,1); // opaque black
	if (ambient) {
	 result += mat.ambient*light.ambient;
 } // compute ambient contribution according to the definition

	vec3 L = normalize(light.position.xyz-P);   //vector toward light source  light vector=light position-object position

	
	if (diffuse) {                                     
    //use Lambet's cosine law 
	 result += mat.diffuse*light.diffuse*(max(0,dot(L,N))); 

 	}  	
    vec3 E= vec3(0);  //position of camera in View Space, it is default at origin
	vec3 V=normalize(E-P);
	vec3 R=normalize(reflect(-L,N));  //the normalized reflected vector 
	
	if (specular) { 
	
	if(dot(R,V)>0 && dot(N,V)>0){	//make sure the reflection and the incident should be on the same half plane

		result +=mat.specular*light.specular*pow(dot(R,V),mat.shininess); 
	}
 } // compute specular contribution according to the definition
	return result;
 }

void main() {
 // pick up light LIGHT0 and material properties set in ShaderMaker
	gl_LightSourceParameters light = gl_LightSource[0];
	gl_MaterialParameters mat = gl_FrontMaterial;
	vec3 N = normalize(gl_NormalMatrix* gl_Normal); // TODO: transform normal vector to view space(is it camera space?)
	vec3 P = vec3(gl_ModelViewMatrix*gl_Vertex); // TODO: compute vertex position in 3-D view coordinates (modelView vertex?)
// output of vertex shader
	gl_TexCoord[0] = gl_MultiTexCoord0;
	gl_FrontColor = shading(P, N, light, mat);
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}