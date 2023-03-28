
import 'dotenv/config.js'
import models, {sequelize} from './models/index.js';
import app from './app.js';

sequelize.sync().then(() => {
	app.listen(process.env.PORT, () => {
		console.log(`Server is running on port ${process.env.PORT}`);
	
	}).on('error', (e) => {
		console.log('error', e)
	})

})