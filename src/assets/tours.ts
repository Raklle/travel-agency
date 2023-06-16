export interface Tour {
    id: number;
    name: string;
    destination: string;
    startDate: string;
    endDate: string;
    price: number;
    capacity: number;
    avalible:number;
    about:string;
    image: string;
  }
  
  export const tours = [
    {
        id:0,
        name: "Tropem tajemnic Paryża",
        destination: "Francja",
        startDate: "2022-12-10",
        endDate: "2022-12-20",
        price: 1000,
        capacity: 6,
        avalible: 6,
        about:"Zwiedzanie Paryża do omdlenia",
        image: "./image1.png"
    },
    {
        id:1,
        name: "Morski Raj",
        destination: "Karaiby",
        startDate: "2022-6-10",
        endDate: "2022-6-30",
        price: 3000,
        capacity: 4,
        avalible: 4,
        about:"Pobyt w nadmorskim kompleksie na Karaibach, fabryka niezapomnianych wrażeń",
        image: "./image2.png"
    },
    {
        id:2,
        name: "Kraków i ty",
        destination: "Polska",
        startDate: "2022-12-11",
        endDate: "2022-12-12",
        price: 10,
        capacity: 1,
        avalible: 1,
        about:"Super spacer po Krakowie",
        image: "./image3.png"
    },
    {
        id:3,
        name: "Na pewno nie Kraków i ty",
        destination: "Francja",
        startDate: "2022-12-10",
        endDate: "2022-12-20",
        price: 1300,
        capacity: 7,
        avalible: 7,
        about:"To samo co w Krakowie tylko gdzieś we Francji",
        image: "./image4.png"
    },
    {
        id:4,
        name: "Śladami piwa",
        destination: "Czechy",
        startDate: "2022-12-10",
        endDate: "2023-12-20",
        price: 110020,
        capacity: 10,
        avalible: 10,
        about:"Mieszkanie w Czechach przez rok i picie piwa, czego chcieć więcej?",
        image: "./image4.png"
    },
    {
        id:5,
        name: "Tropem tajemnic Paryża",
        destination: "Francja",
        startDate: "2022-12-10",
        endDate: "2022-12-20",
        price: 1001,
        capacity: 5,
        avalible: 5,
        about:"Zwiedzanie Paryża do omdlenia",
        image: "./image1.png"
    },
    {
        id:6,
        name: "Morski Raj",
        destination: "Karaiby",
        startDate: "2022-6-10",
        endDate: "2022-6-30",
        price: 3010,
        capacity: 2,
        avalible: 2,
        about:"Pobyt w nadmorskim kompleksie na Karaibach, fabryka niezapomnianych wrażeń",
        image: "./image2.png"
    },
    {
        id:7,
        name: "Kraków i ty",
        destination: "Polska",
        startDate: "2022-12-11",
        endDate: "2022-12-12",
        price: 19,
        capacity: 10,
        avalible: 10,
        about:"Super spacer po Krakowie",
        image: "./image3.png"
    },
    {
        id:8,
        name: "Na pewno nie Kraków i ty",
        destination: "Francja",
        startDate: "2022-12-10",
        endDate: "2022-12-20",
        price: 1900,
        capacity: 6,
        avalible: 6,
        about:"To samo co w Krakowie tylko gdzieś we Francji",
        image: "./image4.png"
    },
    {
        id:9,
        name: "Śladami piwa",
        destination: "Czechy",
        startDate: "2022-12-10",
        endDate: "2023-12-20",
        price: 110000,
        capacity: 8,
        avalible: 8,
        about:"Mieszkanie w Czechach przez rok i picie piwa, czego chcieć więcej?",
        image: "./image4.png"
    }   
  ];
