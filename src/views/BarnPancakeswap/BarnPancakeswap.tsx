import React, { useEffect, useCallback, useState, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text, useModal } from '@plantswap-libs/uikit'
import styled  from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import tokens from 'config/constants/tokens'
import usePersistState from 'hooks/usePersistState'
import { usePancakeSwapFarms, usePriceCakeBusd, 
  usePriceBnbBusd, usePriceQsdBusd, usePriceUstBusd, 
  usePricePbtcBusd, usePriceBtcbBusd, usePriceEthBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchPancakeSwapFarmUserDataAsync } from 'state/actions'
import { PancakeSwapFarm } from 'state/types'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { getPancakeswapFarmApy } from 'utils/apy'
import { orderBy } from 'lodash'
import Divider from './components/Divider'
import RiskDisclaimer from './components/RiskDisclaimer'

import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import Table from './components/FarmTable/FarmTable'
import FarmTabButtons from './components/FarmTabButtons'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/FarmTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import Select, { OptionProps } from './components/Select/Select'

export interface FarmsProps{
  tokenMode?: boolean
}

const ControlContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;

  justify-content: space-between;
  flex-direction: column;

  ${({ theme }) => theme.mediaQueries.sm} {
    flex-direction: row;
    flex-wrap: wrap;
    padding: 16px 32px;
  }
`

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 10px;

  ${Text} {
    margin-left: 8px;
  }
`

const LabelWrapper = styled.div`
  > ${Text} {
    font-size: 12px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const FilterContainer1stRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 38px 0px;

  ${({ theme }) => theme.mediaQueries.sm} {
    width: auto;
    padding: 0;
  }
`

const FilterContainer1stRowPlatformIcon = styled.div`
display: flex;
align-items: left;
margin-left: 20px;

${({ theme }) => theme.mediaQueries.sm} {
  width: auto;
  padding: 0;
}
`

const ViewControls = styled.div`
  flex-wrap: wrap;
  justify-content: space-between;
  display: flex;
  align-items: center;
  width: 100%;

  > div {
    padding: 8px 0px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    justify-content: flex-start;
    width: auto;

    > div {
      padding: 0;
    }
  }
`

const StyledImage = styled(Image)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 58px;
`

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const [hasAcceptedRisk, setHasAcceptedRisk] = usePersistState(false, 'plantswap_farm_accepted_risk')
  const TranslateString = useI18n()
  const farmsLP = usePancakeSwapFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const qsdPrice = usePriceQsdBusd()
  const ustPrice = usePriceUstBusd()
  const pbtcPrice = usePricePbtcBusd()
  const btcbPrice = usePriceBtcbBusd()
  const ethPrice = usePriceEthBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.TABLE)
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const handleAcceptRiskSuccess = () => setHasAcceptedRisk(true)
  const [onPresentRiskDisclaimer] = useModal(<RiskDisclaimer onSuccess={handleAcceptRiskSuccess} />, false)
  const {tokenMode} = farmsProps;
  const allTokens = tokens
  // TODO: memoize modal's handlers
  const onPresentRiskDisclaimerRef = useRef(onPresentRiskDisclaimer)

  useEffect(() => {
    if (!hasAcceptedRisk) {
      onPresentRiskDisclaimerRef.current()
    }
  }, [hasAcceptedRisk, onPresentRiskDisclaimerRef])

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchPancakeSwapFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stackedOnly, setStackedOnly] = useState(false)
  const isActive = !pathname.includes('history')

  const activeFarms = farmsLP.filter((pancakeSwapFarm) => !!pancakeSwapFarm.isTokenOnly === !!tokenMode && pancakeSwapFarm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((pancakeSwapFarm) => !!pancakeSwapFarm.isTokenOnly === !!tokenMode && pancakeSwapFarm.multiplier === '0X')

  const stackedOnlyFarms = activeFarms.filter(
    (pancakeSwapFarm) => pancakeSwapFarm.userData && new BigNumber(pancakeSwapFarm.userData.stakedBalance).isGreaterThan(0),
  )

  const stackedInactiveFarms = inactiveFarms.filter(
    (pancakeSwapFarm) => pancakeSwapFarm.userData && new BigNumber(pancakeSwapFarm.userData.stakedBalance).isGreaterThan(0),
  )

  const sortFarms = (pancakeSwapFarms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
    switch (sortOption) {
      case 'apr':
        return orderBy(pancakeSwapFarms, (pancakeSwapFarm: FarmWithStakedValue) => pancakeSwapFarm.apy, 'desc')
      case 'multiplier':
        return orderBy(
          pancakeSwapFarms,
          (pancakeSwapFarm: FarmWithStakedValue) => (pancakeSwapFarm.multiplier ? Number(pancakeSwapFarm.multiplier.slice(0, -1)) : 0),
          'desc',
        )
      case 'earned':
        return orderBy(pancakeSwapFarms, (pancakeSwapFarm: FarmWithStakedValue) => (pancakeSwapFarm.userData ? pancakeSwapFarm.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(pancakeSwapFarms, (pancakeSwapFarm: FarmWithStakedValue) => Number(pancakeSwapFarm.liquidity), 'desc')
      default:
        return pancakeSwapFarms
    }
  }

  const farmsList = useCallback(
    (farmsToDisplay: PancakeSwapFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((pancakeSwapFarm) => {
        if (!pancakeSwapFarm.lpTotalInQuoteToken) {
          return pancakeSwapFarm
        }
        
        let quoteTokenPriceUsd = 1
        if(pancakeSwapFarm.quoteToken === allTokens.cake) {
          quoteTokenPriceUsd = cakePrice.toNumber()
        }
        if(pancakeSwapFarm.quoteToken === allTokens.bnb || pancakeSwapFarm.quoteToken === allTokens.wbnb) {
          quoteTokenPriceUsd = bnbPrice.toNumber()
        }
        if(pancakeSwapFarm.quoteToken === allTokens.busd || pancakeSwapFarm.quoteToken === allTokens.usdc) {
          quoteTokenPriceUsd = 1
        }
        if(pancakeSwapFarm.quoteToken === allTokens.qsd) {
          quoteTokenPriceUsd = qsdPrice.toNumber()
        }
        if(pancakeSwapFarm.quoteToken === allTokens.ust) {
          quoteTokenPriceUsd = ustPrice.toNumber()
        }
        if(pancakeSwapFarm.quoteToken === allTokens.pbtc) {
          quoteTokenPriceUsd = pbtcPrice.toNumber()
        }
        if(pancakeSwapFarm.quoteToken === allTokens.btcb) {
          quoteTokenPriceUsd = btcbPrice.toNumber()
        }
        if(pancakeSwapFarm.quoteToken === allTokens.eth) {
          quoteTokenPriceUsd = ethPrice.toNumber()
        }
        let totalLiquidity = new BigNumber(pancakeSwapFarm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        if(pancakeSwapFarm.isTokenOnly === true) {
          totalLiquidity = new BigNumber(pancakeSwapFarm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        }
        const apy = isActive ? getPancakeswapFarmApy(pancakeSwapFarm.poolWeight, cakePrice, totalLiquidity) : 0

        return { ...pancakeSwapFarm, apy, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPY = farmsToDisplayWithAPY.filter((pancakeSwapFarm: FarmWithStakedValue) => {
          return pancakeSwapFarm.lpSymbol.toLowerCase().includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPY
    },
    [cakePrice, bnbPrice, qsdPrice, ustPrice, pbtcPrice, btcbPrice, ethPrice, allTokens, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }
  
  let farmsStaked = []
  if (isActive) {
    farmsStaked = stackedOnly ? farmsList(stackedOnlyFarms) : farmsList(activeFarms)
  } else {
    farmsStaked = stackedOnly ? farmsList(stackedInactiveFarms) : farmsList(inactiveFarms)
  }

  farmsStaked = sortFarms(farmsStaked)

  const rowData = farmsStaked.map((pancakeSwapFarm) => {
    const { token, quoteToken } = pancakeSwapFarm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = pancakeSwapFarm.lpSymbol && pancakeSwapFarm.lpSymbol.split(' ')[0].toUpperCase().replace('CAKE', 'CAKE')

    const row: RowProps = {
      apr: {
        value: pancakeSwapFarm.apy && pancakeSwapFarm.apy.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: pancakeSwapFarm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        cakePrice,
        originalValue: pancakeSwapFarm.apy,
      },
      pancakeSwapFarm: {
        image: pancakeSwapFarm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: pancakeSwapFarm.pid,
      },
      earned: {
        earnings: pancakeSwapFarm.userData ? getBalanceNumber(new BigNumber(pancakeSwapFarm.userData.earnings)) : null,
        pid: pancakeSwapFarm.pid,
      },
      liquidity: {
        liquidity: pancakeSwapFarm.liquidity,
      },
      multiplier: {
        multiplier: pancakeSwapFarm.multiplier,
      },
      details: pancakeSwapFarm,
    }

    return row
  })

  const renderContent = (): JSX.Element => {
    if (viewMode === ViewMode.TABLE && rowData.length) {
      const columnSchema = DesktopColumnSchema

      const columns = columnSchema.map((column) => ({
        id: column.id,
        name: column.name,
        label: column.label,
        sort: (a: RowType<RowProps>, b: RowType<RowProps>) => {
          switch (column.name) {
            case 'pancakeSwapFarm':
              return b.id - a.id
            case 'apr':
              if (a.original.apr.value && b.original.apr.value) {
                return Number(a.original.apr.value) - Number(b.original.apr.value)
              }

              return 0
            case 'earned':
              return a.original.earned.earnings - b.original.earned.earnings
            default:
              return 1
          }
        },
        sortable: column.sortable,
      }))

      return <Table data={rowData} columns={columns} />
    }

    return (
      <div>
        <FlexLayout>
          <Route exact path={`${path}`}>
            {farmsStaked.map((pancakeSwapFarm) => (
              <FarmCard key={pancakeSwapFarm.pid} pancakeSwapFarm={pancakeSwapFarm} cakePrice={cakePrice} account={account} removed={false} />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStaked.map((pancakeSwapFarm) => (
              <FarmCard key={pancakeSwapFarm.pid} pancakeSwapFarm={pancakeSwapFarm} cakePrice={cakePrice} account={account} removed />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChange = (option: OptionProps): void => {
    setSortOption(option.value)
  }


  return (
    <>
    <Page>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            {TranslateString(738, 'Pancakeswap Barn')}
          </Heading>
          <ul>
            <li>Manage all your farming operation</li>
            <li>Add liquidity, see stats, harverst or remove your LP&apos;s</li>
            <li>Everything under one barn.</li>
          </ul>
        </div>
        <img src="/images/theBarn.svg" alt="Barns" width={600} height={315} />
      </Hero>
      <ControlContainer>
          <FilterContainer1stRow>
            <FilterContainer1stRowPlatformIcon>
              <LabelWrapper>
                <Text>Filter Platform</Text>
                <a href="/barns">
                  <img src="/images/plantswapBarn.svg" alt="PlantSwap Barn" width={28} height={28} style={{marginRight: '15px'}} /></a>
                <a href="/barnPlantswap">
                  <img src="/images/platforms/plantswap.svg" alt="PlantSwap" width={36} height={36} style={{marginRight: '15px'}} /></a>
                <a href="/barnPancakeswap">
                  <img src="/images/platforms/pancakeswap.svg" alt="PancakeSwap" width={28} height={28} style={{marginRight: '15px'}} /></a>
                <a href="/barnGoose">
                  <img src="/images/platforms/goose.png" alt="GooseFinance" width={28} height={36} style={{marginRight: '15px'}} /></a>
                <a href="/barnCafeswap">
                  <img src="/images/platforms/cafeswap.png" alt="CafeSwap" width={28} height={28} style={{marginRight: '15px'}} /></a>
              </LabelWrapper>
              <LabelWrapper>
                <Text>Filter Type</Text>
                <a href="/barnPancakeswap">
                  <img src="/images/platforms/farm.svg" alt="PancakeSwap LP Barn" width={28} height={28} style={{marginRight: '15px'}} /></a>
                <a href="/barnPancakeswapToken">
                  <img src="/images/platforms/token.svg" alt="PancakeSwap Token Barn" width={28} height={28} style={{marginRight: '15px'}} /></a>
              </LabelWrapper>
            </FilterContainer1stRowPlatformIcon>
          </FilterContainer1stRow>
        </ControlContainer>
        <ControlContainer>
          <ViewControls>
            <ToggleView viewMode={viewMode} onToggle={(mode: ViewMode) => setViewMode(mode)} />
            <ToggleWrapper>
              <Toggle checked={stackedOnly} onChange={() => setStackedOnly(!stackedOnly)} scale="sm" />
              <Text> {TranslateString(1116, 'Staked only')}</Text>
            </ToggleWrapper>
            <FarmTabButtons />
          </ViewControls>
          <FilterContainer>
            <LabelWrapper>
              <Text>SORT BY</Text>
              <Select
                options={[
                  {
                    label: 'Hot',
                    value: 'hot',
                  },
                  {
                    label: 'APR',
                    value: 'apr',
                  },
                  {
                    label: 'Multiplier',
                    value: 'multiplier',
                  },
                  {
                    label: 'Earned',
                    value: 'earned',
                  },
                  {
                    label: 'Liquidity',
                    value: 'liquidity',
                  },
                ]}
                onChange={handleSortOptionChange}
              />
            </LabelWrapper>
            <LabelWrapper style={{ marginLeft: 16 }}>
              <Text>SEARCH</Text>
              <SearchInput onChange={handleChangeQuery} value={query} />
            </LabelWrapper>
          </FilterContainer>
        </ControlContainer>
      <Divider />
        {renderContent()}
      <Divider />
        <StyledImage src="/images/endPage.svg" alt="PlantSwap Finance" width={680} height={155} />
      </Page>
    </>
  )
}

const Hero = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.primary};
  display: grid;
  grid-gap: 32px;
  grid-template-columns: 1fr;
  margin-left: auto;
  margin-right: auto;
  max-width: 250px;
  padding: 48px 0;
  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    font-size: 16px;
    li {
      margin-bottom: 4px;
    }
  }
  img {
    height: auto;
    max-width: 100%;
  }
  @media (min-width: 576px) {
    grid-template-columns: 1fr 1fr;
    margin: 0;
    max-width: none;
  }
`

export default Farms
