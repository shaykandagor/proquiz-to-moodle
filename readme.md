# Proquiz to moodle converter

## Installation

Clone project.

```bash
npm install
```

## Usage

Create `config.json` file in the root (same level as `package.json`) of the project with the following content:

```json
{
  "basePath": "<path-to-exported-json-folder>",
  "quizPath": "<path-to-exported-quiz-json-file>",
  "topicsPath": "<path-to-exported-topics-json-file>",
  "lessonsPath": "<path-to-exported-lessons-json-file>"
}
```

### Generate Moodle archive (MBZ)

```bash
npm run run-all
```

or if you want to build only the MBZ archive:

```bash
npm run create-mbz-archive
```

This command will generate a `output.mbz` file in the `mbz-archive/` folder.
