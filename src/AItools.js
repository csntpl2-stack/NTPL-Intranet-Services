import React from "react";
import Header from "./Header2";

const tools = [
    {
        name: "Fathom.ai",
        description:
          "AI meeting notetaker: transcribes meetings, summarizes them, captures action items.",
        logo: "/fanthom.png",
        tutorial: "https://fathom.video",
        documentation: "https://help.fathom.video", // Fathom Help Center
      },
      {
        name: "ChatGPT",
        description:
          "OpenAI’s conversational AI model that can generate text, answer questions, assist with coding, etc.",
        logo: "/openai-chatgpt-CTA.png",
        tutorial: "https://chat.openai.com",
        documentation: "https://platform.openai.com/docs", // OpenAI docs
      },
      {
        name: "Gamma.ai",
        description:
          "Create presentations, documents, websites with AI; generate & refine content fast.",
        logo: "/Gamma.png",
        tutorial: "https://gamma.app",
        documentation: "https://help.gamma.app", // Gamma Help Center
      },
      {
        name: "Perplexity.ai",
        description:
          "AI‐powered search and knowledge base; helps answer queries with context from the web.",
        logo: "/Perplexity-logo.png",
        tutorial: "https://www.perplexity.ai",
        documentation: "https://docs.perplexity.ai", // Perplexity API docs
      },
      {
        name: "Lovable.ai",
        description:
          "AI no-code builder converting natural language ideas into functional web/app prototypes quickly.",
        logo: "/Lovable1.png",
        tutorial: "https://lovable.dev",
        documentation: "https://docs.lovable.dev", // Lovable docs
      },
      {
        name: "Duolingo.ai",
        description:
          "Language learning platform using AI to personalize lessons, adapt to learning speed, explain answers.",
        logo: "/Duolingo.png",
        tutorial: "https://www.duolingo.com",
        documentation: "https://support.duolingo.com", // Duolingo Help Center
      },
      {
        name: "Memrise",
        description:
          "Language learning & vocabulary practice platform with spaced repetition and multimedia tools.",
        logo: "/Memrise.png",
        tutorial: "https://www.memrise.com",
        documentation: "https://help.memrise.com", // Memrise docs
      },
      {
        name: "Network LLM",
        description:
          "Natural-language querying of network telemetry and diagnostics; helps with root cause analysis in network operations.",
        logo: "/Network LLM.png",
        tutorial: "https://huggingface.co/papers/2307.08036",
        documentation: "https://huggingface.co/docs", // HuggingFace model docs
      },
      {
        name: "Calendly.ai",
        description:
          "Scheduling tool enhanced with AI to automate meeting coordination and reminders.",
        logo: "/Calendly.ai.png",
        tutorial: "https://calendly.com",
        documentation: "https://help.calendly.com", // Calendly docs
      },
      {
        name: "There is AI for That",
        description:
          "Website that contains information about AI tools organized by category.",
        logo: "/There ia AI for that.png",
        tutorial: "https://theresanaiforthat.com",
        documentation: "https://theresanaiforthat.com/faq", // FAQ / docs
      },
      
    ];      

function ToolCard({ tool }) {
  return (
    <div
      className="card mb-3 shadow-lg border-0 rounded-3"
      style={{ maxWidth: "950px", margin: "0 auto" }}
    >
      <div className="row g-0">
        {/* Logo */}
        <div className="col-md-2 d-flex align-items-center justify-content-center p-3 bg-light">
          <img
            src={tool.logo}
            alt={`${tool.name} logo`}
            className="img-fluid"
            style={{ maxHeight: "150px", objectFit: "contain" }}
          />
        </div>
        {/* Info */}
        <div className="col-md-10">
          <div className="card-body">
            <h5 className="card-title fw-bold text-primary">{tool.name}</h5>
            <p className="card-text text-muted">{tool.description}</p>
            {tool.tutorial ? (
              <a
                href={tool.tutorial}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-primary btn-sm me-2"
              >
                Go to Website
              </a>
            ) : (
              <span className="text-secondary">Tutorial link coming soon</span>
            )}

            {tool.documentation ? (
            <a
              href={tool.documentation}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-5 btn btn-outline-secondary btn-sm"
            >
              Documentation
            </a>
          ) : (
            <span className="text-secondary">Docs not available</span>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AIToolsPage() {
  return (
    <div className="container-fluid">
      <Header />
      <div className="text-center bg-primary text-white py-4 rounded mb-4 shadow-sm">
        <h2 className="fw-bold"> AI Tools</h2>
        <p className="mb-0">Discover & Learn the best AI-powered tools</p>
      </div>
      {tools.map((tool, idx) => (
        <ToolCard key={idx} tool={tool} />
      ))}
    </div>
  );
}
