[[toc]]

### 删除文件及历史记

`filter-branch`：修改历史提交记录，把不需要的文件永久从历史记录中删除

```bash

# 在根目录执行以下命令
git filter-branch -f --prune-empty --index-filter 'git rm -rf --cached --ignore-unmatch 文件名' --tag-name-filter cat -- --all

# 推送我们修改后的repo
git push origin main --force --all

# 清理和回收空间
rm -rf .git/refs/original/
git reflog expire --expire=now --all
git gc --prune=now
git gc --aggressive --prune=now

```
