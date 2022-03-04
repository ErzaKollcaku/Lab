
import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import {Works} from "../../../app/models/works";
import { format } from 'date-fns';

const worksImageStyle = {
    filter: 'brightness(30%)'
};

const worksImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    works: Works
}

export default observer (function WorksDetailedHeader({works}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/categoryImages/${works.category}.jpg`} fluid style={worksImageStyle}/>
                <Segment style={worksImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={works.title}
                                    style={{color: 'white'}}
                                />
                                <p>{ format(works.date!,'dd MMM yyyy')}</p>
                              
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
               
                <Button as={Link} to='/workies' >Cancel attendance</Button>
               
                <Button as={Link} to={`/managWorkies/${works.id}`} color='red' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})