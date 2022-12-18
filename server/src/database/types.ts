import { Processor, Smartphone } from '../models/models.js';

export type ResponseSmartphone = Omit<Smartphone, 'gnss' | 'processor' | 'max_video_capture_resolutions'>;
export type ResponseProcessor = Omit<Processor, 'clusters'>;
