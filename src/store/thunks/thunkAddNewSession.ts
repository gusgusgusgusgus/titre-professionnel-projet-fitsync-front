import { createAsyncThunk } from '@reduxjs/toolkit';
import instanceAxios from '../../axios/axiosInstance';

// Définition du type des données envoyées lors de l'ajout d'une session
interface NewSession {
  duration: number;
  activityId: number;
  date: string;
  comment?: string;
}

// Thunk pour ajouter une nouvelle session
const thunkAddNewSession = createAsyncThunk(
  // Nom de l'action
  'sessions/ADD_SESSION',
  // Fonction asynchrone qui envoie la nouvelle session au serveur
  async (newSession: NewSession) => {
    // Extraction des données de la nouvelle session
    const { duration, activityId, date, comment } = newSession;

    // Préparation des données à envoyer au serveur
    const requestData: NewSession = {
      duration,
      activityId,
      date,
    };

    // Ajout du commentaire s'il est présent
    if (comment?.trim() !== '') {
      requestData.comment = comment;
    }

    try {
      // Envoi des données au serveur et récupération de la réponse
      const response = await instanceAxios.post('/sessions', requestData);
      // Renvoi des données de la réponse
      return response.data;
    } catch (error) {
      // Gestion des erreurs
      console.error("Erreur lors de l'ajout de la session :", error);
      throw error;
    }
  }
);

export default thunkAddNewSession;
