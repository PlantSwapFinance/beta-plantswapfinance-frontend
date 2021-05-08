import React, { useEffect, useCallback, useState, useRef } from 'react'
import { Route, useRouteMatch, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWeb3React } from '@web3-react/core'
import { Image, Heading, RowType, Toggle, Text, useModal } from '@plantswap-libs/uikit'
import styled  from 'styled-components'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import usePersistState from 'hooks/usePersistState'
import { useBarnsBeta, usePricePlantBusd, useGetApiPrices } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchBarnBetaUserDataAsync } from 'state/actions'
import { BarnBeta } from 'state/types'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'
import { getBarnBetaApy } from 'utils/apy'
import { orderBy } from 'lodash'
import Divider from './components/Divider'
import RiskDisclaimer from './components/RiskDisclaimer'

import BarnBetaCard, { BarnBetaWithStakedValue } from './components/BarnBetaCard/BarnBetaCard'
import Table from './components/BarnBetaTable/BarnBetaTable'
import BarnBetaTabButtons from './components/BarnBetaTabButtons'
import SearchInput from './components/SearchInput'
import { RowProps } from './components/BarnBetaTable/Row'
import ToggleView from './components/ToggleView/ToggleView'
import { DesktopColumnSchema, ViewMode } from './components/types'
import Select, { OptionProps } from './components/Select/Select'
import SelectPlatform, { OptionPlatformProps } from './components/Select/SelectPlatform'

export interface BarnsBetaProps{
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

const BarnsBeta: React.FC<BarnsBetaProps> = (barnsBetaProps) => {
  const { path } = useRouteMatch()
  const { pathname } = useLocation()
  const [hasAcceptedRisk, setHasAcceptedRisk] = usePersistState(false, 'plantswap_barnBeta_accepted_risk')
  const TranslateString = useI18n()
  const barnsBetaLP = useBarnsBeta()
  const plantPrice = usePricePlantBusd()
  const [query, setQuery] = useState('')
  const [viewMode, setViewMode] = useState(ViewMode.TABLE)
  const { account } = useWeb3React()
  const [sortOption, setSortOption] = useState('hot')
  const [sortOptionPlatform, setSortOptionPlatform] = useState('all')
  const prices = useGetApiPrices()
  const handleAcceptRiskSuccess = () => setHasAcceptedRisk(true)
  const [onPresentRiskDisclaimer] = useModal(<RiskDisclaimer onSuccess={handleAcceptRiskSuccess} />, false)
  const {tokenMode} = barnsBetaProps;

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
      dispatch(fetchBarnBetaUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stackedOnly, setStackedOnly] = useState(false)
  const isActive = !pathname.includes('history')

  const activeBarnsBeta = barnsBetaLP.filter((barnBeta) => !!barnBeta.isTokenOnly === !!tokenMode && barnBeta.multiplier !== '0X')
  const inactiveBarnsBeta = barnsBetaLP.filter((barnBeta) => !!barnBeta.isTokenOnly === !!tokenMode && barnBeta.multiplier === '0X')

  const stackedOnlyBarnsBeta = activeBarnsBeta.filter(
    (barnBeta) => barnBeta.userData && new BigNumber(barnBeta.userData.stakedBalance).isGreaterThan(0),
  )

  const stackedInactiveBarnsBeta = inactiveBarnsBeta.filter(
    (barnBeta) => barnBeta.userData && new BigNumber(barnBeta.userData.stakedBalance).isGreaterThan(0),
  )

  const sortBarnsBeta = (barnsBeta: BarnBetaWithStakedValue[]): BarnBetaWithStakedValue[] => {
    switch (sortOption) {
      case 'apr':
        return orderBy(barnsBeta, (barnBeta: BarnBetaWithStakedValue) => barnBeta.apy, 'desc')
      case 'multiplier':
        return orderBy(
          barnsBeta,
          (barnBeta: BarnBetaWithStakedValue) => (barnBeta.multiplier ? Number(barnBeta.multiplier.slice(0, -1)) : 0),
          'desc',
        )
      case 'earned':
        return orderBy(barnsBeta, (barnBeta: BarnBetaWithStakedValue) => (barnBeta.userData ? barnBeta.userData.earnings : 0), 'desc')
      case 'liquidity':
        return orderBy(barnsBeta, (barnBeta: BarnBetaWithStakedValue) => Number(barnBeta.liquidity), 'desc')
      default:
        return barnsBeta
    }
  }

  const sortBarnsPlatform = (barnsBeta: BarnBetaWithStakedValue[]): BarnBetaWithStakedValue[] => {
    switch (sortOptionPlatform) {
      case 'all':
        return orderBy(barnsBeta, (barnBeta: BarnBetaWithStakedValue) => barnBeta.platform, 'desc')
      case 'plantswap':
        return orderBy(barnsBeta, (barnBeta: BarnBetaWithStakedValue) => barnBeta.platform, 'desc')
      case 'pancakeswap':
        return orderBy(barnsBeta, (barnBeta: BarnBetaWithStakedValue) => barnBeta.platform, 'desc')
      default:
        return barnsBeta
    }
  }

  const barnsBetaList = useCallback(
    (barnsBetaToDisplay: BarnBeta[]): BarnBetaWithStakedValue[] => {
      let barnsBetaToDisplayWithAPY: BarnBetaWithStakedValue[] = barnsBetaToDisplay.map((barnBeta) => {
        if (!barnBeta.lpTotalInQuoteToken || !prices) {
          return barnBeta
        }

        const quoteTokenPriceUsd = prices[barnBeta.quoteToken.symbol.toLowerCase()]
        const totalLiquidity = new BigNumber(barnBeta.lpTotalInQuoteToken).times(quoteTokenPriceUsd)
        const apy = isActive ? getBarnBetaApy(barnBeta.poolWeight, plantPrice, totalLiquidity) : 0

        return { ...barnBeta, apy, liquidity: totalLiquidity }
      })

      if (query) {
        const lowercaseQuery = query.toLowerCase()
        barnsBetaToDisplayWithAPY = barnsBetaToDisplayWithAPY.filter((barnBeta: BarnBetaWithStakedValue) => {
          return barnBeta.lpSymbol.toLowerCase().includes(lowercaseQuery)
        })
      }
      return barnsBetaToDisplayWithAPY
    },
    [plantPrice, prices, query, isActive],
  )

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }
  
  let barnsBetaStaked = []
  if (isActive) {
    barnsBetaStaked = stackedOnly ? barnsBetaList(stackedOnlyBarnsBeta) : barnsBetaList(activeBarnsBeta)
  } else {
    barnsBetaStaked = stackedOnly ? barnsBetaList(stackedInactiveBarnsBeta) : barnsBetaList(inactiveBarnsBeta)
  }

  barnsBetaStaked = sortBarnsPlatform(sortBarnsBeta(barnsBetaStaked))

  const rowData = barnsBetaStaked.map((barnBeta) => {
    const { token, quoteToken } = barnBeta
    const tokenAddress = token.address
    const quoteTokenAddress = quoteToken.address
    const lpLabel = barnBeta.lpSymbol && barnBeta.lpSymbol.split(' ')[0].toUpperCase().replace('PLANT', 'PLANT')
    const chefPlatform = barnBeta.chefTag
    const chefAddress = barnBeta.chefAddess[process.env.REACT_APP_CHAIN_ID]
    const chefPlatformPrice = barnBeta.chefTag

    const row: RowProps = {
      apr: {
        value: barnBeta.apy && barnBeta.apy.toLocaleString('en-US', { maximumFractionDigits: 2 }),
        multiplier: barnBeta.multiplier,
        lpLabel,
        tokenAddress,
        quoteTokenAddress,
        plantPrice,
        originalValue: barnBeta.apy,
      },
      barnBeta: {
        image: barnBeta.lpSymbol.split(' ')[0].toLocaleLowerCase(),
        chefPlatform,
        label: lpLabel,
        pid: barnBeta.pid,
      },
      platform: {
        value: chefPlatform,
        image: barnBeta.chefTag.split(' ')[0].toLocaleLowerCase(),
        platformAddress: chefAddress,
        platformPrice: chefPlatformPrice,
      },
      earned: {
        earnings: barnBeta.userData ? getBalanceNumber(new BigNumber(barnBeta.userData.earnings)) : null,
        pid: barnBeta.pid,
      },
      liquidity: {
        liquidity: barnBeta.liquidity,
      },
      multiplier: {
        multiplier: barnBeta.multiplier,
      },
      details: barnBeta,
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
            case 'barnBeta':
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
            {barnsBetaStaked.map((barnBeta) => (
              <BarnBetaCard key={barnBeta.pid} barnBeta={barnBeta} plantPrice={plantPrice} account={account} removed={false} />
            ))}
          </Route>
          <Route exact path={`${path}/history`}>
            {barnsBetaStaked.map((barnBeta) => (
              <BarnBetaCard key={barnBeta.pid} barnBeta={barnBeta} plantPrice={plantPrice} account={account} removed />
            ))}
          </Route>
        </FlexLayout>
      </div>
    )
  }

  const handleSortOptionChangePlatform = (optionPlatform: OptionPlatformProps): void => {
    setSortOptionPlatform(optionPlatform.value)
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
            {TranslateString(738, 'BarnBeta')}
          </Heading>
          <ul>
            <li><Text>Manage all your farming operation</Text></li>
            <li><Text>Add liquidity, see stats, harverst or remove your LP&apos;s</Text></li>
            <li><Text>Everything under one barn.</Text></li>
          </ul>
        </div>
        <img src="/images/barns.svg" alt="BarnsBeta" width={600} height={315} />
      </Hero>
        <ControlContainer>
          <FilterContainer1stRow>
            <LabelWrapper>
              <Text>Order by Platform</Text>
              <SelectPlatform
                optionsPlatform={[
                  {
                    label: 'All',
                    value: 'all',
                  },
                  {
                    label: 'PlantSwap',
                    value: 'plantswap',
                  },
                  {
                    label: 'PancakeSwap',
                    value: 'pancakeswap',
                  },
                ]}
                onChange={handleSortOptionChangePlatform}
              />
            </LabelWrapper>
            <FilterContainer1stRowPlatformIcon>
              <LabelWrapper>
                <Text>Filter Platform</Text>
                <a href="/barnPlantswap">
                  <img src="/images/platforms/plantswap.svg" alt="PlantSwap" width={28} height={28} style={{marginRight: '15px'}} /></a>
                <a href="/barnPancakeswap">
                  <img src="/images/platforms/pancakeswap.svg" alt="PancakeSwap" width={28} height={28} style={{marginRight: '15px'}} /></a>
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
            <BarnBetaTabButtons />
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
                    label: 'Platform',
                    value: 'platform',
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

export default BarnsBeta
