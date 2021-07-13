import React from 'react'
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton, TelegramShareButton, WeiboShareButton, WorkplaceShareButton, VKShareButton, ViberShareButton, 
  TumblrShareButton, RedditShareButton, PocketShareButton, PinterestShareButton, OKShareButton, LinkedinShareButton, MailruShareButton, LivejournalShareButton,
  LineShareButton, InstapaperShareButton, HatenaShareButton, EmailShareButton,
  FacebookIcon, TwitterIcon, WhatsappIcon, TelegramIcon, WeiboIcon, WorkplaceIcon, VKIcon, ViberIcon,
  TumblrIcon, RedditIcon, PocketIcon, PinterestIcon, OKIcon, LinkedinIcon, MailruIcon, LivejournalIcon, LineIcon, InstapaperIcon, HatenaIcon, EmailIcon } from "react-share";
import { Heading, Button, Text, Modal} from '@plantswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import styled  from 'styled-components'
import useI18n from 'hooks/useI18n'
import Divider from './Divider'

interface ShareModalProps {
  harvested: string
  type?: string
  onDismiss?: () => void
  tokenHarvested?: string
  tokenName?: string
  usdHarvested?: number
  addLiquidityUrl?: string
}

const TextCenter = styled(Text)`
  margin-left: auto;
  margin-right: auto;
  margin-top: 16px;
`
const TextCenter2 = styled(Text)`
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 8px;
`

const ShareModal: React.FC<ShareModalProps> = ({ harvested, onDismiss, tokenName, tokenHarvested, usdHarvested }) => {
  const TranslateString = useI18n()

  const formatUsdHarvested = usdHarvested.toFixed(2)
  
  const shareUrl = "https://PlantSwap.finance"
  const shareTitle = `I just harvested ${harvested} ${tokenHarvested} (${formatUsdHarvested} USD)🌱🌱🌱`

  const facebookQuote = shareTitle
  const facebookHashtag = "#PlantSwap #PLANT #VerticalYield #DeFi #YieldFarming #LiquidityMining"
  const twitterTitle = shareTitle
  const twitterVia = "plantswapdefi"
  const WhatsappTitle = shareTitle
  const TelegramTitle = shareTitle
  const weiboTitle = shareTitle
  const weiboImage = "http://localhost:3000/images/share-farm.svg"
  const workplaceQuote = shareTitle
  const workplaceHashtag = "#PlantSwap #PLANT #VerticalYield #DeFi #YieldFarming #LiquidityMining"
  const vkTitle = shareTitle
  const vkImage = "http://localhost:3000/images/share-farm.svg"
  const viberTitle = shareTitle
  const tumblrTitle = shareTitle
  const tumblrCaption = shareTitle
  const redditTitle = shareTitle
  const pocketTitle = shareTitle
  const pinterestImage = "http://localhost:3000/images/share-farm.svg"
  const pinterestDescription = shareTitle
  const okTitle = shareTitle
  const okDescription = shareTitle
  const okImage = "http://localhost:3000/images/share-farm.svg"
  const linkedinTittle = shareTitle
  const linkedinSummary = shareTitle
  const linkedinSource = shareUrl
  const mailruTittle = shareTitle
  const mailruDescription = shareTitle
  const mailruImageUrl = "http://localhost:3000/images/share-farm.svg"
  const livejournalTittle = shareTitle
  const livejournalDescription = shareTitle
  const lineTittle = shareTitle
  const instapaperTittle = shareTitle
  const instapaperDescription = shareTitle
  const hatenaTittle = shareTitle
  const emailSubject = shareTitle
  const emailBody = shareTitle

  return (
    <Modal title={TranslateString(1068, 'Share your PlantSwap experience')} onDismiss={onDismiss}>
      <Heading as="h2" size="xl" mb="14px">Share your love for PlantSwap🌱</Heading>
        <img src="/images/share-farm.svg" alt="Farms" width={680} height={357} />
      <Divider />
      <Text>You harvested <b>{harvested} {tokenHarvested}</b> or a total of <b>{formatUsdHarvested} USD.</b></Text>
      <Text>Yield farming with <u>{tokenName} pool</u> 🌱🌱🌱</Text>
      <Text>Share this on social media!</Text>

      <TextCenter>
        <TwitterShareButton title={twitterTitle} via={twitterVia} url={shareUrl}>
          <TwitterIcon size={64} />
        </TwitterShareButton>

        <FacebookShareButton quote={facebookQuote} hashtag={facebookHashtag} url={shareUrl}>
          <FacebookIcon size={64} />
        </FacebookShareButton>

        <WhatsappShareButton title={WhatsappTitle} url={shareUrl}>
          <WhatsappIcon size={64} />
        </WhatsappShareButton>

        <TelegramShareButton title={TelegramTitle} url={shareUrl}>
          <TelegramIcon size={64}/>
        </TelegramShareButton>

        <WeiboShareButton title={weiboTitle} image={weiboImage} url={shareUrl}>
          <WeiboIcon size={64}/>
        </WeiboShareButton>

        <WorkplaceShareButton quote={workplaceQuote} hashtag={workplaceHashtag} url={shareUrl}>
          <WorkplaceIcon size={64}/>
        </WorkplaceShareButton>

        <VKShareButton title={vkTitle} image={vkImage} url={shareUrl}>
          <VKIcon size={64}/>
        </VKShareButton>

        <MailruShareButton title={mailruTittle} description={mailruDescription} imageUrl={mailruImageUrl} url={shareUrl}>
          <MailruIcon size={64}/>
        </MailruShareButton>

        <LivejournalShareButton title={livejournalTittle} description={livejournalDescription} url={shareUrl}>
          <LivejournalIcon size={64}/>
        </LivejournalShareButton>

        <LineShareButton title={lineTittle} url={shareUrl}>
          <LineIcon size={64}/>
        </LineShareButton>
      </TextCenter>
      <TextCenter2>
        <RedditShareButton title={redditTitle} url={shareUrl}>
          <RedditIcon size={64}/>
        </RedditShareButton>

        <ViberShareButton title={viberTitle} url={shareUrl}>
          <ViberIcon size={64}/>
        </ViberShareButton>

        <TumblrShareButton title={tumblrTitle} caption={tumblrCaption} url={shareUrl}>
          <TumblrIcon size={64}/>
        </TumblrShareButton>

        <PocketShareButton title={pocketTitle} url={shareUrl}>
          <PocketIcon size={64}/>
        </PocketShareButton>

        <PinterestShareButton media={pinterestImage} description={pinterestDescription} url={shareUrl}>
          <PinterestIcon size={64}/>
        </PinterestShareButton>

        <OKShareButton title={okTitle} description={okDescription} image={okImage} url={shareUrl}>
          <OKIcon size={64}/>
        </OKShareButton>

        <LinkedinShareButton title={linkedinTittle} summary={linkedinSummary} source={linkedinSource} url={shareUrl}>
          <LinkedinIcon size={64}/>
        </LinkedinShareButton>

        <InstapaperShareButton title={instapaperTittle} description={instapaperDescription} url={shareUrl}>
          <InstapaperIcon size={64}/>
        </InstapaperShareButton>

        <HatenaShareButton title={hatenaTittle} url={shareUrl}>
          <HatenaIcon size={64}/>
        </HatenaShareButton>

        <EmailShareButton subject={emailSubject} body={emailBody} url={shareUrl}>
          <EmailIcon size={64}/>
        </EmailShareButton>
      </TextCenter2>
      
      <ModalActions>
        <Button variant="secondary" onClick={onDismiss} width="100%">
          {TranslateString(462, 'Cancel')}
        </Button>
      </ModalActions>  
    </Modal>
  )
}

export default ShareModal
