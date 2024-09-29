import { Sequelize } from "sequelize-typescript"
import Address from "../../@shared/domain/value-object/address";
import Id from "../../@shared/domain/value-object/id.value-object";
import { InvoiceItems } from "../domain/invoice-items.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceModel from "./invoice.model";
import InvoiceItemModel from "./invoice-items.model";
import { InvoiceRepository } from "./invoice.repository";

const input = new Invoice({
    id: new Id("1"),
    name: "João da Silva",
    document: "123456789",
    address: new Address({
        street: "Rua 123",
        number: "99",
        complement: "Jardins",
        city: "São Paulo",
        state: "SP",
        zipCode: "88888-888"
    }),   
    items: [
        new InvoiceItems({
        id: new Id("1"),
        name: "item 1",
        price: 100
        }),             
        new InvoiceItems({
        id: new Id("2"),
        name: "item 2",
        price: 200
        }),       
    ],
 });

 describe ('Invoice Repository Test', () => {
    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
          });
    
        sequelize.addModels([InvoiceModel, InvoiceItemModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
      it('should generate an invoice', async () => {
        const invoiceRepository = new InvoiceRepository();
    
        await invoiceRepository.generate(input);
    
        const output = await InvoiceModel.findOne({
          where: { id: input.id.id },
          include: [InvoiceItemModel]
        });
    
        expect(output.id).toBe(input.id.id);
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.street).toBe(input.address.street);
        expect(output.number).toBe(input.address.number);
        expect(output.complement).toBe(input.address.complement);
        expect(output.city).toBe(input.address.city);
        expect(output.state).toBe(input.address.state);
        expect(output.zipCode).toBe(input.address.zipCode);
        expect(output.items.length).toBe(input.items.length);
        expect(output.items[0].id).toBe(input.items[0].id.id);
        expect(output.items[0].name).toBe(input.items[0].name);
        expect(output.items[0].price).toBe(input.items[0].price);
        expect(output.items[1].id).toBe(input.items[1].id.id);
        expect(output.items[1].name).toBe(input.items[1].name);
        expect(output.items[1].price).toBe(input.items[1].price);
        expect(output.total).toBe(300);
      });
      
      it('should find an invoice', async () => {
        const invoiceRepository = new InvoiceRepository();
    
        await invoiceRepository.generate(input);       
    
        const output = await invoiceRepository.find(input.id.id);
    
        expect(output.id.id).toBe(input.id.id);
        expect(output.name).toBe(input.name);
        expect(output.document).toBe(input.document);
        expect(output.address.street).toBe(input.address.street);
        expect(output.address.number).toBe(input.address.number);
        expect(output.address.complement).toBe(input.address.complement);
        expect(output.address.city).toBe(input.address.city);
        expect(output.address.state).toBe(input.address.state);
        expect(output.address.zipCode).toBe(input.address.zipCode);
        expect(output.items.length).toBe(input.items.length);
        expect(output.items[0].id.id).toBe(input.items[0].id.id);
        expect(output.items[0].name).toBe(input.items[0].name);
        expect(output.items[0].price).toBe(input.items[0].price);
        expect(output.items[1].id.id).toBe(input.items[1].id.id);
        expect(output.items[1].name).toBe(input.items[1].name);
        expect(output.items[1].price).toBe(input.items[1].price);
        expect(output.total).toBe(input.items[0].price + input.items[1].price);
      });

 });