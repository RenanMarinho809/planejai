# PlanejAI

O PlanejAI é uma aplicação web de planejamento financeiro pessoal. A pessoa informa sua renda mensal, seus custos fixos, suas dívidas e uma meta financeira. A aplicação calcula quanto sobra mensalmente e apresenta uma análise da meta, com sugestões geradas por inteligência artificial.

## Objetivo

O objetivo do PlanejAI é ajudar as pessoas a visualizar se uma meta financeira pode ser alcançada dentro do prazo desejado e a organizar os próximos passos. A experiência foi pensada para ser simples e acessível: o usuário preenche um formulário dividido em etapas e recebe um resumo financeiro acompanhado de orientações em linguagem direta.

O diagnóstico é informativo e não substitui aconselhamento financeiro profissional.

## Como funciona

1. O usuário preenche seis etapas: renda mensal bruta, custos fixos, dívidas ou parcelas, nome da meta, custo da meta e prazo em meses.
2. Os valores são armazenados no navegador e associados a um identificador de simulação.
3. Na tela de resultado, o app exibe os dados da meta e calcula o valor mensal disponível subtraindo custos fixos e dívidas da renda informada.
4. O app envia os dados da simulação à API do Google Gemini para gerar um diagnóstico personalizado. A resposta inclui uma avaliação de viabilidade, diagnóstico financeiro, sugestões práticas, ideias de renda extra, sugestões de investimento e uma mensagem final.
5. O resultado gerado pela IA também é salvo junto à simulação no armazenamento local para ser reutilizado.

## Tecnologias utilizadas

- **React 19**: construção da interface em componentes.
- **TypeScript 6**: tipagem estática do código da aplicação.
- **Vite 8**: servidor de desenvolvimento e empacotamento para produção.
- **Tailwind CSS 4**: estilos utilitários e composição visual.
- **React Router 7**: navegação entre páginas.
- **Google Gemini API**: geração do diagnóstico financeiro personalizado.
- **Lucide React**: ícones da interface.
- **React Loading Skeleton**: indicador visual durante a geração do diagnóstico.
- **Inter (@fontsource/inter)**: tipografia da aplicação.
- **ESLint**: análise estática e padronização do código.

## Organização do projeto

```text
src/
├── components/
│   ├── features/
│   │   ├── Insights/          # Exibição de conteúdo e erros da análise por IA
│   │   ├── Simulation/        # Formulário, etapas e progresso da simulação
│   │   └── SimulationResults/ # Cartões de dados e diagnóstico
│   ├── layout/                # Estrutura compartilhada das páginas
│   └── shared/                # Botões, campos, cabeçalho e componentes reutilizáveis
├── context/theme/             # Estado global do tema claro/escuro
├── data/                      # Etapas, tipos e instruções da simulação/IA
├── hooks/                     # Persistência local, tema e consulta de insights
├── pages/                     # Páginas de formulário e resultado
├── services/                  # Integração com a API Gemini
├── styles/                    # Variáveis e estilos do tema
└── utils/                     # Formatação monetária e cálculos
```

## Rotas disponíveis

| Rota | Descrição |
| --- | --- |
| `/` | Formulário para iniciar uma simulação |
| `/resultado/:id` | Resultado de uma simulação identificada pelo seu ID |
| `/historico` | Rota prevista para o histórico; atualmente exibe apenas um título, sem uma tela de histórico implementada |

## Dados e integração com IA

As simulações e a preferência de tema são armazenadas no `localStorage` do navegador. O projeto não contém uma API ou banco de dados próprios para persistir esses dados entre dispositivos.

Para gerar o diagnóstico, os dados financeiros preenchidos são enviados do navegador à API do Google Gemini. A integração usa a variável de ambiente `VITE_GEMINI_API_KEY`. Como variáveis `VITE_*` são incorporadas ao bundle do cliente, essa abordagem não mantém a chave secreta em uma aplicação publicada; para produção, a chamada deve passar por um serviço de backend que proteja a credencial.

## Como executar localmente

### Requisitos

- Node.js e npm.
- Uma chave de API do Google Gemini para testar a geração do diagnóstico.

### Instalação e execução

```bash
npm install
```

Crie um arquivo `.env.local` na raiz do projeto e configure sua própria chave:

```dotenv
VITE_GEMINI_API_KEY=sua_chave_aqui
```

Em seguida, inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador.

## Comandos disponíveis

```bash
npm run dev      # Servidor local de desenvolvimento
npm run build    # Verificação TypeScript e build de produção
npm run preview  # Pré-visualização local do build
npm run lint     # Análise estática com ESLint
```
