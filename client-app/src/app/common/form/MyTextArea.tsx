import React from 'react'
import { useField } from 'formik'
import { Form } from 'semantic-ui-react'

interface Props {
  placeholder: string
  name: string
  label?: string
  rows: number
  type?: string
}

const MyTextArea = (props: Props) => {
  const [field, meta] = useField(props.name)
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      {/* <label>{props.label}</label> */}
      {/* <textarea {...field} {...props} /> */}
      <Form.TextArea {...field} {...props} label={props.label} error={meta.touched && meta.error ? meta.error : null}/>
      {/* {meta.touched && meta.error ? (
        <Label basic color="red" content={meta.error} />
      ) : null} */}
    </Form.Field>
  )
}

export default MyTextArea
