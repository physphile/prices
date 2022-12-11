import pg, { QueryArrayConfig } from 'pg';
const { Client } = pg;
import { Processor, ProcessorCluster, Satellite, Smartphone, VideoResolutions } from '../models/models.js';
import { ALL, Query } from '../utils/Query.js';
import { config } from './config.js';

export class Api {
    client = new Client(config);

    async connect() {
        await this.client.connect();
        return this;
    }

    async end() {
        await this.client.end();
    }

    async getSmartphones() {
        const rows = await new Query(this.client).select(ALL).from('smartphones').get();
        const smartphones = rows.map(async (row: Smartphone) => ({
            ...row,
            photos: await this.getSmartphonePhotos(row.id),
            processor: await this.getProcessor(row.processor_id),
            gnss: await this.getGnss(row.id),
            maxVideoCaptureResolutions: await this.getMaxVideoCaptureResolutions(row.id),
        }));
        return Promise.all(smartphones);
    }

    async getSmartphone(id: number): Promise<Smartphone[]> {
        const rows = await new Query(this.client).select(ALL).from('smartphones').where('id').equals(id).get();
        const smartphone = {
            ...rows[0],
            processor: await this.getProcessor(rows[0].processor_id),
            photos: await this.getSmartphonePhotos(id),
            gnss: await this.getGnss(id),
            max_video_capture_resolutions: await this.getMaxVideoCaptureResolutions(id),
        };
        return await smartphone;
    }

    async getSmartphonePhotos(smartphone_id: number): Promise<string[]> {
        const rows = await new Query(this.client)
            .select('src')
            .from('photos')
            .where('smartphone_id')
            .equals(smartphone_id)
            .get({ rowMode: 'array' });
        return rows.reduce((acc: string[], row: string[]) => [...acc, row[0]], []);
    }

    async getProcessors(): Promise<Processor[]> {
        const rows = await new Query(this.client).select(ALL).from('processors').get();

        const processors = rows.map(async (row: Processor) => ({
            ...row,
            clusters: await this.getClusters(row.id),
        }));

        return Promise.all(processors);
    }

    async getProcessor(id: number): Promise<Processor> {
        const rows = await new Query(this.client).select(ALL).from('processors').where('id').equals(id).get();
        const processor = {
            ...rows[0],
            clusters: await this.getClusters(id),
        };

        return await processor;
    }

    async getClusters(id: number): Promise<ProcessorCluster[]> {
        const { rows } = await this.client.query(
            `SELECT  processor_cores.vendor, processor_cores.model, quantity, frequency FROM processors
                 JOIN processor_clusters ON processors.id = processor_clusters.processor_id
                 JOIN processor_cores ON processor_cores.id = processor_clusters.core_id WHERE processors.id=$1`,
            [id],
        );
        return rows;
    }

    async getGnss(id: number): Promise<Satellite[]> {
        return await new Query(this.client)
            .select('name', 'frequency')
            .from('gnss')
            .where('smartphone_id')
            .equals(id)
            .get({ rowMode: 'array' });
    }

    async getMaxVideoCaptureResolutions(id: number): Promise<VideoResolutions[]> {
        return await new Query(this.client)
            .select('horizontal', 'vertical', 'fps')
            .from('max_video_capture_resolutions')
            .where('smartphone_id')
            .equals(id)
            .get();
    }
}
