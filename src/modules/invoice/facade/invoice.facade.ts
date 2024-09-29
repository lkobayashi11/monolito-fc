import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacadeInterface, { InputFindInvoiceFacadeDto, InputGenerateInvoiceFacadeDto, OutputFindInvoiceFacadeDto, OutputGenerateInvoiceFacadeDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    findUseCase: FindInvoiceUseCase;
    generateUseCase: GenerateInvoiceUseCase;
  }

  export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _findUseCase: FindInvoiceUseCase;
    private _generateUseCase: GenerateInvoiceUseCase;
  
    constructor(props: UseCaseProps) {
      this._findUseCase = props.findUseCase;
      this._generateUseCase = props.generateUseCase;
    }

    async find(id: InputFindInvoiceFacadeDto): Promise<OutputFindInvoiceFacadeDto> {
        return await this._findUseCase.execute(id);}
    async generate(input: InputGenerateInvoiceFacadeDto): Promise<OutputGenerateInvoiceFacadeDto> {
        return await this._generateUseCase.execute(input);
    }    
}
