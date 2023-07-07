// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app'
import{
    getFirestore, collection, onSnapshot, 
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp, 
    getDoc, updateDoc
}from 'firebase/firestore'

import{
  getAuth, createUserWithEmailAndPassword, signOut, 
  signInWithEmailAndPassword, onAuthStateChanged

} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDQNkvGcZf1qIekslDiPl8RILdGOWz6cOo",
    authDomain: "dsvr-2d912.firebaseapp.com",
    databaseURL: "https://dsvr-2d912-default-rtdb.firebaseio.com",
    projectId: "dsvr-2d912",
    storageBucket: "dsvr-2d912.appspot.com",
    messagingSenderId: "83532075810",
    appId: "1:83532075810:web:bf203c20691098bbe14b7b",
    measurementId: "G-W6EMH8BE5B"
  };

initializeApp(firebaseConfig)

const db = getFirestore()
const auth = getAuth() 

//refrence 
const colRef =collection(db,'books')

//queries
const q = query(colRef, orderBy('createdAt'))

// adding documents

onSnapshot(q, (snapshot) => {
  let books =[]
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id  })
  })
  console.log(books)
})

const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp()

  })
  .then(() => {
    addBookForm.reset()


  })

})

const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db,'books', deleteBookForm.id.value)

  deleteDoc(docRef)
  .then(() => {
    deleteBookForm.reset()
  })
})
// get a sinfle document

const docRef = doc(db, 'books', 'fNtdJqLpkTrvNMcJgt2W')

getDoc(docRef)
 .then((doc) => {
  console.log(doc.data(), doc.id)
})

onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id)
})

//updating a document

const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const docRef = doc(db,'books', updateForm.id.value)

  updateDoc(docRef, {
    title: 'updated title'
  })
  .then(() => {
    updateForm.reset()
  })

})

 const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = signupForm.email.value
  const password = signupForm.password.value

  createUserWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    console.log('user created:', cred.user)
    signupForm.reset()
  })
  .catch((err) =>{
    console.log(err.message)
  })
})
 

const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
    .then(() =>{
      //console.log('the user signed out')
    })
    .catch((err) => {
      console.log(err.message)
    })


})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value


  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      //console.log('the user logged in:', cred.user)
    })
    .catch((err) => {
      console.log(err.message)
    })

})

onAuthStateChanged(auth, (user) => {
  console.log('user status changed:', user)

})