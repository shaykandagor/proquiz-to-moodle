#!/bin/bash

# Check if the input directory is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <directory_to_zip>"
  exit 1
fi

# Define the directory to be zipped and the output file names
DIRECTORY_TO_ZIP="$1"
OUTPUT_DIR="mbz-archive"

# Create the output directory if it doesn't exist
if [ ! -d "$OUTPUT_DIR" ]; then
  mkdir $OUTPUT_DIR
fi

# Define the output zip and mbz file names
OUTPUT_ZIP="$OUTPUT_DIR/output.zip"
OUTPUT_MBZ="$OUTPUT_DIR/output.mbz"
# Create the zip file
zip -r $OUTPUT_ZIP $DIRECTORY_TO_ZIP

# Check if the zip command was successful
if [ $? -eq 0 ]; then
  echo "Zip file created successfully."

  # Rename the zip file to .mbz
  mv $OUTPUT_ZIP $OUTPUT_MBZ

  # Check if the mv command was successful
  if [ $? -eq 0 ]; then
    echo "File renamed to $OUTPUT_MBZ successfully."
  else
    echo "Error renaming file to $OUTPUT_MBZ."
  fi
else
  echo "Error creating zip file."
fi