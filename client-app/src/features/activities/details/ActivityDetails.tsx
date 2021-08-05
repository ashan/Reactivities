import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'

interface Props {
  activity: Activity
  handleUnselectActivity: () => void
  handleFormOpen: (activityId: string) => void
}
export default function ActivityDetails({
  activity: { id, category, title, date, description },
  handleUnselectActivity,
  handleFormOpen,
}: Props) {
  return (
    <Card fluid>
      <Image src={`/assets/categoryImages/${category}.jpg`} />
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>
          <span>{date}</span>
        </Card.Meta>
        <Card.Description>{description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths="2">
          <Button
            basic
            color="blue"
            content="Edit"
            onClick={() => handleFormOpen(id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => handleUnselectActivity()}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}
