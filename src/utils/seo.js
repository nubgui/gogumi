/**
 * Utilidad ligera para gestionar metadatos SEO On-Page dinámicos
 * Permite cambiar Meta Title, Meta Description y Canonical URL en tiempo real
 */
export function updateSEO({ title, description, canonical }) {
  // 1. Actualizar el Title del documento
  if (title) {
    document.title = title;
  }

  // 2. Actualizar o crear Meta Description
  if (description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);
  }

  // 3. Actualizar o crear Rel Canonical
  if (canonical) {
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.setAttribute('rel', 'canonical');
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.setAttribute('href', canonical);
  }
}
