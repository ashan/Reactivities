import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom';
import { Card, Image, Button } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store'


export default observer(function ActivityDetails() {

  const {activityStore: {selectedActivity, loadActivity, loadingInitial}} = useStore();
  const {id} = useParams<{id: string}>()

  useEffect(() => {
    if(id) loadActivity(id)
  }, [id, loadActivity])
  
  if(loadingInitial || !selectedActivity) return (<LoadingComponent/>)

  const { category, title, date, description } = selectedActivity
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
            as={Link}
            to={`/manage/${selectedActivity.id}`}
            basic
            color="blue"
            content="Edit"
          />
          <Button
            as={Link}
            to={'/activities'}
            basic
            color="grey"
            content="Cancel"
          />
        </Button.Group>
      </Card.Content>
    </Card>
  )
})
