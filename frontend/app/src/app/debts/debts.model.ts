export interface  Debtor {
    id: number,
    kv: string | null,
    ls: string,
    fio: string | null,
    otk: string | null,
    zak: string | null,
    dom: string | null,
    pr: string | null,
    gorod?: string,
}

export interface Debt {
    id: number,
    period: string,
    nacis: number | null,
    korekt: number | null,
    pen: number | null,
    dolgsud: number | null,
    opl: number | null,
    sitog: number | null,
    ls: string,
    ish_saldo: number | null,
}

export interface  DebtorFilter {
    gorod: string,
    ls: string | null,
    fio: string | null,
    dom: string | null,
}
export interface  DebtFilter {
    min_period: { value: string, date: Date | undefined, text: string },
    max_period: { value: string, date: Date | undefined, text: string },
}