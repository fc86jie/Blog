[[toc]]

### docker命令的使用

从 Docker 镜像仓库获取镜像 `$ docker pull [选项] [Docker Registry 地址[:端口号]/]仓库名[:标签]`
  - 拉取最新标签的镜像，例如：`docker pull nginx`
  - 拉取指定版本的镜像，例如：`docker pull nginx:1.21.6-alpine`
  - 拉取私有镜像仓库中的镜像，需要先登录私有仓库，例如：`docker pull myregistry.local:5000/nginx:latest`， 
    其中 `myregistry.local:5000` 是私有镜像仓库的地址，`nginx:latest` 是镜像名称和标签。
  - 拉取指定平台的镜像，例如：`docker pull --platform linux/amd64 nginx:1.21.6-alpine`，
    其中 `linux/amd64` 是平台架构，`nginx:1.21.6-alpine` 是镜像名称和标签。

创建并运行一个容器 `$ docker run [选项] 镜像名[:标签] [命令] [参数]`
  - 运行一个nginx容器，并指定名称，例如：`docker run --name my-nginx -d nginx:1.21.6-alpine`，
    其中 `--name my-nginx` 是指定容器名称为 `my-nginx`，`-d` 是在后台运行容器，`nginx:1.21.6-alpine` 是镜像名称和标签。
  - 运行一个nginx容器，并指定主机IP进行映射，例如：`docker run --name my-nginx -d -p 127.0.0.1:8080:80 nginx:1.21.6-alpine`，其中 `--name my-nginx` 是指定容器名称为 `my-nginx`，`-d` 是在后台运行容器，`-p 127.0.0.1:8080:80` 是将主机端口 `127.0.0.1:8080` 映射到容器端口 `80`，`nginx:1.21.6-alpine` 是镜像名称和标签。
  - 将主机的目录挂载到容器内，例如：`docker run  -d  -v /path/to/nginx.conf:/etc/nginx/nginx.conf nginx:1.21.6-alpine`，其中`-v /path/to/nginx.conf:/etc/nginx/nginx.conf` 是将主机目录 `/path/to/nginx.conf` 挂载到容器目录 `/etc/nginx/nginx.conf`。
  - 设置多个环境变量，例如：`docker run -e MY_VAR1=value1 -e MY_VAR2=value2 nginx:1.21.6-alpine`，其中 `-e MY_VAR1=value1 -e MY_VAR2=value2` 是设置环境变量 `MY_VAR1` 和 `MY_VAR2` 的值为 `value1` 和 `value2`，`nginx:1.21.6-alpine` 是镜像名称和标签。
  - 从文件读取环境变量，例如：`docker run --env-file /path/to/envfile nginx:1.21.6-alpine`，其中 `--env-file /path/to/envfile` 是从文件 `/path/to/envfile` 中读取环境变量，`nginx:1.21.6-alpine` 是镜像名称和标签。
  - 运行一个交互式的容器，例如：`docker run -it --rm nginx:1.21.6-alpine sh`，其中 `-it` 是开启交互式终端，`--rm` 是容器退出后自动删除容器，`nginx:1.21.6-alpine` 是镜像名称和标签，`sh` 是要在容器中执行的命令。
  - 限制容器资源，例如：`docker run --memory="200m" --cpus="0.5" nginx:1.21.6-alpine`，其中 `--memory="200m"` 是限制容器内存使用为 `200m`，`--cpus="0.5"` 是限制容器 CPU 使用为 `0.5`，`nginx:1.21.6-alpine` 是镜像名称和标签。
  - 设置网络模式，例如：`docker run --network="host" nginx:1.21.6-alpine`，其中 `--network="host"` 是将容器网络模式设置为主机网络模式，`nginx:1.21.6-alpine` 是镜像名称和标签。
  - 设置重启策略，例如：`docker run --restart="always" nginx:1.21.6-alpine`，其中 `--restart="always"` 是将容器设置为 always 重启策略，`nginx:1.21.6-alpine` 是镜像名称和标签。

列出所有镜像 `$ docker images [选项]`

查看镜像、容器、数据卷所占用的空间 `$ docker system df [选项]`

虚悬镜像(dangling image) 是指仓库名或标签为空的镜像, 显示所有虚悬镜像:`docker images -f dangling=true`，删除虚悬镜像:`docker image prune`

删除本地镜像 `$ docker image rm [选项] <镜像1> [<镜像2> ...]`
 - 删除指定的镜像，例如：`docker image rm nginx:1.21.6-alpine`，其中 `nginx:1.21.6-alpine` 是镜像名称和标签。
 - 删除多个镜像，例如：`docker image rm nginx:1.21.6-alpine nginx:1.21.6`，其中 `nginx:1.21.6-alpine` 和 `nginx:1.21.6` 是镜像名称和标签。
 - 删除所有镜像，例如：`docker image rm $(docker images -q)`，其中 `$(docker images -q)` 是获取所有镜像的 ID 列表。
 - 删除所有未被使用的镜像，例如：`docker image prune -a`，其中 `-a` 是删除所有未被使用的镜像。
