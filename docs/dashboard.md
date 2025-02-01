# Dashboard Spec

## Dashboard overview

Endpoint : GET /dashboard/overview

```json
{
    
}
```



## Get Monthly Statistic

Endpoint : GET /dashboard/statistic?year=2024

Response Body (success):

```json
{
    "year": 2024,
    "monthlyStats": [
        { "month": "January", "totalRevenue": 200000, "newUsers": 50, "totalOrders": 60 },
        { "month": "February", "totalRevenue": 250000, "newUsers": 70, "totalOrders": 80 },
        { "month": "March", "totalRevenue": 300000, "newUsers": 90, "totalOrders": 100 }
    ]
}
```



## Get Recent Orders

Endpoint : GET /dashboard/recent-orders?page=1&limit=10

Response Body (success):

```json
{
    "currentPage": 1,
    "totalPages": 5,
    "totalOrders": 50,
    "payment": [
        {
            "id": 12,
            "room_name": "Ruang Meeting 5",
            "price": 3000,
            "quantity": 3,
            "amount": 9000,
            "status": "active"
        },
        {
            "id": 13,
            "room_name": "Ruang Meeting 3",
            "price": 1000,
            "quantity": 2,
            "amount": 2000,
            "status": "cancelled"
        },
    ]
}
```



## Get Top Room selling

Endpoint : GET /dashboard/top-products?limits=3

Response Body (success):

```json
{
    "top_products": [
        { "room_name": "Ruang Meeting 5", "quantity": 3, "amount": 9000 },
        { "room_name": "Kantor lt. 3", "quantity": 3, "amount": 7500 },
        { "room_name": "Ruang Meeting 3", "quantity": 2, "amount": 2000 }
    ]
}
```


