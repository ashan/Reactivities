import { observer } from 'mobx-react-lite'
import React, { SyntheticEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Item, Label, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'

function ActivityList() {
  const {
    activityStore: {  deleteActivity, activitiesByDate, loading },
  } = useStore()
  const [target, setTarget] = useState('')

  const handleDeleteActivity = (
    e: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setTarget(e.currentTarget.name)
    deleteActivity(id)
  }
  return (
    <Segment>
      <Item.Group divided>
        {activitiesByDate.map(
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
                    as={Link}
                    to={`/activities/${id}`}
                    floated="right"
                    content="View"
                    color="blue"
                  />
                  <Button
                    name={id}
                    floated="right"
                    content="Delete"
                    loading={loading && target === id}
                    color="red"
                    onClick={(e) => handleDeleteActivity(e, id)}
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
export default observer(ActivityList)
