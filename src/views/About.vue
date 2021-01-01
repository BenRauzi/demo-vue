<template>
  <div class="about">
    <h1>This is an about page</h1>
	<button @click="handleSignOut()">Logout</button>

	{{ this.user.data ? this.user.data.email : undefined }}

	<ProfileForm v-if="!this.profile"/>
	<button @click="getInfo()">Get</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { auth, db } from '../firebase'
import ProfileForm from '../components/ProfileForm'

export default {
	data () {
		return {
			profile: null
		}
	},
	components: {
		ProfileForm
	},
	async beforeMount () {
		const profileInfo = await this.getInfo()
		this.profile = profileInfo
	},
	methods: {
		async handleSignOut () {
			try {
				await auth.signOut()
				this.$router.replace({ name: 'Login' })
			} catch (err) {
				console.log(err)
			}
		},
		getInfo () {
			return new Promise((resolve, reject) => {
				try {
					const userRef = db.collection('users')

					const unsubscribe = userRef.where('email', '==', this.user.data.email).onSnapshot(querySnapshot => {
						const items = querySnapshot.docs.map(doc => doc.data())
						resolve(items[0])
						unsubscribe()
					})
				} catch (err) {
					reject(err)
				}
			})
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
