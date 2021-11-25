# Ghostscript Based PDF File Compression

## Description

This NestJS application accepts files via a POST to a REST endpoint (http://localhost:3333/api/file). This file will be saved to the `./files` directory. When a PDF is sent, it will save a compressed version of the file to then following directory: `./files/compressed`. The compression is provided by the GhostScript library.

## Requirements

- NodeJS 14+
- Ghostscript4JS
- NestJS
- NX
- GhostScript 4 (See below on how to install for your environment)
- libgs-dev package
- s2i binary
- Docker
