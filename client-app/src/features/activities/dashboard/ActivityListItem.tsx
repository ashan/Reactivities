import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { format } from 'date-fns'
import { Activity } from '../../../app/models/activity'

interface Props {
  activity: Activity
}

export const ActivityListItem = ({
  activity: { id, title, date, description, city, venue, category },
}: Props) => {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image size="tiny" circular src="/assets/user.png" />
            <Item.Content>
              <Item.Header as={Link} to={`activities/${id}`}>
                {title}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />
          {format(date!, 'dd MMM yyyy h:mm aa')}
          <Icon name="marker" />
          {venue}
        </span>
      </Segment>
      <Segment secondary>Attendees go here</Segment>
      <Segment clearing>
        <span>{description}</span>
        <Button
          as={Link}
          to={`/activities/${id}`}
          content="View"
          floated="right"
          color="teal"
        />
      </Segment>
    </Segment.Group>
  )
}
