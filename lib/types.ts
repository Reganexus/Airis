// types.ts

export type Persona = {
    persona: string;
    prompt: string;
  };
  
export type Personas = {
  law: Persona;
  marketing: Persona;
  hr: Persona;
  intern: Persona;
  teacher: Persona;
  admin: Persona;
};

// Define the personacode type
export type PersonaCode = keyof Personas;

