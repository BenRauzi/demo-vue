<template>
    <v-form v-model="isValid">
			<v-container style="max-width: 450px">
				<v-card style="padding: 30px">
					<v-row justify="center">
						<v-col cols="12">
							<h3>{{ signUp ? 'Create a new account' : 'Sign in with Email'}}</h3>
						</v-col>
						<v-col><v-divider/></v-col>
					</v-row>
					<v-row>
						<v-col>
						<label hidden for="email"><b>Email</b></label>
						<v-text-field
						label="Email"
						v-model="email"
						:rules="[v => v === undefined || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid']"
						hide-details="auto"
						></v-text-field>
						</v-col>
					</v-row>
					<v-row>
						<v-col>
						<label hidden for="password"><b>Password</b></label>
						<v-text-field
						label="Password"
						type="password"
						v-model="password"
						:rules="[ v => !!v || 'Password Required']"
						hide-details="auto"
						></v-text-field>
						</v-col>

					</v-row>

					<v-row>
						<v-col cols="12">
							<v-btn color="deep-purple" :disabled="!isValid" dark @click="handleAuthRequest()">{{ signUp ? 'Sign Up' : 'Login'}}</v-btn>
						</v-col>
						<v-col cols="12">
							<a href='#' @click="signUp = !signUp">{{ signUp ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up now'}}</a>
						</v-col>
					</v-row>

					<v-row justify="center">
						<v-col>
							<v-label>OR</v-label>
						</v-col>
					</v-row>

					<v-row >
						<v-col cols="3"/>
						<v-col cols="6">
							<v-img
							:src="require('../assets/google-sign-in-btn.png')"
							style="cursor: pointer"
							@click="handleSocialAuthRequest()"
							contain
							/>
						</v-col>
					</v-row>
				</v-card>
			</v-container>
		</v-form>
</template>

<script>

import firebase from 'firebase/app'
import { auth } from '../firebase'

import { mapGetters } from 'vuex'

export default {
	name: 'LoginForm',
	components: {
	},
	data () {
		return {
			signUp: false, // Determines whether the user is signing up or is a returning user
			email: '',
			password: '',
			auth,
			isLoading: false,
			errorMessage: '',
			isValid: false
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
				this.$router.replace({ name: 'Dashboard' })
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
				this.$router.replace({ name: 'Dashboard' })
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
