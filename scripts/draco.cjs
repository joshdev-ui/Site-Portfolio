const fs = require('node:fs');

const src = 'node_modules/three/examples/jsm/libs/draco/gltf';
const output = 'public/draco';

// Copy the 3D model decoder during clean installs, failing if an asset is missing.
fs.mkdirSync(output, { recursive: true });
for (const file of ['draco_decoder.wasm', 'draco_wasm_wrapper.js']) {
  fs.copyFileSync(`${src}/${file}`, `${output}/${file}`);
}
