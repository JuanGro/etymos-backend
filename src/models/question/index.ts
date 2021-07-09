import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Reference } from '../reference';
import { Option } from '../option';
import { Test } from '../test';
import {
  BOOLEAN_DEFAULT_TRUE,
  NULLABLE,
  TIMESTAMP_DEFAULT,
  VARCHAR_XXXXL_UNIQUE,
} from '../../config/constants';

@Entity()
@ObjectType()
export class Question extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column(VARCHAR_XXXXL_UNIQUE)
  sentence!: string;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_TRUE)
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn(TIMESTAMP_DEFAULT)
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn(TIMESTAMP_DEFAULT)
  updateDate!: Date;

  @Field(() => Reference)
  @ManyToOne(() => Reference, (reference) => reference.questions)
  @JoinColumn()
  reference!: Reference;

  @Field(() => [Option], NULLABLE)
  @ManyToMany(() => Option, (option) => option.questions)
  options?: Option[];

  @Field(() => [Test], NULLABLE)
  @OneToMany(() => Test, (test) => test.question)
  tests?: Test[];
}
