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
    last_blockchain_purchased_time:DataTypes.DATE,
    last_products_purchased_time:DataTypes.DATE,
    last_Investment_purchased_time:DataTypes.DATE,
    my_team_rank:DataTypes.ARRAY(DataTypes.INTEGER),
    my_team_prev_rank:DataTypes.ARRAY(DataTypes.INTEGER),
    last_blockchain_purchased_date: {
        type: DataTypes.DATE,
        defaultValue: '2021-01-01' // Sets the default value to the current date and time
      },
      last_associated_purchased_date: {
        type: DataTypes.DATE,
        defaultValue:'2021-01-01' // Sets the default value to null
      },
      last_product_purchased_date: {
        type: DataTypes.DATE,
        defaultValue: '2021-01-01' // Sets the default value to a specific date
      }


  
    
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