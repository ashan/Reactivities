import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'


export default function ActivityDetails() {

  const {activityStore: {cancelSelectedActivity, openForm, selectedActivity}} = useStore();
  
  if(!selectedActivity) return (<></>)

  const { id, category, title, date, description } = selectedActivity
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
            onClick={() => openForm(id)}
          />
          <Button
            basic
            color="grey"
            content="Cancel"
            onClick={() => cancelSelectedActivity()}
          />
        </Button.Group>
      </Card.Content>
    </Card>
  )
}
