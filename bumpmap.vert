 // ToDo integrate your Phong shader with this shader
attribute vec3 attrTangent;      // Application provided tangent space vectors.
attribute vec3 attrBitangent;    // These vectors are normalized.
varying mat3 tangentToEyeMatrix; // Tangent-to-eye matrix used in the fragment shader
varying vec3 N;                  // to be used in fragment shader
varying vec3 P;

void main( void ) {
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
	gl_TexCoord[0] = gl_MultiTexCoord0;
	gl_FrontColor = gl_Color;
	N = normalize(gl_NormalMatrix*gl_Normal);         // FixMe  Transfer Normals from model space to viewSpace
	vec4 Position= vec4 (gl_ModelViewMatrix*gl_Vertex);
	P=normalize(Position.xyz/Position.w);
  	
	tangentToEyeMatrix[0] = gl_NormalMatrix * attrTangent;
	tangentToEyeMatrix[1] = gl_NormalMatrix * attrBitangent;  //
	tangentToEyeMatrix[2] = gl_NormalMatrix * gl_Normal;  
}
