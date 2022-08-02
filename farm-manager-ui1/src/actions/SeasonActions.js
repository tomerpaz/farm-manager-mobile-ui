import { SELECT_SEASON } from './types';

export function selectSeason(season) {
    return {
        type: SELECT_SEASON,
        payload: season
    };
}