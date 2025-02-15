# Booking Form Spec

## Get Available Rooms

Endpoint : GET /rooms/available

Query Param Optional: GET /rooms/available?page=1&limit=5&spaces=meeting-room&prices=1000-3000&startDate=2024-01-15&endDate=2024-01-20

Response Body (success):

```json
{
    "currentPage": 1,
    "totalPages": 3,
    "totalRooms": 15,
    "rooms": [
        {
            "id": "RM001",
            "name": "Premium Meeting Room",
            "spaceType": "meeting-room",
            "pricePerDay": 1500,
            "capacity": 10,
            "availableDates": ["2024-01-15", "2024-01-16", "2024-01-18"],
            "amenities": ["WiFi", "Projector", "Whiteboard"]
        },
        {
            "id": "RM002",
            "name": "Deluxe Conference Room",
            "spaceType": "meeting-room",
            "pricePerDay": 2500,
            "capacity": 20,
            "availableDates": ["2024-01-17", "2024-01-19", "2024-01-20"],
            "amenities": ["WiFi", "Coffee Machine", "Teleconference Setup"]
    }
  ]
}
```

## Get Room Details

Endpoint GET /rooms/:id

Response Body (success):

```json
{
    "id": "RM001",
    "name": "Premium Meeting Room",
    "spaceType": "meeting-room",
    "pricePerDay": 1500,
    "capacity": 10,
    "availableDates": ["2024-01-15", "2024-01-16", "2024-01-18"],
    "amenities": ["WiFi", "Projector", "Whiteboard"],
    "description": "Ruang meeting modern dengan fasilitas lengkap dan nyaman."
}
```
