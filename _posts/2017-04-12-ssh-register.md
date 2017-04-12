---
title: SSH Key 등록으로 패스워드 없이 SSH 접속하기
description: 'SSH Key 등록으로 패스워드 없이 SSH 접속하기'
header: SSH Key 등록으로 패스워드 없이 SSH 접속하기
---

 ssh 접속 시 계속 비밀번호를 입력하는게 여간 귀찮지 않을수가 없습니다. ssh key 등록을 통해 비밀번호를 입력하지 않고 접속하는 방법입니다.

1. SSH Key 생성하기

    ```sh
    ssh-keygen -t rsa
    Generating public/private rsa key pair.
    Enter file in which to save the key (/Users/{USER}/.ssh/id_rsa):
    Enter passphrase (empty for no passphrase):
    Enter same passphrase again:
    Your identification has been saved in /Users/{USER}/.ssh/id_rsa.
    Your public key has been saved in /Users/{USER}/.ssh/id_rsa.pub.
    The key fingerprint is:
    {key fingerprint}
    The key\'s randomart image is:
    {key\'s randomart image}
    ```

2. SSH Key 확인하기

    ```sh
    cd ~/.ssh
    cat id_rsa.pub
    ```

3. 서버에 키 등록하기

    ```sh
    ssh-copy-id -i ~/.ssh/id_rsa {USER}@{IP}
    /usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/Users/{USER}/.ssh/id_rsa.pub"
    /usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
    /usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
    {IP}\'s password:

    Number of key(s) added:        1

    Now try logging into the machine, with:   "ssh '{USER}@{IP}'"
    and check to make sure that only the key(s) you wanted were added.
    ```

4. 다시 ssh 로 접속해 보면 비밀번호를 요구하지 않습니다.
