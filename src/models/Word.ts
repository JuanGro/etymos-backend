import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { Etymology } from "./Etymology";
import { Category } from "./Category";

@Entity()
@ObjectType()
export class Word extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true, type: "varchar", length: 64 })
  word!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 256 })
  meaning!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 2048 })
  imageUrl!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updateDate!: Date;

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.words)
  @JoinColumn()
  category!: Category;

  @Field(() => [Etymology], { nullable: true })
  @ManyToMany(() => Etymology, (etymology) => etymology.words)
  @JoinTable()
  etymologies?: Etymology[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.words)
  users?: User[];
}
