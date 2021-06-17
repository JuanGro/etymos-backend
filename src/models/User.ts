import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Test } from "./Test";
import { Word } from "./Word";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true, type: "varchar", length: 256 })
  email!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 256 })
  name!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updateDate!: Date;

  @Field(() => [Test], { nullable: true })
  @OneToMany(() => Test, (test) => test.user)
  tests?: Test[];

  @Field(() => [Word], { nullable: true })
  @ManyToMany(() => Word, (word) => word.users)
  @JoinTable()
  words?: Word[];
}
