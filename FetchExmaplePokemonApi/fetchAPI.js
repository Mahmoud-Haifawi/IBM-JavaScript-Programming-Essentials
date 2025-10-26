 
 
 /*fetchData();   
  function fetchData() {

        const response =  fetch("https://pokeapi.co/api/v2/pokemon/ditto")
        .then(response =>response.json())
        .then(data => console.log(data)) 
        .catch(error => {throw error})    ;

        
}

*/
  async function fetchData() {
    try {
        const pokemonName=document.getElementById("pokemonName").value.toLowerCase().trim();
        const response =  await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if(!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
         const pokemonSprirte=data.sprites.front_default;
         const imgElement=document.getElementById("pokemonSprirte");
            imgElement.src=pokemonSprirte;
            imgElement.style.display="block";



    } catch (error) {
        return console.error('Error fetching data:', error);
    }
        
}
