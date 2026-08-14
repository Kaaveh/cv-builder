import { describe, expect, it } from "vitest";
import { detectArchetype, getArchetype } from "../archetypes/index.js";

describe("mobile-engineer archetype", () => {
  const archetype = getArchetype("mobile-engineer");

  it("is registered under the core registry", () => {
    expect(archetype.name).toBe("Mobile Engineer");
  });

  it("has 15-30 keywords", () => {
    expect(archetype.keywords.length).toBeGreaterThanOrEqual(15);
    expect(archetype.keywords.length).toBeLessThanOrEqual(30);
  });

  it("has 10+ action verbs", () => {
    expect(archetype.actionVerbs.length).toBeGreaterThanOrEqual(10);
  });

  it("has 5+ anti-patterns", () => {
    expect(archetype.antiPatterns.length).toBeGreaterThanOrEqual(5);
  });

  it("has evaluation weights summing to 1.0", () => {
    const sum = Object.values(archetype.evaluationWeights).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it("is detected from a representative mobile resume", () => {
    const text =
      "Built iOS features in Swift and SwiftUI, shipped Android screens with Kotlin " +
      "and Jetpack Compose, released through TestFlight and Google Play Console.";
    expect(detectArchetype(text).id).toBe("mobile-engineer");
  });

  it("is detected from platform-only mentions", () => {
    expect(detectArchetype("Shipped iOS apps for the retail team.").id).toBe(
      "mobile-engineer"
    );
    expect(detectArchetype("Shipped Android apps for the retail team.").id).toBe(
      "mobile-engineer"
    );
  });

  it("does not treat 'swiftly' as a swift keyword match", () => {
    const text = "Swiftly delivered backend services using Node and Postgres.";
    expect(detectArchetype(text).id).not.toBe("mobile-engineer");
  });
});

describe("ai-product-manager archetype", () => {
  const archetype = getArchetype("ai-product-manager");

  it("is registered under the core registry", () => {
    expect(archetype.name).toBe("AI Product Manager");
  });

  it("has 20-35 keywords", () => {
    expect(archetype.keywords.length).toBeGreaterThanOrEqual(20);
    expect(archetype.keywords.length).toBeLessThanOrEqual(35);
  });

  it("has 10+ action verbs", () => {
    expect(archetype.actionVerbs.length).toBeGreaterThanOrEqual(10);
  });

  it("has 4+ anti-patterns", () => {
    expect(archetype.antiPatterns.length).toBeGreaterThanOrEqual(4);
  });

  it("has evaluation weights summing to 1.0", () => {
    const sum = Object.values(archetype.evaluationWeights).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it("is detected from a representative AI product resume", () => {
    const text =
      "Owned the roadmap for an LLM-powered support product built on RAG and " +
      "embeddings, ran A/B testing experiments to reduce hallucination, tracked " +
      "activation and retention through Amplitude, and defined OKRs each sprint " +
      "using Jira.";
    expect(detectArchetype(text).id).toBe("ai-product-manager");
  });

  it("is not detected from an AI engineering resume", () => {
    const text =
      "Built and deployed RAG pipelines using PyTorch and TensorFlow, integrated " +
      "OpenAI and Anthropic APIs with LangChain and LlamaIndex, optimized vector " +
      "database queries with Pinecone, ran evaluation using DeepEval, and " +
      "automated MLOps CI/CD with Docker and Kubernetes on AWS Bedrock.";
    expect(detectArchetype(text).id).not.toBe("ai-product-manager");
  });
});

describe("ai-engineer archetype", () => {
  const archetype = getArchetype("ai-engineer");

  it("is registered under the core registry", () => {
    expect(archetype.name).toBe("AI Engineer");
  });

  it("has 25-45 keywords", () => {
    expect(archetype.keywords.length).toBeGreaterThanOrEqual(25);
    expect(archetype.keywords.length).toBeLessThanOrEqual(45);
  });

  it("has 10+ action verbs", () => {
    expect(archetype.actionVerbs.length).toBeGreaterThanOrEqual(10);
  });

  it("has 4+ anti-patterns", () => {
    expect(archetype.antiPatterns.length).toBeGreaterThanOrEqual(4);
  });

  it("has evaluation weights summing to 1.0", () => {
    const sum = Object.values(archetype.evaluationWeights).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it("is detected from a representative AI engineering resume", () => {
    const text =
      "Built and deployed RAG pipelines using PyTorch and TensorFlow, integrated " +
      "OpenAI and Anthropic APIs with LangChain and LlamaIndex, optimized vector " +
      "database queries with Pinecone, ran evaluation using DeepEval, and " +
      "automated MLOps CI/CD with Docker and Kubernetes on AWS Bedrock.";
    expect(detectArchetype(text).id).toBe("ai-engineer");
  });

  it("is not detected from an AI product management resume", () => {
    const text =
      "Owned the roadmap for an LLM-powered support product built on RAG and " +
      "embeddings, ran A/B testing experiments to reduce hallucination, tracked " +
      "activation and retention through Amplitude, and defined OKRs each sprint " +
      "using Jira.";
    expect(detectArchetype(text).id).not.toBe("ai-engineer");
  });
});

describe("backend-engineer archetype", () => {
  const archetype = getArchetype("backend-engineer");

  it("is registered under the core registry", () => {
    expect(archetype.name).toBe("Backend Engineer");
  });

  it("has 20-35 keywords", () => {
    expect(archetype.keywords.length).toBeGreaterThanOrEqual(20);
    expect(archetype.keywords.length).toBeLessThanOrEqual(35);
  });

  it("has 10+ action verbs", () => {
    expect(archetype.actionVerbs.length).toBeGreaterThanOrEqual(10);
  });

  it("has 4+ anti-patterns", () => {
    expect(archetype.antiPatterns.length).toBeGreaterThanOrEqual(4);
  });

  it("has evaluation weights summing to 1.0", () => {
    const sum = Object.values(archetype.evaluationWeights).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it("is detected from a representative backend resume", () => {
    const text =
      "Built and scaled REST and GraphQL APIs backed by PostgreSQL and Redis, " +
      "deployed microservices to Kubernetes on AWS with Terraform, wired up CI/CD " +
      "via GitHub Actions, and added observability and testing with Datadog. " +
      "Written in Go and Node.js.";
    expect(detectArchetype(text).id).toBe("backend-engineer");
  });

  it("is not detected from a frontend-focused resume", () => {
    const text =
      "Built responsive React and Next.js interfaces with TypeScript and Tailwind " +
      "CSS, improved Core Web Vitals and accessibility (WCAG), invested in unit " +
      "and integration testing with Jest, Playwright, and Cypress, maintained a " +
      "Storybook design system, and shipped SSR pages.";
    expect(detectArchetype(text).id).not.toBe("backend-engineer");
  });
});

describe("frontend-engineer archetype", () => {
  const archetype = getArchetype("frontend-engineer");

  it("is registered under the core registry", () => {
    expect(archetype.name).toBe("Frontend Engineer");
  });

  it("has 20-35 keywords", () => {
    expect(archetype.keywords.length).toBeGreaterThanOrEqual(20);
    expect(archetype.keywords.length).toBeLessThanOrEqual(35);
  });

  it("has 10+ action verbs", () => {
    expect(archetype.actionVerbs.length).toBeGreaterThanOrEqual(10);
  });

  it("has 4+ anti-patterns", () => {
    expect(archetype.antiPatterns.length).toBeGreaterThanOrEqual(4);
  });

  it("has evaluation weights summing to 1.0", () => {
    const sum = Object.values(archetype.evaluationWeights).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it("is detected from a representative frontend resume", () => {
    const text =
      "Built responsive React and Next.js interfaces with TypeScript and Tailwind " +
      "CSS, improved Core Web Vitals and accessibility (WCAG), invested in unit " +
      "and integration testing with Jest, Playwright, and Cypress, maintained a " +
      "Storybook design system, and shipped SSR pages.";
    expect(detectArchetype(text).id).toBe("frontend-engineer");
  });

  it("is not detected from a backend-focused resume", () => {
    const text =
      "Built and scaled REST and GraphQL APIs backed by PostgreSQL and Redis, " +
      "deployed microservices to Kubernetes on AWS with Terraform, wired up CI/CD " +
      "via GitHub Actions, and added observability and testing with Datadog. " +
      "Written in Go and Node.js.";
    expect(detectArchetype(text).id).not.toBe("frontend-engineer");
  });
});

describe("qa-test-engineer archetype", () => {
  const archetype = getArchetype("qa-test-engineer");

  it("is registered under the core registry", () => {
    expect(archetype.name).toBe("QA / Test Engineer");
  });

  it("has 40-60 keywords", () => {
    expect(archetype.keywords.length).toBeGreaterThanOrEqual(40);
    expect(archetype.keywords.length).toBeLessThanOrEqual(60);
  });

  it("has 10+ action verbs", () => {
    expect(archetype.actionVerbs.length).toBeGreaterThanOrEqual(10);
  });

  it("has 5+ anti-patterns", () => {
    expect(archetype.antiPatterns.length).toBeGreaterThanOrEqual(5);
  });

  it("has evaluation weights summing to 1.0", () => {
    const sum = Object.values(archetype.evaluationWeights).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it("is detected from a representative QA resume", () => {
    const text =
      "Designed and executed end-to-end testing with Playwright and Cypress, " +
      "built API testing suites in Postman, ran performance testing with k6 and " +
      "JMeter, practiced BDD with Cucumber and Gherkin, tracked bugs in Jira and " +
      "TestRail, and drove regression testing and smoke testing before every " +
      "release. Automated mobile testing with Appium.";
    expect(detectArchetype(text).id).toBe("qa-test-engineer");
  });

  it("is not detected from a devops-focused resume", () => {
    const text =
      "Ran Kubernetes clusters across AWS, GCP, and Azure, provisioned " +
      "infrastructure with Terraform and Ansible, built CI/CD pipelines in " +
      "Jenkins and ArgoCD, monitored SLIs, SLOs, and SLAs with Prometheus and " +
      "Grafana, and secured secrets with Vault while administering Helm charts " +
      "and Istio service mesh on Linux.";
    expect(detectArchetype(text).id).not.toBe("qa-test-engineer");
  });

  it("does not treat 'impact' as a 'pact' contract-testing keyword match", () => {
    const text =
      "Delivered high impact through improved release quality and fewer customer " +
      "escalations.";
    expect(detectArchetype(text).id).not.toBe("qa-test-engineer");
  });
});

describe("devops-sre archetype", () => {
  const archetype = getArchetype("devops-sre");

  it("is registered under the core registry", () => {
    expect(archetype.name).toBe("DevOps / SRE");
  });

  it("has 20-35 keywords", () => {
    expect(archetype.keywords.length).toBeGreaterThanOrEqual(20);
    expect(archetype.keywords.length).toBeLessThanOrEqual(35);
  });

  it("has 10+ action verbs", () => {
    expect(archetype.actionVerbs.length).toBeGreaterThanOrEqual(10);
  });

  it("has 4+ anti-patterns", () => {
    expect(archetype.antiPatterns.length).toBeGreaterThanOrEqual(4);
  });

  it("has evaluation weights summing to 1.0", () => {
    const sum = Object.values(archetype.evaluationWeights).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it("is detected from a representative devops/SRE resume", () => {
    const text =
      "Ran Kubernetes clusters across AWS, GCP, and Azure, provisioned " +
      "infrastructure with Terraform and Ansible, built CI/CD pipelines in " +
      "Jenkins and ArgoCD, monitored SLIs, SLOs, and SLAs with Prometheus and " +
      "Grafana, and secured secrets with Vault while administering Helm charts " +
      "and Istio service mesh on Linux.";
    expect(detectArchetype(text).id).toBe("devops-sre");
  });

  it("is not detected from a data engineering resume", () => {
    const text =
      "Built ETL and ELT pipelines with Spark, Airflow, and dbt, modeled " +
      "dimensional data warehouses in Snowflake and BigQuery, managed a Delta " +
      "Lake lakehouse with Iceberg and Parquet files, streamed events through " +
      "Kafka, and orchestrated workflows in Python and SQL on Databricks and " +
      "Redshift.";
    expect(detectArchetype(text).id).not.toBe("devops-sre");
  });
});

describe("data-engineer archetype", () => {
  const archetype = getArchetype("data-engineer");

  it("is registered under the core registry", () => {
    expect(archetype.name).toBe("Data Engineer");
  });

  it("has 20-35 keywords", () => {
    expect(archetype.keywords.length).toBeGreaterThanOrEqual(20);
    expect(archetype.keywords.length).toBeLessThanOrEqual(35);
  });

  it("has 10+ action verbs", () => {
    expect(archetype.actionVerbs.length).toBeGreaterThanOrEqual(10);
  });

  it("has 4+ anti-patterns", () => {
    expect(archetype.antiPatterns.length).toBeGreaterThanOrEqual(4);
  });

  it("has evaluation weights summing to 1.0", () => {
    const sum = Object.values(archetype.evaluationWeights).reduce((a, b) => a + b, 0);
    expect(sum).toBeCloseTo(1, 5);
  });

  it("is detected from a representative data engineering resume", () => {
    const text =
      "Built ETL and ELT pipelines with Spark, Airflow, and dbt, modeled " +
      "dimensional data warehouses in Snowflake and BigQuery, managed a Delta " +
      "Lake lakehouse with Iceberg and Parquet files, streamed events through " +
      "Kafka, and orchestrated workflows in Python and SQL on Databricks and " +
      "Redshift.";
    expect(detectArchetype(text).id).toBe("data-engineer");
  });

  it("is not detected from a devops-focused resume", () => {
    const text =
      "Ran Kubernetes clusters across AWS, GCP, and Azure, provisioned " +
      "infrastructure with Terraform and Ansible, built CI/CD pipelines in " +
      "Jenkins and ArgoCD, monitored SLIs, SLOs, and SLAs with Prometheus and " +
      "Grafana, and secured secrets with Vault while administering Helm charts " +
      "and Istio service mesh on Linux.";
    expect(detectArchetype(text).id).not.toBe("data-engineer");
  });
});
