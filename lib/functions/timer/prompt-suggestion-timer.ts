import { fetchPromptSuggestion } from '@/lib/db/fetch-queries';
import { useEffect, useRef, useState } from 'react';

type PromptSuggestionsHook = {
  promptSuggestions: string[];                                      // Array of prompt suggestions
  handleTimeout: (input: string, isImageModel: boolean) => void;    // Function to handle input timeout and fetch suggestions
};

/**
 * Custom hook to manage prompt suggestions based on user input and model type.
 * This hook manages a timeout to prevent rapid requests and fetches suggestions after a delay.
 */
export const usePromptSuggestions = (): PromptSuggestionsHook => {
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);    // Reference to store the timeout ID, allowing it to be cleared if needed
    const [promptSuggestions, setPromptSuggestions] = useState<string[]>([]); // State to store the list of prompt suggestions

    /**
     * handleTimeout
     * - This function is called whenever the user provides input.
     * - It resets the timeout to delay the fetch request until the user stops typing for 1.5 seconds.
     * - If the user is using an image model and has provided input, fetch prompt suggestions.
     * 
     * @param input - The user's input string
     * @param isImageModel - Boolean flag to determine if the current model is an image model
     */
    const handleTimeout = (input: string, isImageModel: boolean) => {
        if (isImageModel && input) {
            // Clear any existing timeout to avoid multiple fetches
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // Set a new timeout to fetch suggestions after 1.5 seconds of inactivity
            timeoutRef.current = setTimeout(() => {
                if (isImageModel && input) {

                /**
                 * Fetch the GPT suggestion answers 
                 * @param user_input - user prompt to be sent on GPT-4o-mini
                 */
                const promptSuggestion = async (user_input: string) => {
                    try {
                    const data = await fetchPromptSuggestion(user_input);   // Fetch data from the server
                    const suggestions = data.response.split(",");           // GPT is prompted to respond with words separated by commas only. Split the response into an array of suggestions.
                    setPromptSuggestions(suggestions);                      // Update the state with the new suggestions
                    } catch (error) {
                        console.error("Failed to fetch prompt suggestions", error); // Error
                    }
                };

                promptSuggestion(input);

                }
            }, 1500); // Set the timeout to 1500 milliseconds (1.5 seconds)
        }
    };

    /**
     * useEffect
     * - Ensures that any active timeout is cleared when the component using this hook is unmounted.
     * - Prevents potential memory leaks by cleaning up the timeout.
     */
    useEffect(() => {
        // Clear timeout on component unmount
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Return the prompt suggestions and the handleTimeout function to be used in the component
    return { promptSuggestions, handleTimeout };
};
