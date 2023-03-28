import 'dotenv/config';
import {sequelize} from './models';
import app from './app';

const ip = '95.217.197.177'

sequelize.sync().then(() => {
    app.listen(process.env.PORT,ip, () =>{
        console.log('Express running');
    }); 
});







