import {getAuth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut} from 'firebase/auth'

import {doc, setDoc, getDoc} from 'firebase/firestore'
import {db } from '../../db/firebase' 
import { User } from '../../db/models/userModel'

export default {
    state: {
        user: {},
    },
    getters: {
        getUser: (s) => s.user,
        isAdmin: (s) => s.user.isAdmin != undefined && s.user.isAdmin
    },
    actions: {
        register({commit},{username, email, password}){
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password).then(rauth => {
                return updateProfile(rauth.user, {displayName: username})
            }).then(async () => {
                const user = new User({isAdmin: false, ...auth.currentUser})
                await setDoc(doc(db, 'users', auth.currentUser.uid), user)
                return user
            }).then((user) => {
                commit('updateUser', user)
            })

        },

        async refreshUser({commit, state}, fireUser){
            if(fireUser == null)
                return commit('updateUser', {});
            const userDoc = await getDoc(doc(db, 'users', fireUser.uid))
            commit('updateUser', userDoc.data());
            return state.user
        },

        async login({commit}, {email, password}){
            const auth = getAuth(); 
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log(`login complete`, response)
            commit('updateUser', response.user)

        },

        async logout({commit}){
            console.log('Signing out')
            signOut(getAuth());
            commit('updateUser', {})
        },
    },
    mutations : {
        updateUserMessage(s, message){
            s.userMessage = message
        },
        updateUser(s, user){
            s.user = new User({...user})
        }
    }
}