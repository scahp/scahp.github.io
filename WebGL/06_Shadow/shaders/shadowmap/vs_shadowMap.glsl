#include "common.glsl"

precision mediump float;

attribute vec3 Pos;
uniform mat4 MVP;

void main()
{
    gl_Position = MVP * vec4(Pos, 1.0);
}