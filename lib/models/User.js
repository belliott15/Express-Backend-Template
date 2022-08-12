const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../utils/sequelize');

class User extends Model {
  async comparePassword(password){
    return await bcrypt.compare(password, this.passwordHash);
  }
}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please input a valid email'
        },
      },
      unique: {
        msg: 'This email is already in use'
      },
    },
    avatar: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'Must be a valid URL'
        },
      },
    },
    passwordHash: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6],
          msg: 'Password must be 6 or more characters long'
        }
      }
    }
  }
)