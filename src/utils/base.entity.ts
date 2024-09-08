import { BaseEntity as TypeORMBaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntity extends TypeORMBaseEntity {
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
