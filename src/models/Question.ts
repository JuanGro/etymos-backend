import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Reference } from "./Reference";
import { Option } from "./Option";
import { Test } from "./Test";
import { BOOLEAN_DEFAULT_TRUE, NULLABLE, TIMESTAMP, VARCHAR_XXXXL_UNIQUE } from "../config/constants";

@Entity()
@ObjectType()
export class Question extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column(VARCHAR_XXXXL_UNIQUE)
  sentence!: string;

  @Field(() => Boolean)
  @Column(BOOLEAN_DEFAULT_TRUE)
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn(TIMESTAMP)
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn(TIMESTAMP)
  updateDate!: Date;

  @Field(() => Reference)
  @ManyToOne(() => Reference, (reference) => reference.questions)
  @JoinColumn()
  reference!: Reference;

  @Field(() => [Option], NULLABLE)
  @ManyToMany(() => Option, (option) => option.questions)
  options?: Option[];

  @Field(() => [Test], NULLABLE)
  @OneToMany(() => Test, (test) => test.question)
  tests?: Test[];
}
