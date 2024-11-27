#!/bin/bash

# Define the source and destination directories
SOURCE_DIR="output/mbz"
DEST_DIR="final-mbz"

# Check if the source directory exists
if [ ! -d "$SOURCE_DIR" ]; then
  echo "Source directory $SOURCE_DIR does not exist."
  exit 1
fi

# Create the destination directory if it doesn't exist
if [ ! -d "$DEST_DIR" ]; then
  mkdir -p $DEST_DIR
fi

# Copy the contents of the source directory to the destination directory
cp -r $SOURCE_DIR/* $DEST_DIR/

# Check if the copy command was successful
if [ $? -eq 0 ]; then
  echo "Files copied successfully to $DEST_DIR."
else
  echo "Error copying files to $DEST_DIR."
  exit 1
fi