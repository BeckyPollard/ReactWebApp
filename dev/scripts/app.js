//█████ IMPORT █████
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import PetList from './PetList';
import PetGraveyard from './PetGraveyard';
import PetCreate from './PetCreate';
 
//█████ FIREBASE █████
const config = {
  apiKey: "AIzaSyAGlnvnkuhrBpb0qz6hOu5wWviBFUTCMeM",
  authDomain: "project5-reactwebapp.firebaseapp.com",
  databaseURL: "https://project5-reactwebapp.firebaseio.com",
  projectId: "project5-reactwebapp",
  storageBucket: "",
  messagingSenderId: "1050169051364"
};
firebase.initializeApp(config);

//█████ APP █████
class App extends React.Component {
  //█████ CONSTRUCTOR █████
  constructor(){
    super();
    this.state = {
      petname: '',
      petstateaten: 0,
      petstathealth: 100,
      petstathunger: 100,
      petlist: [],
      graveyardlist: [],
      togglePetlistClass: 'menu',
      toggleGraveyard: 'hidden',
      toggleCreate: 'hidden'
    };
    this.toggleGraveyard = this.toggleGraveyard.bind(this);
    this.toggleCreate = this.toggleCreate.bind(this);
  }
  //█████ MOUNT █████
  componentDidMount(){
    const dbRef = firebase.database().ref('petlist');
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      //console.log(`Data pulled from Firebase:`, data);

      //isolate key
      const petListArray = [];
      for(let entry in data) {
        data[entry].key = entry;
        petListArray.push(data[entry]);
      }

      //is the pet dead?
      const petsAlive = petListArray.filter((petlist) => {
        return petlist.petstathealth != 0;
      });
      const petsDead = petListArray.filter((petlist) => {
        return petlist.petstathealth === 0;
      });
      this.setState({
        petlist: petsAlive,
        graveyardlist: petsDead
      });
    });
  }
  //█████ TOGGLE GRAVEYARD █████
  toggleGraveyard () {
      this.setState ({
        toggleGraveyard: this.state.toggleGraveyard === 'hidden' ? 'menu' : 'hidden',
        togglePetlistClass: this.state.togglePetlistClass === 'menu' ? 'hidden' : 'menu'
      })
    }
    toggleCreate () {
      this.setState ({
        toggleCreate: this.state.toggleCreate === 'hidden' ? 'menu' : 'hidden'
      })
    }
  //█████ RENDER █████
    render() {
      return ( //TODO: put components in proper HTML markup
        <main>
          <div className={this.state.togglePetlistClass} id='petsAlive'>
            <button className='activeButton tabButton hideButton'>Pet Menu</button>
            <button className='tabButton hideButton' onClick={this.toggleGraveyard}>Graveyard</button>
            <button className='tabButton' onClick={this.toggleCreate}>Create New</button>
              <div className='menuContainer'>
                {this.state.petlist.map((petlistUniq, index) => {
                  return <PetList //ALIVE
                  eaten = {petlistUniq.petstateaten}
                  icon = {petlistUniq.peticon} 
                  image = {petlistUniq.petimage} 
                  key = {petlistUniq.key} 
                  id = {petlistUniq.key} 
                  name = {petlistUniq.petname} 
                  health = {petlistUniq.petstathealth}
                  hunger = {petlistUniq.petstathunger}
                  />
                })}
            </div>
          </div>

          <div className={this.state.toggleGraveyard} id='petsDead'>
            <button className='tabButton' onClick={this.toggleGraveyard}>Pet Menu</button>
            <button className='tabButton activeButton'>Graveyard</button>
            <div className='menuContainer'>
              {this.state.graveyardlist.map((petlistUniq, index) => {
                return <PetGraveyard //DEAD
                key = {petlistUniq.key} 
                name = {petlistUniq.petname} 
                health = {petlistUniq.petstathealth}
                />
              })}
            </div>
          </div>

          <div className={this.state.toggleCreate} id='petCreate'>
            <PetCreate />
            <button onClick={this.toggleCreate}>Done</button>
          </div>
        </main>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
