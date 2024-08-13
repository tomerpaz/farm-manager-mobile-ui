import { isArrayEmpty, newDate } from "../FarmUtil";

export const infectionLevels = [{ level: 'high', color: '#f44336', dark: '#b71c1c' },
{ level: 'medium', color: '#ff8f00', dark: '#e65100' },
{ level: 'low', color: '#ffeb3b', dark: '#f57f17' },
{ level: 'none', color: '#7cb342', dark: '#1b5e20' }]


export const SCOUT_TYPES = ['scouting', 'trap'];

export function getInfectionLevelColor(infectionLevel, perimeter, type) {
    const level = infectionLevels.find(level => infectionLevel === level.level);
    if (level) {
        if (perimeter && type === 'trap') {
            return 'black'
        } else {
            return perimeter ? level.dark : level.color;
        }
    }
}
export function getPestMonitorInfectionLevelColor(pestMonitors, dark) {
    let color = null;
    infectionLevels.forEach(level => {
        let val = pestMonitors.find(pm => pm.infectionLevel === level.level);
        if (!color && val) {
            color = dark ? level.dark : level.color;
        }
    })
    return color;
}

export function getPointColor(point, scouts, dark) {
    if (point.active === false) {
        return dark && point.type === 'trap' ? 'black' :  'gray';
    } else if (isArrayEmpty(scouts)) {
        return  'white';
    } else {
        const level = scouts[0].infectionLevel
        return getInfectionLevelColor(level, dark, point.type);
    }

}

export function buildScoutPoints(points, scouts) {
    return points?.map(e => {

        const fieldScouts = scouts?.filter(s => s.point.id === e.id)
        const val = { ...e, color: getPointColor(e, fieldScouts, true), fillColor: getPointColor(e, fieldScouts, false) }
        return val;
    });
}

export function newScouting(point, stages, currentYear) {
    return { id: null, point: point, date: newDate(), note: '', finding: null, location: 'none', infectionLevel: "none", value: '', year: currentYear, stage: stages[0] }

}