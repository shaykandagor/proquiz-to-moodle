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

```bash
npm run build-all
```

### Lessons

#### Lessons HTML

```bash
npm run build-lessons-html <path-to-exported-json>
```

### Topics

#### Topics HTML

```bash
npm run build-topics-html <path-to-exported-json>
```

### Generate Moodle archive (MBZ)

```bash
sh ./create-mbz.sh <path-to-generated-xml-folder>
```

This command will generate a `output.mbz` file in the `mbz-archive/` folder.
