import React, { useState, useEffect } from "react";

interface TypewriterProps {
  text: string;
  speed?: number; // Speed in milliseconds
}

const Typewriter: React.FC<TypewriterProps> = ({ text, speed = 50 }) => {
  const [displayedText, setDisplayedText] = useState<string>("");
  const words = text.split(" ");

  useEffect(() => {
    let wordIndex = 0;
    let charIndex = 0;

    const typeWord = () => {
      if (wordIndex < words.length) {
        if (charIndex < words[wordIndex].length) {
          setDisplayedText(
            (prev) =>
              prev +
              words[wordIndex][charIndex] +
              (charIndex === words[wordIndex].length - 1 ? " " : "")
          );
          charIndex++;
        } else {
          charIndex = 0;
          wordIndex++;
          setTimeout(typeWord, speed); // Delay between words
          return;
        }
        setTimeout(typeWord, speed / 5); // Speed of typing each character
      }
    };

    typeWord(); // Start typing

    return () => {
      // Cleanup if necessary (e.g., if component unmounts before typing completes)
    };
  }, [text, speed, words]);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: displayedText,
      }}
    />
  );
};

export default Typewriter;
