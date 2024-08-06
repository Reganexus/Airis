// types.ts

export interface Persona {
  persona_id: string;
  name: string;
  department: string;
  tagline: string;
  created_at: string;
  logo_name: string;    // icon
  bgimage_name: string; // bg
  // i dunno outline
  // link redirect is out na
  // description: string; 
  // icon: string;
  // bg: string;
  // outline: string;
  // linkRedirect: string;
}

export interface PersonaChatbots {
  chatbot_id: string;
  role: string;
  task: string;
  subpersona: boolean;
  default_prompt: boolean;
  persona_id: string;
  persona_name: string;
  persona_description: string;
}

export interface SelectedPersona {
  persona_id: string;
  persona_name: string;
  persona_tagline: string;
}