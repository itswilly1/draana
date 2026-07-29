# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## O que é

Site institucional de uma página da **Dra. Ana Paula Miyagusko Taba Oguido**, médica
oftalmologista em Londrina-PR (córnea, transplante de córnea, catarata, cirurgia
refrativa). HTML/CSS/JS estáticos: **sem framework, sem build, sem dependências, sem
testes**. São quatro arquivos que importam:

| Arquivo | Linhas | Papel |
|---|---|---|
| `index.html` | ~507 | a página inteira |
| `assets/css/style.css` | ~709 | todo o estilo |
| `assets/js/main.js` | ~162 | quatro comportamentos, todos progressivos |
| `politica-de-privacidade.html` | ~146 | página de texto corrido |

O `README.md` explica **por que** o design é assim (paleta, tipografia, o conceito da
lente). Este arquivo cobre **como mexer sem quebrar**. Leia o README antes de alterar
qualquer decisão visual — ela foi tomada por um motivo declarado.

## Rodar e ver

Existe um nginx permanente servindo `~/Dev/web/sites`. Este projeto está em:

**http://localhost:8080/draana/**

**Não suba servidor nenhum** — nem `python3 -m http.server`, nem `npx serve`, nada.
⚠️ A seção "Rodar e publicar" do `README.md` sugere `python3 -m http.server 4321`;
está desatualizada, ignore. `curl` de leitura contra o localhost:8080 é permitido.

Terminou uma alteração → entregue a URL acima e pare. Quem testa é o Willy.

## Publicação

Duas URLs, dois estados:

| Onde | URL | Estado |
|---|---|---|
| Prévia (GitHub Pages, branch `main`) | https://itswilly1.github.io/draana/ | **no ar, com `noindex`** |
| Produção | `www.draanapaulaoguido.com.br` | ainda não existe |

`git push` na `main` republica a prévia sozinho, em ~1 min, na mesma URL.

**O site está em estado de prévia.** As duas páginas carregam
`<meta name="robots" content="noindex, nofollow">`, marcado com um comentário `PRÉVIA`.
Só reverter para `index, follow` quando for para o domínio definitivo — e nesse momento
conferir também o `canonical`/`og:url` do `index.html` e as URLs do `sitemap.xml`, que já
apontam para o domínio final.

O `robots.txt` do repo é **inerte** no Pages de projeto: em `itswilly1.github.io/draana/`
vale o robots.txt da raiz do domínio, não o do subcaminho. Quem segura a indexação é a
meta tag — não troque uma pela outra.

## Restrições que quebram o site se ignoradas

**Caminhos de asset são relativos e têm que continuar assim** (`assets/css/style.css`,
nunca `/assets/css/style.css`). O site vive num subcaminho nos dois ambientes —
`/draana/` no localhost e `/draana/` no Pages. Uma barra inicial quebra os dois.

**Nada de requisição a terceiros no carregamento.** As fontes são woff2
auto-hospedadas em `assets/fonts/` justamente para não chamar o Google; o iframe do mapa
só é criado no clique (`main.js`, bloco 3). Não adicione Google Fonts, analytics, pixel,
CDN ou tag manager — a página de privacidade afirma que o site não coleta nada e não usa
cookies, e essa afirmação precisa continuar verdadeira.

**`--brick` (`#A97350`) nunca em texto.** Para texto existe `--brick-txt` (`#8A5638`),
que é o mesmo tijolo escurecido até passar 4,5:1 no fundo claro, e `--brick-lt` para
quando o fundo é o vinho. Trocar um pelo outro derruba o contraste.

## Estrutura e convenções

**CSS** — arquivo único, ordem por seção da página, com faixas de comentário
(`/* --- SOBRE --- */`). Todos os valores vêm de tokens no `:root`: paleta, `--sans`
(Archivo, títulos) / `--serif` (Newsreader, corpo — invertido de propósito), `--wrap`,
`--gut`, `--sec-y`, `--ease`. Adicione token novo em vez de literal solto. No fim do
arquivo ficam, nesta ordem: responsivo, `prefers-reduced-motion` e impressão — os três
precisam ser considerados em qualquer coisa nova.

**JS** — um IIFE com `'use strict'` e quatro blocos independentes, cada um saindo cedo
com `return` se seus elementos não existirem. **Tudo é melhoria progressiva: sem JS a
página continua legível e navegável.** Mantenha essa propriedade.

1. **A lente** — clona o SVG da tabela de acuidade e move o recorte circular via
   `--lx` na `.acuity`. Com `prefers-reduced-motion` ela estaciona em 42% e o rAF nem
   começa; em ponteiro grosso (touch) ela varre sozinha; com cursor, persegue o X do
   mouse. `IntersectionObserver` congela o loop quando a faixa sai da tela.
2. **Tamanho do texto** — botões `A−`/`A+` mexem em `--fs` (100/109/118%), guardado em
   `localStorage` sob `apo-textsize`, com `try/catch` para storage bloqueado. Isso é
   função de acessibilidade para público com catarata e baixa visão, não enfeite.
3. **Mapa sob demanda** — o iframe do Google só nasce no clique.
4. **Seção corrente no menu** — `IntersectionObserver` com `rootMargin` assimétrico.

**Âncoras da navegação:** `#topo`, `#sobre`, `#atuacao`, `#estrutura`, `#atendimento`,
`#contato`. Renomear um `id` quebra o menu e o bloco 4 do JS junto.

## A barra de acessibilidade já foi atingida — não baixe

axe-core (WCAG 2.1 AA) com 0 violações nas duas páginas, foco visível em todos os
controles, skip link para `#conteudo` como primeiro Tab, imagens com `width`/`height`
declarados dentro de `<picture>` (webp + fallback jpg) e sem rolagem horizontal em
1440px nem em 390px. Qualquer elemento novo entra nesse padrão.

## Imagens

`assets/img/` contém **derivados** — cada foto em jpg + webp, em 4 larguras, servidos por
`<picture>`. Os originais (`IMG_*.jpeg`, `WhatsApp Image *.jpeg`) estão no `.gitignore`:
existem **só na máquina do Willy, não no repo**. Quem clonar não consegue regerar os
tamanhos. Não apague os originais locais.

## Pendências com a cliente

Marcadas no código como `TODO cliente`. Nenhuma é sua para decidir:

- `index.html:14` — domínio definitivo no `canonical`.
- `index.html:389` — nome exato da clínica e hospital onde as cirurgias são feitas.
- `index.html:492`, `:494` — link da política de privacidade e perfis oficiais de redes.
- `politica-de-privacidade.html:49`, `:59` — data de atualização, razão social, CNPJ,
  e-mail de contato.

**A mais sensível não tem TODO no código, está no README:** a seção Sobre afirma que ela
é professora na UEL e diretora médica do Banco de Olhos de Londrina. Isso foi levantado
em fontes públicas, **não veio do briefing e não foi confirmado com ela**. São credenciais
profissionais de uma pessoa real numa página pública — não trate como verificado nem
expanda esse conteúdo até ela confirmar.
