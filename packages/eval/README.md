# @cv-builder/eval

Golden fixtures that guard the deterministic intelligence layer. Run with
`pnpm eval` (and in CI).

Each fixture is a folder under `fixtures/`:

- `resume.md` — the input resume
- `jd.md` — optional job description (keyword context)
- `expected.json` — `{ archetype, atsCompatible }` and, for some fixtures,
  expected `issues[]` / `strengths[]` shapes

The harness asserts, without any LLM, that for every fixture the detected
archetype, ATS verdict, and rule firings match what's expected, and that the
resume parses against the schema. A change that breaks archetype detection or
the ATS check fails here.

This MVP is fully deterministic — there is no LLM provider adapter in this repo.
The scoring quality of an `EvaluationResult` is asserted by the rule-coverage
checks in the core engine's tests, not by an external model.
