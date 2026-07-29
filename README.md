# Site institucional — Dra. Ana Paula Oguido

Site de uma página, HTML/CSS/JS estáticos. Sem framework, sem build, sem dependências.
Basta subir a pasta em qualquer hospedagem.

---

## 1. Quem é a cliente

**Dra. Ana Paula Miyagusko Taba Oguido** — médica oftalmologista em Londrina-PR.
CRM-PR 13194 · RQE 8269. Consultório na Rua Mato Grosso, 1611 — Centro. (43) 3321-7398.

O que ela faz, em ordem de peso comercial:

| Frente | O que é |
|---|---|
| Transplante de córnea | ceratocone avançado, cicatrizes, distrofias, opacidades |
| Catarata | troca do cristalino opaco por lente intraocular |
| Cirurgia refrativa | miopia, hipermetropia, astigmatismo |
| Clínica | acompanhamento das condições acima + superfície ocular |

**O diferencial dela não está no briefing.** Levantei em fontes públicas (UEL,
Hospital Universitário, portais médicos) que ela é **professora na UEL** e
**diretora médica do Banco de Olhos de Londrina (HU/UEL)** — ou seja, dirige o
banco que fornece as córneas e também faz os transplantes. Nenhum concorrente em
Londrina tem essa história. Formação: graduação UEL 1991, mestrado 2004,
doutorado em Ciências da Saúde 2014.

Isso está no site, na seção **Sobre**, mas marcado com comentário `TODO` no
código: **confirme com ela antes de publicar.** Se ela confirmar, vale expandir
para uma seção própria sobre doação de córneas — é o tipo de conteúdo que gera
autoridade e busca orgânica que nenhum site de médico local tem.

---

## 2. A ideia do design

A paleta não foi escolhida: foi **amostrada das fotos da própria clínica**.

| Token | Cor | De onde veio |
|---|---|---|
| `--oxblood` | `#57221C` | portão e placa da clínica |
| `--paper-2` | `#E3E0D9` | travertino da bancada do consultório |
| `--brick` | `#A97350` | tijolo aparente da fachada |
| `--paper` | `#EDEEF0` | branco frio do jaleco |
| `--beam` | `#A8D8E2` | única cor inventada: a luz do instrumento |

A tensão quente/frio é o conceito: **quente = a clínica, o humano, o tijolo;
frio = a óptica, o instrumento, a nitidez devolvida.**

**O elemento assinatura** é a faixa no fim do hero: uma tabela de acuidade
visual deitada, em duas camadas idênticas — uma fora de foco, outra nítida,
recortada em círculo. A lente move o recorte e devolve a nitidez. É o assunto
da página demonstrado, não descrito. (No desktop segue o cursor; no celular
varre sozinha; com `prefers-reduced-motion` ela estaciona.) As últimas seis
letras miúdas soletram **OGUIDO** — só quem passa a lente até o fim encontra.

Tipografia invertida de propósito: **Archivo** (grotesca, precisa) nos títulos
e **Newsreader** (serifada, feita para leitura) no texto corrido — o contrário
do padrão "serifada no título, sans no corpo" que todo site de médico usa.

**Controle de tamanho de texto (A− / A+) no topo.** Não é enfeite: o público é
gente com catarata e baixa visão. A escolha fica gravada no navegador.

---

## 3. Estrutura de arquivos

```
index.html                     página única
politica-de-privacidade.html   exigida pelo briefing e pela LGPD
robots.txt · sitemap.xml
assets/
  css/style.css
  js/main.js                   lente, tamanho de texto, mapa, menu ativo
  fonts/*.woff2                fontes auto-hospedadas (5 arquivos, 536 KB)
  img/*.webp + *.jpg           recortes otimizados, 3 a 4 larguras cada
```

As fotos originais (`IMG_*.jpeg`, `WhatsApp *.jpeg`) e o `Conteúdo - Site
Insititucional.md` continuam na raiz, intocados. **Não suba essas para o
servidor** — são 14 MB e não são usadas.

As fotos de formatura em `WhatsApp Image...` são digitalizações antigas de fotos
impressas, resolução e enquadramento não servem para web. Não usei.

---

## 4. Antes de publicar — pendências reais

Todas estão marcadas com `TODO cliente:` no código.

1. **Domínio.** Trocar `www.draanapaulaoguido.com.br` em: `<link rel="canonical">`,
   as 3 metatags `og:`, o JSON-LD, `robots.txt` e `sitemap.xml`.
2. **Confirmar a formação e o cargo no Banco de Olhos** (seção Sobre) — ou remover o bloco.
3. **Nome da clínica** e, se houver, o hospital onde as cirurgias são feitas (seção Estrutura).
4. **Instagram** — o link no rodapé está em `#`. Confirmar o perfil oficial.
5. **Política de privacidade** — falta razão social/CNPJ e um e-mail para
   assuntos de LGPD. Sem isso o documento fica incompleto.
6. **WhatsApp** — o briefing só cita telefone. Se ela usar WhatsApp comercial,
   vale um segundo botão (`https://wa.me/554333217398`); é o canal que mais
   converte nesse setor.
7. **Geolocalização no JSON-LD** — deixei de fora de propósito para não chutar
   coordenadas. Com o `lat`/`lng` corretos do consultório, ajuda no SEO local.

## 5. Conformidade — vale conversar com ela

Publicidade médica no Brasil segue a **Resolução CFM 1.974/2011**. O site foi
escrito dentro dela, e é bom que continue assim quando o conteúdo for editado:

- CRM e RQE visíveis (estão no hero, no contato e no rodapé). ✅
- Sem promessa ou garantia de resultado, sem superlativo ("o melhor", "o mais moderno"). ✅
- **Sem depoimento de paciente e sem foto de antes/depois** — são proibidos, não
  apenas desaconselhados. Se pedirem essa seção, é aqui que se explica o porquê.
- Sem sensacionalismo ou apelo ao medo. ✅
- Aviso de que o conteúdo não substitui consulta médica, no rodapé. ✅

**LGPD:** o site não coleta nada. As fontes são auto-hospedadas (nenhuma
requisição ao Google no carregamento) e o mapa só é carregado depois do clique,
com aviso explícito. Não há cookies nem rastreadores.

---

## 6. Rodar e publicar

```bash
# local
python3 -m http.server 4321      # http://127.0.0.1:4321

# publicar: copiar tudo menos os originais
# (index.html, politica-de-privacidade.html, robots.txt, sitemap.xml, assets/)
```

Serve em Netlify, Vercel, Cloudflare Pages, GitHub Pages ou hospedagem
compartilhada comum. Configure cache longo para `assets/fonts` e `assets/img`.

### Prévia para aprovação da cliente

A branch `main` está publicada no GitHub Pages, servindo a prévia. As fotos-fonte
(`IMG_*.jpeg`, `WhatsApp Image *.jpeg`) ficam fora do repo pelo `.gitignore` — as
versões usadas já estão derivadas em `assets/img/`.

**Antes de publicar no domínio definitivo**, desfazer o estado de prévia:

1. `index.html` e `politica-de-privacidade.html`: trocar
   `<meta name="robots" content="noindex, nofollow">` de volta para
   `content="index, follow"` (a linha está marcada com um comentário `PRÉVIA`).
2. Conferir `canonical` e `og:url` no `index.html` e as URLs do `sitemap.xml` —
   já apontam para `www.draanapaulaoguido.com.br`, confirmar que é esse o domínio.

O `noindex` é a trava que importa. O `robots.txt` deste repo é inerte no Pages de
projeto: em `usuario.github.io/draana/`, o robots.txt válido é o da raiz do domínio,
não o do subcaminho.

## 7. Verificações já feitas

- **axe-core (WCAG 2.1 AA):** 0 violações nas duas páginas.
- Sem rolagem horizontal em 1440px e 390px.
- `prefers-reduced-motion`: a lente estaciona; transições desligadas.
- Primeiro Tab cai no "Ir para o conteúdo"; foco visível em todos os controles.
- Imagens responsivas (`<picture>` + webp com fallback jpg) com `width`/`height`
  declarados — sem salto de layout.
- Estilo de impressão: quem imprimir leva endereço, telefone, CRM e as
  orientações, sem as imagens pesadas.
