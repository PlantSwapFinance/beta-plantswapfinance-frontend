import React, { useEffect, useCallback, useState, useRef } from 'react'
import { Helmet } from "react-helmet"
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text, useModal } from '@plantswap-libs/uikit'
import styled  from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import usePersistState from 'hooks/usePersistState'
import { useFetchGoosePublicData, useGooseFarms, usePriceEggBusd, useGetApiPrices } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchGooseFarmUserDataAsync } from 'state/actions'
import { GooseFarm } from 'state/types'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { getGooseFarmApy } from 'utils/apy'
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
  useFetchGoosePublicData()
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const [hasAcceptedRisk, setHasAcceptedRisk] = usePersistState(false, 'plantswap_farm_accepted_risk')
  const TranslateString = useI18n()
  const farmsLP = useGooseFarms()
  const eggPrice = usePriceEggBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.TABLE)
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const prices = useGetApiPrices()
  const handleAcceptRiskSuccess = () => setHasAcceptedRisk(true)
  const [onPresentRiskDisclaimer] = useModal(<RiskDisclaimer onSuccess={handleAcceptRiskSuccess} />, false)
  const {tokenMode} = farmsProps;

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
      dispatch(fetchGooseFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stackedOnly, setStackedOnly] = useState(false)
  const isActive = !pathname.includes('history')

  const activeFarms = farmsLP.filter((gooseFarm) => !!gooseFarm.isTokenOnly === !!tokenMode && gooseFarm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((gooseFarm) => !!gooseFarm.isTokenOnly === !!tokenMode && gooseFarm.multiplier === '0X')

  const stackedOnlyFarms = activeFarms.filter(
    (gooseFarm) => gooseFarm.userData && new BigNumber(gooseFarm.userData.stakedBalance).isGreaterThan(0),
  )

  const stackedInactiveFarms = inactiveFarms.filter(
    (gooseFarm) => gooseFarm.userData && new BigNumber(gooseFarm.userData.stakedBalance).isGreaterThan(0),
  )

  const sortFarms = (gooseFarms: FarmWithStakedValue[]): FarmWithStakedValue[] => {
    switch (sortOption) {
      case 'apr':
        return orderBy(gooseFarms, (gooseFarm: FarmWithStakedValue) => gooseFarm.apy, 'desc')
      case 'multiplier':
        return orderBy(
          gooseFarms,
          (gooseFarm: FarmWithStakedValue) => (gooseFarm.multiplier ? Number(gooseFarm.multiplier.slice(0, -1)) : 0),
          'desc',
        )
      case 'earned':
        return orderBy(gooseFarms, (gooseFarm: FarmWithStakedValue) => (gooseFarm.userData ? gooseFarm.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(gooseFarms, (gooseFarm: FarmWithStakedValue) => Number(gooseFarm.liquidity), 'desc')
      default:
        return gooseFarms
    }
  }

  const farmsList = useCallback(
    (farmsToDisplay: GooseFarm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((gooseFarm) => {
        if (!gooseFarm.lpTotalInQuoteToken || !prices) {
          return gooseFarm
        }

        const quoteTokenPriceUsd = prices[gooseFarm.quoteToken.symbol.toLowerCase()]
        let totalLiquidity = new BigNumber(gooseFarm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        if(gooseFarm.isTokenOnly === true) {
          totalLiquidity = new BigNumber(gooseFarm.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        }
        const apy = isActive ? getGooseFarmApy(gooseFarm.poolWeight, eggPrice, totalLiquidity) : 0

        return { ...gooseFarm, apy, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        farmsToDisplayWithAPY = farmsToDisplayWithAPY.filter((gooseFarm: FarmWithStakedValue) => {
          return gooseFarm.lpSymbol.toLowerCase().includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPY
    },
    [eggPrice, prices, query, isActive],
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

  const rowData = farmsStaked.map((gooseFarm) => {
    const { token, quoteToken } = gooseFarm
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = gooseFarm.lpSymbol && gooseFarm.lpSymbol.split(' ')[0].toUpperCase().replace('EGG', 'EGG')

    const row: RowProps = {
      apr: {
        value: gooseFarm.apy && gooseFarm.apy.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: gooseFarm.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        eggPrice,
        originalValue: gooseFarm.apy,
      },
      gooseFarm: {
        image: gooseFarm.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        label: lpLabel,
        pid: gooseFarm.pid,
      },
      earned: {
        earnings: gooseFarm.userData ? getBalanceNumber(new BigNumber(gooseFarm.userData.earnings)) : null,
        pid: gooseFarm.pid,
      },
      liquidity: {
        liquidity: gooseFarm.liquidity,
      },
      multiplier: {
        multiplier: gooseFarm.multiplier,
      },
      details: gooseFarm,
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
            case 'gooseFarm':
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
            {farmsStaked.map((gooseFarm) => (
              <FarmCard key={gooseFarm.pid} gooseFarm={gooseFarm} eggPrice={eggPrice} account={account} removed={false} />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsStaked.map((gooseFarm) => (
              <FarmCard key={gooseFarm.pid} gooseFarm={gooseFarm} eggPrice={eggPrice} account={account} removed />
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
      <Helmet>
        <title>PlantSwap.finance - Goosefinance Barn 🌱</title>
        <meta name="description" content="View your farming on Goosefinance and keep a eye on the value of your LP's🌱" />
        <meta name="keywords" content="plantswap,gosedefi,defi,farms,plant,egg" />
        <meta name="twitter:image" content="https://plantswap.finance/images/theBarn.svg" />
        <meta name="twitter:domain" content="PlantSwap.finance" />
        <meta name="twitter:description" content="View your farming on Goosefinance and keep a eye on the value of your LP's🌱" />
        <meta name="twitter:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:title" content="PlantSwap.Finance - Farm $PLANT with us and save the planet🌱" />
        <meta property="og:url" content="https://plantswap.finance/barnGoose" />
        <meta property="og:image" content="https://plantswap.finance/images/theBarn.svg" />
        <meta property="og:description" content="View your farming on Goosefinance and keep a eye on the value of your LP's🌱" />
      </Helmet>
      <Hero>
        <div>
          <Heading as="h1" size="xxl" mb="16px">
            {TranslateString(738, 'GooseFinance Barn')}
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
                <a href="/barnGoose">
                  <img src="/images/platforms/farm.svg" alt="PlantSwap LP Barn" width={28} height={28} style={{marginRight: '15px'}} /></a>
                <a href="/barnGooseToken">
                  <img src="/images/platforms/token.svg" alt="GooseFinance Token Barn" width={28} height={28} style={{marginRight: '15px'}} /></a>
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
