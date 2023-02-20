import { DataTypes, Model } from 'sequelize';
import db from '../config/database.config';

interface WithdrawHistoryAttribute {
  id: string;
  amount: number;
  userId: string;
  status: boolean;
  accountNumber: string;
  bank: string;
}

export class WithdrawHistoryInstance extends Model<WithdrawHistoryAttribute> {}

WithdrawHistoryInstance.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bank: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'withdrawBalance',
  },
);
