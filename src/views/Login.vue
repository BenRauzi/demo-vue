<template>
    <div>
		<div v-if="signUp">
			<h3>Create a new account</h3>
			<a href='#' @click="signUp = false">Already have an account? Sign in</a>
		</div>
		<div v-else>
			<h3>Sign in with Email</h3>
			<a href='#' @click="signUp = true">Don't have an account? Sign up now</a>
		</div>

        <label for="email"><b>Email</b></label>
        <input v-model="email" type="email" placeholder="Enter Email" name="email" required>

        <label for="password"><b>Password</b></label>
        <input v-model="password" type="password" placeholder="Enter Password" name="password" required>

        <button type="submit" @click="handleAuthRequest()">
			{{ signUp ? 'Sign Up' : 'Login'}}
		</button>

		<button type="submit" @click="handleSocialAuthRequest()">
			Sign in with Google
		</button>

		<div>
			{{ user.data }} <br/>
			{{ user.data ? "User" : "No User" }} <br/>
			{{ isLoading ? 'Loading ' : undefined}}
			{{ errorMessage ? errorMessage: undefined}}
		</div>
	</div>
</template>

<script>
import firebase from 'firebase/app'
import { auth } from '../firebase'

import { mapGetters } from 'vuex'

export default {
	name: 'Login',
	components: {
	},
	data () {
		return {
			signUp: false, // Determines whether the user is signing up or is a returning user
			email: '',
			password: '',
			auth,
			isLoading: false,
			errorMessage: ''
		}
	},
	methods: {
		async handleAuthRequest () {
			this.isLoading = true
			const { email, password } = this

			try {
				if (this.signUp) {
					await auth.createUserWithEmailAndPassword(email, password)
				} else {
					await auth.signInWithEmailAndPassword(email, password)
				}
				this.$router.replace({ name: 'About' })
			} catch (err) {
				this.errorMessage = err.message
			} finally {
				this.isLoading = false
			}
		},
		async handleSocialAuthRequest () {
			const provider = new firebase.auth.GoogleAuthProvider()
			try {
				await auth.signInWithPopup(provider)
				this.$router.replace({ name: 'About' })
			} catch (err) {
				console.log(err)
				this.errorMessage = err.message
			}
		}
	},
	computed: {
	// map `this.user` to `this.$store.getters.user`
		...mapGetters({
			user: 'user'
		})
	}
}
</script>
