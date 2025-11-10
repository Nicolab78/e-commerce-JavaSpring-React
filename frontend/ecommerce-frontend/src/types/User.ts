export interface User {
  id: number;
  username: string;
  email: string; // Optionnel car on ne le récupère jamais du backend
  role: string;
  active: boolean;
  phoneNumber?: string;
}