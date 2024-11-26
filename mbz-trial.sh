#!/bin/bash

# Function to convert Windows path to Unix path
convert_path() {
  echo "$1" | sed 's|\\|/|g' | sed 's|C:|/c|'
}

# Check if the input directory is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <directory_with_course_backups>"
  read -p "Press any key to exit..."
  exit 1
fi

# Convert the input directory path if running on Windows
DIRECTORY_WITH_COURSE_BACKUPS=$(convert_path "$1")
OUTPUT_DIR=$(pwd)/mbz-archive

echo "Input directory: $DIRECTORY_WITH_COURSE_BACKUPS"
echo "Output directory: $OUTPUT_DIR"

# Check if the input directory exists
if [ ! -d "$DIRECTORY_WITH_COURSE_BACKUPS" ]; then
  echo "Error: The input directory does not exist."
  exit 1
fi

# Create the output directory if it doesn't exist
if [ ! -d "$OUTPUT_DIR" ]; then
  mkdir -p $OUTPUT_DIR
  echo "Created output directory: $OUTPUT_DIR"
fi

# Create a temporary directory for the backup contents
TEMP_DIR=$(mktemp -d)

# Copy the contents of the course backup directory to the temporary directory
cp -r "$DIRECTORY_WITH_COURSE_BACKUPS"/* "$TEMP_DIR"

# Ensure the necessary files and directories are present
if [ ! -f "$TEMP_DIR/moodle_backup.xml" ]; then
  echo "Error: moodle_backup.xml is missing from the backup directory."
  rm -rf "$TEMP_DIR"
  exit 1
fi

# Define the output mbz file name
OUTPUT_MBZ="$OUTPUT_DIR/course_backup.mbz"

echo "Output mbz file: $OUTPUT_MBZ"

# Create the mbz file by compressing the temporary directory
(cd "$TEMP_DIR" && zip -r "$OUTPUT_MBZ" .)

# Check if the zip command was successful
if [ $? -eq 0 ]; then
  echo "MBZ file created successfully at $OUTPUT_MBZ."

  # Clean up the temporary directory
  rm -rf "$TEMP_DIR"
else
  echo "Error creating MBZ file."
  rm -rf "$TEMP_DIR"
fi

read -p "Press any key to exit..."
