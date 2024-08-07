import { fetchPersonas } from "./db/fetch-queries";

const personaData = async () => {
      
    const data = await fetchPersonas();

    const formattedNamesList: string[] = [];
    data.forEach((item: any) => {
      // Perform operations on each item in the data array, for persona-url
      // each persona name will be converted into lowercase, and all spaces will  become '-'
      //    ex. Intern AI -> intern-ai-chatbots
      //const formattedName = item.name.toLowerCase().replace(/\s+/g, '-') + '-chatbots';
      //formattedNamesList.push(formattedName);
    });
    console.log("Formatted Names List:", formattedNamesList);

    return formattedNamesList;
};

export default personaData;