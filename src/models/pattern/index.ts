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
import { Etymology } from '../etymology';
import {
  BOOLEAN_DEFAULT_TRUE,
  NULLABLE,
  TIMESTAMP_DEFAULT,
  VARCHAR_S_UNIQUE,
} from '../../config/constants';

@Entity()
@ObjectType()
export class Pattern extends BaseEntity {
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
  @CreateDateColumn(TIMESTAMP_DEFAULT)
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn(TIMESTAMP_DEFAULT)
  updateDate!: Date;

  @Field(() => [Etymology], NULLABLE)
  @ManyToMany(() => Etymology, (etymology) => etymology.patterns)
  etymologies?: Etymology[];
}
