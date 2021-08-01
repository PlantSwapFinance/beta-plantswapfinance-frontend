import React, { useMemo } from 'react'
import { Button, Card, CardBody, CommunityIcon, useModal, Flex, Heading, Text } from '@plantswap-libs/uikit'
import shuffle from 'lodash/shuffle'
import { useWeb3React } from '@web3-react/core'
import { useTeams } from 'state/hooks'
import useI18n from 'hooks/useI18n'
import SelectionCard from '../components/SelectionCard'
import ConfirmProfileCreationModal from '../components/ConfirmProfileCreationModal'
import useProfileCreation from './contexts/hook'

interface Team {
  name: string
  description: string
  isJoinable: boolean
}

const Team: React.FC = () => {
  const { teamId: currentTeamId, tokenId, actions, minimumPlantRequired, allowance } = useProfileCreation()
  const TranslateString = useI18n()
  const { teams } = useTeams()
  const { account } = useWeb3React()
  const handleTeamSelection = (value: string) => actions.setTeamId(parseInt(value, 10))
  const teamValues = useMemo(() => shuffle(Object.values(teams)), [teams])
  const [onPresentConfirmProfileCreation] = useModal(
    <ConfirmProfileCreationModal
      userName="username"
      tokenId={tokenId}
      account={account}
      teamId={currentTeamId}
      minimumPlantRequired={minimumPlantRequired}
      allowance={allowance}
    />,
    false,
  )

  return (
    <>
      <Text fontSize="20px" color="textSubtle" bold>
        {TranslateString(999, `Step ${3}`)}
      </Text>
      <Heading as="h3" size="xl" mb="24px">
        {TranslateString(826, 'Join a Team')}
      </Heading>
      <Text as="p" mb="24px">
        {TranslateString(828, 'It won’t be possible to undo the choice you make for the foreseeable future!')}
      </Text>
      <Card mb="24px">
        <CardBody>
          <Heading as="h4" size="lg" mb="8px">
            {TranslateString(826, 'Join a Team')}
          </Heading>
          <Text as="p" color="textSubtle" mb="24px">
            {TranslateString(
              830,
              'We will do our best to split the donation from the Development fund according to each team points.',
            )}
          </Text>
          {teamValues &&
            teamValues.map((team) => {
              return (
                <SelectionCard
                  key={team.name}
                  name="teams-selection"
                  value={team.id}
                  isChecked={currentTeamId === team.id}
                  image={`/images/teams/${team.images.md}`}
                  onChange={handleTeamSelection}
                  disabled={!team.isJoinable}
                >
                  <Text bold>{team.name}</Text>
                  <Flex>
                    <CommunityIcon mr="8px" />
                    <Text>{team.users.toLocaleString()}</Text>
                  </Flex>
                </SelectionCard>
              )
            })}
        </CardBody>
      </Card>
      <Button onClick={onPresentConfirmProfileCreation} disabled={currentTeamId === null}>
        {TranslateString(842, 'Complete Profile')}
      </Button>
    </>
  )
}

export default Team
