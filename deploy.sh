#!/bin/bash
if [ $1 == 'prod' ] ; then
    rsync -avzPp ./dist/ hostgator:/home/lucas079/deputados
    exit;
fi
