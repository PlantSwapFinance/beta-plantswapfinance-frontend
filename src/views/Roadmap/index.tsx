import React from 'react'
import { Flex, Heading } from '@pancakeswap-libs/uikit'
import Page from 'components/layout/Page'
import useI18n from 'hooks/useI18n'

const Roadmap = () => {
  const TranslateString = useI18n()

  return (
    <Page>
      <Flex alignItems="center" justifyContent="space-between" mb="32px">
        <Heading size="xl">{TranslateString(1040, 'Roadmap')}</Heading>
      </Flex>
      Going somewhere...
    </Page>
  )
}

export default Roadmap
