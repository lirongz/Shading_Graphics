// simple fragment shader

varying vec3 N;
varying vec3 V;


void main()
{ 
    //the initialization of final color:
    vec4 finalColor = vec4(0.0, 0.0, 0.0, 0.0);

   //using a for loop to go through the data of each lightsources:
    for(int i=0; i<3 ; i++){
   
   //L is the vector from the vertex to the light source
   vec3 L = normalize(gl_LightSource[i].position.xyz - V); 

   //E define the vector from the vertex to the camera
   vec3 E = normalize(-V); 

   //R define reflection of the light
   vec3 R = normalize(-reflect(L,N));

   //Usingt he given funxtions as the last assignment:
   vec4 Iamb = gl_FrontLightProduct[i].ambient;

   vec4 Idiff = gl_FrontLightProduct[i].diffuse * max(dot(N,L),0);
   Idiff = clamp(Idiff, 0.0, 1.0);
   
   vec4 Ispec = gl_FrontLightProduct[i].specular * pow(max(dot(R,E),0),0.3 * gl_FrontMaterial.shininess);
   Ispec = clamp(Ispec, 0.0, 1.0);
//clamp() functions are used to constarin the value of Idiff and Ispec (between 0.0 to 1.0)

    //adding all effects together
    finalColor += Iamb + Idiff + Ispec;

}

	gl_FragColor = gl_FrontLightModelProduct.sceneColor + finalColor;
}
