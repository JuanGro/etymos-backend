import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Question } from "./Question";

@Entity()
@ObjectType()
export class Reference extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ type: "varchar", length: 256 })
  author!: string;

  @Field(() => String)
  @Column({ unique: true, type: "varchar", length: 256 })
  title!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 4 })
  publicationYear!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 256 })
  publicationPlace!: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 256 })
  publishingCompany!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updateDate!: Date;

  @Field(() => [Question], { nullable: true })
  @OneToMany(() => Question, (question) => question.reference)
  questions?: Question[];
}
