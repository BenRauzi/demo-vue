<template>
	<v-container>
		<v-row justify="center" align="center">
			<v-col>
				<LoginForm/>
			</v-col>
		</v-row>
	</v-container>
</template>

<script>

import LoginForm from '../components/LoginForm'

export default {
	name: 'Login',
	components: {
		LoginForm
	}
}
</script>
