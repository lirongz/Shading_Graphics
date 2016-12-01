// simple fragment shader
#version 120
uniform bool ambient, diffuse, specular;
varying vec3 N;
varying vec3 P;


#define MAX_LIGHTS 3

vec4 shading(void) {
	
	for(int i=0;i<3 ;i=i++){
	
	 result += gl_FrontLightProduct[i].ambient;
	 // TODO: compute ambient contribution

    vec3 L = normalize(gl_LightSource[i].position.xyz-P);   //vector toward light source  light vector=light position-object position				
	
	 result += gl_FrontLightProduct[i].diffuse*(max(0,dot(L,N))); // , disregard as L and N are normalized already;	
 	 //compute diffuse contribution, need to find the light source vector
							 
    vec3 E= vec3(0);    //position of camera in View Space
	vec3 V=normalize(E-P);  // direction towards viewer
    vec3 R=normalize(-reflect(L,N));
	
		if(dot(R,V)>0 && dot(N,V)>0){	//check the obser
			result +=gl_FrontLightProduct[i].specular*pow(dot(R,V),gl_FrontMaterial.shininess);
		}
	  //  compute specular contribution
    return result;
   }
	//return result;
 }

void main(void) {
	// N= gl_NormalMatrix*gl_Normal;	
	vec4 result = vec4(0.0, 0.0, 0.0,1.0); // opaque black
	vec3 L = normalize(gl_LightSource[i].position.xyz-P);
	vec3 E= vec3(0);    //position of camera in View Space
	vec3 V=normalize(E-P);  // direction towards viewer
    vec3 R=normalize(-reflect(L,N));
	
	
	gl_FragColor = gl_FrontLightModelProduct.sceneColor+shading();
	
}