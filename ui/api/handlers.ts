import { Smartphone } from "../models/models";

const REQUEST_URL = "http://api.physphile.ru";

export async function getSmartphones(...filters: string[]) {
    const query = filters.map((filter) => `filter=${filter}`).join("&");
    const res = await fetch(`${REQUEST_URL}/smartphones?${query}`);
    const smartphones: Smartphone[] = await res.json();
    return smartphones;
}
