import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComonent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import { categoryOptions } from '../../../app/common/options/categoryOptions';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Activity } from '../../../app/models/activity';



export default observer(function ActivityForm() {
    const history = useHistory();
    const { activityStore } = useStore();
    const { createActivity, updateActivity, loading, loadActivity, deleteActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();






    useEffect(() => {
        if (id) loadActivity(id);
    }, [id, loadActivity]);



    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required(' The actitvity title is required'),
        description: Yup.string().required(' The actitvity description is required'),
        category: Yup.string().required(),
        date: Yup.string().required('Date is required').nullable(),
        venue: Yup.string().required(),
        city: Yup.string().required(),
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))

    }, [id, loadActivity]);



    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()

            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`))
        }



    }
    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }

    if (loadingInitial) return <LoadingComonent content='Loading activity...' />
    return (
        <Segment clearing>
            <Header content='Activity Details' sub color='green' />
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
                        <MyTextInput name='title' placeholder='Name' />

                        <MyTextArea rows={3} placeholder='Description' name='description' />
                        <MySelectInput options={categoryOptions} placeholder='Category' name='category' />
                        <MyDateInput
                            showTimeSelect
                            timeCaption='time'
                            dateFormat='MMM d , yyy h:mm aa'
                            placeholderText='Date' name='date' />
                        <Header content=' Location Details' sub color='green' />
                        <MyTextInput placeholder='City' name='city' />
                        <MyTextInput placeholder='Venue' name='venue' />
                        <Button
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated='right' positive type='submit' content='Submit' />
                        <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                        <Button onClick={(event) => deleteActivity(event, activity.id)} as={Link} to='/activities' onSubmit={timeout(10000)} floated='right' type='button' content='Delete' />
                    </Form>
                )}


            </Formik>

        </Segment>
    )
})
