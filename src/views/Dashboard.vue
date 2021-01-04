<template>
  <div class="home">
    <h1>User Dashboard</h1>

	<div class="force-profile-background" v-if="this.profile === undefined" >
		<div class="force-profile">
			<ProfileForm v-bind:profile="this.profile" />
		</div>
	</div>

  </div>
</template>

<style>
.force-profile-background {
	position: fixed;
	top: 0; left: 0; bottom: 0; right: 0;
	background-color: rgba(1,1,1, 0.8);
	z-index: 5;
}
.force-profile {
	position: fixed;
	margin: auto;
	height: 600px;
	top: 0; left: 0; bottom: 0; right: 0;
}
</style>
<script>
import { mapGetters } from 'vuex'
import { db } from '../firebase'
import ProfileForm from '../components/ProfileForm'

export default {
	data () {
		return {
			profile: null,
			unsubscribe: false
		}
	},
	components: {
		ProfileForm
	},
	beforeMount () {
		this.unsubscribe = db.collection('users').where('uid', '==', this.user.data.uid).onSnapshot(querySnapshot => {
			this.profile = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))[0]
		})
	},
	beforeDestroy () {
		this.unsubscribe()
	},
	computed: {
	// map `this.user` to `this.$store.getters.user`
		...mapGetters({
			user: 'user'
		})
	}
}
</script>
