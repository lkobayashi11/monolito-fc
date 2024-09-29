import Address from "../../../@shared/domain/value-object/address";
import Id from "../../../@shared/domain/value-object/id.value-object";
import { InvoiceItems } from "../../domain/invoice-items.entity";
import Invoice from "../../domain/invoice.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";


const invoice = new Invoice({
    id: new Id('123'),
    name: 'João da Silva',
    document: '12345678900',
    address: new Address({
      street: 'Rua 1',
      number: '123',
      complement: 'Casa',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '12345678',
    }),
    items: [
      new InvoiceItems({
        id: new Id('123'),
        name: 'Item 1',
        price: 100,
      }),
      new InvoiceItems({
        id: new Id('456'),
        name: 'Item 2',
        price: 200,
      }),
    ]
  });

  const MockRepository = () => ({
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  });
  
  describe('Unit test Find invoice use case', () => {
    it('should find an invoice', async() => {
      const invoiceRepository = MockRepository();
      const findInvoiceUseCase = new FindInvoiceUseCase(invoiceRepository);
  
      const input = {
        id: '123',
      };
  
      const output = await findInvoiceUseCase.execute(input);
  
      expect(invoiceRepository.find).toBeCalledTimes(1);
      expect(output.id).toBe(invoice.id.id);
      expect(output.name).toBe(invoice.name);
      expect(output.document).toBe(invoice.document);
      expect(output.address.street).toBe(invoice.address.street);
      expect(output.address.number).toBe(invoice.address.number);
      expect(output.address.complement).toBe(invoice.address.complement);
      expect(output.address.city).toBe(invoice.address.city);
      expect(output.address.state).toBe(invoice.address.state);
      expect(output.address.zipCode).toBe(invoice.address.zipCode);
      expect(output.items.length).toBe(invoice.items.length);
      expect(output.items[0].id).toBe(invoice.items[0].id.id);
      expect(output.items[0].name).toBe(invoice.items[0].name);
      expect(output.items[0].price).toBe(invoice.items[0].price);
      expect(output.items[1].id).toBe(invoice.items[1].id.id);
      expect(output.items[1].name).toBe(invoice.items[1].name);
      expect(output.items[1].price).toBe(invoice.items[1].price);
      expect(output.total).toBe(invoice.total);
    });
  });