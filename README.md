<h1 align="center"><strong>Create Components from CLI</strong></h1>

<br />

<div align="center">CLI Nodejs program to create React-Apollo componets from the command line</div>

## Getting started

```sh
# 1. Clone repo
$ git clone https://github.com/kybak/cromp.git

# 2. Link binary
$ cd bin && npm link

# 3. Use program in project directory where component will go
$ cd projects/app/components/SomeComponent

# 4. First use cromp --help or -h to reference the commands
$ cromp -h

# 5. To create a regular component:
$ cromp -n ComponentName

# 6. To create a component with a query (-q), parameters (-p), return values (-r):
$ cromp -n ComponentWithQuery -q queryName -p "where: WhereInput" -r "id name items {id name}"

# 7. To create a component with a mutation (-m), parameters (-p), return values (-r):
$ cromp -n ComponentWithMutation -q mutationName -p "where: WhereInput, data: DataInput" -r "id name items {id name}"

```