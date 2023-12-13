import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Folder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Folder, folder => folder.subfolders)
  parent: Folder;

  @OneToMany(() => Folder, folder => folder.parent)
  subfolders: Folder[];
}