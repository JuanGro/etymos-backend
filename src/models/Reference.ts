import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Question } from './Question';
import {
  BOOLEAN_DEFAULT_TRUE, NULLABLE, TIMESTAMP, VARCHAR_XXL, VARCHAR_XXL_UNIQUE, VARCHAR_XXS,
} from '../config/constants';

@Entity()
@ObjectType()
export default class Reference extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column(VARCHAR_XXL)
  author!: string;

  @Field(() => String)
  @Column(VARCHAR_XXL_UNIQUE)
  title!: string;

  @Field(() => String)
  @Column(VARCHAR_XXS)
  publicationYear!: string;

  @Field(() => String)
  @Column(VARCHAR_XXL)
  publicationPlace!: string;

  @Field(() => String)
  @Column(VARCHAR_XXL)
  publishingCompany!: string;

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
  @OneToMany(() => Question, (question) => question.reference)
  questions?: Question[];
}
