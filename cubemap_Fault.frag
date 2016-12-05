uniform sampler2D cubemap;        // pick up texture map installed in ShaderMaker
//glEnable(GL_TEXTURE_CUBEMAP_MAP_EXT);
varying vec3 reflectionDirection; // vector from eye to object reflected in the normal
float Q=1.0/4.0;                  // quarter
float T=1.0/3.0;                  // third
float s=Q;                        //unit width of each cube in cubemap
float t=T;                        //unit height of each cube in cubemap

vec2 computeTexCoords(vec3 R) {   //TODO: compute texture coordinates in cube map
	    //Mapping cubemap face to the 2D mipmap
	//first comparing and choose the major axis direction,
	//and then choose positive face to map by if-statement
	if(abs(R.x)>=abs(R.y)&& abs(R.x)>=abs(R.z)){       		//R.x,R.y,R.z are all direction vector
		if(R.x>=0.0){
			return vec2(2.5*s+0.5*s*R.z,1.5*t-0.5*t*R.y);  //for positive_x surface
		}
		return vec2(0.5*s-0.5*R.z,1.5*t-0.5*t*R.y);			//for negative_x surface
	}

	if(abs(R.y)>abs(R.x)&& abs(R.y)>=abs(R.z)){
		if(R.y>=0.0){
			return vec2(1.5*s+0.5*s*R.x,0.5*t-0.5*t*R.z);  //for positive_y surface
		}
		return vec2(1.5*s+0.5*s*R.x,2.5*t+0.5*t*R.z);      //for negative_y surface
	}

//if(abs(R.z)>abs(R.x) && abs(R.z)> abs(R.y)) {

	//if(R.z >= 0.0){
			//return vec2(3.5*s-0.5*s*R.x, 1.5*t-0.5*t*R.y);  // for positive_z surface
		//return vec2(1);
	//}
	`	//return vec2(1.5*s+0.5*s*R.x, 1.5*t-0.5*t*R.y);      //for negative_z surface
//}

	return vec2(0.0,0.0);
}

void main(void) {
    gl_FragColor = texture2D(cubemap, computeTexCoords(reflectionDirection));//output of the fragment shader
}
