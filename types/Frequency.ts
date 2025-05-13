export type FrequencyValue = '2h' | '3h' | '4h' | '6h' | '8h' | '1d' | '2dx' | '1w' | '2wx' | '3wx' | '1m' | '2mx';

export type FrequencyOption = {
    label: string;
    value: FrequencyValue;
};

export const frequencyOptions: FrequencyOption[] = [
    {label: 'A cada 2 horas', value: '2h'},
    {label: 'A cada 3 horas', value: '3h'},
    {label: 'A cada 4 horas', value: '4h'},
    {label: 'A cada 6 horas', value: '6h'},
    {label: 'A cada 8 horas', value: '8h'},
    {label: '1 vez ao dia', value: '1d'},
    {label: '2 vezes ao dia', value: '2dx'},
    {label: '1 vez por semana', value: '1w'},
    {label: '2 vezes por semana', value: '2wx'},
    {label: '3 vezes por semana', value: '3wx'},
    {label: '1 vez por mês', value: '1m'},
    {label: '2 vezes por mês', value: '2mx'},
];

export const frequencyToHours: Record<FrequencyValue, number> = {
    '2h': 2,
    '3h': 3,
    '4h': 4,
    '6h': 6,
    '8h': 8,
    '1d': 24,
    '2dx': 12,       // 2x/dia = a cada 12h
    '1w': 168,       // 1x/semana = 7 * 24h
    '2wx': 84,       // 2x/semana = a cada 3.5 dias = 84h
    '3wx': 56,       // 3x/semana = a cada ~2.33 dias
    '1m': 720,       // 1x/mês ≈ 30 dias
    '2mx': 360,      // 2x/mês ≈ a cada 15 dias
};