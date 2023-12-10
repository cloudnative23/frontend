export default [
  {
    id: 10,
    date: "2023-10-22",
    workStatus: false,
    status: "available",
    stations: [
      {
        id: 3,
        name: "台積電新竹3廠東側門",
        datetime: "2023-10-22T17:30",
        "on-passengers": [2, 4],
        "off-passengers": [],
      },
      {
        id: 1,
        name: "台北車站",
        datetime: "2023-10-22T17:50",
        "on-passengers": [],
        "off-passengers": [2],
      },
      {
        id: 2,
        name: "台大校門口",
        datetime: "2023-10-22T18:10",
        "on-passengers": [],
        "off-passengers": [4],
      },
    ],
    carInfo: {
      model: "Tesla Model 3",
      color: "紅色",
      capacity: 4,
      licensePlateNumber: "ABC-1234",
    },
    passengers: [
      {
        id: 2,
        name: "Bill Gates",
        phone: "0982104928",
        avatar: "https://i.imgur.com/yXOvdOSs.jpg",
      },
      {
        id: 4,
        name: "Paul",
        phone: "0954201859",
        avatar: "https://i.imgur.com/yXOvdOSs.jpg",
      },
    ],
    driver: {
      id: 3,
      name: "John James",
      avatar: "https://i.imgur.com/yXOvdOSs.jpg",
      phone: "0928123456",
    },
  },
];
