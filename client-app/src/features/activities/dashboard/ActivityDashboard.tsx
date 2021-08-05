import React from 'react'
import { Grid } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import ActivityDetails from '../details/ActivityDetails'
import { ActivityForm } from '../form/ActivityForm'
import ActivityList from './ActivityList'

interface Props {
  activities: Activity[]
  handleSelectActivity: (activityId: string) => void
  selectedActivity: Activity | undefined
  handleUnselectActivity: () => void
  editMode: boolean
  handleFormOpen: (activityId: string) => void
  handleFormClose: () => void
  handleCreateOrEditActivity: (activity : Activity) => void
  handleDeleteActivity: (activityId: string) => void
}
export default function ActivityDashboard({
  activities,
  handleSelectActivity,
  selectedActivity,
  handleUnselectActivity,
  editMode,
  handleFormOpen,
  handleFormClose,
  handleCreateOrEditActivity,
  handleDeleteActivity,
}: Props) {
  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails
            activity={selectedActivity}
            handleUnselectActivity={handleUnselectActivity}
            handleFormOpen={handleFormOpen}
          />
        )}
        {editMode && (
          <ActivityForm
            handleFormClose={handleFormClose}
            activity={selectedActivity}
            handleCreateOrEditActivity={handleCreateOrEditActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  )
}
