import React, { useState } from 'react'
import styled from 'styled-components'
import { FarmWithStakedValue } from 'views/BarnGoose/components/FarmCard/FarmCard'
import { useMatchBreakpoints } from '@plantswap-libs/uikit'
import useI18n from 'hooks/useI18n'

import Apr, { AprProps } from './Apr'
import Farm, { FarmProps } from './Farm'
import Earned, { EarnedProps } from './Earned'
import Details from './Details'
import Multiplier, { MultiplierProps } from './Multiplier'
import Liquidity, { LiquidityProps } from './Liquidity'
import ActionPanel from './Actions/ActionPanel'
import StatsPanel from './Actions/StatsPanel'
import HolderStats from './Actions/HolderStats'
import CellLayout from './CellLayout'
import { DesktopColumnSchema, MobileColumnSchema } from '../types'
import Divider from '../Divider'

export interface RowProps {
  apr: AprProps
  gooseFarm: FarmProps
  earned: EarnedProps
  multiplier: MultiplierProps
  liquidity: LiquidityProps
  details: FarmWithStakedValue
}

const cells = {
  apr: Apr,
  gooseFarm: Farm,
  earned: Earned,
  details: Details,
  multiplier: Multiplier,
  liquidity: Liquidity,
}

const CellInner = styled.div`
  padding: 24px 0px;
  display: flex;
  width: 100%;
  align-items: center;
  padding-right: 8px;

  ${({ theme }) => theme.mediaQueries.xl} {
    padding-right: 32px;
  }
`

const StyledTr = styled.tr`
  cursor: pointer;
  border-bottom: 2px solid ${({ theme }) => theme.colors.borderColor};
`

const EarnedMobileCell = styled.td`
  padding: 16px 0 24px 16px;
`

const AprMobileCell = styled.td`
  padding-top: 16px;
  padding-bottom: 24px;
`

const FarmMobileCell = styled.td`
  padding-top: 24px;
`

const Row: React.FunctionComponent<RowProps> = (props) => {
  const { details } = props
  const [actionPanelToggled, setActionPanelToggled] = useState(false)
  const TranslateString = useI18n()

  const toggleActionPanel = () => {
    setActionPanelToggled(!actionPanelToggled)
  }

  const { isXl, isXs } = useMatchBreakpoints()

  const isMobile = !isXl
  const tableSchema = isMobile ? MobileColumnSchema : DesktopColumnSchema
  const columnNames = tableSchema.map((column) => column.name)

  const handleRenderRow = () => {
    if (!isXs) {
      return (
        <StyledTr onClick={toggleActionPanel}>
          {Object.keys(props).map((key) => {
            const columnIndex = columnNames.indexOf(key)
            if (columnIndex === -1) {
              return null
            }

            switch (key) {
              case 'details':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout>
                        <Details actionPanelToggled={actionPanelToggled} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              case 'apr':
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout label={TranslateString(736, 'APR')}>
                        <Apr {...props.apr} hideButton={isMobile} />
                      </CellLayout>
                    </CellInner>
                  </td>
                )
              default:
                return (
                  <td key={key}>
                    <CellInner>
                      <CellLayout
                        label={TranslateString(tableSchema[columnIndex].translationId, tableSchema[columnIndex].label)}
                      >
                        {React.createElement(cells[key], props[key])}
                      </CellLayout>
                    </CellInner>
                  </td>
                )
            }
          })}
        </StyledTr>
      )
    }

    return (
      <StyledTr onClick={toggleActionPanel}>
        <td>
          <tr>
            <FarmMobileCell>
              <CellLayout>
                <Farm {...props.gooseFarm} />
              </CellLayout>
            </FarmMobileCell>
          </tr>
          <tr>
            <EarnedMobileCell>
              <CellLayout label={TranslateString(1072, 'Earned')}>
                <Earned {...props.earned} />
              </CellLayout>
            </EarnedMobileCell>
            <AprMobileCell>
              <CellLayout label={TranslateString(736, 'APR')}>
                <Apr {...props.apr} hideButton />
              </CellLayout>
            </AprMobileCell>
          </tr>
        </td>
        <td>
          <CellInner>
            <CellLayout>
              <Details actionPanelToggled={actionPanelToggled} />
            </CellLayout>
          </CellInner>
        </td>
      </StyledTr>
    )
  }

  return (
    <>
      {handleRenderRow()}
      {actionPanelToggled && details && (
        <tr>
          <td colSpan={6}>
            <ActionPanel {...props} />
            <Divider />
            <StatsPanel {...props} />
            <Divider />
            <HolderStats {...props} />
          </td>
        </tr>
      )}
    </>
  )
}

export default Row