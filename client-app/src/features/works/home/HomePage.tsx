import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Container, Header,Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import LoginForm from "../../users/LoginForm";
import RegisterForm from "../../users/RegisterForm";

export default observer( function HomePage (){
   const {userStore ,modalStore} = useStore();
    return(
        <Segment interted textAlign="center" vertical className="masthead">
          <Container text>
             <Header as='h1' inverted>

             <Image size='massive'  src='/assets/logo.png' alt='logo' style={{marginBottom :12}}  />
             Hello from App
             </Header>
            {userStore.isLoggedIn ?(

              <>
              <Header as='h2' inverted content='Welcome ' /> 
              <Button as={Link} to='/activities' size='huge'   inverted>
              Go to workies and movies
           </Button>
              </>
              
            ): (
              <>
                 <Button onClick={() => modalStore.openModal(<LoginForm />)}  to='/login' size='huge'   inverted>
              Login!
           </Button>
             <Button onClick={() => modalStore.openModal(<RegisterForm/>)}  to='/login' size='huge'   inverted>
             Register
          </Button>
              
              
              </>
           


            ) }
          

          
          </Container>


        </Segment>
    )
});