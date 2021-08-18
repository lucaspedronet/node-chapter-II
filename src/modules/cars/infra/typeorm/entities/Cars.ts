import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
class Cars {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars', // tabela de relacionamento entre specifications e cars
    joinColumns: [{ name: 'card_id' }], // coluna que faz referência a tabela Cars
    inverseJoinColumns: [{ name: 'specification_id' }], // coluna que faz referência a tabela Specifications
  })
  specifications: Specification[];

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    this.available = true;
  }
}

export { Cars };
