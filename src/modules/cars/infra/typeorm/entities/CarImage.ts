import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuid4 } from 'uuid';

@Entity('cars_image')
class CarImage {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid')
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid4();
      this.created_at = new Date();
    }
  }
}

export { CarImage };
