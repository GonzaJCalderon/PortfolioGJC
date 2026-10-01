const fs = require('fs');

global.window = {};
global.document = {
  createElement: (type) => {
    if (type === 'canvas') {
      return {
        getContext: () => ({}),
        toDataURL: () => ''
      };
    }
    return {};
  }
};

async function convert() {
  console.log("Cargando módulos de Three.js (ESM)...");
  const THREE = await import('three');
  const { STLLoader } = await import('three/examples/jsm/loaders/STLLoader.js');
  const { GLTFExporter } = await import('three/examples/jsm/exporters/GLTFExporter.js');

  console.log("Cargando archivo STL...");
  const stlData = fs.readFileSync('public/models/david.stl');
  const loader = new STLLoader();
  
  const arrayBuffer = stlData.buffer.slice(stlData.byteOffset, stlData.byteOffset + stlData.byteLength);
  
  console.log("Parseando geometría...");
  const geometry = loader.parse(arrayBuffer);
  const material = new THREE.MeshStandardMaterial({ color: 0x111111 });
  const mesh = new THREE.Mesh(geometry, material);

  console.log("Exportando a GLB...");
  const exporter = new GLTFExporter();
  
  exporter.parse(
    mesh,
    function (gltf) {
      fs.writeFileSync('public/models/david.glb', Buffer.from(gltf));
      console.log("¡Éxito! Guardado en public/models/david.glb");
    },
    function (error) {
      console.error("Error exportando:", error);
    },
    { binary: true }
  );
}

convert().catch(console.error);
