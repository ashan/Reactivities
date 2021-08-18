import React from 'react'
import { useField } from 'formik'
import { Form } from 'semantic-ui-react'
import DatePicker, {ReactDatePickerProps} from 'react-datepicker'



const MyTextInput = (props: Partial<ReactDatePickerProps>) => {
  const [field, meta, helpers] = useField(props.name!)
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        {...props}
        selected={(field.value && new Date(field.value)) || null}
        onChange={(value) => helpers.setValue(value)}
      />
      {meta.touched && meta.error ? (
        <div
          className="ui pointing above prompt label"
          role="alert"
          aria-atomic="true"
        >
          {meta.error}
        </div>
      ) : null}
      {/* {meta.touched && meta.error ? (
        <Label basic color="red" content={meta.error} />
      ) : null} */}
    </Form.Field>
  )
}

export default MyTextInput
