const REDIRECTS = {
  "/index.html": "/",
  "/home": "/",
  "/home.html": "/",
  "/inicio": "/",
  "/inicio.html": "/",

  "/politica-privacidade.html": "/politica-de-privacidade-lgpd",
  "/politica-privacidade": "/politica-de-privacidade-lgpd",
  "/politica-de-privacidade.html": "/politica-de-privacidade-lgpd",
  "/politica-de-privacidade": "/politica-de-privacidade-lgpd",
  "/privacidade.html": "/politica-de-privacidade-lgpd",
  "/privacidade": "/politica-de-privacidade-lgpd",
  "/termos.html": "/politica-de-privacidade-lgpd",
  "/termos": "/politica-de-privacidade-lgpd",
  "/termos-de-uso.html": "/politica-de-privacidade-lgpd",
  "/termos-de-uso": "/politica-de-privacidade-lgpd",
  "/politica-de-privacidade-lgpd.html": "/politica-de-privacidade-lgpd",

  "/contato_whatsapp.html": "/agendar-consulta-odontologica-whatsapp-curitiba",
  "/contato_whatsapp": "/agendar-consulta-odontologica-whatsapp-curitiba",
  "/contato-whatsapp.html": "/agendar-consulta-odontologica-whatsapp-curitiba",
  "/contato-whatsapp": "/agendar-consulta-odontologica-whatsapp-curitiba",
  "/whatsapp.html": "/agendar-consulta-odontologica-whatsapp-curitiba",
  "/whatsapp": "/agendar-consulta-odontologica-whatsapp-curitiba",
  "/agendar.html": "/agendar-consulta-odontologica-whatsapp-curitiba",
  "/agendar": "/agendar-consulta-odontologica-whatsapp-curitiba",
  "/agendar-consulta-odontologica-whatsapp-curitiba.html": "/agendar-consulta-odontologica-whatsapp-curitiba",

  "/estetica-e-reabilitacao": "/coroa-dentaria-e-reabilitacao-oral-curitiba",
  "/estetica-e-reabilitacao.html": "/coroa-dentaria-e-reabilitacao-oral-curitiba",
  "/reabilitacao-oral": "/coroa-dentaria-e-reabilitacao-oral-curitiba",
  "/reabilitacao-oral.html": "/coroa-dentaria-e-reabilitacao-oral-curitiba",
  "/coroa-dentaria": "/coroa-dentaria-e-reabilitacao-oral-curitiba",
  "/coroa-dentaria.html": "/coroa-dentaria-e-reabilitacao-oral-curitiba",
  "/estetica-dental": "/coroa-dentaria-e-reabilitacao-oral-curitiba",
  "/estetica-dental.html": "/coroa-dentaria-e-reabilitacao-oral-curitiba",
  "/coroa-dentaria-e-reabilitacao-oral-curitiba.html": "/coroa-dentaria-e-reabilitacao-oral-curitiba",

  "/oclusao-e-funcao": "/oclusao-e-funcao-oral-curitiba",
  "/oclusao-e-funcao.html": "/oclusao-e-funcao-oral-curitiba",
  "/oclusao": "/oclusao-e-funcao-oral-curitiba",
  "/oclusao.html": "/oclusao-e-funcao-oral-curitiba",
  "/funcao-oral": "/oclusao-e-funcao-oral-curitiba",
  "/funcao-oral.html": "/oclusao-e-funcao-oral-curitiba",
  "/oclusao-e-funcao-oral-curitiba.html": "/oclusao-e-funcao-oral-curitiba",

  "/harmonizacao-facial": "/harmonizacao-facial-odontologica-curitiba",
  "/harmonizacao-facial.html": "/harmonizacao-facial-odontologica-curitiba",
  "/harmonizacao": "/harmonizacao-facial-odontologica-curitiba",
  "/harmonizacao.html": "/harmonizacao-facial-odontologica-curitiba",
  "/harmonizacao-facial-odontologica-curitiba.html": "/harmonizacao-facial-odontologica-curitiba",

  "/saude-integrativa": "/saude-bucal-integrativa-e-prevencao-curitiba",
  "/saude-integrativa.html": "/saude-bucal-integrativa-e-prevencao-curitiba",
  "/prevencao-odontologica": "/saude-bucal-integrativa-e-prevencao-curitiba",
  "/prevencao-odontologica.html": "/saude-bucal-integrativa-e-prevencao-curitiba",
  "/tratamentos": "/saude-bucal-integrativa-e-prevencao-curitiba",
  "/tratamentos.html": "/saude-bucal-integrativa-e-prevencao-curitiba",
  "/saude-bucal-integrativa-e-prevencao-curitiba.html": "/saude-bucal-integrativa-e-prevencao-curitiba",

  "/sobre": "/dentista-jardim-das-americas-curitiba-dra-milena-miranda",
  "/sobre.html": "/dentista-jardim-das-americas-curitiba-dra-milena-miranda",
  "/sobre-mim": "/dentista-jardim-das-americas-curitiba-dra-milena-miranda",
  "/sobre-mim.html": "/dentista-jardim-das-americas-curitiba-dra-milena-miranda",
  "/dra-milena-miranda": "/dentista-jardim-das-americas-curitiba-dra-milena-miranda",
  "/dra-milena-miranda.html": "/dentista-jardim-das-americas-curitiba-dra-milena-miranda",
  "/consultorio": "/dentista-jardim-das-americas-curitiba-dra-milena-miranda",
  "/consultorio.html": "/dentista-jardim-das-americas-curitiba-dra-milena-miranda",
  "/dentista-jardim-das-americas-curitiba-dra-milena-miranda.html": "/dentista-jardim-das-americas-curitiba-dra-milena-miranda",

  "/contato": "/consulta-odontologica-jardim-das-americas-curitiba-contato",
  "/contato.html": "/consulta-odontologica-jardim-das-americas-curitiba-contato",
  "/localizacao": "/consulta-odontologica-jardim-das-americas-curitiba-contato",
  "/localizacao.html": "/consulta-odontologica-jardim-das-americas-curitiba-contato",
  "/endereco": "/consulta-odontologica-jardim-das-americas-curitiba-contato",
  "/endereco.html": "/consulta-odontologica-jardim-das-americas-curitiba-contato",
  "/consulta-odontologica-jardim-das-americas-curitiba-contato.html": "/consulta-odontologica-jardim-das-americas-curitiba-contato"
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const rawPath = url.pathname;
    const normalizedPath = rawPath.length > 1 ? rawPath.replace(/\/+$/, "") : rawPath;
    const target =
      REDIRECTS[rawPath] ||
      REDIRECTS[normalizedPath] ||
      REDIRECTS[normalizedPath.toLowerCase()];

    if (target && target !== rawPath) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: `${url.origin}${target}${url.search}`,
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    if (rawPath.length > 1 && rawPath.endsWith("/")) {
      return new Response(null, {
        status: 301,
        headers: {
          Location: `${url.origin}${normalizedPath}${url.search}`,
          "Cache-Control": "public, max-age=3600"
        }
      });
    }

    return env.ASSETS.fetch(request);
  }
};
