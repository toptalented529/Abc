
const sequelize = require("sequelize");

const hayek = (sequelize,DataTypes)=>{
    const Hayek = sequelize.define('hayek',{
        mov_u:DataTypes.STRING, //no used
        user_id:DataTypes.INTEGER, ///the user that bought genus?
        amount_token:DataTypes.INTEGER, ///amount of tokens
        series_name:DataTypes.INTEGER, ///series name
        code:DataTypes.INTEGER, ///series name
            
    
        
    });
    Hayek.associate = models => {
        Hayek.belongsTo(models.User);
    }
    return Hayek;
}


export default hayek;



