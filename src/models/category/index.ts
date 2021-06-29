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
import { Word } from '../word';
import {
  BOOLEAN_DEFAULT_TRUE,
  NULLABLE,
  TIMESTAMP_DEFAULT,
  VARCHAR_L_UNIQUE,
  VARCHAR_XL,
} from '../../config/constants';

@Entity()
@ObjectType()
export class Category extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column(VARCHAR_L_UNIQUE)
  name!: string;

  @Field(() => String)
  @Column(VARCHAR_XL)
  description!: string;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_TRUE)
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn(TIMESTAMP_DEFAULT)
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn(TIMESTAMP_DEFAULT)
  updateDate!: Date;

  @Field(() => [Word], NULLABLE)
  @OneToMany(() => Word, (word) => word.category)
  words?: Word[];
}
