
const sequelize = require("sequelize");

const marketplaceSignup = (sequelize,DataTypes)=>{
    const MarketplaceSignup = sequelize.define('marketplacesignup',{
        email:DataTypes.STRING, //no used
        nickname:DataTypes.STRING, ///the user that bought genus?
        accepted:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
          }
       
            
    
        
    });
    MarketplaceSignup.associate = models => {
        MarketplaceSignup.belongsTo(models.User);
    }
    return MarketplaceSignup;
}


export default marketplaceSignup;



