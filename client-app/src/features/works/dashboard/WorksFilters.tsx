
import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";


export default function WorksFilters (){

    return (

        <>
        <Menu vertical size='large' style={{width:'100%' , marginTop:25}}>
          <Header  icon='filter'  attached color='red' content='Works'/>
          <Menu.Item  content='All workies'/>
          <Menu.Item  content='I am programer'/>
          <Menu.Item  content='I am sportist'/>
          <Menu.Item  content='I am doctor'/>
          <Menu.Item  content='I am nurse'/>
          <Menu.Item  content='..'/>
          

        </Menu>
        <Header/>
         <Calendar />

        </>
  
     
    )
}




