# Firestore Indexes for 24*7 Fresh Store

# Create these indexes in Firebase Console → Firestore → Indexes

## Required Indexes:

### 1. Products Collection
```
Collection: products
Fields: 
- name (ASC)
- category (ASC)
- createdAt (DESC)
```

### 2. Orders Collection  
```
Collection: orders
Fields:
- customerName (ASC)
- createdAt (DESC)
- status (ASC)
```

### 3. Customers Collection
```
Collection: customers
Fields:
- name (ASC)
- createdAt (DESC)
- phone (ASC)
```

### 4. Reviews Collection
```
Collection: reviews
Fields:
- createdAt (DESC)
- status (ASC)
- rating (DESC)
```

### 5. Offers Collection
```
Collection: offers
Fields:
- active (ASC)
- createdAt (DESC)
- endDate (ASC)
```

## How to Create:

1. Go to Firebase Console: https://console.firebase.google.com/
2. Select project: harvest-store-8d206
3. Go to Firestore Database
4. Click "Indexes" tab
5. Click "Create index"
6. Add each index above
7. Wait for indexes to build (usually takes a few minutes)

## Note:
- These indexes are needed for efficient querying
- Without them, Firebase queries may fail or be slow
- Create all indexes for best performance
