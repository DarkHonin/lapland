<template lang="">
    <v-container grid-list-xs>
    <v-form>
        <div style='color: red' v-if='error != undefined'>
            {{error}}
        </div>
        <v-text-field
            v-model='user.email'
            name="email"
            label="Email"
            id="email_field"
        ></v-text-field>
        <v-text-field
            v-model='user.password'
            name="password"
            label="Enter your password"
            min="8"
            :append-icon="showPassword ? 'mdi-eye-off': 'mdi-eye' "
            @click:append="() => (showPassword = !showPassword)"
            value="Password"
            :type="showPassword ? 'text' : 'password'"
        ></v-text-field>
        <v-row>
            <v-btn @click='login' color="success">Login</v-btn>
            <v-spacer></v-spacer>
            <span class='mx-2'>
            or
            </span>
            <v-btn depressed small color="primary" >Register</v-btn>
        </v-row>
    </v-form>

    </v-container>
</template>
<script>

export default {
    data(){
        return {
            error: undefined,
            user: {
                email: "",
                password: "",
            },
            showPassword: false,
            loading: false
        }
    },
    methods: {
        login(){
            this.loading = true
            console.log(`Logging into account: ${this.user.email}`)
            this.$store.dispatch('login', this.user).then(() => this.$router.push('/'))
            .catch(error => {
                if(error.code == 'auth/wrong-password')
                    this.error = 'Incorrect email/password'        
            })
        }
    }
}
</script>
<style lang="">
    
</style>