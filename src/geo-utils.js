/* geo-utils.js */
/* eslint-disable */

const RADIUS = 6378137;
const FLATTENING = 1/298.257223563;
const POLAR_RADIUS = RADIUS*(1-FLATTENING);

let asqr = RADIUS*RADIUS;
let bsqr = POLAR_RADIUS*POLAR_RADIUS;

const WGS84 = {
  a: RADIUS, // RADIUS
  f: FLATTENING, // FLATTENING
  b: POLAR_RADIUS, // POLAR_RADIUS
  e: Math.sqrt((asqr-bsqr)/asqr),
  eprime: Math.sqrt((asqr-bsqr)/bsqr),
};

const DegreesPerRadian = 57.295779513082320;
function radToDeg(rad) {
  return rad * DegreesPerRadian;
}

export function ECEFToLonLatAlt({x, y, z}) {
  let a = WGS84.a, b = WGS84.b, f = WGS84.f;

  const e2 = 2*f - f*f;   // 1st eccentricity squared ≡ (a²-b²)/a²
  const ε2 = e2 / (1-e2); // 2nd eccentricity squared ≡ (a²-b²)/b²

  const p = Math.sqrt(x*x + y*y); // distance from minor axis
  const R = Math.sqrt(p*p + z*z); // polar radius

  // parametric latitude (Bowring eqn 17, replacing tanβ = z·a / p·b)
  const tanBeta = (b*z)/(a*p) * (1+ε2*b/R);
  const sinBeta = tanBeta / Math.sqrt(1+tanBeta*tanBeta);
  const cosBeta = sinBeta / tanBeta;

  // geodetic latitude (Bowring eqn 18: tanφ = z+ε²bsin³β / p−e²cos³β)
  const phi = isNaN(cosBeta) ? 0 : Math.atan2(z + ε2*b*sinBeta*sinBeta*sinBeta, p - e2*a*cosBeta*cosBeta*cosBeta);

  // longitude
  const lamda = Math.atan2(y, x);

  // height above ellipsoid (Bowring eqn 7) [not currently used]
  const sinPhi = Math.sin(phi), cosPhi = Math.cos(phi);
  const nu = a/Math.sqrt(1-e2*sinPhi*sinPhi); // length of the normal terminated by the minor axis
  const h = p*cosPhi + z*sinPhi - (a*a/nu);

  const lon = radToDeg(lamda);
  const lat = radToDeg(phi);

  return {
    lon: lon,
    lat: lat,
    alt: h
  };
}
