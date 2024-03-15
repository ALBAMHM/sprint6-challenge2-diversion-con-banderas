const countriesList= document.getElementById('countries-list');
const countriesUl= document.createElement('ul');
countriesList.appendChild(countriesUl);

const getFlags = async () => {
    try{
        const response = await fetch ('https://restcountries.com/v3/all');
        if(!response.ok){
            throw new Error ('Ha surgido un error', response.status);
        }
        const data= await response.json();
        const dataFilter= data.filter((data) => data.flags);
        return dataFilter;
    } catch (error){
        console.log('Error al obtener los datos', error);
    }
};
const template = (data) => {
    data.forEach((country) =>{
        let countriesLi=document.createElement('li');
        countriesUl.appendChild(countriesLi);
        countriesLi.innerHTML="<img src=\"" + country.flags[1] + "\" alt=\""+ country.name.common+"\" >"
        countriesLi.addEventListener('click', function (){
            if (countriesLi.hasChildNodes('p')){
                this.innerHTML=this.innerHTML+`<p>Capital: ${country.capital}</p>`+`<p>Población: ${country.population}</p>`+`<p>Lado de carretera: ${country.car.side}</p>`+`<p>Pais: ${country.name.official}</p>`;
                countriesLi=true; 
            } else  {this.style.display="none"}; 
            
            
        })
    });
};
let resultsFlags = getFlags().then ((data)=> template(data));

