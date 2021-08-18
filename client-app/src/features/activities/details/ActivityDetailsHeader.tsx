import { observer } from 'mobx-react-lite'
import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Image, Item, Header, Button } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import {format} from 'date-fns'

const activityImageStyle = {
  filter: 'brightness(30%)',
}
const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white',
}
interface Props {
  activity: Activity
}

const ActivityDetailsHeader = ({
  activity: { id, category, title, date },
}: Props) => {
  return (
    <Segment.Group>
      <Segment basic attached="top" style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment style={activityImageTextStyle} basic>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size="huge"
                  content={title}
                  style={{ color: 'white' }}
                />
                <p>{format(date!, 'dd MMM yyyy')}</p>
                <p>
                  Hosted by <strong>Bob</strong>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached="bottom">
        <Button color="teal">Join Activity</Button>
        <Button>Cancel Attendance</Button>
        <Button color="orange" floated="right" as={Link} to={`/manage/${id}`}>
          Manage Event
        </Button>
      </Segment>
    </Segment.Group>
  )
}

export default observer(ActivityDetailsHeader)
