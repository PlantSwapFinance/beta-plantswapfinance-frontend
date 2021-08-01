import React, { useEffect, lazy } from 'react'
import { Helmet } from 'react-helmet'
import { Router, Redirect, Route, Switch } from 'react-router-dom'
import { ResetCSS } from '@plantswap-libs/uikit'
import BigNumber from 'bignumber.js'
import useEagerConnect from 'hooks/useEagerConnect'
import { useFetchPriceList, useFetchProfile, useFetchPublicData, useFetchPancakeSwapPublicData } from 'state/hooks'
import useGetDocumentTitlePrice from './hooks/useGetDocumentTitlePrice'
import GlobalStyle from './style/Global'
import Menu from './components/Menu'
import SuspenseWithChunkError from './components/SuspenseWithChunkError'
import ToastListener from './components/ToastListener'
import PageLoader from './components/PageLoader'
import EasterEgg from './components/EasterEgg'
import GardenV1 from './views/GardenV1'
import Barns from './views/Barns'
import Tree from './views/Tree'
import DevelopmentFund from './views/DevelopmentFund'
import history from './routerHistory'

// Route-based code splitting
// Only pool is included in the main bundle because of it's the most visited page
const Home = lazy(() => import('./views/Home'))
const Farms = lazy(() => import('./views/Farms'))
const Gardens = lazy(() => import('./views/Gardens'))
const VerticalGarden = lazy(() => import('./views/VerticalGarden'))
const BarnsBeta = lazy(() => import('./views/BarnsBeta'))
const BarnPlantswap = lazy(() => import('./views/BarnPlantswap'))
const BarnPancakeswap = lazy(() => import('./views/BarnPancakeswap'))
const BarnGoose = lazy(() => import('./views/BarnGoose'))
const BarnCafeswap = lazy(() => import('./views/BarnCafeswap'))
const NotFound = lazy(() => import('./views/NotFound'))
const Collectibles = lazy(() => import('./views/Collectibles'))
const Teams = lazy(() => import('./views/Teams'))
const Team = lazy(() => import('./views/Teams/Team'))
const Roadmap = lazy(() => import('./views/Roadmap'))
const Profile = lazy(() => import('./views/Profile'))
const Project = lazy(() => import('./views/Project'))
const Vote = lazy(() => import('./views/Vote'))
// Beta
const Beta2 = lazy(() => import('./views/Beta2'))
const Beta5 = lazy(() => import('./views/Beta5'))

// This config is required for number formating
BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

const App: React.FC = () => {
  // Monkey patch warn() because of web3 flood
  // To be removed when web3 1.3.5 is released
  useEffect(() => {
    console.warn = () => null
  }, [])

  useEagerConnect()
  useFetchPublicData()
  useFetchPancakeSwapPublicData()
  useFetchProfile()
  useFetchPriceList()
  useGetDocumentTitlePrice()

  return (
    <Router history={history}>
      <Helmet>
        <title>PlantSwap.finance</title>
        <meta name="description" content="Swap and farm $PLANT with other's and with our smart contracts on Binance Smart Chain." />
        <meta name="keywords" content="plantswap,defi,yield farming,bsc,binance smart chain" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta name="twitter:image" content="https://plantswap.finance/logo192.png" />
        <meta name="twitter:domain" content="PlantSwap.finance" />
        <meta name="twitter:description" content="Swap and farm $PLANT with other's and with our smart contracts on Binance Smart Chain." />
        <meta name="twitter:site" content="@plantswapdefi" />
        <meta name="twitter:creator" content="@plantswapdefi" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://plantswap.finance/" />
        <meta property="og:image" content="%PUBLIC_URL%/logo192.png" />
        <meta property="og:description" content="Swap and farm $PLANT with other's and with our smart contracts on Binance Smart Chain." />
        <meta property="og:site_name" content="PlantSwap.finance" />
      </Helmet>
      <ResetCSS />
      <GlobalStyle />
      <Menu>
        <SuspenseWithChunkError fallback={<PageLoader />}>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/farm">
              <Farms />
            </Route>
            <Route path="/farms">
              <Farms />
            </Route>
            <Route path="/garden">
              <Gardens tokenMode/>
            </Route>
            <Route path="/gardens">
              <Gardens tokenMode/>
            </Route>
            <Route path="/verticalGarden">
              <VerticalGarden />
            </Route>
            <Route path="/verticalGardens">
              <VerticalGarden />
            </Route>
            <Route path="/gardensv1">
              <GardenV1 />
            </Route>
            <Route path="/barn">
              <Barns />
            </Route>
            <Route path="/barns">
              <Barns />
            </Route>
            <Route path="/barnsBeta">
              <BarnsBeta />
            </Route>
            <Route path="/barnPlantswap">
              <BarnPlantswap />
            </Route>
            <Route path="/barnPlantswapToken">
              <BarnPlantswap tokenMode/>
            </Route>
            <Route path="/barnPancakeswap">
              <BarnPancakeswap />
            </Route>
            <Route path="/barnPancakeswapToken">
              <BarnPancakeswap tokenMode/>
            </Route>
            <Route path="/barnGoose">
              <BarnGoose />
            </Route>
            <Route path="/barnGooseToken">
              <BarnGoose tokenMode/>
            </Route>
            <Route path="/barnCafeswap">
              <BarnCafeswap />
            </Route>
            <Route path="/barnCafeswapToken">
              <BarnCafeswap tokenMode/>
            </Route>
            <Route path="/tree">
              <Tree />
            </Route>
            <Route path="/developmentFund">
              <DevelopmentFund />
            </Route>
            <Route path="/collectible">
              <Collectibles />
            </Route>
            <Route path="/collectibles">
              <Collectibles />
            </Route>
            <Route exact path="/teams">
              <Teams />
            </Route>
            <Route exact path="/roadmap">
              <Roadmap />
            </Route>
            <Route path="/teams/:id">
              <Team />
            </Route>
            <Route path="/profile">
              <Profile />
            </Route>
            <Route path="/Project">
              <Project />
            </Route>
            <Route exact path="/vote">
              <Vote />
            </Route>
            
            <Route exact path="/beta2">
              <Beta2 />
            </Route>
            <Route exact path="/beta5">
              <Beta5 />
            </Route>

            {/* Redirect */}
            <Route path="/staking">
              <Redirect to="/pools" />
            </Route>
            <Route path="/pools">
              <Redirect to="/gardens" />
            </Route>
            <Route path="/nft">
              <Redirect to="/collectibles" />
            </Route>
            {/* 404 */}
            <Route component={NotFound} />
          </Switch>
        </SuspenseWithChunkError>
      </Menu>
      <EasterEgg iterations={2} />
      <ToastListener />
    </Router>
  )
}

export default React.memo(App)
