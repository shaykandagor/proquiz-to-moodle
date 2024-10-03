#!/bin/bash

### TODO: this file has not yet been tested


# Define the directory to be zipped and the output file name
DIRECTORY_TO_ZIP="path/to/your/directory"
OUTPUT_ZIP="output.zip"
OUTPUT_MBZ="output.mbz"

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