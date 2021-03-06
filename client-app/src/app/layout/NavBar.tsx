import { observer } from 'mobx-react-lite';
import React from 'react';
import {  NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';


export default observer(function NavBar (){
    const {userStore: {user, logout}} = useStore();
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                    Hello from App
                </Menu.Item>
                <Menu.Item as={NavLink} to='/workies' name='Workies' />
                <Menu.Item as={NavLink} to='/activities' name='Activities' />
                <Menu.Item as={NavLink} to='/errors' name='Errors' />
                <Menu.Item>
                    <Button as={NavLink} to='/createWorks' content='Create Works'/>
                </Menu.Item>
                <Menu.Item>
                    <Button as={NavLink} to='/createActivity' content='Create Activity'/>
                </Menu.Item>
                <Menu.Item position='right' >
                    <Image src={user?.image || '/assets/user.png' }  avatar spaced='right' />
                    <Dropdown pointing='top left'  text={user?.displayName} >
                        <Dropdown.Menu>
                       
                        
                       <Dropdown.Item  onClick={logout} text='Logout' icon='power' />
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Container>
        </Menu>
    )
})