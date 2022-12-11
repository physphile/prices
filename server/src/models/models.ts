import { Vendors } from './vendors.js';

export interface Smartphone {
    id: number;
    vendor: Vendors;
    model: string;
    releaseDate: string;
    weight: number;
    diagonal: number;
    version: string;
    width: number;
    height: number;
    thick: number;
    resistance: string;
    display_type: string;
    resolution_horizontal: number;
    resolution_vertical: number;
    processor_id: number;
    photos: string[];
}

export interface ProcessorCluster {
    vendor: string;
    model: string;
    quantity: number;
    frequency: number;
}

export interface Processor {
    id: number;
    vendor: string;
    model: string;
    clusters: ProcessorCluster[];
    maxVideoCaptureResolutions: VideoResolutions[];
    gnss: Satellite[];
}

export type Satellite = [string, string];

export interface VideoResolutions {
    horizontal: number;
    vertical: number;
    fps: number;
}

export type TableName = [
    'smartphones',
    'gnss',
    'max_video_capture_resolutions',
    'photos',
    'processor_clusters',
    'processor_cores',
    'processors',
][number];