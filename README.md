# git-add-commit-push-emoji
集成 git add commit push 的提交工具，并且可选择自动添加 emoji 表情。

## Install

```
npm install -g git-add-commit-push-emoji
```

## 使用

提交代码，直接输入 acp, 提示输入log(回车可以跳过)，这时候log会自动添加微笑的emoji表情，示例如下：

```
acp
```

![]()

### API
#### acp -e
修改默认 emoji 表情，可以选择一个，或者直接选择随机，那么在提交的时候会自动添加

### acp -h, --help   
显示帮助信息
