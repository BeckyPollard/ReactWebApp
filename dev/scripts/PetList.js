import React from 'react';

const PetList = (props) => {
    return (
            <ul className='petMenuItem'>
                <li>{props.icon}</li>
                <li><img src="/dev/images/pet.svg" alt="" width="50" height="50"/></li>
                <li>{props.name}</li>
                <li>{props.health}</li>
                <li>{props.hunger}</li>
            </ul>
    )
}

export default PetList;