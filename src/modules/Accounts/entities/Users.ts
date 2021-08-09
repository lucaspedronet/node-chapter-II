import { Entity, PrimaryColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  driver_licenses: string;

  @Column()
  isAdmin: string;

  @CreateDateColumn()
  created_at: string;
}

export { User };