export interface Paydoc {
    id: number,
    index: number,
    gorod: string,
    rayon?: string,
    ulica?: string,
    dom?: string,
    kv?: string,
    pr?: string,
    period: string,
    ls?: string;
    fio?: string;

    opl_tko: number,
    vh_saldo: number,
    nacis: number,
    kor: number,
    opl: number,
    ish_saldo: number,
    vh_saldo_pen: number,
    pen: number,
    kor_pen: number,
    opl_pen: number,
    ish_saldo_pen: number,

    ad?: string;
    active?: string;
    tip?: string;
    itog: number;
    qr?: string;
    uid?: string;
    dolg_m?: number;

    soob?: string;
    
    vh_saldo_s: number,
    nacis_s: number,
    kor_s: number,
    opl_s: number,
    ish_saldo_s: number,

    itog_vse: number;
    potok?: number;
    nn?: number;
    nns?: number;
}

export interface  PaydocFilter {
    gorod: string | null,
    ls: string | null,
    fio: string | null,
    ad: string | null,
}