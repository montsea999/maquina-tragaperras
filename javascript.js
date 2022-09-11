    let coins = parseInt(0);
    let inputCoins =  parseInt("");

    // variable (array) facilitado en el enunciado y que se ha de respetar
 var listaImagenes = [
      "aubergine",// [0]
      "banana",   // [1]
      "carrots",  // [2]
      "cherries", // [3] 
      "dollar",   // [4] 
      "lemon",    // [5]
      "orange",   // [6]
      "peach",    // [7]
      "potato",   // [8]
      "tomato"    // [9]
    ];

    //***********AL CARGAR LA PÁGINA***********************************************
    //*****************************************************************************
    // Al cargarse el doc. en el DOM, se inicia una función anónima para pintar en el h2 el número de monedas del que partimos, que será 0
    
    window.onload = function () {
        coins = coins.innerHTML;
     };

    //*************botón submitCoins**********************************************
    //****************************************************************************
    
    document.getElementById("submitCoins").addEventListener("click", submitCoins);
        // función que ejecuta tras hacer clic en el boton "introcucir"
        function submitCoins() {

        //sustituye el valor que había al cargar la pág. en el h2, por el número de monedas que el usuario ha introducido en el input
        coins = document.getElementById("coins").innerHTML = document.getElementById('inputCoins').value;  

        //si coins es 0, hago saltar una alerta con un mensaje, y también llamo a la función addHistory pasándole otro mensaje por parámetro
         if(coins==0){
                swal("No has introducido monedas."," Por favor, introduce monedas.","warning");
                message="No has podido hacer una tirada porque no has introducido monedas.";
                addHistory(message);
        } else{

        //llamo a la función addHistory y le paso por parámetro un mensaje 
        message="Has introducido monedas.";
        addHistory(message);

        //paso a 0 el valor del input 
        document.getElementById("inputCoins").value = "0";

        // se bloqueará la posibilidad de introducir más monedas, desactivando tanto el input como el botón "introducir"
        document.getElementById("inputCoins").disabled = true;
        document.getElementById("submitCoins").disabled = true;  
      }
    }


    //************botón exit *****************************************************
    //****************************************************************************

     document.getElementById("exit").addEventListener("click", exit);
        // función que ejecuta tras hacer clic en el boton "salir"
        function exit() {

         // lanza una alerta con un mensaje del total de monedas conseguidas
        swal("Has conseguido un total de " + coins + " monedas.","","success"); 

        // vuelvo a activar tanto el input como el botón "introducir"
        document.getElementById("submitCoins").disabled = false;  
        document.getElementById("inputCoins").disabled = false;
        
        // el valor de coins pasa al input 
        document.getElementById("inputCoins").value = coins;   

        // paso a 0 el valor del coins en el h2 
        coins = document.getElementById("coins").innerHTML = "0";
        // llamo a la función addHistory pasándole por parámetro el mensaje "Sacas todas las monedas."
        message="Sacas todas las monedas.";
        addHistory(message);
          }

          
    //****************************palanca *******************************************
    //*******************************************************************************

           // con la función pullHandle() cambio el atributo src del elemento "palanca" para que su imagen sea visualmente la palanca abajo
          document.getElementById("palanca").addEventListener("mousedown", pullHandle);
          function pullHandle(){               
            var palanca = document.getElementById('palanca').src = "images/palancaDOWN.png";             
         }

         // con la función pushHandle() al soltar el mouse, el src del elemento "palanca" pasa a ser la imagen de la palanca arriba
         document.getElementById("palanca").addEventListener("mouseup", pushHandle); 
         
          let miRandom; // variable local para almacenar el random

           function pushHandle(){
           document.getElementById("palanca").src="images/palancaUP.png";
           //si la variable coins está vacía, lanza un mensaje de error en el histórico indicándolo
           if(!coins){
           //llama a la función addHistory pasándole el mensaje de ERROR por parámetro.
            message="ERROR. No has podido hacer una tirada porque no hay monedas para jugar."; 
            addHistory(message);            
          } 
          //si la variable coins es 0, llama a la función addHistory pasándole por parámetro el mensaje para que se inserte más monedas
                 else if(coins == 0){            
          message="No has podido hacer una tirada porque no tienes monedas para jugar."; 
          addHistory(message); 
          document.getElementById("submitCoins").disabled = false;  
          document.getElementById("inputCoins").disabled = false;
          
        }else{ 

          //si la variable coins no ha entrado en las condiciones anteriores, entra aquí
          //resta una moneda (tirada)
          coins--;           
          //utilizo Math.floor(Math.random() para devolver entero aleatorio entre 1 y la longitud del array srcImgBox https://www.w3schools.com/js/tryit.asp?filename=tryjs_random_1_100
          miRandom1 = Math.floor(Math.random() * listaImagenes.length);
          miRandom2 = Math.floor(Math.random() * listaImagenes.length);
          miRandom3 = Math.floor(Math.random() * listaImagenes.length);

        
          let result1 = document.getElementById('box1').src = ("images/" + listaImagenes[miRandom1] + ".png");
          let result2 = document.getElementById('box2').src = ("images/" + listaImagenes[miRandom2] + ".png");
          let result3 = document.getElementById('box3').src = ("images/" + listaImagenes[miRandom3] + ".png");
          
         
          //pinta el valor de coins y llama a la función addHistory para añadir el mensaje conforme se ha gastado una moneda (tirada)            
          document.getElementById("coins").innerHTML = coins;
          message="Has gastado una moneda.";
          addHistory(message);


          // *******COMPARAMOS LOS 3 RESULTADOS PARA OTORGAR LOS PREMIOS SI PROCEDE*****************************
          //****************************************************************************************************            
          
          /*******************************************************************************************************
          // si sale 3 dollar ******* "Has ganado DIEZ monedas!" *****************************  coins =  coins + 10; 
          //Planteo si result1 es igual a result2 y result3 (2 y 3 entonces lo serán) y además que result1 sea un dollar (el resto lo será)*/
           if(result1 == result2 && result1 == result3 && result1 == "images/" + listaImagenes[4] + ".png"  ){

            //suma diez a coins
            coins = coins + 10;

            //pinta coins
            document.getElementById("coins").innerHTML = coins;

            //llama a la función addHistory pasándole el mensaje conforme ganas DIEZ monedas
            message="Has ganado DIEZ monedas!";
            addHistory(message);    
                 
           } 
           /***********SI NO SON 3 DOLLAR, ENTRARÁ AQUÍ******************************************************************
             si sale 2 dollar ******* "Has ganado CUATRO monedas!" ****************************  coins =  coins + 4; 
            Planteo si 2 resultados (en las tres combinaciones) son iguales y además que uno de ellos sea un dollar *****/             
           else if ((result1 == result2 && result1 == "images/" + listaImagenes[4] + ".png") 
           || (result2 == result3 && result2 == "images/" + listaImagenes[4] + ".png") || 
           (result1 == result3 && result1 == "images/" + listaImagenes[4] + ".png")){
            coins = coins + 4;
            document.getElementById("coins").innerHTML = coins;
            message="Has ganado CUATRO monedas!";
            addHistory(message);
                        } 
            /********** SI NO SON NI 3 DOLLAR NI 2 DOLLAR, ENTRARÁ AQUÍ ******************************************
            si sale 3 vegetales iguales ************ "Has ganado CINCO monedas!" *************  coins =  coins + 5;   
            Planteo si result1 es igual a result2 y result3 (2 y 3 entonces lo serán) y nada más, porque ya está descartado que sean 3 dollar */             
            else if((result1 == result2) && (result1 == result3)){
            coins = coins + 5;
            document.getElementById("coins").innerHTML = coins;
            message="Has ganado CINCO monedas!";
            addHistory(message); 
           } 
           /******** SI NO SON NI 3 DOLLAR, NI 2 DOLLAR, NI 3 VEGETALES IGUALES, ENTRARÁ AQUÍ ***************************************
           si sale 1 dollar y 2 vegetales iguales ******* "Has ganado TRES monedas!" *******************  coins =  coins + 3;
           Planteo si dos resultados son iguales y el resultado que no lo és, es dollar (en las 3 combinaciones posibles)*** */             
           else if((result1 == result2 && result3 == "images/" + listaImagenes[4] + ".png")  || 
           (result1 == result3 && result2 == "images/" + listaImagenes[4] + ".png") ||
           (result2 == result3 && result1 == "images/" + listaImagenes[4] + ".png")
           ) {   
            coins = coins + 3;
            document.getElementById("coins").innerHTML = coins;
            message="Has ganado TRES monedas!";
            addHistory(message);               
           } 
           /****** SI NO SON NI 3 DOLLAR, NI 2 DOLLAR, NI 3 VEGETALES IGUALES, NI 2 VEGETALES Y 1 DOLLAR, ENTRARÁ AQUÍ ************
             si sale 1 dollar ******* "Has ganado UNA moneda!" *************************************************** coins++;  
             Planteo si resultado 1 ó 2 ó 3 son dollar ya que no puede ser ni 3 dollar, ni 2 dollar, ni 1 dollar y 2 vegetales iguales*/
            else if(result1 == "images/" + listaImagenes[4] + ".png"|| result2 == "images/" + listaImagenes[4] + ".png" || result3 == "images/" + listaImagenes[4] + ".png"){             
            coins ++;
            document.getElementById("coins").innerHTML = coins;
            message="Has ganado UNA moneda!";
            addHistory(message); 
            
           } 
           /******* SI NO SON NI 3 DOLLAR, NI 2 DOLLAR, NI 3 VEGETALES IGUALES, NI 2 VEGETALES IGUALES Y UN DOLLAR, NI 1 DOLLAR, ENTRARÁ AQUÍ  *****
            si sale 2 vegetales iguales y otro vegetal diferente ******* "Has ganado DOS monedas!" *******  coins =  coins + 2;  
            Sólo planteo que sean 2 resultados iguales porque seguro serán vegetales dado que ya está descartado que sean 
            dos dollars y también descartado que sean 3 dollars o 3 vegetales.. */
           else if(result1 == result2 || result1 == result3 || result2 == result3){   
            coins = coins + 2;
            document.getElementById("coins").innerHTML = coins;
            message="Has ganado DOS monedas!";
            addHistory(message);  
            }       
          }  
        }
   

    /**************************** HISTORIAL ******************************************************
    **********************************************************************************************/ 
   // La función addHistory creará una etiqueta <li></li> en su nodo padre <ul></ul> a la que le añadirá un texto, que le pasaremos por parámetro    
              function addHistory(message){
                var li = document.createElement("li");
                var msg = document.createTextNode(message);
                li.appendChild(msg);
                historyUl.appendChild(li);
            }  
    //*******************************************************************************************

