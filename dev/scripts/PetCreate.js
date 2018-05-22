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
            petstathunger: 100
        };
        const dbRef = firebase.database().ref('petlist');
        dbRef.push(name);
        this.setState({
          newPetName: ''
        });
      }
    render() {    
        return (
            <form className='petCreate menu' onSubmit={this.handleSubmit}>
                <h2>Name pet</h2>
                <input
                    type="text" 
                    name="name" 
                    placeholder="Pet name" 
                    onChange={event => this.setState({newPetName: event.target.value})} 
                    value = {this.state.newPetName} 
                    required
                />
                <input type="submit" value="Create"/>
            </form>
        )
    }
}
export default PetCreate;