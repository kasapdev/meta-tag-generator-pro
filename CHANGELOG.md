# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [1.0.1] - 2026-09-06

### Fixed

- The global `Ctrl/Cmd+C` shortcut for "copy generated meta tags" no longer hijacks normal text copying. Previously, selecting text inside any field (Page Title, Meta Description, Canonical URL, etc.) and pressing `Ctrl/Cmd+C` would silently discard the selection and copy the full generated `<head>` snippet instead. The shortcut now copies an active text selection (in a field or elsewhere on the page) when one exists, and only falls back to copying the generated snippet when nothing is selected.
