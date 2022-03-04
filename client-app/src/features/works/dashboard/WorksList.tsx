import { observer } from 'mobx-react-lite';
import React, { Fragment } from 'react';
import { Header } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import WorksListItem from './WorksListItem';


export default observer(function WorksList(){
    const {worksStore} = useStore();
    const {groupedWorkies} = worksStore

    return(

        <>
             {groupedWorkies.map(([group ,works]) =>(
                   <Fragment key ={group}>
                    <Header sub color='black'>
                           {group}
                    </Header>
          
          {works.map(works => (
            <WorksListItem key={works.id} works={works} />
             ))}
         
                   </Fragment>    
              ))}
        </>

    )
})
