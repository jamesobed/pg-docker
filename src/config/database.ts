import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize({
  database: 'mydatabase',
  dialect: 'postgres',
  username: 'myusername',
  password: 'mypassword',
  models: [__dirname + '/models'],
});

export default sequelize;
