
import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";


export default function ActivityFilters (){

    return (

        <>
        <Menu vertical size='large' style={{width:'100%' , marginTop:25}}>
          <Header  icon='filter'  attached color='red' content='Activites'/>
          <Menu.Item  content='All Activites'/>
          <Menu.Item  content='I am traveling'/>
          <Menu.Item  content='I am wachting'/>
          <Menu.Item  content='I am drinking'/>
          <Menu.Item  content='I am wachting'/>
          <Menu.Item  content='..'/>
          

        </Menu>
        <Header/>
         <Calendar />

        </>
  
     
    )
}




