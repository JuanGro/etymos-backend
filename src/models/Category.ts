import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Word } from "./Word";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true, type: "varchar", length: 64 })
  name!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 128 })
  description!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updateDate!: Date;

  @Field(() => [Word], { nullable: true })
  @OneToMany(() => Word, (word) => word.category)
  words?: Word[];
}
