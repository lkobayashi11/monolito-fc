import InvoiceFacade from "../facade/invoice.facade";
import { InvoiceRepository } from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

export class InvoiceFacadeFactory {
    static create() {
      const invoiceRepository = new InvoiceRepository();
      const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
      const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
  
      return new InvoiceFacade({
        findUseCase: findInvoiceUseCase,
        generateUseCase: generateInvoiceUseCase,
      });
    }
  }