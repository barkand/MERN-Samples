declare namespace NodeJS {
  interface ProcessEnv {
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USER: string;
    DB_PASSWORD: string;
    SECRET_KEY: string;
    SECRET_KEY_LIFE_TIME: string;
    REFRESH_SECRET_KEY: string;
    REFRESH_SECRET_KEY_LIFE_TIME: string;
  }
}
