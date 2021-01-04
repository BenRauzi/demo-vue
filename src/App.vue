<template>
	<v-app id="app">
		<v-main>
			<Header/>
			<router-view/>
		</v-main>
    </v-app>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}

body {
	padding: 0;
	overflow: hidden !important;
	scrollbar-width: none;
	-ms-overflow-style: none;
}

.v-btn--disabled {
	background-color: grey !important
}
</style>

<script>
import Header from '@/components/Header.vue'
export default {
	name: 'App',
	components: {
		Header
	}
}
</script>
