import React from 'react';
import firebase from 'firebase';

class PetList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            health: this.props.health,
            hunger: this.props.hunger
        };
        this.handleFeed = this.handleFeed.bind(this);
    }
    componentDidMount() {
        const dbRef = firebase.database().ref('petlist');
        let hunger = this.state.hunger;
        let health = this.state.health;
        let keyToUpdate = this.props.id;

        let decayHunger = window.setInterval(function() {
          if(hunger !==0) {
            hunger = hunger -1;;
          }
          if(hunger === 0) {
            window.clearInterval(decayHunger);
          }
          this.setState({
            hunger: hunger
          });
          firebase.database().ref(`petlist/${keyToUpdate}`).update({petstathunger: hunger});
        }.bind(this), 1000);

        let decayHealth = window.setInterval(function() {
            if(hunger < 1) {
                health = health -1;
              }
            if(health < 1) {
              window.clearInterval(decayHealth);
            }
            this.setState({
              health: health
            });
            firebase.database().ref(`petlist/${keyToUpdate}`).update({petstathealth: health});
          }.bind(this), 1000);
      }

      handleFeed(event) {
        const dbRef = firebase.database().ref('petlist');
        let keyToUpdate = this.props.id;
        let hunger = this.state.hunger;
        
        let feed = hunger +5;
        this.setState({
            hunger: feed
        });

        firebase.database().ref(`petlist/${keyToUpdate}`).update({petstathunger: feed});
      }

    render() {
        return (
            <div className='petMenuItem'>
                <h2>{this.props.name}</h2>
                <div className='petInfo'>
                    <div className='petView'>
                        <img src="/public/images/pet.png" alt="Image of a good pet."/>
                    </div>
                    <ul>
                        <li className='petMenuHealth'>HP: {this.state.health}%</li>
                        <li className='petMenuHunger'>EAT: {this.state.hunger}%</li>
                    </ul>
                    <button className='feedButton' onClick={this.handleFeed}>Feed</button>
                </div>
            </div>
        )
    }
}

export default PetList;