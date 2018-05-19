import React from 'react';
import firebase from 'firebase';

class PetCreate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            newPetName: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      handleSubmit(event) {
        event.preventDefault();
        const name = {
            petname: this.state.newPetName,
            petstathealth: 100,
            petstathunger: 100,
            peticon: '',
            petimage: ''
        };
        const dbRef = firebase.database().ref('petlist');
        dbRef.push(name);
        this.setState({
          newPetName: ''
        });

      }
    render() {    
        return (
            <form action="" onSubmit={this.handleSubmit}>
                <p>Name your new friend:</p>
                <input
                    type="text" 
                    name="name" 
                    placeholder="Pet name" 
                    onChange={event => this.setState({newPetName: event.target.value})} 
                    value = {this.state.newPetName}
                />
                {console.log(this.state.newPetName)}
                <input type="submit" value="Create Pet"/>
            </form>
        )
    }
}

export default PetCreate;