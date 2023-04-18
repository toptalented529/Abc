import Sequelize from 'sequelize';


const sequelize = new Sequelize(process.env.DB,process.env.DB_USER,process.env.DB_PASS, {
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: false
})
sequelize.authenticate().then(() => {
    ()=>console.log("Connection has been established successfully.");
}).catch(err => {
    console.error("Unable to connect to the database:", err);
})
const models = {
	User: sequelize.import('./user'),
	Profile: sequelize.import('./profile')
}

Object.keys(models).forEach(modelName => {
	if('associate' in models[modelName]) {
		models[modelName].associate(models);
	}
})
export default models;
export {sequelize};

    