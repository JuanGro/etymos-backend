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

@Entity()
@ObjectType()
export class Question extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true, type: "varchar", length: 2048 })
  sentence!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updateDate!: Date;

  @Field(() => Reference)
  @ManyToOne(() => Reference, (reference) => reference.questions)
  @JoinColumn()
  reference!: Reference;

  @Field(() => [Option], { nullable: true })
  @ManyToMany(() => Option, (option) => option.questions)
  options?: Option[];

  @Field(() => [Test], { nullable: true })
  @OneToMany(() => Test, (test) => test.question)
  tests?: Test[];
}
