## Pré-requisitos
- Node.js (v18 ou superior)
- npm (v9 ou superior)

## Instalação

### 1. Clonar o repositório
```bash
git clone https://github.com/tomnunes/teste-mb
cd teste-mb
```

### 2. Configurar variáveis de ambiente

#### Backend
```bash
cd backend
cp .env.example .env
```

#### Frontend
```bash
cd ../frontend
cp .env.example .env
```

### 3. Instalar dependências

#### Backend
```bash
cd ../backend
npm install
```

#### Frontend
```bash
cd ../frontend
npm install
```

## Executando a aplicação

### Backend (Node.js)
```bash
cd backend
npm start
```

### Frontend (Vue.js)
```bash
cd ../frontend
npm run dev
```

## Configuração

### Arquivos .env

#### Backend (.env)
```env
PORT=3000
FRONTEND_URL=http://localhost:5173
```

#### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
```
