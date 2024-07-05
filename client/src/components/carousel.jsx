import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'
import { Container, grid } from '@mui/system';
import { Link } from 'react-router-dom';
import GridBoxes from './gridBoxes';
function CarouselAct(props)
{
    console.log(props.data)

    return (

        
        <div className={"slidercontainer"}>
            <div className='track'>
            
                {props.data.map(box => (
                    <div key={box._id} className="item">
                        <Link to={box.link ? box.link : box._id} className="icon-link">
                            
                            <div className={box.icon ? 'box': (box.image? 'imgbox' : 'gridbox')}>
                                {box.title}
                            </div>
                            
                        </Link>
                        
                    </div>
                ))}
            
            </div>
            
            
        </div>
    )
}

function Item(props)
{
    return (
        
            <h3>{props.item.title}</h3>
            
    )
}
export default CarouselAct;