# 🚀 Kanban Board - React

Um sistema Kanban moderno e responsivo desenvolvido em React com funcionalidades avançadas de drag & drop e interface intuitiva.

![Kanban Board Preview](https://via.placeholder.com/800x400/3B82F6/ffffff?text=Kanban+Board+Preview)

## ✨ Funcionalidades

### 🎯 **Gerenciamento de Tarefas**
- ✅ **Adicionar tarefas** com título, descrição e seleção de coluna
- ✅ **Arrastar e soltar** tarefas entre diferentes fases (TO DO → FAZENDO → FEITO)
- ✅ **Editar nomes das colunas** com interface inline
- ✅ **Feedback visual** durante o drag & drop

### 📱 **Interface e Visualização**
- ✅ **Duas visualizações:** Kanban (cards) e Lista (tabela)
- ✅ **Design responsivo** adaptável a diferentes telas
- ✅ **Interface moderna** com Tailwind CSS
- ✅ **Animações suaves** e hover effects

### 🎨 **Recursos Visuais**
- ✅ **Cores diferenciadas** para cada coluna (Azul, Laranja, Verde)
- ✅ **Ícones intuitivos** com Lucide React
- ✅ **Modal elegante** para criação de tarefas
- ✅ **Área de drop destacada** durante o arraste

## 🛠️ Tecnologias Utilizadas

- **React** 18+ (Hooks: useState)
- **Lucide React** (Ícones)
- **Tailwind CSS** (Estilização)
- **HTML5 Drag & Drop API**
- **JavaScript ES6+**

## 🚀 Como Executar

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/kanban-board-react.git
cd kanban-board-react
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Instale as bibliotecas necessárias**
```bash
# Lucide React (ícones)
npm install lucide-react

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
```

4. **Configure o Tailwind CSS**

Crie o arquivo `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Crie o arquivo `postcss.config.js`:
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

Substitua o conteúdo do `src/index.css`:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

5. **Execute o projeto**
```bash
npm start
# ou
yarn start
```

O aplicativo estará disponível em `http://localhost:3000`

## 🎮 Como Usar

### ➕ **Adicionar Tarefas**
1. Clique no botão **"Nova Tarefa"** no cabeçalho ou no **"+"** em qualquer coluna
2. Preencha o título e descrição
3. Selecione a coluna desejada
4. Clique em **"Adicionar"**

### 🔄 **Mover Tarefas**
1. **Clique e segure** qualquer card de tarefa
2. **Arraste** para a coluna desejada
3. **Solte** na área destacada
4. A tarefa será movida automaticamente

### 📝 **Editar Colunas**
1. Clique no ícone de **lápis** ao lado do título da coluna
2. Digite o novo nome
3. Pressione **Enter** para salvar ou **X** para cancelar

### 👁️ **Alternar Visualização**
- Use os botões **Grid/Lista** no cabeçalho para alternar entre:
  - **Kanban:** Visualização em cards
  - **Lista:** Visualização em tabela

## 📂 Estrutura do Projeto

```
src/
├── App.js              # Componente principal com toda a lógica
├── index.js            # Ponto de entrada da aplicação
├── index.css           # Estilos globais (Tailwind)
└── components/         # (Estrutura para componentes futuros)
```

## 🎨 Funcionalidades Detalhadas

### **Drag & Drop**
- Sistema nativo HTML5 com feedback visual
- Cards ficam destacados durante o arraste
- Área de drop com indicação clara
- Logs no console para debug

### **Modal de Criação**
- Interface limpa e intuitiva
- Validação de campos obrigatórios
- Seleção de coluna de destino
- Fechamento por ESC ou clique fora

### **Visualização Lista**
- Tabela responsiva com todas as informações
- Status colorido por coluna
- Hover effects nas linhas
- Colunas organizadas logicamente

## 🔮 Melhorias Futuras

- [ ] Adicionar datas de vencimento
- [ ] Sistema de prioridades
- [ ] Filtros e busca
- [ ] Persistência de dados (localStorage/API)
- [ ] Drag & drop entre posições na mesma coluna
- [ ] Tema escuro/claro
- [ ] Exportação de dados

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Bruno Nunes Pinheiro**

- Instagram: [@brunonunespinheiro](https://instagram.com/brunonunespinheiro)
- LinkedIn: [brunonunespinheiro](https://www.linkedin.com/in/brunonunespinheiro/)
- WhatsApp: [+55 98 98500-6433](https://wa.me/5598985006433)

---

⭐ **Se este projeto te ajudou, não esqueça de dar uma estrela!**

---

*Desenvolvido com ❤️ e muito ☕*
