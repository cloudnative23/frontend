export default [
    {
      "id": 11,
      "status": "new",
      "date": "2023-10-25",
      "workStatus": true,
      "passenger": {
        "id": 10,
        "name": "John James",
        "avatar": "https://example.com/avatar.png"
      },
      "route": {
        "id": 10,
        "date": "2023-10-22",
        "workStatus": false,
        "status": "available",
        "on": {
          "id": 3,
          "name": "台積電新竹3廠東側門"
        },
        "off": {
          "id": 2,
          "name": "台大校門口"
        },
        "stations": [
          {
            "id": 3,
            "name": "台積電新竹3廠東側門",
            "datetime": "2023-10-22T17:30"
          },
          {
            "id": 1,
            "name": "台北車站",
            "datetime": "2023-10-22T17:50"
          },
          {
            "id": 2,
            "name": "台大校門口",
            "datetime": "2023-10-22T18:10"
          }
        ],
        "carInfo": {
          "color": "紅色",
          "capacity": 4,
          "licensePlateNumber": "ABC-1234"
        },
        "driver": {
          "id": 3,
          "name": "John James",
          "avatar": "https://i.imgur.com/yXOvdOSs.jpg",
          "phone": "0928123456"
        }
      },
      "on": {"id":1,"name":"台北車站"},
      "off": {"id": 3, "name": "台積電新竹3廠東側門"},
    },
    {
      "id": 12,
      "status": "new",
      "date": "2023-10-25",
      "workStatus": true,
      "passenger": {
        "id": 10,
        "name": "John James",
        "avatar": "https://example.com/avatar.png"
      },
      "route": {
        "id": 10,
        "date": "2023-10-22",
        "workStatus": false,
        "status": "available",
        "on": {
          "id": 3,
          "name": "台積電新竹3廠東側門"
        },
        "off": {
          "id": 2,
          "name": "台大校門口"
        },
        "stations": [
          {
            "id": 3,
            "name": "台積電新竹3廠東側門",
            "datetime": "2023-10-22T17:30"
          },
          {
            "id": 1,
            "name": "台北車站",
            "datetime": "2023-10-22T17:50"
          },
          {
            "id": 2,
            "name": "台大校門口",
            "datetime": "2023-10-22T18:10"
          }
        ],
        "carInfo": {
          "color": "紅色",
          "capacity": 4,
          "licensePlateNumber": "ABC-1234"
        },
        "driver": {
          "id": 3,
          "name": "John James",
          "avatar": "https://i.imgur.com/yXOvdOSs.jpg",
          "phone": "0928123456"
        }
      },
      "on": {"id":1,"name":"台北車站"},
      "off": {"id": 3, "name": "台積電新竹3廠東側門"},
    }
]