import { DataTypes, Model } from 'sequelize';
import { Password } from '../services/password';
import db from '../config/database.config';
import { AccountInstance } from './accounts';
import { SellAirtimeInstance } from './sellAirtimeModel';
import { WithdrawHistoryInstance } from './withdrawalHistory';
export interface userAttributes {
  id?: string;
  firstName?: string;
  lastName?: string;
  userName?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  avatar: string;
  isVerified?: Boolean;
  token?: string;
  role?: string;
  walletBalance?: number;
  otp?: Number;
  otpExpires?: Number;
  updatedAt?: Number;
  createdAt?: Number;
}

export class userInstance extends Model<userAttributes> {
  [x: string]: any;
}

userInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'full name is required',
        },
        notEmpty: {
          msg: 'Please provide full name',
        },
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'last name is required',
        },
        notEmpty: {
          msg: 'Please provide last name',
        },
      },
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'last name is required',
        },
        notEmpty: {
          msg: 'Please provide last name',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'email is required',
        },
        isEmail: {
          msg: 'Please provide a valid email',
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          msg: 'password is required',
        },
        notEmpty: {
          msg: 'Please provide a password',
        },
      },
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7nG8OgXmMOXXiwbNOc-PPXUcilcIhCkS9BQ&usqp=CAU',
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    walletBalance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    otp: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    otpExpires: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
  },
  {
    sequelize: db,
    tableName: 'Users',
  },
);

userInstance.beforeSave(async (user, options) => {
  if (user.changed('password')) {
    const hashed = await Password.toHash('password');
    user.password = hashed;
  }
});
userInstance.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  delete values.otp;
  delete values.otpExpires;
  delete values.token;
  delete values.updatedAt;
  delete values.createdAt;

  return values;
};

userInstance.hasMany(AccountInstance, { foreignKey: 'userId', as: 'accounts' });
userInstance.hasMany(WithdrawHistoryInstance, { foreignKey: 'userId', as: 'withdrawBalance' });
userInstance.hasMany(SellAirtimeInstance, { foreignKey: 'userId', as: 'SellAirtime' });
AccountInstance.belongsTo(userInstance, { foreignKey: 'userId', as: 'Users' });
WithdrawHistoryInstance.belongsTo(userInstance, { foreignKey: 'userId', as: 'Users' });
SellAirtimeInstance.belongsTo(userInstance, { foreignKey: 'userId', as: 'Users' });
