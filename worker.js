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


// ---------------------------------------------------------------------------
// /api/lead: recebe o formulário do botão de WhatsApp e repassa ao CRM da clínica.
// Segredos (Worker secrets): CRM_LEAD_URL, CRM_LEAD_TOKEN, CRM_LEAD_AUTH_HEADER (opcional, padrão Authorization).
// Nenhum dado pessoal é registrado em log.
// ---------------------------------------------------------------------------
const JSON_HEADERS = { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" };
const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });

function normalizePhone(raw) {
  let d = String(raw || "").replace(/\D/g, "");
  if (d.startsWith("0")) d = d.replace(/^0+/, "");
  if (d.length > 11 && d.startsWith("55")) d = d.slice(2);
  if (d.length === 8 || d.length === 9) d = "41" + d;
  if (!(d.length === 10 || d.length === 11)) return null;
  const ddd = Number(d.slice(0, 2));
  if (ddd < 11 || ddd > 99) return null;
  if (d.length === 11 && d[2] !== "9") return null;
  return "+55" + d;
}

const clean = (v, max) =>
  typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max) : null;

async function handleLead(request, env, url) {
  if (request.method !== "POST") return reply(405, { ok: false, error: "metodo_nao_permitido" });
  const origin = request.headers.get("Origin");
  if (!origin || origin !== url.origin) return reply(403, { ok: false, error: "origem_invalida" });
  const raw = await request.text();
  if (raw.length > 4096) return reply(413, { ok: false, error: "corpo_grande" });
  let b;
  try { b = JSON.parse(raw); } catch (e) { return reply(400, { ok: false, error: "json_invalido" }); }
  if (b && typeof b.website === "string" && b.website.trim() !== "") return reply(200, { ok: true });

  const nome = clean(b && b.nome, 80);
  const telefone = normalizePhone(b && b.telefone);
  if (!nome || nome.length < 2) return reply(422, { ok: false, error: "nome_invalido" });
  if (!telefone) return reply(422, { ok: false, error: "telefone_invalido" });
  if (!env.CRM_LEAD_URL) return reply(503, { ok: false, error: "crm_nao_configurado" });

  const lead = {
    nome,
    telefone,
    pagina_origem: clean(b.pagina_origem, 200),
    assunto: clean(b.assunto, 120),
    utm_source: clean(b.utm_source, 100),
    utm_medium: clean(b.utm_medium, 100),
    utm_campaign: clean(b.utm_campaign, 100),
    referer: clean(b.referer, 300),
    criado_em: new Date().toISOString(),
    origem: "site_mmiranda"
  };
  const headers = { "Content-Type": "application/json" };
  if (env.CRM_LEAD_TOKEN) headers[env.CRM_LEAD_AUTH_HEADER || "Authorization"] = env.CRM_LEAD_TOKEN;
  try {
    const r = await fetch(env.CRM_LEAD_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(6000)
    });
    if (!r.ok) { console.log("crm_status", r.status); return reply(502, { ok: false, error: "crm_recusou" }); }
    return reply(200, { ok: true });
  } catch (e) {
    console.log("crm_erro", e && e.name);
    return reply(502, { ok: false, error: "crm_indisponivel" });
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const rawPath = url.pathname;

    if (rawPath === "/api/lead") return handleLead(request, env, url);
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
