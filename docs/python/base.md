[[toc]]

### uv命令的使用
| 命令 | 作用 |
| --- | --- |
| uv add <包名> | 安装包到当前项目（自动写入 pyproject.toml，替代 pip install） |
| uv add <包名>@<版本> | 指定版本安装（如 uv add requests@2.31.0）|
| uv add <包名> --dev | 安装开发依赖（如 uv add pytest --dev） |
| uv remove <包名> | 从当前项目移除包（自动更新 pyproject.toml） |
| uv install | 安装 pyproject.toml/requirements.txt 中的所有依赖（替代 pip install -r） |
| uv install --locked | 安装 pyproject.toml 中锁定的依赖（不包括开发依赖） |
| uv update <包名> | 更新指定包到最新版本（自动写入 pyproject.toml） |
| uv update | 更新所有包到最新版本（自动写入 pyproject.toml） |




