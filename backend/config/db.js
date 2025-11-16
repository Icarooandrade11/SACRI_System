
import mongoose from "mongoose";

const buildMongoURI = () => {
  const directUri = process.env.MONGO_URI?.trim();
  if (directUri) {
    return directUri;
  }

  const user = process.env.MONGO_USER?.trim();
  const password = process.env.MONGO_PASSWORD?.trim();
  const host = process.env.MONGO_HOST?.trim();
  const dbName = process.env.MONGO_DB?.trim();
  const options = process.env.MONGO_OPTIONS?.trim();

  if (!user || !password || !host) {
    if (!user && !password && !host) {
      return "mongodb://127.0.0.1:27017/sacri";
    }

    throw new Error(
      "Variáveis de ambiente MongoDB ausentes. Informe MONGO_URI completo ou MONGO_USER, MONGO_PASSWORD e MONGO_HOST."
    );
  }

  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);
  const dbPath = dbName ? `/${dbName}` : "";
  const optionSuffix = options
    ? options.startsWith("?")
      ? options
      : `?${options}`
    : "?retryWrites=true&w=majority";

  return `mongodb+srv://${encodedUser}:${encodedPassword}@${host}${dbPath}${optionSuffix}`;
};

const connectDB = async () => {
  try {
    const mongoURI = buildMongoURI();
    const conn = await mongoose.connect(mongoURI);
    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Erro ao conectar no MongoDB:");
    console.error(`    ${error.message}`);
    console.error("    Verifique a string de conexão em backend/.env (MONGO_URI ou credenciais separadas).");
    process.exit(1);
  }
};

export default connectDB;
