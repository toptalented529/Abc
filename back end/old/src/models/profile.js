import { DataTypes } from "sequelize";
import { sequelize } from "./index";

const profile = (sequelize, DataTypes) => {
    const Profile = sequelize.define('profile', {
        specialization: {
            type: DataTypes.STRING
        },
        workingHours: {
            type: DataTypes.STRING,
            unique: true

        },
        address: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.STRING

        }
    })
    Profile.associate = (models) => {
        Profile.belongsTo(models.User)
    }


    return Profile;
}
export default profile;
