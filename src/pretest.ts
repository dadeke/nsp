import createConnection from './database';

async function pretest() {
  const connection = await createConnection();
  await connection.runMigrations();
  await connection.close();
}

pretest();
