import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import LoadingComonent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import {v4 as uuid } from 'uuid';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import MyTextArea from '../../../app/common/form/MyTextArea';
import MyTextInput from '../../../app/common/form/MyTextInput';
import MySelectInput from '../../../app/common/form/MySelectInput';
import MyDateInput from '../../../app/common/form/MyDateInput';
import { Works } from '../../../app/models/works';
import { categoryWorkies } from '../../../app/common/options/categoryWorkies';



export default observer(function WorksForm() {
    const history = useHistory();
    const { worksStore } = useStore();
    const {  createWorks, updateWorks, loading , loadWorks,deleteWorks,loadingInitial }= worksStore;
    const {id} = useParams<{id: string}>();

 
    
  
  
  
    useEffect(() => {
      if(id) loadWorks(id);
    },[id, loadWorks]);



    const [works, setWorks] = useState<Works>({
        id:'',
        title:'',
        category:'',
        description:'',
        date:null,
        city:''
        
     });

     const validationSchema = Yup.object({
         title : Yup.string().required(' The actitvity title is required'),
         description : Yup.string().required(' The actitvity description is required'),
         category : Yup.string().required(),
         date : Yup.string().required('Date is required').nullable(),
        
         city : Yup.string().required(),
     })

   useEffect(() =>{
        if(id) loadWorks(id).then(works => setWorks(works!))
   
   },[id, loadWorks]);


  
 function handleFormSubmit(works : Works) {
       if( works.id.length=== 0 ){
           let newWorks ={ 
               ...works,
               id: uuid()

           };
           createWorks(newWorks).then(() =>history.push(`/workies/${newWorks.id}`))
       }else {
        updateWorks(works).then(()=>history.push(`/workies/${works.id}`))
       }

        
       
    }
     function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }
  
    if(loadingInitial) return <LoadingComonent content='Loading works...'/>
    return (
        <Segment clearing>
           <Header content='Works Details' sub color='green' />
           <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={works}
                onSubmit={values => handleFormSubmit(values)} >
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off' >
               <MyTextInput name='title'  placeholder='Name'/>
              
               <MyTextArea rows={3} placeholder='Description'  name='description' />
               <MySelectInput options={categoryWorkies} placeholder='Category'  name='category'  />
               <MyDateInput 
               showTimeSelect 
               timeCaption='time'
               dateFormat='MMM d , yyy h:mm aa'
                placeholderText='Date'  name='date'  />
           <Header content=' Location Details' sub color='green' />
               <MyTextInput placeholder='City'  name='city'  />
              
               <Button 
               disabled = {isSubmitting || !dirty ||  !isValid}
               loading={loading} floated='right' positive type='submit' content='Submit' />
               <Button as={Link} to='/workies' floated='right' type='button' content='Cancel' />
               <Button onClick={(event)=>deleteWorks(event,works.id)}  as={Link} to='/workies' onSubmit={timeout(10000)} floated='right' type='button' content='Delete' />
           </Form>
            )} 
             
            
           </Formik>
           
        </Segment>
    )
})
