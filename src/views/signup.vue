<template>
    <div class="container">
        <div class="row">
            <div class="col-6">
                <img src="http://localhost:8080/imagenes/instagram.PNG" >
            </div>
            <div class="col-6">
                
                <div class="myform form ">
                  <div class="logo mb-3">
                    <div class="col-md-12 text-center">
                      <h1>Desafio Gram</h1>
                      <h4>Registrate para que Veas el Clon de Instagram</h4>
                    </div>
                  </div>

                    <div class="form-group">
                      <input type="email"   class="form-control" placeholder="Ingrese Mail" v-model="mail">
                        <div v-if="ver_error_mail" class="alert alert-danger" role="alert">
                            Ingrese su Mail
                        </div>
                        <div v-if="ver_error_mail2" class="alert alert-danger" role="alert">
                            Ingrese Mail correctamente
                        </div>
                    </div>
                    
                    <div class="form-group">
                      <input type="input"   class="form-control" placeholder="Ingrese Nombre y Apellido" v-model="nombre">
                        <div v-if="ver_error_nombre" class="alert alert-danger" role="alert">
                            Ingrese su nombre
                        </div>
                    </div>
                    
                    <div class="form-group">
                      <input type="input"   class="form-control" placeholder="Ingrese Usuario" v-model="usser">
                        <div v-if="ver_error_usser" class="alert alert-danger" role="alert">
                            Ingrese su Usuario
                        </div>
                        <div v-if="ver_error_usser2" class="alert alert-danger" role="alert">
                            El nombre del usuario debe ser alfanúmerico y tener entre 3 y 30 carácteres. 
                        </div>
                    </div>

                    <div class="form-group">
                      <input type="input"   class="form-control" placeholder="Ingrese Descripción" v-model="desc">
                        <div v-if="ver_error_desc" class="alert alert-danger" role="alert">
                            Ingrese una breve Descripción.
                        </div>
                    </div>
                    
                    <div class="form-group">
                      <input type="password"   class="form-control"  placeholder="Ingrese Password" v-model="pass">
                        <div v-if="ver_error_pass" class="alert alert-danger" role="alert">
                            ingrese Contraseña
                        </div>
                        <div v-if="ver_error_pass2" class="alert alert-danger" role="alert">
                            La contraseña debe tener entre 6 y 200 carácteres
                        </div>
                    </div>

                    <div class="col-md-12 text-center ">
                      <button type="button" @click="signup()" class=" btn btn-block mybtn btn-primary tx-tfm">Sign up</button>
                    </div>
                    
                    <div class="form-group">
                      <p class="text-center">Ya Tiene Cuenta ? <a  href="javascript:" @click="login()" id="signup">Login</a></p>
                    </div>
          
                        
                </div>

            </div>

            <div class="alert alert-success" role="alert" v-if="ver_alert">
                Registrado Correctamente
            </div>

        </div>
    </div>
</template>


<script>
  import axios from 'axios';
  export default {
    name: 'SigUp',

    data() {
      return {
        usser: '',
        pass: '',
        mail:'',
        nombre: '',
        desc: '',
        ver_alert: false,

        ver_error_mail: false,
        ver_error_nombre: false,
        ver_error_usser: false,
        ver_error_desc: false,
        ver_error_pass: false,

        ver_error_usser2: false,
        ver_error_mail2: false,
        ver_error_pass2: false,

        axiosInstance: {},

        api_signup: 'http://localhost:3000/api/usuarios/signup',

      }
    },
    created: function () {

        console.log('inicia: SigUp');

        this.axiosInstance = axios.create({
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });

    },
    updated: function () {
        console.log('actualiza SigUp');
    },
    watch: {
    },
    computed: {
    },
    methods:{
        login: function(){
            this.$router.push({ name: 'login' });
        },

        validar_mail: function(email){

            var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

            if (emailRegex.test(email)) {
                return true;
            }else{
                return false;
            }
        },

        signup: function(){

            var validar = 0;

            if(this.nombre == ''){
                this.ver_error_nombre = true;
                validar++;
            }
            if(this.usser == ''){
                this.ver_error_usser = true;
                validar++;
            }else{
                if(this.usser.length < 3 || this.usser.length>90){
                    this.ver_error_usser2 = true;
                    validar++;
                }else{
                    if(this.validar_alfa_num(this.usser) == false){
                        this.ver_error_usser2 = true;
                        validar++;
                    }
                }
            }

            if(this.mail == ''){
                this.ver_error_mail = true;
                validar++;
            }else{
                if(this.validar_mail(this.mail) == false ){
                    this.ver_error_mail2 = true;
                    validar ++;
                }
            }


            if(this.desc == ''){
                this.ver_error_desc = true;
                validar++;
            }
            if(this.pass == ''){
                this.ver_error_pass = true;
                validar++;
            }else{
                if(this.pass.length < 6 || this.pass.length>200){
                    this.ver_error_pass2 = true;
                    validar++;
                }
            }

            if(validar == 0){
                
                    let dataUsuario = {
                        "username": this.usser,
                        "password": this.pass,
                        "email": this.mail,
                        "nombre": this.nombre,
                        "bio": this.desc,
                    };

                    try {

                        this.axiosInstance.post(this.api_signup, dataUsuario).then(response => (
                            console.log(response),
                            this.ver_alert = true,
                            setTimeout(() => {
                                localStorage.token = response.data.token;
                                this.ver_alert = false;
                                this.login();
                            }, 5000)
                        ).catch(error => {
                                console.log(error)
                            }
                        ));
                    } catch (error) {
                        console.log(error);
                    }

            }else{
                setTimeout(() => {
                    this.ver_error_nombre = false;
                    this.ver_error_usser = false;
                    this.ver_error_mail = false;
                    this.ver_error_desc = false;
                    this.ver_error_pass = false;

                    this.ver_error_mail2 = false;
                    this.ver_error_pass2 = false;
                    this.ver_error_usser2 = false;
                }, 5000)
            }

            
        },

        validar_alfa_num: function(campo) {
            var regex = /^[a-zA-Z0-9 ]+$/;
            return regex.test(campo);
        }


    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>