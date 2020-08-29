import {writable} from 'svelte/store';

export const charities = writable([]);
export const charity = writable({});
export const loaders = writable(false);

async function getCharities() {
    const res  = await fetch("https://charity-api-bwa.herokuapp.com/charities/");

    if (res.ok) {
        charities.set(await res.json());
    } else {
        throw new Error(data)
    }
}

getCharities();

export async function getCharity(id) {
    const res = await fetch(`https://charity-api-bwa.herokuapp.com/charities/${id}`);

    if (res.ok) {
        charity.set(await res.json());
    } else {
        throw new Error(data)
    }
}

export async function Loaders(condition) {
    setTimeout(() => {
        loaders.set(condition)
    }, 1500)
}