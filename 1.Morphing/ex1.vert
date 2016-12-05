// simple vertex shader
#version 120
 uniform float time; // variable set by ShaderMaker
  
 float offset(vec3 p) {
	//if(abs(p.z)==1){
float s;
	//
	//float r =(sqrt(p.x*p.x+p.y*p.y));
	   if((p.x*p.x+p.y*p.y) <=p.z*p.z*9/16){
	   s =0.5*sqrt(p.z*p.z*9/16-p.y*p.y-p.x*p.x)*cos(time);  //why use substraction here
}
       if ((p.y*p.y+p.z*p.z) <=p.x*p.x*9/16){
       s= 0.5*sqrt(p.x*p.x*9/16-p.y*p.y-p.z*p.z)*cos(time);
}
       if ((p.x*p.x+p.z*p.z) <=p.y*p.y*9/16){
       s= 0.5*sqrt(p.y*p.y*9/16-p.x*p.x-p.z*p.z)*cos(time);
}
   	return s; // TODO: compute offset depending on position p in model space

}


 void main() {
// convert from homogeneous coordinates to 3D-coordinates
	vec3 p = gl_Vertex.xyz/gl_Vertex.w;
	p = p + offset(p) * gl_Normal;

// output of vertex shader
	gl_FrontColor = gl_Color;
	gl_TexCoord[0] = gl_MultiTexCoord0;
	gl_Position = gl_ModelViewProjectionMatrix * vec4(p,1);
}

