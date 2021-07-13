import * as THREE from 'three'
import React, { useRef } from 'react'
import { Canvas, extend, useThree, useFrame, ReactThreeFiber  } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import PlantswapBarn from './Assets3D/PlantswapBarn'
import PancakeswapBarn from './Assets3D/PancakeswapBarn'

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
    Cylinder001: THREE.Mesh
    TheBarn: THREE.Mesh
    CubeOneMesh: THREE.Mesh
    CubeOneMesh1: THREE.Mesh
    Cube: THREE.Mesh
    Cube002: THREE.Mesh
    Cube004: THREE.Mesh
    Cube003: THREE.Mesh
    Cube005: THREE.Mesh
    Cube007: THREE.Mesh
    Cube008: THREE.Mesh
    TheBarn001: THREE.Mesh
    TheBarn002: THREE.Mesh
  }
  materials: {
    ['Material.008']: THREE.MeshStandardMaterial
    ['Material.009']: THREE.MeshStandardMaterial
    ['Material.001']: THREE.MeshStandardMaterial
    ['Material.003']: THREE.MeshStandardMaterial
    ['Material.002']: THREE.MeshStandardMaterial
    ['Material.004']: THREE.MeshStandardMaterial
    ['Material.006']: THREE.MeshStandardMaterial
    ['Material.007']: THREE.MeshStandardMaterial
  }
}

function Model(props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/TheBarnBillboard.glb') as GLTFResult
  return (
    <group ref={group} rotation={[0, (-Math.PI / 2 + 0.2), 0]} position={[-9,2,-1]} {...props} dispose={null}>
       <mesh
        geometry={nodes.FeetFrontLeft.geometry}
        material={nodes.FeetFrontLeft.material}
        position={[1.22, -3.5, -0.87]}
        scale={[0.08, 1.13, 0.08]}
      />
      <mesh
        geometry={nodes.FeetFrontRight.geometry}
        material={nodes.FeetFrontRight.material}
        position={[1.22, -3.5, -5.7]}
        scale={[0.08, 1.13, 0.08]}
      />
      <mesh
        geometry={nodes.FeetBackRight.geometry}
        material={nodes.FeetBackRight.material}
        position={[0.44, -3.04, -5.71]}
        rotation={[0, 0, -0.44]}
        scale={[0.08, 1.77, 0.08]}
      />
      <mesh
        geometry={nodes.FeetBackLeft.geometry}
        material={nodes.FeetBackLeft.material}
        position={[0.44, -3.04, -0.86]}
        rotation={[0, 0, -0.44]}
        scale={[0.08, 1.77, 0.08]}
      />
      <mesh
        geometry={nodes.FeetBackCenter.geometry}
        material={nodes.FeetBackCenter.material}
        position={[0.44, -3.04, -3.31]}
        rotation={[0, 0, -0.44]}
        scale={[0.08, 1.77, 0.08]}
      />
      <mesh
        geometry={nodes.SupportBackBottom.geometry}
        material={nodes.SupportBackBottom.material}
        position={[0.28, -3.37, -3.27]}
        rotation={[-Math.PI / 2, 0.43, 0]}
        scale={[0.08, 2.38, 0.08]}
      />
      <mesh
        geometry={nodes.SupportBackTop.geometry}
        material={nodes.SupportBackTop.material}
        position={[1.09, -1.68, -3.28]}
        rotation={[-Math.PI / 2, 0.46, 0]}
        scale={[0.08, 2.38, 0.08]}
      />
      <mesh
        geometry={nodes.PlantToken.geometry}
        material={materials.PlantTokenTexture}
        scale={0.6}
        position={[1.25, -3.01, -4.24]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.CakeTokenTexture.geometry}
        material={materials.CakeTokenTexture}
        scale={0.6}
        position={[1.23, -3.02, -5.03]}
        rotation={[Math.PI / 2, 0, Math.PI / 2]}
      />
      <mesh
        geometry={nodes.ManageYourFarmingP2.geometry}
        material={nodes.ManageYourFarmingP2.material}
        scale={0.2}
        position={[1.25, -2.91, -1.21]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
      <mesh
        geometry={nodes.ManageYourFarmingP1.geometry}
        material={nodes.ManageYourFarmingP1.material}
        scale={0.2}
        position={[1.25, -2.38, -1.21]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
      <mesh
        geometry={nodes.TheBarn.geometry}
        material={nodes.TheBarn.material}
        position={[1.25, -2.06, -1.37]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
      />
      <group position={[1.22, -2.25, -3.29]} scale={[0.09, 1.23, 2.49]}>
        <mesh geometry={nodes.BilboardBoxM.geometry} material={nodes.BilboardBoxM.material} />
        <mesh geometry={nodes.BilboardBoxM_1.geometry} material={materials.White} />
      </group>
    </group>
  )
}

const TheBarn: React.FC = () => (
  <Canvas style={CanvaStyle}>
    <ambientLight intensity={0.5} />
    <pointLight castShadow intensity={0.7} position={[10, 10, 10]} />
    <Model />
      <PlantswapBarn position={[0.2,-1,-2]} rotation={[0, (Math.PI / 2 - 0.3), 0]} />
      <PancakeswapBarn position={[4.2,-1,-2]} rotation={[0, (Math.PI / 2 - 0.4), 0]} />
    <Controls />
  </Canvas>
)

const CanvaStyle = {
  "width": "100%",
  "height": "400px"
}

export default TheBarn;

useGLTF.preload('/TheBarnBillboard.glb')
