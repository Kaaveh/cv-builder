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
