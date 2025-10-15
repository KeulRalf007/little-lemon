@echo off
REM zip_app.cmd
REM Usage:
REM   Double-click to run in current folder (script's folder).
REM   Or run from cmd: zip_app.cmd "C:\path\to\project-root"

SETLOCAL

REM Determine script folder and pass optional first argument as root path to PS script
SET "SCRIPT_DIR=%~dp0"
powershell -NoProfile -ExecutionPolicy Bypass -File "%SCRIPT_DIR%_zip_app_inner.ps1" %~1

ENDLOCAL
