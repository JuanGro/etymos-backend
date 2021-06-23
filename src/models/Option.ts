import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Question } from './Question';
import {
  BOOLEAN_DEFAULT_FALSE, BOOLEAN_DEFAULT_TRUE, NULLABLE, TIMESTAMP, VARCHAR_L_UNIQUE,
} from '../config/constants';

@Entity()
@ObjectType()
export default class Option extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column(VARCHAR_L_UNIQUE)
  option!: string;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_FALSE)
  correct!: boolean;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_TRUE)
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn(TIMESTAMP)
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn(TIMESTAMP)
  updateDate!: Date;

  @Field(() => [Question], NULLABLE)
  @ManyToMany(() => Question, (question) => question.options)
  @JoinTable()
  questions?: Question[];
}
