/* eslint-disable sort-keys */
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from 'sequelize';

export class User extends Model<
InferAttributes<User>,
InferCreationAttributes<User>
> {
  declare public id: CreationOptional<number>;
  declare public firstName: string;
  declare public lastName: string;
  declare public userName: string;
  declare public userPassword: string;
  declare public isSupervisor: boolean;
  declare public createdAt: CreationOptional<Date>;
  declare public updatedAt: CreationOptional<Date>;
  declare public deletedAt: Date | null;

  public static initModel(sequelize: Sequelize): typeof User {
    User.init({
      id: {
        allowNull: false,
        autoIncrement: true,
        autoIncrementIdentity: true,
        field: `id`,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userName: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userPassword: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      isSupervisor: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    }, {
      sequelize,
    });
    return User;
  }
}
