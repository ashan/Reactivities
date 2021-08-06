import React, { Fragment, useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid'
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'

function App() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined)
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const getActivities = async () => {
      const response = await agent.Activities.list()
      const activities: Activity[] = []
      response.forEach((a) => {
        a.date = a.date.split('T')[0]
        activities.push(a)
      })
      setActivities(activities)
      setLoading(false)
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

  const handleCreateOrEditActivity = async (activity: Activity) => {
    setSubmitting(true)

    if (activity.id) {
      await agent.Activities.update(activity)
      setActivities([
        ...activities.filter((a) => a.id !== activity.id),
        activity,
      ])
      setSelectedActivity(activity)
      setEditMode(false)
      setSubmitting(false)
    } else {
      activity = { ...activity, id: uuid() }
      await agent.Activities.create(activity)
      setActivities([...activities, activity])
      setSelectedActivity(activity)
      setEditMode(false)
      setSubmitting(false)
    }
  }

  const handleDeleteActivity = async (activityId: string) =>{
    setSubmitting(true)
    await agent.Activities.delete(activityId)
    setActivities([...activities.filter((a) => a.id !== activityId)])
    setSubmitting(false)
  }

  if (loading) return <LoadingComponent content="Loading app" />
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
          submitting={submitting}
        />
      </Container>
    </>
  )
}

export default App
