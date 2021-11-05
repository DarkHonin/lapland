<template lang="">
    <v-container grid-list-xs>
    <v-form>
        <div style='color: red' v-if='error != undefined'>
            {{error}}
        </div>
        <v-text-field
            name="username"
            label="Username"
            id="username_input"
            v-model='user.username'
        ></v-text-field>
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
            hint="At least 8 characters"
            min="8"
            :append-icon="showPassword ? 'mdi-eye-off': 'mdi-eye' "
            @click:append="() => (showPassword = !showPassword)"
            value="Password"
            :type="showPassword ? 'text' : 'password'"
        ></v-text-field>
        <v-row>
            <v-btn @click='register' color="success">Register</v-btn>
            <v-spacer></v-spacer>
            <span class='mx-2'>
            or
            </span>
            <v-btn depressed small color="primary" >Login</v-btn>
        </v-row>
    </v-form>
    <v-snackbar
      v-model="snackbar"
    >
      Registering {{user.email}}
    </v-snackbar>

    </v-container>
</template>
<script>

export default {
    data(){
        return {
            error: undefined,
            snackbar: false,
            user: {
                username: "",
                email: "",
                password: "",
            },
            showPassword: false,
            loading: false
        }
    },
    methods: {
        register(){
            this.snackbar = true
            console.log(`Registering user ${this.user.email}`)
            this.$store.dispatch('register', this.user).then(() => this.snackbar = false)
            .catch(error => {
                if(error.code == 'auth/email-already-in-use')
                    this.error = 'Email already in use'
            });
        }
    },
}
</script>
<style lang="">
    
</style>