# @cv-builder/intelligence

The scoring brain the web UI, CLI, and skill reference: the fixed rubric, the
role archetypes, and the validator specs.

- **Rubric v1** — six dimensions (Shipped Evidence, Quantified Impact, Tech/Tool
  Visibility, ATS Compatibility, Keyword Match, Public Proof) with 0–5 anchors,
  tagged `RUBRIC_VERSION`.
- **Archetypes** — role config (keywords, dimension weights, action verbs,
  anti-patterns). This package ships three roles out of the box: Software
  Engineer, Product Manager, and Data & ML Engineer. Add one by dropping a
  file in `src/archetypes/` and registering it.
- **Validators** — `checkAtsCompatibility()` plus the ATS and claim rule sets
  the evaluator encodes.

`detectArchetype(resumeText)` picks the best-matching archetype, falling back to
Software Engineer when there's no signal.

> **Note on the broader role list.** This package's registry is a focused,
> schema-versioned trio used by the prompt pack and the eval fixtures. The
> MVP's user-facing CLI and Web UI are driven by `@cv-builder/core`, which
> carries a separate, broader legacy/runtime archetype registry (seven
> roles, including AI Product Manager, AI Engineer, Backend, Frontend, QA,
> DevOps / SRE, and Data Engineer). Unifying the two registries into a
> single source of truth is a follow-up — see
> [`docs/ARCHETYPE_GAP_AUDIT.md`](../../docs/ARCHETYPE_GAP_AUDIT.md).
