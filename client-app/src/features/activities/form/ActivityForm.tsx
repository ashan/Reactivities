import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'

const ActivityForm = () => {
  const {
    activityStore: {
      selectedActivity,
      closeForm,
      createActivity,
      updateActivity,
      loading,
    },
  } = useStore()
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
    setActivity(
      selectedActivity ?? {
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: '',
      }
    )
  }, [selectedActivity])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }

  const handleSubmit = () =>
    activity.id ? updateActivity(activity) : createActivity(activity)

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
          floated="right"
          type="submit"
          content="Cancel"
          onClick={() => closeForm()}
        />
      </Form>
    </Segment>
  )
}
export default observer(ActivityForm)
