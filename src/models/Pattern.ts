import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Etymology } from "./Etymology";

@Entity()
@ObjectType()
export class Pattern extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true, type: "varchar", length: 16 })
  pattern!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updateDate!: Date;

  @Field(() => [Etymology], { nullable: true })
  @ManyToMany(() => Etymology, (etymology) => etymology.patterns)
  etymologies?: Etymology[];
}
