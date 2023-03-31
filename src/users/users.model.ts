import {
  Model,
  Table,
  Column,
  DataType,
  BelongsToMany,
} from "sequelize-typescript";
import { Role } from "src/role/role.model";
import { UserRoles } from "src/role/user-roles.model";

interface UserCreationAttrs {
  surname: string;
  name: string;
  email: string;
  password: string;
  phone: string;
}

@Table({ tableName: "users" })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
