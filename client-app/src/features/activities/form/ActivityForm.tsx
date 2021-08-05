import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
  activity: Activity | undefined
  handleFormClose: () => void
  handleCreateOrEditActivity: (activity: Activity) => void
}

export const ActivityForm = ({
  activity: selectedActivity,
  handleFormClose,
  handleCreateOrEditActivity,
}: Props) => {
  const [activity, setActivity] = useState<Activity>(
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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setActivity({ ...activity, [name]: value })
  }

  const handleSubmit = () => handleCreateOrEditActivity(activity)
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
        <Button positive floated="right" type="submit" content="Submit" />
        <Button
          floated="right"
          type="submit"
          content="Cancel"
          onClick={() => handleFormClose()}
        />
      </Form>
    </Segment>
  )
}
