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
import { User } from '../user';
import { Etymology } from '../etymology';
import { Category } from '../category';
import {
  BOOLEAN_DEFAULT_TRUE,
  NULLABLE,
  TIMESTAMP_DEFAULT,
  VARCHAR_L_UNIQUE,
  VARCHAR_XXL,
  VARCHAR_XXXXL,
} from '../../config/constants';

@Entity()
@ObjectType()
export class Word extends BaseEntity {
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
  @CreateDateColumn(TIMESTAMP_DEFAULT)
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn(TIMESTAMP_DEFAULT)
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
