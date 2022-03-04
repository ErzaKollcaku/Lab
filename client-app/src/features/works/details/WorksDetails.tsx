import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';
import LoadingComonent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import WorksDetailedChat from './WorksDetailedChat';
import WorksDetailedInfo from './WorksDetailedInfo';
import WorksDetailedSideBar from './WorksDetailedSidebar';
import WorksDetailedHeader from './WorksDetaledHeader';



export default observer( function WorksDetails(){
  const {worksStore} = useStore();
  const {selectedWorks: works, loadWorks, loadingInitial} = worksStore;
  const {id} = useParams<{id : string}>();



  useEffect(() => {
    if(id) loadWorks(id);
  },[id, loadWorks]);

  if ( loadingInitial ||!works) return <LoadingComonent/> ;

    return(
     <Grid>
       <Grid.Column width={10} >
       <WorksDetailedHeader works={works} />
        <WorksDetailedInfo  works={works}/>
        <WorksDetailedChat  />

       </Grid.Column>

        <Grid.Column width={6}>
         <WorksDetailedSideBar/>
             
        </Grid.Column>
            </Grid>
    )
})