export interface Product {
    id: number;
    name: string;
}

export interface NettingType {
    id?: number;
    tenantId: number;
    name: string;
    description: string;
    updatedOn: Date;
    updatedBy: string;
    isActive: boolean;
    nettingTypeProduct:[];
}