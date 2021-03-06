import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import ActivityDetailsChat from './ActivityDetailsChat'
import ActivityDetailsHeader from './ActivityDetailsHeader'
import ActivityDetailsInfo from './ActivityDetailsInfo'
import ActivityDetailsSidebar from './ActivityDetailsSidebar'

export default observer(function ActivityDetails() {
  const {
    activityStore: { selectedActivity, loadActivity, loadingInitial },
  } = useStore()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (id) loadActivity(id)
  }, [id, loadActivity])

  if (loadingInitial || !selectedActivity) return <LoadingComponent />

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityDetailsHeader activity={selectedActivity} />
        <ActivityDetailsInfo activity={selectedActivity} />
        <ActivityDetailsChat />
      </Grid.Column>
      <Grid.Column width="6">
        <ActivityDetailsSidebar />
      </Grid.Column>
    </Grid>
  )
})
