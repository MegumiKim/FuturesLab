// https://spencermortensen.com/articles/bezier-circle/
// https://cdpn.io/cpe/boomboom/index.html?key=index.html-ff9a2865-9eef-72bd-1d6c-d2ca6c928840

// Radius variation (0: none, &lt;0: shrink, &gt;0: grow)
// Starting angle (0-360)
// Rotation variation (0: none, &lt;0: undershoot, &gt;0: overshoot)
export function createCirclePath(width, height, options = {}) {
	const {
		radiusXMin = -0.15,
		radiusXMax = 0,
		radiusYMin = 0.2,
		radiusYMax = -0.2,
		staringAngleMin = 170,
		staringAngleMax = 190,
		rotationVariationMin = -0.1,
		rotationVariationMax = 0.15
	} = options;

	// https://spencermortensen.com/articles/bezier-circle/
	const controlPointsApproximation = 0.551915024494;
	// Invcerse tangant
	const beta = Math.atan(controlPointsApproximation);
	const delta = Math.sqrt(controlPointsApproximation * controlPointsApproximation + 1 * 1);
	// removing the radius variation from radius and adding a 10% buffer
	let rx = ((width - ((radiusXMax + 1) * width - width)) / 2) * 0.9;
	let ry = ((height - ((radiusYMax + 1) * height - height)) / 2) * 0.9;
	let angle =
		((staringAngleMin + Math.random() * (staringAngleMax - staringAngleMin)) * Math.PI) / 180;
	let path = 'M';

	// Starting point
	path += [rx * Math.sin(angle), ry * Math.cos(angle)];
	path += ' C' + [delta * rx * Math.sin(angle + beta), delta * ry * Math.cos(angle + beta)];

	// Draw remainig points to make up a cricle
	for (let i = 0; i < 4; i++) {
		angle +=
			(Math.PI / 2) *
			(1 + rotationVariationMin + Math.random() * (rotationVariationMax - rotationVariationMin));
		rx *= 1 + radiusXMin + Math.random() * (radiusXMax - radiusXMin);
		ry *= 1 + radiusYMin + Math.random() * (radiusYMax - radiusYMin);
		path +=
			' ' +
			(i ? 'S' : '') +
			[delta * rx * Math.sin(angle - beta), delta * ry * Math.cos(angle - beta)];
		path += ' ' + [rx * Math.sin(angle), ry * Math.cos(angle)];
	}

	return path;
}
