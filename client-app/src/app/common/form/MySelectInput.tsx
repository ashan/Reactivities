import React from 'react'
import { useField } from 'formik'
import { DropdownItemProps, Form,  Select } from 'semantic-ui-react'


interface Props {
  placeholder: string
  name: string
  label?: string
  options: DropdownItemProps[]
}

const MySelectInput = (props: Props) => {
  const [field, meta, helpers] = useField(props.name)
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <label>{props.label}</label>
      <Select
        clearable
        options={props.options}
        value={field.value || null}
        onChange={(e, d) => helpers.setValue(d.value)}
        onBlur={() => helpers.setTouched(true)}
        placeholder={props.placeholder}
        error={meta.touched && meta.error ? true : false}
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

export default MySelectInput
