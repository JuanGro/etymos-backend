import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';
import { User } from './User';
import { Etymology } from './Etymology';
import { Category } from './Category';
import {
  BOOLEAN_DEFAULT_TRUE, NULLABLE, TIMESTAMP, VARCHAR_L_UNIQUE, VARCHAR_XXL, VARCHAR_XXXXL,
} from '../config/constants';

@Entity()
@ObjectType()
export default class Word extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column(VARCHAR_L_UNIQUE)
  word!: string;

  @Field(() => String)
  @Column(VARCHAR_XXL)
  meaning!: string;

  @Field(() => String)
  @Column(VARCHAR_XXXXL)
  imageUrl!: string;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_TRUE)
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn(TIMESTAMP)
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn(TIMESTAMP)
  updateDate!: Date;

  @Field(() => Category, NULLABLE)
  @ManyToOne(() => Category, (category) => category.words)
  @JoinColumn()
  category!: Category;

  @Field(() => [Etymology], NULLABLE)
  @ManyToMany(() => Etymology, (etymology) => etymology.words)
  @JoinTable()
  etymologies?: Etymology[];

  @Field(() => [User], NULLABLE)
  @ManyToMany(() => User, (user) => user.words)
  users?: User[];
}
