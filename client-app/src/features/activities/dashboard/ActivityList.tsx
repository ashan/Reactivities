import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
  activities: Activity[]
  handleSelectActivity: (activityId: string) => void
  handleDeleteActivity: (activityId: string) => void
}
export default function ActivityList({
  activities,
  handleSelectActivity,
  handleDeleteActivity,
}: Props) {
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
                    floated="right"
                    content="Delete"
                    color="red"
                    onClick={() => handleDeleteActivity(id)}
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
