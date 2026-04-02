import React, { createContext, useEffect, useState } from 'react';
// import { auth } from '../firebase/firebse.init';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';

export const AuthContext = createContext()

const AuthProvider = ({children}) => {

     const [user,setuser]=useState(null);
    const [loading,setloading] = useState(true);

//   i make sure the google functionality here 

 const googleProvider = new GoogleAuthProvider();

   const signinwithgoogle = () =>{
    setloading(true);
    return signInWithPopup(auth,googleProvider)
   }


  ///create new user for registration
      const createUser = (email,password)=>{
        setloading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // login functionality is here 

    const signin = (email,password) =>{
    setloading(true)
    return signInWithEmailAndPassword(auth,email,password)
  }

//   userlogout here 

   const logout = ()=>{
       setloading(true)
       return signOut(auth);
   }


   ///update userinfo name photourl

   const updateUser = (updateData)=>{
    return updateProfile(auth.currentUser,updateData)
   }

//    resetemail founctionality is here 

   const resetPassword = (email) => {
  setloading(true);
  return sendPasswordResetEmail(auth, email);
};



     useEffect(()=>{
 
        const unsubsCribe = onAuthStateChanged(auth,(CurrentUser)=>{
            setuser(CurrentUser);
            setloading(false)
        });
        return()=>{
            unsubsCribe();
        }

    },[])


    const authInfo ={
        user,
        setuser,
        loading,
        setloading,
        createUser,
        updateUser,
        signin,
        logout,
        signinwithgoogle,
        resetPassword
    }






    return <AuthContext.Provider value={authInfo}>
        {children}
    </AuthContext.Provider>
};

export default AuthProvider;