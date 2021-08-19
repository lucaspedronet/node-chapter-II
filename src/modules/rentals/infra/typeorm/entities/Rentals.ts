import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid4 } from 'uuid';

class Rental {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  expected_return_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
      this.created_at = new Date();
    }
  }
}

export { Rental };
