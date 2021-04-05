import React, { useState, useCallback } from 'react'
import { FallingPlants, FallingPlantsProps, useKonamiCheatCode } from '@plantswap-libs/uikit'

const EasterEgg: React.FC<FallingPlantsProps> = (props) => {
  const [show, setShow] = useState(false)
  const startFalling = useCallback(() => setShow(true), [setShow])
  useKonamiCheatCode(startFalling)

  if (show) {
    return (
      <div onAnimationEnd={() => setShow(false)}>
        <FallingPlants {...props} />
      </div>
    )
  }
  return null
}

export default React.memo(EasterEgg)
