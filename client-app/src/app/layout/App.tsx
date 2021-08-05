import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    const getActivities = async () => {
      const response = await axios.get<Activity[]>(
        'http://localhost:5000/api/activities'
      )
      setActivities(response.data)
    }
    getActivities()
  }, [])

  const handleSelectActivity = (selectedActivityId: string) => {
    const selected = activities.find(
      (activity) => activity.id === selectedActivityId
    )
    if (selected) setSelectedActivity(selected)
  }

  const handleUnselectActivity = () => setSelectedActivity(undefined)

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleUnselectActivity()
    setEditMode(true)
  }

  const handleFormClose = () => setEditMode(false)

  const handleCreateOrEditActivity = (activity: Activity) => {
    if (activity.id) {
      setActivities([
        ...activities.filter((a) => a.id !== activity.id),
        activity,
      ])
    } else {
      activity = { ...activity, id: uuid() }
      setActivities([...activities, activity])
    }

    setEditMode(false)
    setSelectedActivity(activity)
  }

  const handleDeleteActivity = (activityId: string) =>
    setActivities([...activities.filter((a) => a.id !== activityId)])

  return (
    <>
      <NavBar
        handleFormOpen={handleFormOpen}
        handleUnselectActivity={handleUnselectActivity}
      />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          handleSelectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          handleUnselectActivity={handleUnselectActivity}
          editMode={editMode}
          handleFormOpen={handleFormOpen}
          handleFormClose={handleFormClose}
          handleCreateOrEditActivity={handleCreateOrEditActivity}
          handleDeleteActivity={handleDeleteActivity}
        />
      </Container>
    </>
  )
}

export default App
