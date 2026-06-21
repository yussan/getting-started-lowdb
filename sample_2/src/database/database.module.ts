import { Module, Global } from '@nestjs/common';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { join } from 'path';
import { DatabaseSchema } from './schema.interface';

// token for dependency injectin
export const LOWDB_TOKEN = 'LOWDB_INSTANCE';

@Global() //make module can use anywhere
@Module({
  providers: [
    {
      provide: LOWDB_TOKEN,
      useFactory: async () => {
        // save debugger.json on root project
        const file = join(process.cwd(), 'db.json');
        const adapter = new JSONFile<DatabaseSchema>(file);

        // data default
        const defaultData: DatabaseSchema = { movies: [] };
        const db = new Low<DatabaseSchema>(adapter, defaultData);

        // raed old data from db
        await db.read();

        return db;
      },
    },
  ],
  exports: [LOWDB_TOKEN],
})
export class DatabaseModule {}
