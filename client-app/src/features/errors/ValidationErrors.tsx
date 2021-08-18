import React from 'react'
import { Message } from 'semantic-ui-react'

interface Props {
  errors: string[] | null
}

const ValidationErrors = ({ errors }: Props) => {
  return (
    <Message error>
      {errors && (
        <Message.List>
          {errors.map((error, i) => (
            <Message.Item key={i} content={error} />
          ))}
        </Message.List>
      )}
    </Message>
  )
}

export default ValidationErrors
