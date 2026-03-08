# 🔗 URL Shortener

A simple **URL Shortener Web Application** built using **Node.js, Express.js, SQL, and MongoDB (Mongoose)**.
This project allows users to convert long URLs into short, shareable links and redirect users to the original URL when accessed.

---

## 🚀 Features

* Shorten long URLs into compact links
* Redirect short URLs to the original destination
* Store and manage URLs in a database
* Simple and clean UI using EJS templates
* Fast server built with Express
* Static assets support

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** SQL + MongoDB (Mongoose)
* **Templating Engine:** EJS
* **Other:** dotenv, body-parser / express.urlencoded

---

## 📂 Project Structure

```
url-shortener/
│
├── config/
│   └── env.js
│
├── routes/
│   └── shortner.routes.js
│
├── models/
│   └── url.model.js
│
├── public/
│   └── (static files)
│
├── views/
│   └── (EJS templates)
│
├── app.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/url-shortener.git
```

2. **Navigate to the project directory**

```bash
cd url-shortener
```

3. **Install dependencies**

```bash
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file in the root directory.

Example:

```
PORT=3000
MONGO_URI=your_mongodb_connection_string
SQL_URI=your_sql_database_connection
```

---

## ▶️ Running the Project

Start the development server:

```bash
npm start
```

or

```bash
node app.js
```

Server will run at:

```
http://localhost:3000
```

---

## 🔄 How It Works

1. User enters a **long URL**.
2. Server generates a **unique short ID**.
3. The mapping between **short URL and original URL** is stored in the database.
4. When someone visits the short URL:

   * The server finds the original URL
   * Redirects the user to the original site.

---

## 📌 Example

Original URL:

```
https://www.example.com/some/very/long/url
```

Shortened URL:

```
http://localhost:3000/abc123
```

---

## 📷 Future Improvements

* Add **user authentication**
* Track **analytics (click counts)**
* Custom short URLs
* Rate limiting
* URL expiration
* REST API support

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by **Your Name**

If you like this project, consider giving it a ⭐ on GitHub!
