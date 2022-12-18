import { Vendor } from "./vendors.js";

export interface Smartphone {
    id: number;
    version_code: string;
    vendor: Vendor;
    model: string;
    release_date: string;
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
    ram: number;
    rom: number;
    gnss: Gnss[];
    processor: Processor | null;
    max_video_capture_resolutions: VideoResolutions[];
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
}

export type Gnss = [string, string];

export interface VideoResolutions {
    horizontal: number;
    vertical: number;
    fps: number;
}