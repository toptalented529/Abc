const sequelize = require("sequelize");

const profile = (sequelize,DataTypes)=>{
    const Profile = sequelize.define('transaction',{
        specialization:{
            type: DataTypes.STRING,
        },
        address:{
            type: DataTypes.STRING,
        },
        workingHours: {
            type: DataTypes.STRING,
        },
        phone:{
            type: DataTypes.STRING,
        },
        
    });
    Profile.associate = models => {
        Profile.belongsTo(models.User);
    }
    return Profile;
}


export default profile;