import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ContentBody from "./components/ContentBody.jsx";
import Icon from "./components/Icon.jsx";
import usePublishedContent from "./hooks/usePublishedContent.js";
import { SITE_URL } from "./data/site.js";
import NotFound from "./NotFound.jsx";
import "./careers.css";

export default function CareerRole() {
  const { slug } = useParams();
  const { items, loading, error } = usePublishedContent("roles");
  const role = items.find((item) => item.slug === slug);

  useEffect(() => {
    if (!role) return;
    const title = `${role.title} — Careers at Unfold`;
    const description = role.summary || `Learn about the ${role.title} role at Unfold.`;
    document.title = title;
    const setMeta = (attribute, name, value) => {
      const element = document.head.querySelector(`meta[${attribute}="${name}"]`);
      if (element) element.content = value;
    };
    setMeta("name", "description", description);
    setMeta("name", "robots", "index, follow");
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", `${SITE_URL}/careers/${slug}`);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    const canonical = document.head.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = `${SITE_URL}/careers/${slug}`;
    const schema = document.createElement("script");
    schema.id = "page-schema";
    schema.type = "application/ld+json";
    schema.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: role.title,
      description: role.body,
      ...(role.published_at ? { datePosted: role.published_at.slice(0, 10) } : {}),
      hiringOrganization: { "@type": "Organization", name: "Unfold", sameAs: SITE_URL },
      ...(role.location.toLowerCase().includes("remote") ? { jobLocationType: "TELECOMMUTE" } : { jobLocation: { "@type": "Place", address: role.location } }),
      url: `${SITE_URL}/careers/${slug}`,
    });
    document.getElementById("page-schema")?.remove();
    document.head.append(schema);
    return () => schema.remove();
  }, [role, slug]);

  if (loading && !role) return <p className="container content-status" role="status">Loading role…</p>;
  if (error && !role) return <p className="container content-status" role="status">This role is temporarily unavailable. Please try again shortly.</p>;
  if (!role) return <NotFound />;

  return <article className="career-detail container">
    <Link className="back-link" to="/careers#open-roles"><Icon /> All open roles</Link>
    <header className="career-detail-heading">
      <p className="eyebrow">{role.department} · {role.location}</p>
      <h1>{role.title}</h1>
      {role.summary && <p className="career-detail-lead">{role.summary}</p>}
      <a className="button" href={role.application_url} target="_blank" rel="noopener noreferrer">Apply for this role <Icon size={19} /></a>
    </header>
    <div className="career-detail-layout">
      <aside><p className="eyebrow">At a glance</p><p>{role.department}</p><p>{role.location}</p></aside>
      <div className="article-body career-detail-body"><ContentBody text={role.body} /><a className="button" href={role.application_url} target="_blank" rel="noopener noreferrer">Apply for this role <Icon size={19} /></a><p>Applications are handled through the link provided by our team. Never send sensitive personal information through the feature request board.</p></div>
    </div>
  </article>;
}
