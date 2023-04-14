import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
} from "sequelize-typescript";
import { User } from "../users/users.model";
import { Role } from "./role.model";

@Table({ tableName: "user_roles", createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.NUMBER,
  })
  roleId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
  })
  userId: number;
}
