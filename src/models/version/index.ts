import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import {
  BOOLEAN_DEFAULT_FALSE,
  BOOLEAN_DEFAULT_TRUE,
  TIMESTAMP,
  VARCHAR_S_UNIQUE,
  VARCHAR_XXXXL,
} from '../../config/constants';

@Entity()
@ObjectType()
export class Version extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column(VARCHAR_S_UNIQUE)
  version!: string;

  @Field(() => String)
  @Column(VARCHAR_XXXXL)
  description!: string;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_FALSE)
  maintenance!: boolean;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_TRUE)
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn(TIMESTAMP)
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn(TIMESTAMP)
  updateDate!: Date;
}
