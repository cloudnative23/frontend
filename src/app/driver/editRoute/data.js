export default [
    {
        "id": 10,
        "date": "2023-10-22",
        "workStatus": false,
        "status": "available",
        "stations": [
            {
                "id": 3,
                "name": "台積電新竹3廠東側門",
                "datetime": "2023-10-22T17:30",
                "on": [
                    2,
                    4
                ],
                "off": []
            },
            {
                "id": 1,
                "name": "台北車站",
                "datetime": "2023-10-22T17:50",
                "on": [],
                "off": [
                    2
                ]
            },
            {
                "id": 2,
                "name": "台大校門口",
                "datetime": "2023-10-22T18:10",
                "on": [],
                "off": [
                    4
                ]
            }
        ],
        "carInfo": {
            "color": "紅色",
            "capacity": 4,
            "licensePlateNumber": "ABC-1234"
        },
        "passengers": [
            {
                "id": 2,
                "name": "Bill Gates",
                "phone": "0982104928"
            },
            {
                "id": 4,
                "name": "Paul",
                "phone": "0954201859"
            }
        ],
        "driver": {
            "id": 3,
            "name": "John James",
            "avatar": "https://example.com/avatar.png",
            "phone": "0928123456"
        }
    }
]