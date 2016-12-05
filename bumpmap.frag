// ToDo integrate your Phong shader with this shader
uniform bool disableBumpMapping;
uniform int frequency;           // frequency of repeating pattern
varying mat3 tangentToEyeMatrix; // vertex shader output
varying vec3 N;                  // fragment normal in eye space.
// Computes a normal from the height map.
// Transforms the normal into eye space.
vec3 getBumpedNormal(vec2 st) { return N; }  // ToDo compute "bump mapping "normal vector
void main()  {
       gl_LightSourceParameters light = gl_LightSource[0];
       gl_MaterialParameters mat = gl_FrontMaterial; 
       vec3 bumpedNormal = N;
       if (!disableBumpMapping) { bumpedNormal = getBumpedNormal(gl_TexCoord[0].st); }
       gl_FragColor = shading(position, bumpedNormal, light, mat);   // function from Phong shader
}
