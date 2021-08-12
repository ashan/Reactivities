import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'

const ActivityForm = () => {
  const history = useHistory()
  const {
    activityStore: {
      loadActivity,
      createActivity,
      updateActivity,
      loadingInitial,
      setLoadingInitial,
      loading,
    },
  } = useStore()

  const { id } = useParams<{ id: string }>()

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    date: '',
    description: '',
    category: '',
    city: '',
    venue: '',
  })

  useEffect(() => {
    const getActivity = async () => {
      if (id) {
        const activity = await loadActivity(id)
        setActivity(activity!)
      } else {
        setLoadingInitial(false)
      }
    }
    getActivity()
  }, [id, loadActivity, setLoadingInitial])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }

  const handleSubmit = async () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() }
      await createActivity(newActivity)
      history.push(`/activities/${newActivity.id}`)
    } else {
      await updateActivity(activity)
      history.push(`/activities/${activity.id}`)
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />
  return (
    <Segment clearing onSubmit={handleSubmit} autoComplete="off">
      <Form>
        <Form.Input
          placeholder="Title"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Description"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Category"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Date"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="City"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Venu"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button
          positive
          floated="right"
          type="submit"
          content="Submit"
          loading={loading}
        />
        <Button
          as={Link}
          to="/activities"
          floated="right"
          type="submit"
          content="Cancel"
        />
      </Form>
    </Segment>
  )
}
export default observer(ActivityForm)
