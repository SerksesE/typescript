import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { Exclude } from 'class-transformer'
import { MinLength, IsString } from 'class-validator';

@Entity()
export class Page extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  title: string

  @Column('text', {nullable:false})
  content: string
}

export class User extends BaseEntity {
  @IsString()
  @MinLength(8)
  @Column('text', {nullable:false})
  @Exclude({toPlainOnly: true})
  password: string
}