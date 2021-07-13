import * as THREE from 'three'
import React, { useRef } from 'react'
import { Canvas, extend, useThree, useFrame, ReactThreeFiber  } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

// https://spectrum.chat/react-three-fiber/general/property-orbitcontrols-does-not-exist-on-type-jsx-intrinsicelements~44712e68-4601-4486-b4b4-5e112f3dc09e
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

interface OrbitRef {
  obj: {
    update(): void
  }
}

extend({ OrbitControls })

const Controls: React.FC<any> = (props) => {
  const ref = useRef<OrbitRef>(null)
  const { camera, gl } = useThree()
  useFrame(() => {
    ref.current?.obj?.update()
  })
  return <orbitControls ref={ref} args={[camera, gl.domElement]} {...props} />
}

type GLTFResult = GLTF & {
  nodes: {
    Cylinder: THREE.Mesh
  }
  materials: {
    ['Material.002']: THREE.MeshStandardMaterial
  }
}

function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/PLANT.glb') as GLTFResult
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.Cylinder.geometry} scale={4} material={materials['Material.002']} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 1]}  />
    </group>
  )
}

const Plant: React.FC = () => (
  <Canvas style={CanvaStyle}>
    <ambientLight intensity={0.25} />
    <pointLight castShadow intensity={0.7} position={[10, 10, 10]} />
    <Model />
    <Controls position={[0, 0, 2]} />
  </Canvas>
)

const CanvaStyle = {
  "width": "100%",
  "height": "128px"
}

export default Plant;

useGLTF.preload('/PLANT.glb')
