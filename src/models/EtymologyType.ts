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
import { Etymology } from './Etymology';
import {
  BOOLEAN_DEFAULT_TRUE,
  NULLABLE,
  TIMESTAMP,
  VARCHAR_S_UNIQUE,
  VARCHAR_XL,
} from '../config/constants';

@Entity()
@ObjectType()
export class EtymologyType extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column(VARCHAR_S_UNIQUE)
  name!: string;

  @Field(() => String)
  @Column(VARCHAR_XL)
  description!: string;

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
  @OneToMany(() => Etymology, (etymology) => etymology.language)
  etymologies?: Etymology[];
}
