import createConnection from './database';

async function posttest() {
  const connection = await createConnection();
  await connection.dropDatabase();
  await connection.close();
}

posttest();
