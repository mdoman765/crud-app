# 📦 ProductHub — Angular CRUD App

> A professional **Product Inventory Management** web application built with **Angular 21**, **.NET Core 8 Web API**, and **SQL Server**.  
> Features full CRUD operations, image upload with drag & drop, real-time search & filtering, and a clean Azure/Blue UI theme.

---

## 🖥️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 21 (Standalone Components) |
| UI Theme | Angular Material 21 — Azure/Blue |
| Styling | SCSS + CSS Custom Properties |
| Backend | .NET Core 8 Web API |
| Database | Microsoft SQL Server |
| ORM | Entity Framework Core 8 |
| HTTP | Angular HttpClient + RxJS |

---

## ✨ Features

- ✅ **Full CRUD** — Create, Read, Update, Delete products
- 🖼️ **Image Upload** — Drag & drop or click to upload with live preview and progress ring
- 🔍 **Search & Filter** — Real-time search by name/description, filter by category and status
- 📊 **Stats Dashboard** — Total products, active count, low stock alerts, total inventory value
- 🔔 **Toast Notifications** — Success/error feedback on every action
- ⚠️ **Delete Confirmation Modal** — Prevents accidental deletion
- 📱 **Responsive Grid** — Auto-fill card grid adapts to any screen size
- 🏷️ **Low Stock Badge** — Visual warning when stock falls below 10
- 🗑️ **Auto Image Cleanup** — Old image files deleted from server when product is updated or deleted

---

## 📁 Project Structure

```
src/
└── app/
    ├── core/
    │   ├── models/
    │   │   └── product.model.ts          # Product TypeScript interfaces
    │   └── services/
    │       ├── product.service.ts        # Product CRUD API calls
    │       └── upload.service.ts         # Image upload API calls
    ├── features/
    │   └── products/
    │       ├── product-list/             # List page (Read + Delete)
    │       └── product-form/             # Create & Edit page
    ├── shared/
    │   ├── components/
    │   │   ├── navbar/                   # Top navigation bar
    │   │   ├── toast/                    # Success/error notifications
    │   │   └── image-upload/             # Drag & drop image widget
    │   └── services/
    │       └── toast.service.ts          # Toast notification service
    ├── app.component.ts                  # Root shell component
    ├── app.routes.ts                     # Route definitions
    └── app.config.ts                     # App-wide providers
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v24.13.0 or higher
- [Angular CLI](https://angular.dev/tools/cli) v21.1.4
- [.NET SDK](https://dotnet.microsoft.com/) v8.0 or higher
- [SQL Server](https://www.microsoft.com/en-us/sql-server) (LocalDB, Express, or full)

---

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ProductHub.git
cd ProductHub
```

---

### 2. Set up the database

Open **SQL Server Management Studio** (or any SQL client) and run:

```sql
CREATE DATABASE CrudAppDB;
GO

USE CrudAppDB;
GO

CREATE TABLE Products (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Name        NVARCHAR(200)  NOT NULL,
    Description NVARCHAR(1000) NULL,
    Price       DECIMAL(18,2)  NOT NULL DEFAULT 0,
    Category    NVARCHAR(100)  NULL,
    Stock       INT            NOT NULL DEFAULT 0,
    IsActive    BIT            NOT NULL DEFAULT 1,
    ImageUrl    NVARCHAR(500)  NULL,
    CreatedAt   DATETIME2      NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt   DATETIME2      NULL
);
GO
```

---

### 3. Configure & run the backend

```bash
cd backend/CrudApp.API
```

Update the connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=CrudAppDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

> **SQL Server Authentication?** Use:  
> `"Server=localhost;Database=CrudAppDB;User Id=sa;Password=YourPassword;TrustServerCertificate=True;"`

Run the backend:

```bash
dotnet run
```

Backend runs at: `http://localhost:5000`  
Swagger UI available at: `http://localhost:5000/swagger`

---

### 4. Install & run the frontend

```bash
cd frontend/crud-app
npm install
ng serve
```

Open your browser at: **`http://localhost:4200`**

The app hot-reloads automatically on any file change.

---

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/products` | Get all products (supports `?search=`, `?category=`, `?isActive=`) |
| `GET` | `/api/products/{id}` | Get product by ID |
| `GET` | `/api/products/categories` | Get all distinct categories |
| `POST` | `/api/products` | Create new product |
| `PUT` | `/api/products/{id}` | Update existing product |
| `DELETE` | `/api/products/{id}` | Delete product (also removes image file) |
| `POST` | `/api/upload` | Upload image file → returns `{ url }` |
| `DELETE` | `/api/upload?fileName=` | Delete image file from server |

---

## 🖼️ Image Upload

Images are uploaded **before** saving the product:

1. User drags & drops or clicks to pick an image
2. File is sent to `POST /api/upload` (max **5 MB**, JPG/PNG/WEBP/GIF)
3. Server saves it to `wwwroot/images/` with a UUID filename
4. Server returns `{ url: "http://localhost:5000/images/uuid.jpg" }`
5. URL is stored in the product form and saved with the product record
6. When a product is **updated** or **deleted**, the old image file is automatically removed from disk

---

## 🏗️ Build for Production

```bash
ng build
```

Build artifacts are output to the `dist/` directory. The production build is optimized for performance and speed.

---

## 🧪 Running Tests

### Unit tests

```bash
ng test
```

### End-to-end tests

```bash
ng e2e
```

> Angular CLI does not include an e2e framework by default. Add [Cypress](https://www.cypress.io/) or [Playwright](https://playwright.dev/) as needed.

---

## 🔧 Environment Configuration

| File | Used For |
|---|---|
| `src/environments/environment.ts` | Development — points to `http://localhost:5000/api` |
| `src/environments/environment.prod.ts` | Production — update with your live API URL |

---

## 📸 Screenshots

| Page | Description |
|---|---|
| Product List | Grid view with stats, search, category & status filters |
| Add Product | Form with drag & drop image upload, validation |
| Edit Product | Pre-filled form with existing image preview |
| Delete Modal | Confirmation dialog before permanent deletion |

---

## 📜 Scripts Reference

| Command | Description |
|---|---|
| `ng serve` | Start local development server at `http://localhost:4200` |
| `ng build` | Build for production into `dist/` |
| `ng test` | Run unit tests |
| `ng generate component name` | Scaffold a new component |
| `ng generate service name` | Scaffold a new service |
| `dotnet run` | Start the .NET backend API |
| `dotnet build` | Build the .NET project |

---

## 📚 Additional Resources

- [Angular Documentation](https://angular.dev)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [Angular Material](https://material.angular.dev)
- [.NET Core Web API Docs](https://learn.microsoft.com/en-us/aspnet/core/web-api)
- [Entity Framework Core](https://learn.microsoft.com/en-us/ef/core)
- [RxJS Documentation](https://rxjs.dev)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.
