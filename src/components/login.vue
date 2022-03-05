<template>
  <div class="hello">
    <!--<h1>{{ msg }}</h1>-->
    <body>
      <div class="container">
          <div class="row">
            <div class="col-md-5 mx-auto">
              <div >
                <div class="myform form ">
                  <div class="logo mb-3">
                    <div class="col-md-12 text-center">
                      <h1>Desafio Gram</h1>
                    </div>
                  </div>

                    <div class="form-group">
                      <input type="email"   class="form-control" placeholder="Enter email" v-model="mail">
                    </div>
                    <div class="form-group">
                      <input type="password"   class="form-control"  placeholder="Enter Password" v-model="pass">
                    </div>

                    <div class="col-md-12 text-center ">
                      <button type="button" @click="loguear()" class=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                    </div>
                    
                    <div class="form-group">
                      <p class="text-center">No Tiene Cuenta ? <a  href="javascript:" @click="signup()" id="signup">Sign up</a></p>
                    </div>
          
                        
                </div>
              </div>

            </div>
        </div>
      </div>   
    </body>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Login',
    props: {
      msg: String
    },
    data() {
      return {
        mail:'',
        pass: '',

        axiosInstance: {},

        api_login: 'http://localhost:3000/api/usuarios/login',

      }
    },
    created: function () {

        console.log('inicia: login');

        localStorage.token = '';

        this.axiosInstance = axios.create({
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        

        console.log('token '+localStorage.token);

    },
    updated: function () {
        console.log('actualiza login');
    },
    watch: {
    },
    computed: {
    },
    methods:{
      signup: function(){
        this.$router.push({ name: 'signup' });
      },

      validar_mail: function(email){

          var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

          if (emailRegex.test(email)) {
              return true;
          }else{
              return false;
          }
      },

      loguear: function(){
        
        var validar = 0;
        if(this.validar_mail(this.mail) == false ){
            validar ++;
            //alert("La dirección de email " + this.mail + " es incorrecta.");
        }

        if(this.mail == ''){
            validar++;
        }
        if(this.pass == ''){
            validar++;
        }


        if(validar == 0){
            console.log('continuar');
            
                let dataLogin = {
                    "email": this.mail,
                    "password": this.pass,
                };

                console.log(dataLogin);

                try {

                  
                   this.axiosInstance.post(this.api_login, dataLogin).then(response => (
                        this.$router.push({ name: 'explore' }),
                        localStorage.token = response.data.token
                    ));
                   
                } catch (error) {
                    console.log(error);
                }

        }else{
            alert('Llene todos los datos para Continuar');
        }

      },
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
