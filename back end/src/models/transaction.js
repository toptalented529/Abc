const sequelize = require("sequelize");

const transaction = (sequelize,DataTypes)=>{
    const Transaction = sequelize.define('transaction',{
        name:DataTypes.STRING,
        fch:DataTypes.STRING,  ////date
        hra:DataTypes.STRING,   ////hour
        fch_hra:DataTypes.STRING,  ////////data and time
        inv_u:DataTypes.INTEGER, ///inversionist?
        mov_tip:DataTypes.STRING,  ///////transaction type
        imp:DataTypes.DECIMAL, ///////amount paid
        tkns:DataTypes.INTEGER, /////GNUE token user bought
        hayeks_pos:DataTypes.INTEGER,  ////Hayeks user bought
        cve:DataTypes.STRING,  ////operation code
        hash:DataTypes.STRING, //hash
        cant:DataTypes.INTEGER, ///quantitiy
        tracking_number:DataTypes.STRING, ///quantitiy
        productType:DataTypes.STRING,
        
        
    
    
        
    });
    Transaction.associate = models => {
        Transaction.belongsTo(models.User);
    }
    return Transaction;
}


export default transaction;