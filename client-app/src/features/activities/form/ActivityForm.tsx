import { observer } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { Activity } from '../../../app/models/activity'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'
import { Formik, Form,  FormikProps } from 'formik'
import * as Yup from 'yup'
import MyTextInput from '../../../app/common/form/MyTextInput'
import MyTextArea from '../../../app/common/form/MyTextArea'
import MySelectInput from '../../../app/common/form/MySelectInput'
import { categoryOptions } from '../../../app/common/options/categoryOptions'
import MyDateInput from '../../../app/common/form/MyDateInput'

const ActivityForm = () => {
  const history = useHistory()
  const {
    activityStore: {
      loadActivity,
      createActivity,
      updateActivity,
      loadingInitial,
      setLoadingInitial,
      loading,
    },
  } = useStore()

  const { id } = useParams<{ id: string }>()

  const [activity, setActivity] = useState<Activity>({
    id: '',
    title: '',
    date: null,
    description: '',
    category: '',
    city: '',
    venue: '',
  })

  const validationSchema = Yup.object({
    title: Yup.string().required('The activity title is required'),
    description: Yup.string().required('The activity description is required'),
    category: Yup.string().required(),
    date: Yup.string().required().nullable(),
    venue: Yup.string().required(),
    city: Yup.string().required(),
  })

  useEffect(() => {
    const getActivity = async () => {
      if (id) {
        const activity = await loadActivity(id)
        setActivity(activity!)
      } else {
        setLoadingInitial(false)
      }
    }
    getActivity()
  }, [id, loadActivity, setLoadingInitial])

 

  const handleFormSubmit = async (activity : Activity) => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() }
      await createActivity(newActivity)
      history.push(`/activities/${newActivity.id}`)
    } else {
      await updateActivity(activity)
      history.push(`/activities/${activity.id}`)
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />
  return (
    <Segment clearing>
      <Header content="Activity Details" sub color="teal" />
      <Formik
        enableReinitialize
        initialValues={activity}
        validationSchema={validationSchema}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }: FormikProps<Activity>) => {
          return (
            <Form
              className="ui form"
              onSubmit={handleSubmit}
              autoComplete="off"
            >
              <MyTextInput name="title" placeholder="Title" />
              <MyTextArea
                rows={3}
                placeholder="Description"
                name="description"
              />
              <MySelectInput
                options={categoryOptions}
                placeholder="Category"
                name="category"
              />
              <MyDateInput
                placeholderText="Date"
                name="date"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                isClearable
                clearButtonClassName="clear"
              />
              <Header content="Location Details" sub color="teal" />
              <MyTextInput placeholder="City" name="city" />
              <MyTextInput placeholder="Venu" name="venue" />
              <Button
                positive
                floated="right"
                type="submit"
                content="Submit"
                disabled={isSubmitting || !dirty || !isValid}
                loading={loading}
              />
              <Button
                as={Link}
                to="/activities"
                floated="right"
                type="submit"
                content="Cancel"
              />
            </Form>
          )}}
      </Formik>
    </Segment>
  )
}
export default observer(ActivityForm)
