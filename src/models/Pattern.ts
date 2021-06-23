import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { Etymology } from './Etymology';
import {
  BOOLEAN_DEFAULT_TRUE, NULLABLE, TIMESTAMP, VARCHAR_S_UNIQUE,
} from '../config/constants';

@Entity()
@ObjectType()
export default class Pattern extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column(VARCHAR_S_UNIQUE)
  pattern!: string;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_TRUE)
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn(TIMESTAMP)
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn(TIMESTAMP)
  updateDate!: Date;

  @Field(() => [Etymology], NULLABLE)
  @ManyToMany(() => Etymology, (etymology) => etymology.patterns)
  etymologies?: Etymology[];
}
