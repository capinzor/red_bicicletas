var Bicycle = require('../../../models/bicycle');

beforeEach(()=>{Bicycle.allBicycles = [];});

describe('Bicycle.allBicycles', ()=> {
    it('comienza vacia', ()=>{
        expect(Bicycle.allBicycles.length).toBe(0);
    });
});

describe('Bicycle.add', ()=> {
    it('agregamos una', ()=>{
        expect(Bicycle.allBicycles.length).toBe(0);

        var a = new Bicycle(1, 'blanco', 'urbana',[4.7097100, -74.1417500]);
        Bicycle.add(a);

        expect(Bicycle.allBicycles.length).toBe(1);
        expect(Bicycle.allBicycles[0]).toBe(a);

    });
});

describe('Bicycle.findById', ()=> {
    it('debe devolver la bici con id 1', ()=>{
        expect(Bicycle.allBicycles.length).toBe(0);

        var aBicy = new Bicycle(1, 'verde', 'urbana');
        var aBicy2 = new Bicycle(2, 'blanco', 'ruta');
        Bicycle.add(aBicy);
        Bicycle.add(aBicy2);

        var targetBicy = Bicycle.findById(1);
        expect(targetBicy.id).toBe(1);
        expect(targetBicy.color).toBe(aBicy.color);
        expect(targetBicy.model).toBe(aBicy.model);

    });
});