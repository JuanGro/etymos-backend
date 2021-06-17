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
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Word } from "./Word";
import { Pattern } from "./Pattern";
import { Language } from "./Language";
import { EtymologyType } from "./EtymologyType";

@Entity()
@ObjectType()
export class Etymology extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true, type: "varchar", length: 64 })
  graecoLatinEtymology!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 256 })
  meaning!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 2048 })
  imageUrl!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updateDate!: Date;

  @Field(() => EtymologyType)
  @ManyToOne(() => EtymologyType, (etymologyType) => etymologyType.etymologies)
  @JoinColumn()
  etymologyType!: EtymologyType;

  @Field(() => Language)
  @ManyToOne(() => Language, (language) => language.etymologies)
  @JoinColumn()
  language!: Language;

  @Field(() => [Pattern], { nullable: true })
  @ManyToMany(() => Pattern, (pattern) => pattern.etymologies)
  @JoinTable()
  patterns?: Pattern[];

  @Field(() => [Word], { nullable: true })
  @ManyToMany(() => Word, (word) => word.etymologies)
  words?: Word[];
}
