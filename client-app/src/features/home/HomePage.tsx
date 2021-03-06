import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react'

interface Props {}

const HomePage = (props: Props) => {
  return (
    <Segment inverted textAlign="center" vertical className="masthead">
      <Container text>
        <Header as="h1" inverted>
          <Image
            size="massive"
            src="/assets/logo.png"
            alt="logo"
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        <Header as="h2" inverted content="Welcome to Reactivities"/>
        <Button as={Link} to='/activities' size='huge' content='Take me to the Activities!' inverted/>
      </Container>
    </Segment>
  )
}
export default HomePage
