
//gets random quote from web
export async function getRandomQuote(){
    try {
        const response =  await fetch('https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json',{
            mode : "cors"
        });
        if(!response.ok){
            throw new Error(`Error ${response.status}` );
        }

        const data = await response.json();
        let quote = data[Math.floor(Math.random()*data.length)];
        return quote;
        
    }catch(error){
        throw new Error(`Failed to fetch quote : ${error} `);
    }
}
