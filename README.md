# 🏡 HomyHub

**HomyHub** is a full-featured house renting and selling web application where users can explore properties, filter and sort listings, contact owners, and manage their own listings. Whether you’re looking to rent, buy, or list your own property, HomyHub makes real estate interaction smooth and user-friendly.

---

## 🚀 Features

- 🏠 **Rent or Sell Properties**: Users can list properties for rent or sale.
- 🔍 **Advanced Filters**: Filter listings by:
  - Rent or Sale
  - Budget Range
  - Amenities (e.g., Wi-Fi, Parking, Furnished, etc.)
- ↕️ **Sort Listings**: Sort by price (Low to High / High to Low).
- 📧 **Contact Owners**: Users can contact property owners via email.
- 👤 **Profile Management**:
  - Google OAuth Sign-in
  - Change profile picture
  - See all rented/sold listings in the profile.
- 📱 **Responsive Design**: Fully responsive and mobile-friendly interface.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- React Router
- Axios

**Backend:**
- Node.js
- Express.js
- MongoDB (via Mongoose)

**Authentication:**
- Google OAuth (using Firebase or NextAuth)

**Other Tools:**
- Cloudinary or Firebase Storage (for image uploads)
- Nodemailer (for sending emails to owners)
- dotenv (for environment management)

---

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/4eaf25ea-91dc-4201-b3fd-551872b89f88)

![image](https://github.com/user-attachments/assets/6fe8e998-d895-4580-8851-d87b7035a84d)

![image](https://github.com/user-attachments/assets/f4d149eb-382d-4464-903b-cf1d1931c4e6)

![image](https://github.com/user-attachments/assets/ee5e48d8-2c23-42f7-9e45-d8c68ba17891)



---

## 📂 Folder Structure

```
homyhub/
├── client/                # React frontend
│   ├── components/
│   ├── pages/
│   ├── public/
│   └── styles/
├── server/                # Express backend
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── utils/
├── .env
├── README.md
└── package.json
```

---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas (or local instance)
- Cloudinary / Firebase (for image uploads)
- Google Firebase Console (for OAuth)
- Nodemailer credentials (for sending emails)

---

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/your-username/homyhub.git
cd homyhub
```

2. **Install Dependencies**

```bash
# Backend
cd server
npm install

# Frontend
cd ../client
npm install
```

3. **Set Up Environment Variables**

Create `.env` files in `server/` and `client/`.

**Example `server/.env`:**

```
PORT=5000
MONGO_URI=your_mongodb_uri
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

**Example `client/.env`:**

```
REACT_APP_BACKEND_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_domain
```

4. **Run Development Servers**

```bash
# Backend
cd server
npm run dev

# Frontend
cd ../client
npm start
```

---

## 🧭 Core Functionalities Overview

### 🏘 Property Listings

- Add new listing (rent or sale)
- Upload multiple photos
- Include amenities and pricing
- Automatically visible to all users

### 🔍 Search & Filter

- Filter by purpose: Rent / Sale
- Filter by:
  - Budget range
  - Amenities
- Sort by:
  - Price Low → High
  - Price High → Low

### 📨 Contact Owner

- Contact button opens up a pre-filled email form
- Sends email to owner via Nodemailer or `mailto:` fallback

### 👤 User Profile

- Sign in using Google OAuth
- Change profile picture
- View all your listings
- Listings that are rented/sold will be marked and shown in profile

---

## 🔐 Authentication

- Google OAuth using Firebase Authentication or NextAuth
- Secure routes and backend access tokens

---

## 🛣️ API Endpoints

**Authentication**
- `POST /api/auth/google` - Authenticate using Google OAuth

**Listings**
- `GET /api/listings` - Get all listings
- `POST /api/listings` - Create new listing
- `GET /api/listings/:id` - Get specific listing
- `PUT /api/listings/:id` - Update a listing
- `DELETE /api/listings/:id` - Delete a listing

**User**
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `GET /api/user/listings` - Listings posted by user

**Contact**
- `POST /api/contact` - Send email to owner

---

## ✅ Future Enhancements

- 🗺️ Map integration (Google Maps API)
- 🛎️ Notifications when someone contacts you
- 📝 Reviews and Ratings for listings
- 🏷️ Bookmark or save listings
- 📱 Mobile app with React Native

---

## 🤝 Contributing

Pull requests are welcome! For major changes, open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ✉️ Contact

For any queries or feedback, reach out to:

**ASTHA SINGH**  
📧 asthas418@gmail.com 

