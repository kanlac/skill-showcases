# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Purpose

This is the writing repository for Skill 2049 (技能2049), a WeChat public account focused on evaluating and showcasing Agent Skills. The goal is to automate the writing workflow as much as possible, while maintaining the author's aesthetic control in the final review.

Published articles:
- 001-frontend-design/README.md
- 002-xlsx/README.md

## Article Production Workflow (SOP)

Each article follows a structured creation process documented in the README:

1. **确定 hook** - Identify a skill or use case to feature
2. **调研，收集 materials** - Research and gather materials
3. **generate raw usecases** - Generate raw use case examples
4. **curate refined usecases** - Curate 2 refined use cases and understand requirements
5. **Arena: test & iterate** - Intensive manual testing process:
   - Test skills with specific prompts
   - Iterate on prompts
   - Collect token usage and results
   - Store prompts in `arena/case-name/prompts.md`
6. **丰富 materials** - Enrich materials with findings
7. **write** - Write the final article using the wechat-article-write skill

## Directory Structure

### Article Structure Pattern

Each article follows this structure (e.g., `001-frontend-design`, `002-xlsx`):

```
{number}-{topic-name}/
├── materials/           # Research materials and skill analysis
│   ├── skill-analysis.md
│   ├── outline.md
│   ├── why.md
│   └── thoughts.md
├── raw-usecases/       # Generated use case examples (may include Python scripts)
├── arena/              # Testing playground
│   ├── case-name/
│   │   └── prompts.md  # Iterated prompts and testing notes
├── outputs/            # Draft outputs
│   └── wechat-draft-*.md
├── img/                # Images for the article
├── instruction-on-writing.md  # Writing instructions (optional)
└── README.md           # Final published article
```

### Other Directories

- `wechat-article-write/` - Custom Claude Code plugin for writing WeChat articles
  - Contains the `wechat-article-write` skill with comprehensive writing guidelines
- `skill-showcases-website-case/` - Example website cases (home page, case pages)
- `movie-seat-selector/` - Example web application
- `xxx-canvas-design/` - Work-in-progress canvas design article materials
- `xxx-H5-小程序组件设计/` - Work-in-progress H5/mini-program component design
- `.venv/` - Python virtual environment

## Key Writing Principles 

refer the wechat-write skill.

## Python Environment

The repository uses Python 3.9 with a virtual environment (`.venv`).

Common use cases include:
- Creating Excel templates for testing (`create_template.py` in raw-usecases)
- Data analysis scripts for arena testing
- Canvas/image generation scripts (using PIL, matplotlib, cairo)

## Article Materials Organization

### materials/ directory typically contains:

- `skill-analysis.md` - Deep dive into how the skill works
- `why.md` - Rationale and motivation for the article
- `thoughts.md` - Reflections and insights
- `*-research.md` - Background research on related topics

### arena/ directory contains:

- Testing cases with real prompts
- `prompts.md` files documenting the iteration process
- Results and token usage data
- Comparative testing against other tools (Figma Make, Lovable, WPS, etc.)

## Common Tasks

### Creating a New Article

1. Create directory: `{number}-{topic-name}/`
2. Set up subdirectories: `materials/`, `raw-usecases/`, `arena/`, `outputs/`, `img/`
3. Research and populate `materials/` with skill analysis and outline
4. Generate and test use cases in `arena/`
5. Document prompts in `arena/case-name/prompts.md`
6. Use the wechat-article-write skill to create drafts in `outputs/`
7. Finalize in `README.md` (the final published article)

### Writing Process

When asked to write an article, refer to:
1. The SOP workflow in README.md
2. The materials gathered in `materials/`
3. The tested prompts in `arena/*/prompts.md`
4. The wechat-article-write skill guidelines

## Important Context

- The target audience reads on WeChat mobile app, so formatting must be mobile-friendly
- Articles compare skills against commercial alternatives (Figma Make, Lovable, etc.)
- Each article demonstrates real use cases with actual testing results
- The writing style is authentic and conversational, avoiding typical AI-generated content patterns
- Articles follow a showcase format: introduction → testing/comparison → breakdown → usage guide → limitations
