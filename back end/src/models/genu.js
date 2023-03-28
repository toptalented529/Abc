
const sequelize = require("sequelize");

const genu = (sequelize,DataTypes)=>{
    const Genu = sequelize.define('genu',{
        mov_u:DataTypes.STRING, //no used
        user_id:DataTypes.INTEGER, ///the user that bought genus?
        amount_token:DataTypes.INTEGER, ///amount of tokens
        series_name:DataTypes.INTEGER, ///series name
        code:DataTypes.INTEGER, ///series name

        
    });
    Genu.associate = models => {
        Genu.belongsTo(models.User);
    }
    return Genu;
}


export default genu;