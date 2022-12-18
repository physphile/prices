import pg, { QueryArrayConfig } from 'pg';
const { Client } = pg;
import { ResponseProcessor, ResponseSmartphone } from './types.js';
import { Smartphone, Gnss, Processor, ProcessorCluster, VideoResolutions } from '../models/models.js';

export class Api {
    client = new Client();

    async connect() {
        await this.client.connect();
        return this;
    }

    async end() {
        await this.client.end();
    }

    async getSmartphones(): Promise<Smartphone[]> {
        const { rows }: { rows: ResponseSmartphone[] } = await this.client.query(`
            SELECT smartphone_id as id, vendor, model, width, height, thick, weight, resistance, display_type,
                   diagonal, resolution_horizontal, resolution_vertical, photos,
                   processor_id, ram, rom FROM smartphones;
        `);

        console.log(rows);

        const smartphones: Promise<Smartphone>[] = rows.map(async (row: ResponseSmartphone) => ({
            ...row,
            processor: row.processor_id ? await this.getProcessor(row.processor_id) : null,
            gnss: await this.getGnss(row.id),
            max_video_capture_resolutions: await this.getMaxVideoCaptureResolutions(row.id),
        }));

        return Promise.all(smartphones);
    }

    async getSmartphone(smartphone_id: number): Promise<Smartphone> {
        const { rows }: { rows: ResponseSmartphone[] } = await this.client.query(
            `
            SELECT smartphone_id as id, vendor, model, width, height, thick, weight, resistance, display_type,
                   diagonal, resolution_horizontal, resolution_vertical, photos,
                   processor_id, ram, rom FROM smartphones WHERE smartphone_id=$1;
        `,
            [smartphone_id],
        );

        const smartphone: Smartphone = {
            ...rows[0],
            processor: await this.getProcessor(rows[0].processor_id),
            gnss: await this.getGnss(smartphone_id),
            max_video_capture_resolutions: await this.getMaxVideoCaptureResolutions(smartphone_id),
        };

        return smartphone;
    }

    async getProcessor(processor_id: number): Promise<Processor> {
        const { rows }: { rows: ResponseProcessor[] } = await this.client.query(
            `SELECT vendor, model, processor_id as id FROM processors WHERE processor_id=$1`,
            [processor_id],
        );
        const processor: Processor = {
            ...rows[0],
            clusters: await this.getClusters(processor_id),
        };

        return processor;
    }

    async getClusters(processor_id: number): Promise<ProcessorCluster[]> {
        const { rows }: { rows: ProcessorCluster[] } = await this.client.query(
            `SELECT  processor_cores.vendor, processor_cores.model, quantity, frequency FROM processors
             JOIN processor_clusters ON processors.processor_id = processor_clusters.processor_id
             JOIN processor_cores ON processor_cores.processor_core_id = processor_clusters.core_id 
             WHERE processors.processor_id=$1`,
            [processor_id],
        );
        return rows;
    }

    async getGnss(smartphone_id: number): Promise<Gnss[]> {
        const query: QueryArrayConfig = {
            text: `SELECT name, frequency FROM gnss WHERE smartphone_id=$1`,
            values: [smartphone_id],
            rowMode: 'array',
        };
        const { rows }: { rows: Gnss[] } = await this.client.query(query);
        return rows;
    }

    async getMaxVideoCaptureResolutions(smartphone_id: number): Promise<VideoResolutions[]> {
        const { rows }: { rows: VideoResolutions[] } = await this.client.query(
            `SELECT horizontal, vertical, fps FROM max_video_capture_resolutions WHERE smartphone_id=$1`,
            [smartphone_id],
        );
        return rows;
    }

    async addSmartphone(smartphone: Partial<Smartphone>) {
        const {
            vendor,
            model,
            weight,
            diagonal,
            width,
            height,
            thick,
            resistance,
            display_type,
            resolution_horizontal,
            resolution_vertical,
            processor_id,
            ram,
            rom,
        } = smartphone;
        await this.client.query(
            `INSERT INTO smartphones (
                vendor, model, weight, diagonal, width, height, thick, resistance, display_type, 
                resolution_horizontal, resolution_vertical, processor_id, ram, rom
             ) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) on conflict do nothing`,
            [
                vendor,
                model,
                weight,
                diagonal,
                width,
                height,
                thick,
                resistance,
                display_type,
                resolution_horizontal,
                resolution_vertical,
                processor_id,
                ram,
                rom,
            ],
        );
    }
}
