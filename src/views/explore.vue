<template>
    <div class="container">
        <div class="row">
            <div class="myform form ">
                <div class="logo mb-3">
                    <div class="col-md-12 text-center">
                        <h1>Descubrir usuarios</h1>
                    </div>
                </div>    
                <div class="row">
                    <template v-for="(datos) in array_usuarios">

                        <div class="card" style="width: 18rem;">
     
                            <div class="card-body">

                                <div id="circulo" v-bind:style="'background: '+colorRGB()+';'" ></div>

                                <p class="card-text">{{datos.username}}</p>
                                <button type="button" @click="ver_perfil(datos.id)"  class=" btn btn-block mybtn btn-primary tx-tfm">Ver Perfil</button>
                            </div>
                            </div>
                    </template>
                </div>  
            </div>

            <div class="myform form ">
                <div class="logo mb-3">
                    <div class="col-md-12 text-center">
                        <h1>Explorar</h1>
                    </div>
                </div>    
                <div class="row">
                    <template v-for="datos in array_explore">
                        <div class="col-4">
                            <img style="width:70%" v-bind:src="'http://localhost:3000'+datos.url">
                        </div>
                    </template>
                </div>  
            </div>
        </div>
    </div>
</template>

<style >

#circulo {
    margin-left: 33%;
	width: 5rem;
	height: 5rem;
	border-radius: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
}

</style>

<script>
  import axios from 'axios';
  export default {
    name: 'explore',

    data() {
      return {
       
        axiosInstance: {},

        array_usuarios: {},
        array_explore: {},

        ver_usuarios: false,

        api_explore: 'http://localhost:3000/api/usuarios/explore',

        api_post_explore: 'http://localhost:3000/api/posts/explore'

      }
    },
    created: function () {

        console.log('inicia: explore');

        console.log('token '+localStorage.token);

        this.axiosInstance = axios.create({
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Authorization': 'Bearer ' + localStorage.token
            }
        });

        this.cargar_usuarios();

        this.cargar_post();

    },
    updated: function () {
        console.log('actualiza explore');
    },
    watch: {
    },
    computed: {
    },
    methods:{
        cargar_usuarios: function(){
            try {
                this.axiosInstance.get(this.api_explore)
                    .then(response => (
                        //console.log(response),
                        this.array_usuarios = response.data,
                        console.log(response.data)
                        //alert('dentro d eexplorer')
                    )
                )

                console.log(this.colorRGB());

            } catch (error) {
                console.log(error);
            }

        },

        cargar_post: function(){
            try {
                this.axiosInstance.get(this.api_post_explore)
                    .then(response => (
                        //console.log(response),
                        this.array_explore = response.data
                        //alert('dentro d eexplorer')
                    )
                )
                    


            } catch (error) {
                console.log(error);
            }
        },

        generarNumero: function(numero){
            return (Math.random()*numero).toFixed(0);
        },

        colorRGB: function(){
            var coolor = "("+this.generarNumero(255)+"," + this.generarNumero(255) + "," + this.generarNumero(255) +")";
            return "rgb" + coolor;
        }, 
        ver_perfil: function(id){
            console.log('id usuario para buscar en una api '+id);
            console.log('Desafio indico que este boton no tuviera función');
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