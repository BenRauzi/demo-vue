<template>
	<v-form v-model="isValid" @submit.prevent="submit">
		<v-container justify="center" style="max-width:800px">
			<v-card style="padding: 30px">
				<v-row>
					<v-col cols="12"><h2>Profile</h2></v-col>
					<v-col><v-divider></v-divider></v-col>
				</v-row>
				<v-row>
					<v-col
						cols="12"
						sm="6">
						<label hidden for="firstName"><b>First Name</b></label>
						<v-text-field
						label="First Name"
						v-model="firstName"
						:rules="[v => !!v || 'First Name is required']"
						hide-details="auto"
						></v-text-field>
					</v-col>
					<v-col
						cols="12"
						sm="6">
						<label hidden for="lastName"><b>Last Name</b></label>
						<v-text-field
						label="Last Name"
						v-model="lastName"
						hide-details="auto"
						:rules="[v => !!v || 'Last Name is required']"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col
					cols="12">
						<label hidden for="dateOfBirth"><b>Date of Birth</b></label>
						<v-text-field
						label="Date of Birth"
						type="date"
						v-model="dateOfBirth"
						:rules="[v => !!v || 'Enter a valid date']"
						hide-details="auto"
						></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col>
						<label hidden for="mobile"><b>Mobile Number</b></label>
						<v-text-field
						label="Mobile Number"
						v-model="mobile"
						hide-details="auto"
						:rules="[v => !!v || 'Mobile number is required']"
						></v-text-field>
					</v-col>
				</v-row>

				<v-row justify="center"
					align="center">
					<v-radio-group row v-model="gender"
					:rules="[v => !!v || 'Gender is required']">
						<v-radio label="Male" value="Male"/>
						<v-radio label="Female" value="Female"/>
					</v-radio-group>
				</v-row>

				<v-row>
					<v-col
					cols="12"
					sm="6">
						<label hidden for="emergencyFirst"><b>Emergency Contact First Name</b></label>

						<v-text-field
						label="Emergency Contact First Name"
						v-model="emergencyContact.firstName"
						:rules="[v => !!v || 'Emergency contact first name is required']">
						hide-details="auto"
						></v-text-field>
					</v-col>
					<v-col
					cols="12"
					sm="6">
						<label hidden for="emergencyLast"><b>Emergency Contact Last Name</b></label>
						<v-text-field
						label="Emergency Contact Last Name"
						v-model="emergencyContact.lastName"
						:rules="[v => !!v || 'Emergency contact last name is required']"
						hide-details="auto"
						></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<label hidden for="emergencyMobile"><b>Emergency Contact Mobile Number</b></label>
						<v-text-field
						label="Emergency Contact Mobile Number"
						v-model="emergencyContact.mobile"
						:rules="[v => !!v || 'Emergency contact mobile is required']"
						hide-details="auto"
						></v-text-field>
					</v-col>
				</v-row>

				<v-row>
					<v-col cols="12">
						<v-btn :disabled="!isValid" color="deep-purple" dark @click="update()">Update Profile </v-btn>
					</v-col>
				</v-row>
			</v-card>
		</v-container>
	</v-form>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '../firebase'
export default {
	name: 'ProfileForm',
	props: {
		profile: Object
	},
	data () {
		const { firstName, lastName, dateOfBirth, gender, mobile, emergencyContact, id } = this.$props.profile || {}
		return {
			id: id,
			firstName: firstName,
			lastName: lastName,
			dateOfBirth: dateOfBirth,
			gender,
			mobile: mobile,
			emergencyContact: emergencyContact || {},
			isValid: false,
			textRules: [
				v => !!v || 'Name is required',
				v => (v && v.length > 2) || 'Must be greater than 2 characters'
			]
		}
	},
	methods: {
		async update () {
			const userProfile = {
				uid: this.user.data.uid,
				email: this.user.data.email,
				firstName: this.firstName,
				lastName: this.lastName,
				dateOfBirth: this.dateOfBirth,
				gender: this.gender,
				mobile: this.mobile,
				emergencyContact: this.emergencyContact,
				updatedAt: new Date().toISOString()
			}
			if (this.id) {
				await db.collection('users').doc(this.id).set(userProfile, { merge: true })
			} else {
				await db.collection('users').add(userProfile)
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
