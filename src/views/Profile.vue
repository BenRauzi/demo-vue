<template>
  <div class="profile">
	<ProfileForm v-if="this.profile !== null" :profile="this.profile"/>
  </div>
</template>

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
