import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { User } from "./User";
import { Question } from "./Question";

@Entity()
@ObjectType()
export class Test extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

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

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.tests)
  @JoinColumn()
  user!: User;

  @Field(() => Question)
  @ManyToOne(() => Question, (question) => question.tests)
  @JoinColumn()
  question!: Question;
}
