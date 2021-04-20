#!/usr/bin/env bash
function execute()
{
    $@
    [[ $? != 0 ]] && {
        echo "$@ failed"
        exit 1
    }
    return 0
}

build()
{
    npm i
    npm run build --if-present
}

deploy()
{
    sudo mv dist /usr/share/nginx/html_box/dist.${GITHUB_REF#refs/heads/}.${github.event.commits[0].message}.${GITHUB_SHA}
    sudo ln -snf /usr/share/nginx/html_box/dist.${GITHUB_REF#refs/heads/}.${github.event.commits[0].message}.${GITHUB_SHA}/*  /usr/share/nginx/html
}

Main()
{
    case $1 in
        build)
            execute "build"
        ;;
        deploy)
            execute "deploy"
        ;;
    esac
    return $?
}

Main "$@"
