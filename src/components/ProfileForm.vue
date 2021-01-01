<template>
    <div class="profile-form">
		Test
    </div>
</template>

<style lang="sass">

</style>

<script>
export default {
	name: 'ProfileForm',
	props: {
		profile: String
	},
	methods: {
		async setProfile () {
			console.log(1)
		}
	}
}
</script>
