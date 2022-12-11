import pg from 'pg';

import { TableName } from '../models/models.js';

export class Query {
    query: string[] = [];
    client: pg.Client;

    constructor(client: pg.Client) {
        this.client = client;
    }

    select(...columns: string[]) {
        this.query.push(`SELECT ${columns.join(',')}`);
        return this;
    }

    from(tableName: TableName) {
        this.query.push(`FROM ${tableName}`);
        return this;
    }

    where(column: string) {
        this.query.push(`WHERE ${column}`);
        return this;
    }

    equals(value: string | number) {
        this.query.push(`=${value}`);
        return this;
    }

    resolve() {
        return this.query.sort(sortByCommand).join(' ');
    }

    async get(config?: ArrayConfig) {
        const query = {
            text: this.query.sort(sortByCommand).join(' '),
            ...(config ?? {}),
        };
        const { rows } = await this.client.query(query);
        return rows;
    }
}

const sortByCommand = (cur: string, next: string) => getCommandSequenceNumber(cur) - getCommandSequenceNumber(next);

function getCommandSequenceNumber(command: string): number {
    if (command.includes('SELECT')) return 1;
    if (command.includes('FROM')) return 2;
    if (command.includes('WHERE')) return 3;
    if (command.includes('=')) return 4;
    else return 5;
}

type ArrayConfig = {
    rowMode: 'array';
};

export const ALL = '*' as const;
