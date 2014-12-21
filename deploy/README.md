INSTALLATION
============

#### ANSIBLE INSTALLATION ####
Taken from [here] (http://docs.ansible.com/intro_installation.html#installing-the-control-machine "source"), following should be the installation steps:

```bash
$ sudo apt-get install software-properties-common
$ sudo apt-add-repository ppa:ansible/ansible
$ sudo apt-get update
$ sudo apt-get install ansible
```

#### CLONE ####

```bash
$ git clone --recursive https://github.com/mrkvost/wega.git
```

#### SETTINGS ####
Edit sensitive data in vars/sensitive.yml such as git user and git password:

```bash
$ cd wega
$ vim vars/sensitive.yml
```

#### RUN PLAYBOOK ####

```
$ ansible-playbook -i inventory wega.yml -u root
```
