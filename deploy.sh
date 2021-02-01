#!/bin/bash
if [ $1 == 'prod' ] ; then
    rsync -avzPp ./dist/ server:/home/lucas079/deputados
    exit;
fi
