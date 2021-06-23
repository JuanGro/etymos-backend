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
import { Word } from './Word';
import { Pattern } from './Pattern';
import { Language } from './Language';
import { EtymologyType } from './EtymologyType';
import {
  BOOLEAN_DEFAULT_TRUE, NULLABLE, TIMESTAMP, VARCHAR_L_UNIQUE, VARCHAR_XXL, VARCHAR_XXXXL,
} from '../config/constants';

@Entity()
@ObjectType()
export default class Etymology extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column(VARCHAR_L_UNIQUE)
  graecoLatinEtymology!: string;

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

  @Field(() => EtymologyType)
  @ManyToOne(() => EtymologyType, (etymologyType) => etymologyType.etymologies)
  @JoinColumn()
  etymologyType!: EtymologyType;

  @Field(() => Language)
  @ManyToOne(() => Language, (language) => language.etymologies)
  @JoinColumn()
  language!: Language;

  @Field(() => [Pattern], NULLABLE)
  @ManyToMany(() => Pattern, (pattern) => pattern.etymologies)
  @JoinTable()
  patterns?: Pattern[];

  @Field(() => [Word], NULLABLE)
  @ManyToMany(() => Word, (word) => word.etymologies)
  words?: Word[];
}
