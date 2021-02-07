<template>
	<header>
		<v-toolbar
		color="deep-purple"
		dark
		>

			<v-app-bar-nav-icon class="hidden-sm-and-up" @click="drawer = true"></v-app-bar-nav-icon>

			<v-toolbar-title>{{ this.appName }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<span class="hidden-xs-only">
				<v-btn
				color="transparent"
				elevation="0"
				v-for="item in activeNavItems"
				:key="item.title"
				:to="item.path">
					{{ item.title }}
				</v-btn>
				<v-btn
					v-if="this.user.data"
					color="transparent"
					elevation="0"
					@click="handleSignOut()"
					>
					Logout
				</v-btn>
				<v-btn
					v-else
					color="transparent"
					elevation="0"
					to="/login"
					>
					Login
				</v-btn>

			</span>

		</v-toolbar>

		<v-navigation-drawer
		v-model="drawer"
		absolute
		temporary
		>
			<v-list
				nav
				dense
			>
				<v-list-item-group

				v-model="group"
				active-class="deep-purple--text text--accent-4">
					<v-list-item
						v-for="item in activeNavItems"
						:key="item.title"
						:to="item.path">
						<v-list-item-icon>
							<v-icon>{{ item.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-title> {{ item.title }}</v-list-item-title>
					</v-list-item>

					<v-list-item
						v-if="this.user.data"
						@click="handleSignOut()"
						>
						<v-list-item-icon>
							<v-icon>mdi-logout</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Logout</v-list-item-title>
					</v-list-item>
					<v-list-item
						v-else
						to="/login">
						<v-list-item-icon>
							<v-icon>mdi-login</v-icon>
						</v-list-item-icon>
						<v-list-item-title>Login</v-list-item-title>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>
	</header>
</template>

<style>
header {
	z-index: 7;
}
</style>
<script>
import { mapGetters } from 'vuex'
import { auth } from '../firebase'

export default {
	data: () => ({
		drawer: false,
		group: null,
		appName: 'Atom Demo',
		navItems: [
			{ title: 'Home', path: '/', icon: 'mdi-home', requireLogin: false },
			{ title: 'Profile', path: '/profile', icon: 'mdi-account', requireLogin: true }
		]
	}),
	methods: {
		async handleSignOut () {
			try {
				await auth.signOut()
				this.$router.replace({ name: 'Login' })
			} catch (err) {
				console.log(err)
			}
		}
	},
	computed: {
		...mapGetters({
			user: 'user'
		}),
		activeNavItems: (_this) => {
			return _this.navItems.filter(item => item.requireLogin ? _this.user.data : true)
		}
	}
}
</script>
