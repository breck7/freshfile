freshfile
=========

Quickly find the most recent updated files deep in a directory.

Installation:

    git clone https://github.com/breck7/freshfile.git
    sudo npm install -g freshfile/

Example use:

    # show top 10 most recently updated files in .
    freshfile .
    # show top 100 most recently updated files in .
    freshfile . 100
    # show top 100 most recently updated files named foo.txt in .
    freshfile . 100 foo.txt
    

Example output:

    Recently updated:
    ./bigfile.js 0.0MB 62%
    ./package.json 0.0MB 22%
    ./readme.md 0.0MB 15%

