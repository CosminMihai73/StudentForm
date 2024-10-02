# Documentație pentru Rularea Aplicației StudentForm

## Introducere
Această documentație te va ghida prin procesul de configurare și rulare a aplicației **StudentForm**, care este împărțită în două componente principale: un **backend** ASP.NET Core și un **frontend** React. Ambele componente sunt organizate în foldere separate în cadrul repository-ului.

## Structura Proiectului
- **StudentFormApi**: Conține codul sursă al backend-ului ASP.NET Core, responsabil pentru logica de afaceri și generarea PDF-urilor.
- **StudentFormClient**: Conține codul sursă al frontend-ului React, care oferă interfața cu utilizatorul.

## Cerințe Prealabile
- **.NET 6.0** sau o versiune mai recentă: Necesare pentru a rula backend-ul ASP.NET Core.
- **Node.js** și **npm**: Necesare pentru a gestiona dependențele și a rula frontend-ul React.
- **Visual Studio** sau **Visual Studio Code** (opțional): Recomandate pentru dezvoltare și depanare.

## Configurarea și Rularea Backend-ului (StudentFormApi)

### 1. Clonarea Repository-ului
Deschide un terminal și rulează următoarele comenzi:
```bash
git clone [https://github.com/CosminMihai73/StudentForm.git]
```
```bash
cd StudentForm/StudentFormApi
```

### 2. Restaurarea Dependențelor
Execută următoarea comandă pentru a restaura dependențele necesare:
```bash
dotnet restore
```

### 3. Instalarea DinkToPdf
Instalează biblioteca DinkToPdf, care este esențială pentru generarea PDF-urilor în backend:
```bash
dotnet add package DinkToPdf
```
### Pornirea Backend-ului
Pentru a porni backend-ul, folosește comanda:
```bash
dotnet run
```
Backend-ul va fi accesibil la adresa [http://localhost:5097]. Asigură-te că această adresă este configurată corect în frontend.

## Configurarea și Rularea Frontend-ului (StudentFormClient)

### 1. Navigarea la Proiectul Frontend
Deschide un terminal nou (sau folosește același terminal) și navighează la directorul frontend-ului:
```bash
cd ../StudentFormClient
```
### 2. Instalarea Dependențelor Frontend
Instalează dependențele necesare pentru frontend folosind npm:
```bash
npm install
```
### 3. Pornirea Frontend-ului
Pentru a porni aplicația frontend, folosește comanda:
```bash
npm start
```
Aplicația React va fi accesibilă la adresa http://localhost:3000
