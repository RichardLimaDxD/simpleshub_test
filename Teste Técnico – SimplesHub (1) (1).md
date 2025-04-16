**Objetivo:** Avaliar sua capacidade de criar uma aplicação limpa, escalável e integrada com o Firebase Realtime Database, seguindo o padrão de stack do SimplesHub (Vue 2, Node.js e SCSS).
### Resumo da Tarefa
Você vai construir uma **Single-Page Application** simples que:
1. **Faz upload de um PDF** no frontend.
2. **Processa o PDF no backend** para encontrar todos os CPFs.
3. **Valida o formato** dos CPFs: `XXX.XXX.XXX-XX` (sem validações avançadas).
4. **Armazena** esses CPFs no **Firebase Realtime Database**.
5. **Lista** os CPFs recém-encontrados **e** todos os já armazenados anteriormente.
### Ferramentas / Stack Obrigatória
- **Frontend:** Vue 2 (Options API)+ SCSS
	- Não utilize Composition API.
- **Backend:** Node.js
- **Banco de Dados:** Firebase Realtime Database  
	- Não utilize o Firestore.

*Não vamos analisar autenticação - não é necessário fazer um sistema de auth.* 
### Passo a Passo Sugerido
1. Crie um repositório Git (público ou privado).
2. Instale o Vue 2 e o SCSS.
3. Instale um backend com Node.js.
    - Você pode usar o Firebase Functions ou outro serviço Node.js à parte.
4. Crie um frontend no Vue 2 para o upload de um PDF.
	- Faça uma interface simples, mas visualmente elegante.
5. Crie a lógica de captura e validação dos CPFs no backend.
    - Busque no PDF todos os padrões `XXX.XXX.XXX-XX`.
    - Não é obrigatório validar dígitos verificadores, apenas o **formato**.
6. Salve os CPFs no banco de dados através do backend, no formato que considerar melhor.
7. Monte a exibição dos CPFs encontrados no upload atual.
8. Monte a exibição da lista de todos os CPFs já existentes no banco.
### O Que Será Avaliado
- **Arquitetura e SOLID:** como você organiza pastas, classes e funções.
- **Manutenibilidade, legibilidade e simplicidade:** use padrões claros de código.
- **Compreensão de requisitos:** a solução deve ser fiel às demandas.
- **Estratégia de logs:** capacidade de registrar operações relevantes (upload, parse, erros).
- **Documentação de código:** breves comentários e/ou README explicativo.
- **Interface simples e elegante:** não precisa ser sofisticada, mas funcional.
### Liberdade de implementação
A complexidade do projeto fica a seu critério. Se quiser algo mais robusto (e.g., testes, componentes mais elaborados, arquitetura escalável), sinta-se à vontade para nos impressionar.
### Entregáveis
1. **Link do repositório** no Git com todo o código e instruções de setup.
2. **README.md** no GitHub com passos de instalação e documentação.
3. **Demonstração (opcional):** caso você tenha deployado em algum lugar.
### Dicas
**Boa sorte!** Estamos animados para ver como você planeja e entrega uma solução rodando em nossa stack. Mantenha o código simples, mas sinta-se livre para demonstrar toda a sua experiência.