import { createGlobalStyle } from 'styled-components'
// eslint-disable-next-line import/no-unresolved
import { PlantSwapTheme } from '@plantswap-libs/uikit/dist/theme'

declare module 'styled-components' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface DefaultTheme extends PlantSwapTheme {}
}

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Kanit', sans-serif;
  }
  body {
    
    cursor: url('cursor.svg'), pointer;
    cursor: -webkit-image-set(url('cursor.svg') 1x, url('cursor.svg') 2x), pointer;
    background-color: ${({ theme }) => theme.colors.background};

    img {
      height: auto;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
