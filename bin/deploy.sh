#!/bin/bash

# 変数
SYMBOLIC_LINK=/home/node_package/gulp-boiler/node_modules
REMOTE_HOST=design01
REMOTE_PATH=/home/www/design_git/docroot/rsv-help/
LOCAL_PATH=${WORKSPACE}/dist/
SRC_PATH=${WORKSPACE}/src/


# コマンド
RSYNC="rsync -rlcv --delete"


# build
if test -d $SRC_PATH ; then
  # 指定領域のnode_modulesにシンボリックリンクを張る
  if test -d node_modules ; then
    echo -e "\n\n*** node_module is exist ***"
  else
    ln -s $SYMBOLIC_LINK
  fi

  # build
  echo -e "\n\n*** build ***"
  gulp
  echo -e "*** build done ***\n\n"
else
  # error
  echo -e "\n\n*** build 対象が存在しません ***\n\n"
  break
fi

# rsync
if ${DRYRUN} ; then
  # dryrun
  echo -e "\n\n*** dryrun ***"
  $RSYNC -n $LOCAL_PATH $REMOTE_HOST:$REMOTE_PATH
  echo -e "*** dryrun done ***\n\n"
else
  # deploy
  echo -e "\n\n*** deploy ***"
  $RSYNC $LOCAL_PATH $REMOTE_HOST:$REMOTE_PATH
  echo -e "*** deploy done ***\n\n"
fi
