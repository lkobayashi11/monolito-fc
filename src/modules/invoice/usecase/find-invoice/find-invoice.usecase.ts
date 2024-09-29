import Address from "../../../@shared/domain/value-object/address"
import UseCaseInterface from "../../../@shared/usecase/use-case.interface"
import InvoiceGatewayInterface from "../../gateway/invoice.gateway"
import { FindInvoiceUseCaseInputDto, FindInvoiceUseCaseOutputDto } from "./find-invoice.usecase.dto"

export default class FindInvoiceUseCase implements UseCaseInterface{
    constructor(private _invoiceRepository: InvoiceGatewayInterface) {};  

    async execute(input: FindInvoiceUseCaseInputDto): Promise<FindInvoiceUseCaseOutputDto> {

        const result = await this._invoiceRepository.find(input.id)

        return {
            id: result.id.id,
            name: result.name,  
            document: result.document,
             address: new Address({
                street : result.address.street,
                number :   result.address.number,
                complement:  result.address.complement,
                city: result.address.city,
                state: result.address.state,
                zipCode: result.address.zipCode
             }),
             items: result.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,            
              })),
              total: result.total,
              createdAt: result.createdAt,              
        };
    }
}