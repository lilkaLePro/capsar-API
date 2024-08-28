// import { Client } from 'pg';
import pg from 'pg'

export const pgconexion = new pg.Pool({
    host: "localhost",
    user: "postgres",
    port: 5432,
    database: "capsar",
    password: "lilkapostgresscode"
});
export default pgconexion;