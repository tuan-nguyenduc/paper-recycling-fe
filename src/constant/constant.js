// export const API_URL = 'https://paper-recycling-be.vinhomes.co.uk/api/v1';
export const API_URL = "http://localhost:3000/api/v1"
export const PROFILE_STORAGE_KEY = 'access-token';

export const DEFAULT_AVATAR_IMG = "https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg"
export const productFilters = [{
    text: "All Products", code: "all", filter: {
        sortBy: "", sortDirection: ""
    }
}, {
    text: "New", code: "new", filter: {
        sortBy: "createdAt", sortDirection: "DESC"
    }
}, {
    text: "High price", code: "high-price", filter: {
        sortBy: "price", sortDirection: "DESC"
    }
}, {
    text: "Low price", code: "low-price", filter: {
        sortBy: "price", sortDirection: "ASC",
    }
},]

export const allOrderStatus = {
    CREATED: 1,
    SHIPPING: 2,
    COMPLETED: 3,
    CANCELLED: -1,
}





