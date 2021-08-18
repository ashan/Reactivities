import React from 'react'
import { useField } from 'formik'
import { Form } from 'semantic-ui-react'

interface Props {
  placeholder: string
  name: string
  label?: string
  type?: string
}

const MyTextInput = (props: Props) => {
  const [field, meta] = useField(props.name)
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      {/* <label>{props.label}</label> */}
      <Form.Input
        {...field}
        {...props}
        error={meta.touched && meta.error ? meta.error : null}
      />
      {/* <input {...field} {...props} /> */}
      {/* {meta.touched && meta.error ? (
        <Label basic color="red" content={meta.error} />
      ) : null} */}
    </Form.Field>
  )
}

export default MyTextInput
