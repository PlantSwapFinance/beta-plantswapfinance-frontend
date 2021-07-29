import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber';
import styled from 'styled-components'
import { Text, Image } from '@plantswap-libs/uikit'
import { useGLTF, Html } from '@react-three/drei'
import CakeSpin from 'components/Assets3D/CAKEspin'
import BananaSpin from 'components/Assets3D/BANANAspin'
import BrewSpin from 'components/Assets3D/BREWspin'
import EggpSpin from 'components/Assets3D/EGGPspin'
import VGCakeCakePlant from 'components/VerticalGardens/VGCakeCakePlant'
import VGCakeChessPlant from 'components/VerticalGardens/VGCakeChessPlant'
import VGCakeOddzPlant from 'components/VerticalGardens/VGCakeOddzPlant'
import VGBananaBanana from 'components/VerticalGardens/VGBananaBanana'
import VGEggpEggpPlant from 'components/VerticalGardens/VGEggpEggpPlant'
import VGBrewBrew from 'components/VerticalGardens/VGBrewBrew'

interface CanvasProps {
  vgId: number
  tokenStakedName: string
  tokenStakedAddress: string
  tokenStakedRewardName: string
  tokenStakedRewardAddress: string
  tokenEarnName: string
  tokenEarnAddress: string
  verticalGardenMasterGardenerAllocPt: number
  isFinished: boolean
}

const VerticalGardenCanvas: React.FC<CanvasProps> = ({ 
    tokenStakedName, 
    tokenStakedAddress, 
    tokenStakedRewardName }) => (
  <Canvas style={CanvaStyle}>
    <Suspense fallback={<Html center className="loading"><Text>Stake:</Text><BiggerText>{tokenStakedName}</BiggerText><Image src={`/images/tokens/${tokenStakedAddress}.svg`} alt={tokenStakedName} width={42} height={42} /></Html>}>
    <ambientLight intensity={0.25} />
    <pointLight castShadow intensity={0.7} position={[10, 10, 10]} />
    
    {tokenStakedName === "CAKE" && tokenStakedRewardName === "CAKE" && (
      <VGCakeCakePlant 
        position={[1, -0.5, 1.75]} 
        rotation={[0.6, 0, 0]} />
    )}
    {tokenStakedName === "CAKE" && tokenStakedRewardName === "CHESS" && (
      <VGCakeChessPlant 
        position={[1, -0.5, 1.75]} 
        rotation={[0.6, 0, 0]} />
    )}
    {tokenStakedName === "CAKE" && tokenStakedRewardName === "ODDZ" && (
      <VGCakeOddzPlant 
        position={[1, -0.5, 1.75]} 
        rotation={[0.6, 0, 0]} />
    )}
    {tokenStakedName === "BANANA" && tokenStakedRewardName === "BANANA" && (
      <VGBananaBanana 
        position={[1, -0.5, 1.75]} 
        rotation={[0.6, 0, 0]} />
    )}
    {tokenStakedName === "EGGP" && tokenStakedRewardName === "EGGP" && (
      <VGEggpEggpPlant 
        position={[1, -0.5, 1.75]} 
        rotation={[0.6, 0, 0]} />
    )}
    {tokenStakedName === "BREW" && tokenStakedRewardName === "BREW" && (
      <VGBrewBrew 
        position={[1, -0.5, 1.75]} 
        rotation={[0.6, 0, 0]} />
    )}

    <Html as='div' position={[-10,3.5,-1]}>
      <Text>Stake:</Text>
      <BiggerText>{tokenStakedName}</BiggerText>
      
      {tokenStakedName !== "CAKE" && tokenStakedName !== "BANANA" && tokenStakedName !== "BREW" && tokenStakedName !== "EGGP" && (
        <Image src={`/images/tokens/${tokenStakedAddress}.svg`} alt={tokenStakedName} width={42} height={42} />
      )}
    </Html>
    
    {tokenStakedName === "CAKE" && (
      <CakeSpin position={[-5, -1.75, 0.5]} scale={[2.5, 2.5, 2.5]}  />
    )}
    {tokenStakedName === "BANANA" && (
      <BananaSpin position={[-5, -1.75, 0.5]} scale={[2.5, 2.5, 2.5]}  />
    )}
    {tokenStakedName === "BREW" && (
      <BrewSpin position={[-5, -1.75, 0.5]} scale={[2.5, 2.5, 2.5]}  />
    )}
    {tokenStakedName === "EGGP" && (
      <EggpSpin position={[-5, -1.75, 0.5]} scale={[2.5, 2.5, 2.5]}  />
    )}
    </Suspense>
  </Canvas>
)

const BiggerText = styled.div`
font-size: 24px;
`

const CanvaStyle = {
  "width": "100%",
  "height": "120px",
}

export default React.memo(VerticalGardenCanvas)

useGLTF.preload('/verticalGarden.glb')