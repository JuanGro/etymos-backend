import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from '../user';
import { Question } from '../question';
import {
  BOOLEAN_DEFAULT_FALSE,
  BOOLEAN_DEFAULT_TRUE,
  TIMESTAMP_DEFAULT,
} from '../../config/constants';

@Entity()
@ObjectType()
export class Test extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_FALSE)
  correct!: boolean;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_TRUE)
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn(TIMESTAMP_DEFAULT)
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn(TIMESTAMP_DEFAULT)
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
