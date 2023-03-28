const sequelize = require("sequelize");

const user = (sequelize,DataTypes) => {
    const User=sequelize.define('user',{
    address: DataTypes.STRING,
    nonce:DataTypes.STRING,
    pin:DataTypes.STRING,
    name:DataTypes.STRING,
    nickname:DataTypes.STRING,
    pwd:DataTypes.STRING,
    eml:DataTypes.STRING,
    parent_id:DataTypes.INTEGER, ///////inv_ref
    mos_preseved:DataTypes.DECIMAL, /////sal
    genu_preseved:DataTypes.INTEGER, /////sal
    range:DataTypes.STRING,  ////ran_u
    hayeks_preseved:DataTypes.INTEGER,
    emp:DataTypes.INTEGER, ///initial father matching bonus
    emp_prod:DataTypes.INTEGER, ///initial father matching bonus
    emp_inv:DataTypes.INTEGER, ///initial father matching bonus
    act_prod:DataTypes.BOOLEAN,
    act_tkn:DataTypes.BOOLEAN,
    act_unepro:DataTypes.BOOLEAN,
    nombramiento:DataTypes.STRING,  
    onboarding_finished:DataTypes.BOOLEAN,
    vitalImport:DataTypes.BOOLEAN,

  
    
    });
    User.associate = models => {
        User.hasOne(models.Profile);
        User.hasMany(models.Transaction);
        User.hasMany(models.Genu);
        User.hasMany(models.Hayek);
    }
    return User;
}

export default user;