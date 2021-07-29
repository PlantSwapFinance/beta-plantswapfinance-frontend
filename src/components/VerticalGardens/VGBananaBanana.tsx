import * as THREE from 'three'
import React, { useRef } from 'react'
import { useFrame  } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import Banana from 'components/Assets3D/BANANA'
import BananaSpin from 'components/Assets3D/BANANAspin'

type GLTFResult = GLTF & {
  nodes: {
    meGrowBoxBottom: THREE.Mesh
    meGrowBoxMid: THREE.Mesh
    meSupportBeamBottom: THREE.Mesh
  }
  materials: {
    texture2: THREE.MeshStandardMaterial
    texture1: THREE.MeshStandardMaterial
  }
}

function VGBananaBanana(
  props: JSX.IntrinsicElements['group']) {
  const group = useRef<THREE.Group>()
  const { nodes, materials } = useGLTF('/verticalGarden.glb') as GLTFResult
  const mesh = useRef<THREE.Mesh>()
  useFrame(() => {
    group.current.rotation.y += 0.005
  })
  
  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.meGrowBoxBottom.geometry} material={materials.texture2} scale={[1, 0.47, 1]} />
      
        <group> 
          <Banana position={[0, 0, 1.25]} scale={[0.75, 0.75, 1.5]} />
          <Banana position={[0, 0, -1.25]} scale={[0.75, 0.75, 1.5]} />
          <Banana position={[1.25, 0, 0]} scale={[0.75, 0.75, 1.5]} rotation={[0, Math.PI / 2, 0]} />
          <Banana position={[-1.25, 0, 0]} scale={[0.75, 0.75, 1.5]} rotation={[0, Math.PI / 2, 0]} />

          <BananaSpin position={[0.5, 0.6, 0]} scale={[0.5, 0.5, 1]} />
          <BananaSpin position={[-0.5, 0.6, 0]} scale={[0.5, 0.5, 1]} rotation={[0, Math.PI / 2, 0]} />
          <BananaSpin position={[0, 0.6, 0.5]} scale={[0.5, 0.5, 1]} />
          <BananaSpin position={[0, 0.6, -0.5]} scale={[0.5, 0.5, 1]} rotation={[0, Math.PI / 2, 0]} />
          
          <BananaSpin position={[0.85, 0.6, 0.85]} scale={[0.5, 0.5, 1]} rotation={[0, Math.PI / 2, 0]} />
          <BananaSpin position={[0.85, 0.6, -0.85]} scale={[0.5, 0.5, 1]} />
          <BananaSpin position={[-0.85, 0.6, 0.85]} scale={[0.5, 0.5, 1]} rotation={[0, Math.PI / 2, 0]} />
          <BananaSpin position={[-0.85, 0.6, -0.85]} scale={[0.5, 0.5, 1]} />
        </group>

    </group>
  )
}

export default VGBananaBanana;

useGLTF.preload('/verticalGarden.glb')
