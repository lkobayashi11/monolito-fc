import Address from "../../../@shared/domain/value-object/address";

type InvoiceItem = {
    id: string;
    name: string;
    price: number;
  };

export interface FindInvoiceUseCaseInputDto {
    id: string;
  }
  
  export interface FindInvoiceUseCaseOutputDto {
    id: string;
    name: string;
    document: string;
    address: Address
    items: InvoiceItem[];
    total: number;
    createdAt: Date;
  }