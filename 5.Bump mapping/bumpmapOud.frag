// ToDo integrate your Phong shader with this shader

uniform bool disableBumpMapping;
uniform int frequency;           // frequency of repeating pattern
varying mat3 tangentToEyeMatrix; // vertex shader output
varying vec3 N;                  // fragment normal in eye space.
uniform bool ambient, diffuse, specular;
varying vec3 P;
		// Computes a normal from the height map. cross product of Px and Py, and name it as BiNormal
	  //vec3 BiN=cross(tangentToEyeMatrix[0], tangentToEyeMatrix[1]);

	   // Transforms the normal into eye space.
	 // vec3 Neye= inverse(tangentToEyeMatrix)*BiN;

 	//according to the given, heightFunction is used to calculate the he
/*(float heightFunction(vec2 st){
	float v=pow(mod(st.x,1)*2-1,2)+pow(mod(st.y,1)*2-1,2);
		if(v<0.3){
			return v;
		}
    return 0.3;
}*/


vec3 getBumpedNormal(vec2 st) {
	float dx=0.5;  //displacement for x
	float dy=0.5;  //displacement for y
   	float modFre=1.0/float(frequency);
	vec3 bumpedNormal=N;
	float f=frequency;
	vec2 surfacePos=vec2(mod(st.s,modFre),mod(st.t,modFre));  //find the center of the circule based on frequency
	//map the position within(0,1)
	vec2 surfaceLocation=surfacePos*float(frequency); 
    //check if the st is with the radius of the center, make the radius be 0.25
	if(pow(surfaceLocation.x - 0.5,  2.0) + pow(surfaceLocation.y - 0.5, 2.0) < 0.0625){
		float Px = 2.0 * (surfaceLocation.x - 0.5) * pow(2.0, float(frequency));   //calculate the derivative of the position
		float Py = 2.0 * (surfaceLocation.y - 0.5) * pow(2.0, float(frequency));
		vec3 Tangent=normalize(vec3(1.0,0.0,Px));  //compute new tangent
		vec3 Bitangent=normalize(vec3(0.0,1.0,Py)); //compute the new Binormal
		return tangentToEyeMatrix*(cross(Tangent,Bitangent));
	}
	return bumpedNormal;
}


	/*for(int i=0; i<f; i++){ //for loop for x direction
		for(int j=0; j<f; j++){ //forloop for y direction
			dx=(0.5+i)/f; //modify displacement for x
			dy=(0.5+j)/f;	//modify dislacement for y
		if((((st.x-dx)*(st.x-dx)+(st.y-dy)*(st.y-dy))<0.10*(1.0/f)*(1.0/f)) ){	//construct circle with st and radius
			vec3 Xtan=vec3(1.0,0.0,2.0*(st.x-dx)*4.0*(f*f)); //x tangent
			vec3 Ytan=vec3(0.0,1.0,2.0*(st.y-dy)*4.0*(f*f)); //y tangent
			vec3 bumpedNormal=tangentToEyeMatrix*normalize(vec3(cross(Xtan,Ytan)));	

		}
	 }
	}*/
	//return bumpedNormal;
  // ToDo compute "bump mapping "normal vector

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
       gl_LightSourceParameters light = gl_LightSource[0];
       gl_MaterialParameters mat = gl_FrontMaterial; 
       vec3 bumpedNormal = N;
       if (!disableBumpMapping) { bumpedNormal = getBumpedNormal(gl_TexCoord[0].st); }
	
       //gl_FragColor = shading(gl_TexCoord[0], bumpedNormal, light, mat);   // function from Phong shader
	    gl_FragColor =shading(P, bumpedNormal, light, mat);	
}
