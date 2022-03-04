import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { Works } from "../../../app/models/works";




interface Props {
    works :Works
}


export default function WorksListItem({works}: Props){
 
 return(
         <Segment.Group>
              <Segment>

                  <Item.Group>
                      <Item>
                          <Item.Image size="tiny" circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as ={Link} to={`/works/${works.id}`}>
                                {works.title}
                                 </Item.Header>

                                 
                        </Item.Content>

                      </Item>
                  </Item.Group>

              </Segment>

              <Segment>
                  <span>
                      <Icon name="clock" /> {  format (works.date!, 'dd MMM yyyy h:mm aa')}
                      
                  </span>
              </Segment>
                

                    <Segment clearing>

                     
                        
                        <span>{works.description}</span>
                        <Button
                           as = {Link}
                           to = {`/workies/${works.id}`}
                           color="red"
                           floated="right" 
                           content ='View'
                        
                        />
                    </Segment>


         </Segment.Group>
       
    )
}