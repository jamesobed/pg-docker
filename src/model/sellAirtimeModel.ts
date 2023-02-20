import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface SellAirtimeAttribute {
  id: string;
  userId: string;
  email: string;
  network: string;
  phoneNumber: string;
  amountToSell: number;
  amountToReceive: number;
  transactionStatus?: string;
}

export class SellAirtimeInstance extends Model<SellAirtimeAttribute> {}

SellAirtimeInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },

    userId: {
      type: DataTypes.STRING,
      // primaryKey: false,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    network: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amountToSell: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    amountToReceive: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    transactionStatus: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'pending',
    },
  },

  {
    sequelize: db,
    tableName: 'SellAirtime',
  },
);
