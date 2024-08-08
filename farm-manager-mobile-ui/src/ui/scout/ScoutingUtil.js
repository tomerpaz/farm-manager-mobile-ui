import { isArrayEmpty, newDate } from "../FarmUtil";

export const infectionLevels = [{ level: 'high', color: '#f44336', dark: '#b71c1c' },
{ level: 'medium', color: '#ff8f00', dark: '#e65100' },
{ level: 'low', color: '#ffeb3b', dark: '#f57f17' },
{ level: 'none', color: '#7cb342', dark: '#1b5e20' }]


export function getInfectionLevelColor(infectionLevel, dark) {
    const level = infectionLevels.find(level => infectionLevel === level.level);
    if (level) {
        return dark ? level.dark : level.color;
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
        return dark ? 'black' : 'gray';
    } else if (isArrayEmpty(scouts)) {
        return dark ? 'black' : 'white';
    } else {
        const level = scouts[0].infectionLevel
        return getInfectionLevelColor(level, dark);
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