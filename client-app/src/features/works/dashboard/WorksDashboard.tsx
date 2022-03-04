import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import LoadingComonent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import WorksFilters from './WorksFilters';

import WorksList from './WorksList';


export default observer(function WorksDashboard(){


        const {worksStore} = useStore();
        const{loadWorkies , worksRegistry} = worksStore;
       


useEffect(() => {
    if(worksRegistry.size <=1 ) loadWorkies();
}, [worksRegistry.size,loadWorkies])

if (worksStore.loadingInitial) return <LoadingComonent content='Loading workies...' />
    return(
        <Grid>
            <Grid.Column width='10'>
      <WorksList />
            </Grid.Column>
            <Grid.Column width='6'>
              <WorksFilters />
            </Grid.Column>
        </Grid>
    )
})