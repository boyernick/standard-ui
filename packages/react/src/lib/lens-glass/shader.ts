export const VERTEX_SHADER = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

/**
 * One pane, drawn into its own output rectangle. Coordinates are CSS pixels
 * with y down: `u_origin` is the output's top-left in scene space, and the
 * pane is centred on `u_center` with half-size `u_half`.
 */
export const FRAGMENT_SHADER = `
precision highp float;
varying vec2 v_uv;

uniform sampler2D u_scene;
uniform vec2 u_sceneSize;
uniform vec2 u_origin;
uniform vec2 u_outSize;
uniform vec2 u_center;
uniform vec2 u_half;
uniform float u_dpr;

uniform float u_radius;
uniform float u_power;
uniform float u_bezel;
uniform float u_bend;
uniform float u_dispersionRed;
uniform float u_dispersionBlue;
uniform float u_rim;
uniform float u_rimWidth;
uniform float u_edge;
uniform float u_specular;
uniform float u_frost;
uniform float u_grain;
uniform float u_dim;
uniform float u_fadeStart;
uniform float u_fadeEnd;
uniform float u_shadow;
uniform float u_hover;
uniform float u_press;

// A rounded rectangle whose corners are superellipses. Power 2 is a circular
// arc; around 4 is the continuous "squircle" corner.
float sdPane(vec2 p) {
  float r = min(u_radius, min(u_half.x, u_half.y));
  vec2 q = abs(p) - u_half + r;
  vec2 m = max(q, 0.0);
  float corner = u_power == 2.0
    ? length(m)
    : pow(pow(m.x, u_power) + pow(m.y, u_power), 1.0 / u_power);
  return corner + min(max(q.x, q.y), 0.0) - r;
}

vec2 outwardNormal(vec2 p) {
  float e = 0.5;
  vec2 g = vec2(
    sdPane(p + vec2(e, 0.0)) - sdPane(p - vec2(e, 0.0)),
    sdPane(p + vec2(0.0, e)) - sdPane(p - vec2(0.0, e))
  );
  float l = length(g);
  return l > 1e-5 ? g / l : vec2(0.0);
}

vec3 ground(vec2 scenePx) {
  vec2 uv = clamp(scenePx / u_sceneSize, vec2(0.0), vec2(1.0));
  return texture2D(u_scene, uv).rgb;
}

// Frost: 16 taps on a golden-angle spiral out to about two sigma.
vec3 frosted(vec2 scenePx) {
  if (u_frost < 0.05) return ground(scenePx);
  vec3 sum = vec3(0.0);
  float weights = 0.0;
  for (int i = 0; i < 16; i++) {
    float fi = float(i);
    float r = sqrt((fi + 0.5) / 16.0) * 2.0 * u_frost;
    float a = fi * 2.39996323;
    float w = exp(-(r * r) / (2.0 * u_frost * u_frost));
    sum += ground(scenePx + vec2(cos(a), sin(a)) * r) * w;
    weights += w;
  }
  return sum / weights;
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 scenePx = u_origin + vec2(v_uv.x, 1.0 - v_uv.y) * u_outSize;
  vec2 p = scenePx - u_center;
  float d = sdPane(p);

  // Outside: only a soft contact shadow, heavier below the pane.
  if (d > 0.0) {
    float below = smoothstep(-0.6, 0.8, p.y / max(u_half.y, 1.0));
    float shadow = u_shadow * (1.0 - 0.35 * u_press) * exp(-(d * d) / 40.0) * below;
    gl_FragColor = vec4(0.0, 0.0, 0.0, shadow);
    return;
  }

  float inside = -d;
  vec2 n = outwardNormal(p);

  // The bezel bends the ground outward across its width: the pane shows what
  // lies just past its edge, compressed into the band, as a thick lens does.
  float t = u_bezel > 0.0 ? clamp(1.0 - inside / u_bezel, 0.0, 1.0) : 0.0;
  float profile = t * t * (3.0 - 2.0 * t);
  vec2 offset = n * u_bend * (1.0 - 0.35 * u_press) * profile;

  vec3 color = vec3(
    frosted(scenePx + offset * u_dispersionRed).r,
    frosted(scenePx + offset).g,
    frosted(scenePx + offset * u_dispersionBlue).b
  );
  color *= u_dim + 0.06 * u_hover;

  // Rim light, strongest where the edge faces the light (top left), and a
  // sheen across the lit side of the bezel.
  vec2 light = normalize(vec2(-0.55, -1.0));
  float facing = max(dot(n, light), 0.0);
  float rim = 1.0 - smoothstep(0.0, u_rimWidth, inside);
  color += u_rim * (1.0 + 0.4 * u_hover) * rim * (0.55 + 0.45 * facing);
  color += u_specular * 0.35 * pow(t, 3.0) * facing;

  // Hairline edge: a light ground clips the rim to white, so shade one CSS
  // pixel inside the outline instead, more on the side away from the light.
  float hairline = 1.0 - smoothstep(0.0, 1.0, inside);
  color = min(color, vec3(1.0)) * (1.0 - u_edge * hairline * (1.0 - 0.45 * facing));

  // Grain, fixed to the device pixel grid so a still pane never needs redrawing.
  color += (hash(floor(scenePx * u_dpr)) - 0.5) * u_grain;

  // Optional fade down the pane.
  float yFrac = (p.y + u_half.y) / (2.0 * u_half.y);
  float fade = u_fadeEnd > u_fadeStart ? 1.0 - smoothstep(u_fadeStart, u_fadeEnd, yFrac) : 1.0;
  color = mix(ground(scenePx), color, fade);

  float coverage = clamp(inside * u_dpr + 0.5, 0.0, 1.0);
  gl_FragColor = vec4(clamp(color, 0.0, 1.0), coverage);
}`;
