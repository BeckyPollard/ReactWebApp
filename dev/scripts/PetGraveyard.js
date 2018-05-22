import React from 'react';

class PetGraveyard extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            petViewingName: '',
            petViewingHunger: '',
            petViewingHealth: ''
        };
        this.onClick = this.onClick.bind(this);
    }
    onClick(event) {
        this.setState({
            petViewingName: 'this.state.petViewingName',
            //petViewingHunger: 'this.state.petViewingHunger',
            //petViewingHealth: 'this.state.petViewingHealth'
          });
        let petInfo = this.state.petViewingName;
        this.props.callbackFromParent(petInfo);
        console.log(petInfo);
    }

    render() {
        return (
            <div className='petMenuItem'>
                <h2>{this.props.name}</h2>
                <div className='petInfo'>
                    <div className='petView'>
                        <img src="/public/images/deadPet.png" alt="Image of a good pet."/>
                    </div>
                </div>
            </div>
        )
    }
}
export default PetGraveyard;