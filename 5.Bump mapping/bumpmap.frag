// ToDo integrate your Phong shader with this shader

uniform bool disableBumpMapping;
uniform int frequency;           // frequency of repeating pattern
varying mat3 tangentToEyeMatrix; // vertex shader output
varying vec3 N;                  // fragment normal in eye space.
uniform bool ambient, diffuse, specular;
varying vec3 P;

//define the constant diaplcemant for the diatance between points 
float displacement=0.0001;
//define strength as the 
int strength= 3200;

//uniform sampler2D bumpmap;
		// Computes a normal from the height map. cross product of Px and Py, and name it as BiNormal
	  //vec3 BiN=cross(tangentToEyeMatrix[0], tangentToEyeMatrix[1]);

	   // Transforms the normal into eye space.
	 // vec3 Neye= inverse(tangentToEyeMatrix)*BiN;

 	//according to the given, heightFunction is used to calculate the he
float heightFunction(vec2 st){
	float v=pow(mod(st.x,1)*2-1,2)+pow(mod(st.y,1)*2-1,2);
		if(v<0.3){
			return v;
		}
    return 0.3;
}


vec3 getBumpedNormal(vec2 st) {
	//define points around point (s,t) according to the offset calculated by height_function
	float x=heightFunction(st-vec2(displacement,displacement));
	float y=heightFunction(st+vec2(displacement,-displacement));
	float z=heightFunction(st+vec2(-displacement,displacement));

	//calculating two tangent based on the heights calculated above
	vec3 v1=vec3(1 , 0 ,(y-x)*strength);
	vec3 v2=vec3(0 , 1 ,(z-x)*strength);    
   //the gradient of the height function according to the given
	//vec3 N=vec3(-2*st.x, -2*st.y, 1);
	//return N;
	return normalize(cross(v1,v2));
	//return bumpedNormal;
}  // ToDo compute "bump mapping "normal vector

vec4 shading(vec3 P,vec3 N, gl_LightSourceParameters light,gl_MaterialParameters mat){
		//the initialization of final color:
   	   vec4 finalColor = vec4(0.0, 0.0, 0.0, 0.0);
       vec4 Iamb = vec4(0.0, 0.0, 0.0, 0.0);
       vec4 Idiff = vec4(0.0, 0.0, 0.0, 0.0);
       vec4 Ispec = vec4(0.0, 0.0, 0.0, 0.0);   
	     //using a for loop to go through the data of each lightsources:
      // for(int i=0; i<3 ; i++){
   		// V in Phong shader is now all gl_Vertex
       //L is the vector from the vertex to the light source
   	   vec3 L = normalize(gl_LightSource[0].position.xyz - P.xyz); 

       //E define the vector from the vertex to the camera
	   vec3 E = normalize(-P.xyz); 

	   //R define reflection of the light
	   vec3 R = normalize(-reflect(L,N));

	   if(ambient){
	   //Usingt he given funxtions as the last assignment:
	   Iamb = gl_FrontLightProduct[0].ambient; 
	   }


	   if(diffuse){
	   Idiff = gl_FrontLightProduct[0].diffuse * max(dot(N,L),0);
	   Idiff = clamp(Idiff, 0.0, 1.0); 
	   }
   		
	   if(specular){
	   Ispec = gl_FrontLightProduct[0].specular * pow(max(dot(R,E),0),0.3 * gl_FrontMaterial.shininess);
	   Ispec = clamp(Ispec, 0.0, 1.0);
		//clamp() functions are used to constarin the value of Idiff and Ispec (between 0.0 to 1.0)   
	    //}

	    //adding all effects together
	    finalColor += Iamb + Idiff + Ispec;
	}
	return finalColor;
}




void main()  {
	  // int i;
	  	   
       gl_LightSourceParameters light = gl_LightSource[0];
       gl_MaterialParameters mat = gl_FrontMaterial; 
       vec3 bumpedNormal = N;
       if (!disableBumpMapping) { bumpedNormal = tangentToEyeMatrix* getBumpedNormal(gl_TexCoord[0].st*frequency); }
	
       //gl_FragColor = shading(gl_TexCoord[0], bumpedNormal, light, mat);   // function from Phong shader
	    gl_FragColor =shading(P, bumpedNormal, light, mat);	
}
