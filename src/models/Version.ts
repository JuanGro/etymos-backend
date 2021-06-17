import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Version extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column({ unique: true, type: "varchar", length: 16 })
  version!: string;

  @Field(() => String)
  @Column({ type: 'varchar', length: 1024 })
  description!: string;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: false })
  maintenance!: boolean;

  @Field(() => Boolean)
  @Column({ type: "boolean", default: true })
  active!: boolean;

  @Field(() => Date)
  @CreateDateColumn({ type: "timestamp" })
  creationDate!: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: "timestamp" })
  updateDate!: Date;
}
