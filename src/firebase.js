import store from './store'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
	apiKey: 'AIzaSyB6oChIDU-Cx42RxyVzHHzlKvm1t1wF9YQ',
	authDomain: 'atomtiming-demo.firebaseapp.com',
	projectId: 'atomtiming-demo',
	storageBucket: 'atomtiming-demo.appspot.com',
	messagingSenderId: '555130426466',
	appId: '1:555130426466:web:2370f7e8b9496a8aa76d3b',
	measurementId: 'G-3BV0D2PJ2X'
}

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(user => {
	store.dispatch('fetchUser', user)
})

export const db = firebase.firestore()
export const auth = firebase.auth()
