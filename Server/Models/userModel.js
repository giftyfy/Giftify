const {sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    user_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    f_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    l_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phone_number: {
      type: DataTypes.STRING,
    },
    user_location: {
      type: DataTypes.STRING,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    role_id: {
        type: DataTypes.INTEGER,
        defaultValue: 1, // Set the default value according to your roles setup
      },
      googleUserId: {
        type: DataTypes.STRING, // New column for Google user ID
        unique: true,
      },
  });

  Users.belongsTo(sequelize.models.Role, {
    foreignKey: 'role_id',
    defaultValue: 1,
    onDelete: 'CASCADE',
  });

//   Users.createCustomUser = async (userData) => {
//     try {
//       const newUser = await Users.create(userData);
//       return newUser;
//     } catch (error) {
//       console.error('Error creating user:', error);
//       throw error; // Rethrow the error to be handled by the calling code
//     }
//   };

  return Users;
};