import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Question } from "./Question";

@Entity()
@ObjectType()
export class Option extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true, type: "varchar", length: 64 })
  option!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  correct!: boolean;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updateDate!: Date;

  @Field(() => [Question], { nullable: true })
  @ManyToMany(() => Question, (question) => question.options)
  @JoinTable()
  questions?: Question[];
}
