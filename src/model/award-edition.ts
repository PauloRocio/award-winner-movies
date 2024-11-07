export type AwardEdition = {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    fraudDetectionId: number;
    deliveryOrderId: string;
    externalStoreId: string;
    trackingCode: string;
    errorCode?: string;
};