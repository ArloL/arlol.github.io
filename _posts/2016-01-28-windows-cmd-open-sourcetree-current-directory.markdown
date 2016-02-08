---
title: Open SourceTree in current Windows CMD directory
subtitle: "A batch file that opens SourceTree in the current directory from the command line."
description: "A batch file that opens SourceTree in the current directory from the command line."
---

On Mac you can install the [SourceTree](https://www.sourcetreeapp.com/) Command Line Tools and call `stree .` to open SourceTree from the Terminal. On Windows there is no such option. Thus I wrote my own stree.cmd and put it in my [dotfiles](https://github.com/ArloL/dotfiles):

    @echo off

    setlocal enabledelayedexpansion

    set directory=%~f1
    if [%directory%] == [] set directory=%CD%

    if exist %directory%\NUL (
        set directory=%directory%
    ) else (
        set directory=%~dp1
    )

    pushd %directory%

    for /f "delims=" %%i in ('git rev-parse --show-toplevel') do set directory=%%i
    git rev-parse --show-toplevel 1> nul 2> nul

    if %errorlevel% EQU 0 (
        start "" "C:\Program Files (x86)\Atlassian\SourceTree\SourceTree.exe" -f %directory:/=\%
    )

    popd
    endlocal

Make sure to check the repository for any updates to [stree.cmd](https://github.com/ArloL/dotfiles/blob/master/bin/stree.cmd).
