//█████ IMPORT █████
import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import PetList from './PetList';
import PetCreate from './PetCreate';
 
//█████ FIREBASE █████
var config = {
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
      peticon: '',
      petimage: '',
      petname: '',
      petstathealth: 100,
      petstathunger: 100,
      petlist: [],
      graveyardlist: [],
    };
    //this.handleChange = this.handleChange.bind(this);
  }
  //█████ MOUNT █████
  componentDidMount(){
    const dbRef = firebase.database().ref('petlist');
    dbRef.on('value', (snapshot) => {
      const data = snapshot.val();
      console.log(`Data pulled from Firebase:`, data);

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
  //█████ RENDER █████
    render() {
      return ( //TODO: put components in proper HTML markup
        <main>
          <div className='petMenu'>
            {this.state.petlist.map((petlistUniq, index) => {
              return <PetList //ALIVE SELECT
              key = {petlistUniq.key} 
              name = {petlistUniq.petname} 
              icon = {petlistUniq.peticon} 
              image = {petlistUniq.petimage} 
              hunger = {petlistUniq.petstathunger} 
              health = {petlistUniq.petstathealth}
              />
            })}
          </div>
          <div className='petGraveyardView'>
            {this.state.graveyardlist.map((petlistUniq, index) => {
              return <PetList //DEAD
              key = {petlistUniq.key} 
              name = {petlistUniq.petname} 
              icon = {petlistUniq.peticon} 
              image = {petlistUniq.petimage} 
              hunger = {petlistUniq.petstathunger} 
              health = {petlistUniq.petstathealth}
              />
            })}
            <PetCreate />
          </div>
        </main>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
