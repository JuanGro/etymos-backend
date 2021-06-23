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
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Test } from '../test';
import { Word } from '../word';
import {
  BOOLEAN_DEFAULT_TRUE,
  NULLABLE,
  TIMESTAMP,
  VARCHAR_XXL,
  VARCHAR_XXL_UNIQUE,
} from '../../config/constants';

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column(VARCHAR_XXL_UNIQUE)
  email!: string;

  @Field(() => String)
  @Column(VARCHAR_XXL)
  name!: string;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_TRUE)
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn(TIMESTAMP)
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn(TIMESTAMP)
  updateDate!: Date;

  @Field(() => [Test], NULLABLE)
  @OneToMany(() => Test, (test) => test.user)
  tests?: Test[];

  @Field(() => [Word], NULLABLE)
  @ManyToMany(() => Word, (word) => word.users)
  @JoinTable()
  words?: Word[];
}
