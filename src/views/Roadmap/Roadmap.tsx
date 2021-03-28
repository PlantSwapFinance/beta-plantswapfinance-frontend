import React from 'react'
import Page from 'components/layout/Page'
import { Link, Redirect, useParams } from 'react-router-dom'
import { ChevronLeftIcon, Flex, Text } from '@pancakeswap-libs/uikit'
import PageLoader from 'components/PageLoader'
import useI18n from 'hooks/useI18n'

const Roadmap = () => {
  const { id: idStr }: { id: string } = useParams()
  const id = Number(idStr)
  const TranslateString = useI18n()

  return (
    <Page>
      Hello
    </Page>
  )
}

export default Roadmap
