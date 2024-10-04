# Proquiz to moodle converter

## Installation

Clone project.

```bash
npm install
```

## Usage

### Quizzes

Moodle GIFT format generation.

```bash
npm run build-quiz-gift <path-to-exported-json>
```

Moodle XML format generation.

```bash
npm run build-quiz-xml <path-to-exported-json>
```

### Lessons

#### Lessons XML

```bash
npm run build-lessons-xml <path-to-exported-json>
```

#### Lessons HTML

```bash
npm run build-lessons-html <path-to-exported-json>
```

### Topics

#### Topics XML

```bash
npm run build-topics-xml <path-to-exported-json>
```

#### Topics HTML

```bash
npm run build-topics-html <path-to-exported-json>
```


### Generate Moodle archive (MBZ)

```bash
sh ./create-mbz.sh <path-to-generated-xml-folder>
```

This command will generate a `output.mbz` file in the `mbz-archive/` folder.
