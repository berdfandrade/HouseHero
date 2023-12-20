import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL : any = process.env.MONGO_URL

export default async function connectToMongoDB (): Promise<void> {
    try {
      await mongoose.connect(MONGO_URL, {
      });
      console.log('Conexão ao MongoDB estabelecida com sucesso!');
    } catch (error) {
      console.error('Erro ao conectar ao MongoDB:', error);
    }
  };
  