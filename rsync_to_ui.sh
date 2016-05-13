#!/bin/sh
#
# Simple rsync from hbUi.geo/dist/... to a given target project lib for quick dev turnaround
#
export HBUI_GEO_HOME=/home/patrick/Documents/hb/5/workspace/hbUi.geo/
export HBUI_GEO_DIST=${HBUI_GEO_HOME}/main/dist/
export HBUI_GEO_TARGET=/home/patrick/Documents/hb/5/workspace/hb-ui/main/lib/hbUi.geo/
cd ${HBUI_GEO_HOME}/main/
grunt
rsync -avuzb  ${HBUI_GEO_DIST}/ ${HBUI_GEO_TARGET}/ 

