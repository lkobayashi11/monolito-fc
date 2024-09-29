import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = () => ({
    generate: jest.fn(),
    find: jest.fn(),
  });
  
  describe('Unit test Generate invoice use case', () => {
    it('should Generate an invoice', async () => {
      const invoiceRepository = MockRepository();
      const generateInvoiceUseCase = new GenerateInvoiceUseCase(invoiceRepository);
      const input = {       
        name: 'João da Silva',
        document: '123456789',
        street: 'Rua 1',
        number: '123',
        complement: 'Casa',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '12345678',
        items: [
          {
            id: '1',
            name: 'Item 1',
            price: 10,
          },
          {
            id: '2',
            name: 'Item 2',
            price: 20,
          },
        ],
      };
  
      const output = await generateInvoiceUseCase.execute(input);
  
      expect(invoiceRepository.generate).toBeCalledTimes(1);      
      expect(output.name).toBe(input.name);
      expect(output.document).toBe(input.document);
      expect(output.street).toBe(input.street);
      expect(output.number).toBe(input.number);
      expect(output.complement).toBe(input.complement);
      expect(output.city).toBe(input.city);
      expect(output.state).toBe(input.state);
      expect(output.zipCode).toBe(input.zipCode);
      expect(output.items.length).toBe(input.items.length); 
      expect(output.items[0].id).toBe(input.items[0].id);     
      expect(output.items[0].name).toBe(input.items[0].name);
      expect(output.items[0].price).toBe(input.items[0].price);
      expect(output.items[1].id).toBe(input.items[1].id);     
      expect(output.items[1].name).toBe(input.items[1].name);
      expect(output.items[1].price).toBe(input.items[1].price);
      expect(output.total).toBe(30);
    });
  })
