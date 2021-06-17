import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToMany,
    JoinTable,
    OneToMany,
} from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { Etymology } from "./Etymology";

@Entity()
@ObjectType()
export class Language extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @Column({ unique: true, type: "varchar", length: 16 })
    name!: string;

    @Field(() => String)
    @Column({ type: "varchar", length: 128 })
    description!: string;

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
    @OneToMany(() => Etymology, (etymology) => etymology.language)
    etymologies?: Etymology[];
}
