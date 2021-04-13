import React from 'react'
import Page from 'components/layout/Page'
import Header from './Header'
import ProfileCreationProvider from './contexts/ProfileCreationProvider'

const ProfileCreation = () => (
  <ProfileCreationProvider>
    <Page>
      <Header />
    </Page>
  </ProfileCreationProvider>
)

export default ProfileCreation
