import React, { SyntheticEvent, useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
  activities: Activity[]
  handleSelectActivity: (activityId: string) => void
  handleDeleteActivity: (activityId: string) => void
  submitting: boolean
}
export default function ActivityList({
  activities,
  handleSelectActivity,
  handleDeleteActivity,
  submitting
}: Props) {
  const [target, setTarget] = useState('')

  const deleteActivity = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name)
    handleDeleteActivity(id)
  }
  return (
    <Segment>
      <Item.Group divided>
        {activities.map(
          ({ id, title, date, description, city, venue, category }) => (
            <Item key={id}>
              <Item.Content>
                <Item.Header as="a">{title}</Item.Header>
                <Item.Meta>{date}</Item.Meta>
                <Item.Description>
                  <div>{description}</div>
                  <div>
                    {city}, {venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    floated="right"
                    content="View"
                    color="blue"
                    onClick={() => handleSelectActivity(id)}
                  />
                  <Button
                    name={id}
                    floated="right"
                    content="Delete"
                    loading={submitting && target === id}
                    color="red"
                    onClick={(e) => deleteActivity(e, id)}
                  />
                  <Label basic content={category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        )}
      </Item.Group>
    </Segment>
  )
}
